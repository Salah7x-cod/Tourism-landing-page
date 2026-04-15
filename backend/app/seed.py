from sqlalchemy.orm import Session

from app.models.models import Destination


DEFAULT_DESTINATIONS = [
    {
        "name": "Lalibela",
        "category": "Historical",
        "image": "/assets/Lailabila/download (43).jpg",
        "hero_image": "/assets/Lailabila/A lady helps an old woman down steep stone steps, Lalibela, Ethiopia.jpg",
        "description": "Famous for its rock-hewn monolithic churches, a breathtaking UNESCO World Heritage site representing the medieval capital of Ethiopia.",
        "location": "Amhara, Ethiopia",
        "best_time": "October to February",
        "highlights": "Rock-hewn churches",
        "price": "$55",
    },
    {
        "name": "Axum",
        "category": "Historical",
        "image": "/assets/Axum/Kingdom of Aksum (1).jpg",
        "hero_image": "/assets/Axum/Stella of Aksum and zion church.jpg",
        "description": "Ancient capital of the Aksumite Empire, known for obelisks and rich heritage.",
        "location": "Tigray, Ethiopia",
        "best_time": "September to March",
        "highlights": "Ancient obelisks and ruins",
        "price": "$45",
    },
    {
        "name": "Simien Mountains",
        "category": "Nature",
        "image": "/assets/Simin moountain/Simien Mountains National Park, Ethiopia.jpg",
        "hero_image": "/assets/Simin moountain/Ethiopia's Simien Mountains_ Trekking On The Roof Of The World.jpg",
        "description": "A dramatic highland landscape with endemic wildlife and unforgettable trekking routes.",
        "location": "Amhara, Ethiopia",
        "best_time": "October to February",
        "highlights": "Trekking and wildlife",
        "price": "$60",
    },
]


def seed_destinations(db: Session) -> None:
    has_data = db.query(Destination).first()
    if has_data:
        return
    for payload in DEFAULT_DESTINATIONS:
        db.add(Destination(**payload))
    db.commit()
