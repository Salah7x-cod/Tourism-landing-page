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
    {
        "name": "Danakil Depression",
        "category": "Adventure",
        "image": "/assets/Danakil Depression/Danakil Depression, Ethiopia.jpg",
        "hero_image": "/assets/Danakil Depression/The Danakil Depression, Ethiopia’s Fiery Frontier 🇪🇹.jpg",
        "description": "One of the hottest, driest, and lowest places on Earth. Features alien-like landscapes, colorful hydrothermal fields, and active volcanoes.",
        "location": "Afar, Ethiopia",
        "best_time": "November to February",
        "highlights": "Active volcanoes and salt lakes",
        "price": "$120",
    },
    {
        "name": "Bale Mountains",
        "category": "Nature",
        "image": "/assets/bale mountain/Bale Mountains.jpg",
        "hero_image": "/assets/bale mountain/Harenna Forest in Ethiopia's Bale Mountains by Robin Moore.jpg",
        "description": "High altitude plateau with glacial lakes and volcanic ridges. A biodiversity hotspot and home to the rare Ethiopian wolf.",
        "location": "Oromia, Ethiopia",
        "best_time": "November to March",
        "highlights": "Wildlife and glacial lakes",
        "price": "$80",
    },
    {
        "name": "Harar",
        "category": "Cultural",
        "image": "/assets/Harar/Harar Jegol.jpg",
        "hero_image": "/assets/Harar/Sun set ☀️.jpg",
        "description": "The fourth holiest city of Islam, characterized by its walled alleys, colorful markets, and the unique tradition of feeding wild hyenas.",
        "location": "Harari, Ethiopia",
        "best_time": "October to March",
        "highlights": "Walled city and hyena feeding",
        "price": "$40",
    },
    {
        "name": "Lake Tana",
        "category": "Nature",
        "image": "/assets/Lake tana/Lake Tana, Ethiopia.jpg",
        "hero_image": "/assets/Lake tana/Lake Tana Monasteries_ Island Heritage.jpg",
        "description": "The largest lake in Ethiopia and the source of the Blue Nile. Dotted with islands housing ancient monasteries.",
        "location": "Amhara, Ethiopia",
        "best_time": "September to March",
        "highlights": "Island monasteries",
        "price": "$50",
    },
    {
        "name": "Addis Ababa",
        "category": "City",
        "image": "/assets/Addis Ababa/A stunning view of Addis Ababa, Ethiopia 🇪🇹.jpg",
        "hero_image": "/assets/Addis Ababa/Streets of addis.jpg",
        "description": "The bustling capital city, serving as the diplomatic capital of Africa, full of vibrant culture, museums, and distinct coffee ceremonies.",
        "location": "Addis Ababa, Ethiopia",
        "best_time": "October to April",
        "highlights": "Museums and culture",
        "price": "$30",
    }
]


def seed_destinations(db: Session) -> None:
    for payload in DEFAULT_DESTINATIONS:
        exists = db.query(Destination).filter(Destination.name == payload["name"]).first()
        if not exists:
            db.add(Destination(**payload))
    db.commit()
