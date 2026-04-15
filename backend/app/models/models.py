from sqlalchemy import Boolean, Column, Date, DateTime, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(120), nullable=False)
    username = Column(String(80), unique=True, nullable=True)
    email = Column(String(120), unique=True, nullable=False, index=True)
    phone = Column(String(40), nullable=True)
    location = Column(String(120), nullable=True)
    birth_date = Column(Date, nullable=True)
    hashed_password = Column(String(255), nullable=False)
    is_admin = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    bookings = relationship("Booking", back_populates="user", cascade="all, delete-orphan")
    favorites = relationship("Favorite", back_populates="user", cascade="all, delete-orphan")


class Destination(Base):
    __tablename__ = "destinations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False, unique=True)
    category = Column(String(80), nullable=False)
    image = Column(String(255), nullable=False)
    hero_image = Column(String(255), nullable=True)
    description = Column(Text, nullable=False)
    location = Column(String(120), nullable=True)
    best_time = Column(String(120), nullable=True)
    highlights = Column(String(255), nullable=True)
    price = Column(String(40), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    bookings = relationship("Booking", back_populates="destination", cascade="all, delete-orphan")
    favorites = relationship("Favorite", back_populates="destination", cascade="all, delete-orphan")


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    destination_id = Column(Integer, ForeignKey("destinations.id"), nullable=False)
    trip_date = Column(Date, nullable=False)
    travelers = Column(Integer, nullable=False, default=1)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user = relationship("User", back_populates="bookings")
    destination = relationship("Destination", back_populates="bookings")


class Favorite(Base):
    __tablename__ = "favorites"
    __table_args__ = (UniqueConstraint("user_id", "destination_id", name="uq_favorite_user_destination"),)

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    destination_id = Column(Integer, ForeignKey("destinations.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user = relationship("User", back_populates="favorites")
    destination = relationship("Destination", back_populates="favorites")
