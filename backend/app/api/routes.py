import os
import uuid
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, Depends, File, HTTPException, Query, Request, UploadFile, status
from sqlalchemy import or_
from sqlalchemy.orm import Session, joinedload

from app.api.deps import get_admin_user, get_current_user
from app.core.security import create_access_token, get_password_hash, verify_password
from app.db.database import get_db
from app.models.models import BlogPost, Booking, Comment, Destination, Favorite, User
from app.schemas.schemas import (
    BlogPostAdminUpdate,
    BlogPostCreate,
    BlogPostOut,
    BookingCreate,
    BookingOut,
    CommentCreate,
    CommentOut,
    CommentUpdate,
    DashboardOut,
    DestinationCreate,
    DestinationOut,
    FavoriteOut,
    TokenResponse,
    UserCreate,
    UserLogin,
    UserOut,
)

router = APIRouter(prefix="/api")

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
MAX_UPLOAD_SIZE = 5 * 1024 * 1024  # 5 MB


# ═══════════════════════════════════════════════════════════════════════
# AUTH
# ═══════════════════════════════════════════════════════════════════════


@router.post("/auth/register", response_model=TokenResponse)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    exists = db.query(User).filter(User.email == payload.email).first()
    if exists:
        raise HTTPException(status_code=400, detail="Email is already registered")
    if payload.username:
        username_exists = db.query(User).filter(User.username == payload.username).first()
        if username_exists:
            raise HTTPException(status_code=400, detail="Username is already taken")

    user = User(
        full_name=payload.full_name,
        username=payload.username,
        email=payload.email,
        phone=payload.phone,
        location=payload.location,
        birth_date=payload.birth_date,
        hashed_password=get_password_hash(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "user": user}


@router.post("/auth/login", response_model=TokenResponse)
def login(payload: UserLogin, db: Session = Depends(get_db)):
    user = (
        db.query(User)
        .filter(or_(User.email == payload.user, User.username == payload.user))
        .first()
    )
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "user": user}


@router.get("/auth/me", response_model=UserOut)
def me(current_user: User = Depends(get_current_user)):
    return current_user


# ═══════════════════════════════════════════════════════════════════════
# DESTINATIONS
# ═══════════════════════════════════════════════════════════════════════


@router.get("/destinations", response_model=list[DestinationOut])
def list_destinations(db: Session = Depends(get_db)):
    return db.query(Destination).order_by(Destination.id.asc()).all()


@router.get("/destinations/{destination_id}", response_model=DestinationOut)
def get_destination(destination_id: int, db: Session = Depends(get_db)):
    destination = db.query(Destination).filter(Destination.id == destination_id).first()
    if not destination:
        raise HTTPException(status_code=404, detail="Destination not found")
    return destination


@router.post("/destinations", response_model=DestinationOut, status_code=201)
def create_destination(
    payload: DestinationCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_admin_user),
):
    destination = Destination(**payload.model_dump())
    db.add(destination)
    db.commit()
    db.refresh(destination)
    return destination


# ═══════════════════════════════════════════════════════════════════════
# BOOKINGS
# ═══════════════════════════════════════════════════════════════════════


@router.post("/bookings", response_model=BookingOut, status_code=201)
def create_booking(
    payload: BookingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    destination = db.query(Destination).filter(Destination.id == payload.destination_id).first()
    if not destination:
        raise HTTPException(status_code=404, detail="Destination not found")
    booking = Booking(user_id=current_user.id, **payload.model_dump())
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return (
        db.query(Booking)
        .options(joinedload(Booking.destination))
        .filter(Booking.id == booking.id)
        .first()
    )


@router.get("/bookings/me", response_model=list[BookingOut])
def my_bookings(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(Booking)
        .options(joinedload(Booking.destination))
        .filter(Booking.user_id == current_user.id)
        .order_by(Booking.created_at.desc())
        .all()
    )


# ═══════════════════════════════════════════════════════════════════════
# FAVORITES
# ═══════════════════════════════════════════════════════════════════════


@router.post("/favorites/{destination_id}", response_model=FavoriteOut, status_code=201)
def add_favorite(
    destination_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    destination = db.query(Destination).filter(Destination.id == destination_id).first()
    if not destination:
        raise HTTPException(status_code=404, detail="Destination not found")
    existing = (
        db.query(Favorite)
        .filter(Favorite.user_id == current_user.id, Favorite.destination_id == destination_id)
        .first()
    )
    if existing:
        return (
            db.query(Favorite)
            .options(joinedload(Favorite.destination))
            .filter(Favorite.id == existing.id)
            .first()
        )
    favorite = Favorite(user_id=current_user.id, destination_id=destination_id)
    db.add(favorite)
    db.commit()
    db.refresh(favorite)
    return (
        db.query(Favorite)
        .options(joinedload(Favorite.destination))
        .filter(Favorite.id == favorite.id)
        .first()
    )


@router.delete("/favorites/{destination_id}", status_code=204)
def remove_favorite(
    destination_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    favorite = (
        db.query(Favorite)
        .filter(Favorite.user_id == current_user.id, Favorite.destination_id == destination_id)
        .first()
    )
    if favorite:
        db.delete(favorite)
        db.commit()
    return None


@router.get("/favorites/me", response_model=list[FavoriteOut])
def my_favorites(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(Favorite)
        .options(joinedload(Favorite.destination))
        .filter(Favorite.user_id == current_user.id)
        .order_by(Favorite.created_at.desc())
        .all()
    )


# ═══════════════════════════════════════════════════════════════════════
# DASHBOARD
# ═══════════════════════════════════════════════════════════════════════


@router.get("/dashboard/me", response_model=DashboardOut)
def dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    bookings = (
        db.query(Booking)
        .options(joinedload(Booking.destination))
        .filter(Booking.user_id == current_user.id)
        .order_by(Booking.created_at.desc())
        .all()
    )
    favorites = (
        db.query(Favorite)
        .options(joinedload(Favorite.destination))
        .filter(Favorite.user_id == current_user.id)
        .order_by(Favorite.created_at.desc())
        .all()
    )
    return {"user": current_user, "bookings": bookings, "favorites": favorites}


# ═══════════════════════════════════════════════════════════════════════
# FILE UPLOAD
# ═══════════════════════════════════════════════════════════════════════


@router.post("/upload")
async def upload_file(
    request: Request,
    file: UploadFile = File(...),
    _: User = Depends(get_current_user),
):
    ext = os.path.splitext(file.filename or "file")[1].lower()
    if ext not in (".jpg", ".jpeg", ".png", ".webp", ".gif"):
        raise HTTPException(status_code=400, detail="Only image files are allowed.")

    unique_name = f"{uuid.uuid4().hex}{ext}"
    dest_path = os.path.join(UPLOAD_DIR, unique_name)

    size = 0
    try:
        with open(dest_path, "wb") as out:
            while chunk := await file.read(1024 * 1024):
                size += len(chunk)
                if size > MAX_UPLOAD_SIZE:
                    out.close()
                    os.remove(dest_path)
                    raise HTTPException(status_code=400, detail="File too large. Maximum size is 5 MB.")
                out.write(chunk)
    finally:
        await file.close()

    return {"url": str(request.base_url).rstrip("/") + f"/uploads/{unique_name}"}


# ═══════════════════════════════════════════════════════════════════════
# BLOG POSTS
# ═══════════════════════════════════════════════════════════════════════


@router.post("/blogs", response_model=BlogPostOut, status_code=201)
def create_blog(
    payload: BlogPostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if payload.destination_id:
        dest = db.query(Destination).filter(Destination.id == payload.destination_id).first()
        if not dest:
            raise HTTPException(status_code=404, detail="Destination not found")

    post = BlogPost(user_id=current_user.id, **payload.model_dump())
    db.add(post)
    db.commit()
    db.refresh(post)
    return (
        db.query(BlogPost)
        .options(joinedload(BlogPost.user), joinedload(BlogPost.destination))
        .filter(BlogPost.id == post.id)
        .first()
    )


@router.get("/blogs", response_model=list[BlogPostOut])
def list_blogs(
    destination_id: Optional[int] = Query(None),
    sort: str = Query("date", pattern="^(date|oldest)$"),
    db: Session = Depends(get_db),
):
    q = (
        db.query(BlogPost)
        .options(joinedload(BlogPost.user), joinedload(BlogPost.destination))
        .filter(BlogPost.status == "approved")
    )
    if destination_id:
        q = q.filter(BlogPost.destination_id == destination_id)
    order_column = BlogPost.published_at.asc() if sort == "oldest" else BlogPost.published_at.desc()
    return q.order_by(order_column).all()


@router.get("/blogs/pending", response_model=list[BlogPostOut])
def list_pending_blogs(
    db: Session = Depends(get_db),
    _: User = Depends(get_admin_user),
):
    return (
        db.query(BlogPost)
        .options(joinedload(BlogPost.user), joinedload(BlogPost.destination))
        .filter(BlogPost.status == "pending")
        .order_by(BlogPost.created_at.desc())
        .all()
    )


@router.get("/blogs/{blog_id}", response_model=BlogPostOut)
def get_blog(blog_id: int, db: Session = Depends(get_db)):
    post = (
        db.query(BlogPost)
        .options(joinedload(BlogPost.user), joinedload(BlogPost.destination))
        .filter(BlogPost.id == blog_id, BlogPost.status == "approved")
        .first()
    )
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post


@router.patch("/blogs/{blog_id}/status", response_model=BlogPostOut)
def update_blog_status(
    blog_id: int,
    payload: BlogPostAdminUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_admin_user),
):
    post = db.query(BlogPost).filter(BlogPost.id == blog_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    post.status = payload.status
    if payload.status == "approved":
        post.published_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(post)
    return (
        db.query(BlogPost)
        .options(joinedload(BlogPost.user), joinedload(BlogPost.destination))
        .filter(BlogPost.id == post.id)
        .first()
    )


# ═══════════════════════════════════════════════════════════════════════
# COMMENTS  (booking-verified)
# ═══════════════════════════════════════════════════════════════════════


@router.post("/destinations/{destination_id}/comments", response_model=CommentOut, status_code=201)
def create_comment(
    destination_id: int,
    payload: CommentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    dest = db.query(Destination).filter(Destination.id == destination_id).first()
    if not dest:
        raise HTTPException(status_code=404, detail="Destination not found")

    has_booking = (
        db.query(Booking)
        .filter(Booking.user_id == current_user.id, Booking.destination_id == destination_id)
        .first()
    )
    if not has_booking:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You must have a booking for this destination to leave a comment. Book your trip first!",
        )

    comment = Comment(user_id=current_user.id, destination_id=destination_id, content=payload.content)
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return (
        db.query(Comment)
        .options(joinedload(Comment.user))
        .filter(Comment.id == comment.id)
        .first()
    )


@router.get("/destinations/{destination_id}/comments", response_model=list[CommentOut])
def list_comments(destination_id: int, db: Session = Depends(get_db)):
    return (
        db.query(Comment)
        .options(joinedload(Comment.user))
        .filter(Comment.destination_id == destination_id)
        .order_by(Comment.created_at.desc())
        .all()
    )


@router.patch("/comments/{comment_id}", response_model=CommentOut)
def edit_comment(
    comment_id: int,
    payload: CommentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    if comment.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You can only edit your own comments")
    comment.content = payload.content
    db.commit()
    db.refresh(comment)
    return (
        db.query(Comment)
        .options(joinedload(Comment.user))
        .filter(Comment.id == comment.id)
        .first()
    )


@router.delete("/comments/{comment_id}", status_code=204)
def delete_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    if comment.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You can only delete your own comments")
    db.delete(comment)
    db.commit()
    return None
