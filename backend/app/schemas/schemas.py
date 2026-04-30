from datetime import date, datetime

from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    full_name: str
    username: str | None = None
    email: EmailStr
    phone: str | None = None
    location: str | None = None
    birth_date: date | None = None
    password: str = Field(min_length=6)


class UserLogin(BaseModel):
    user: str
    password: str


class UserOut(BaseModel):
    id: int
    full_name: str
    username: str | None
    email: str
    is_admin: bool

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class DestinationBase(BaseModel):
    name: str
    category: str
    image: str
    hero_image: str | None = None
    description: str
    location: str | None = None
    best_time: str | None = None
    highlights: str | None = None
    price: str | None = None


class DestinationCreate(DestinationBase):
    pass


class DestinationOut(DestinationBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class BookingCreate(BaseModel):
    destination_id: int
    trip_date: date
    travelers: int = Field(default=1, ge=1, le=20)
    notes: str | None = None


class BookingOut(BaseModel):
    id: int
    destination: DestinationOut
    trip_date: date
    travelers: int
    notes: str | None
    created_at: datetime

    class Config:
        from_attributes = True


class FavoriteOut(BaseModel):
    id: int
    destination: DestinationOut
    created_at: datetime

    class Config:
        from_attributes = True


class DashboardOut(BaseModel):
    user: UserOut
    bookings: list[BookingOut]
    favorites: list[FavoriteOut]


# ── Blog ──────────────────────────────────────────────────────────────

class BlogPostCreate(BaseModel):
    title: str = Field(min_length=3, max_length=255)
    content: str = Field(min_length=10)
    cover_image: str | None = None
    destination_id: int | None = None


class BlogPostAdminUpdate(BaseModel):
    status: str = Field(pattern="^(approved|rejected)$")


class BlogPostOut(BaseModel):
    id: int
    title: str
    content: str
    cover_image: str | None
    status: str
    destination_id: int | None
    published_at: datetime | None
    created_at: datetime
    user: UserOut
    destination: DestinationOut | None = None

    class Config:
        from_attributes = True


# ── Comment ───────────────────────────────────────────────────────────

class CommentCreate(BaseModel):
    content: str = Field(min_length=1, max_length=2000)


class CommentUpdate(BaseModel):
    content: str = Field(min_length=1, max_length=2000)


class CommentOut(BaseModel):
    id: int
    content: str
    created_at: datetime
    updated_at: datetime
    user: UserOut
    destination_id: int

    class Config:
        from_attributes = True
