from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import or_
from sqlalchemy.orm import Session, joinedload

from app.api.deps import get_admin_user, get_current_user
from app.core.security import create_access_token, get_password_hash, verify_password
from app.db.database import get_db
from app.models.models import Booking, Destination, Favorite, User
from app.schemas.schemas import (
    BookingCreate,
    BookingOut,
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
