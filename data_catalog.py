# data_catalog.py

STORES = {
    "DEL": {"name": "New Delhi, India",    "coords": [28.6139, 77.2090]},
    "KTM": {"name": "Kathmandu, Nepal",    "coords": [27.7172, 85.3240]},
    "BEJ": {"name": "Beijing, China",      "coords": [39.9042, 116.4074]},
    "MSK": {"name": "Moscow, Russia",      "coords": [55.7558, 37.6173]},
    "COL": {"name": "Colombo, Sri Lanka",  "coords": [6.9271, 79.8612]},
}

PRODUCTS = {
    # Apple
    "APL-IP15P": {"name": "Apple iPhone 15 Pro", "brand": "Apple", "category": "Mobile", "price": 134900, "keywords": ["iphone 15 pro"]},
    "APL-MBA-M3": {"name": "Apple MacBook Air M3", "brand": "Apple", "category": "Laptop", "price": 114900, "keywords": ["macbook air m3"]},
    "APL-AWU2": {"name": "Apple Watch Ultra 2", "brand": "Apple", "category": "Wearable", "price": 89900, "keywords": ["apple watch ultra 2"]},
    # Samsung
    "SAM-S24U": {"name": "Samsung Galaxy S24 Ultra", "brand": "Samsung", "category": "Mobile", "price": 129999, "keywords": ["s24 ultra"]},
    "SAM-GB3P": {"name": "Samsung Galaxy Book3 Pro", "brand": "Samsung", "category": "Laptop", "price": 131990, "keywords": ["galaxy book3 pro"]},
    "SAM-W6": {"name": "Samsung Galaxy Watch 6", "brand": "Samsung", "category": "Wearable", "price": 33999, "keywords": ["galaxy watch 6"]},
    # Google
    "GOO-P8P": {"name": "Google Pixel 8 Pro", "brand": "Google", "category": "Mobile", "price": 106999, "keywords": ["pixel 8 pro"]},
    # Dell
    "DEL-XPS15": {"name": "Dell XPS 15 Laptop", "brand": "Dell", "category": "Laptop", "price": 199990, "keywords": ["dell xps 15"]},
    # HP
    "HP-SPC14": {"name": "HP Spectre x360 14", "brand": "HP", "category": "Laptop", "price": 139999, "keywords": ["hp spectre x360"]},
    # OnePlus
    "ONE-12": {"name": "OnePlus 12", "brand": "OnePlus", "category": "Mobile", "price": 64999, "keywords": ["oneplus 12"]},
    # Sony
    "SONY-WH5": {"name": "Sony WH-1000XM5 Headphones", "brand": "Sony", "category": "Audio", "price": 29990, "keywords": ["sony xm5"]},
    # Nothing
    "NOT-P2": {"name": "Nothing Phone (2)", "brand": "Nothing", "category": "Mobile", "price": 44999, "keywords": ["nothing phone 2"]},
    # Boat
    "BOAT-XTND": {"name": "Boat Xtend Smartwatch", "brand": "Boat", "category": "Wearable", "price": 2999, "keywords": ["boat xtend"]},
    # Lenovo
    "LEN-YSLIM7": {"name": "Lenovo Yoga Slim 7", "brand": "Lenovo", "category": "Laptop", "price": 89990, "keywords": ["lenovo yoga slim 7"]},
    # ASUS
    "ASUS-ROG7": {"name": "ASUS ROG Phone 7", "brand": "ASUS", "category": "Mobile", "price": 74999, "keywords": ["asus rog phone"]},
}

# --- UPDATED: Significantly expanded list of opportunity products ---
OPPORTUNITY_PRODUCTS = [
    {"name": "Rabbit R1 AI Assistant", "keywords": ["rabbit r1"]},
    {"name": "CMF Nothing Watch Pro", "keywords": ["cmf watch pro"]},
    {"name": "Framework Laptop 16", "keywords": ["framework laptop"]},
    {"name": "Humane AI Pin", "keywords": ["humane ai pin"]},
    {"name": "Playdate Handheld Console", "keywords": ["playdate console"]},
    {"name": "FiiO M11S Music Player", "keywords": ["fiio m11s"]},
    {"name": "Anker Nebula Capsule 3", "keywords": ["anker nebula capsule 3"]},
    {"name": "ASUS ROG Ally", "keywords": ["rog ally"]},
    {"name": "Oura Ring Gen3", "keywords": ["oura ring"]},
    {"name": "Ray-Ban Meta Glasses", "keywords": ["ray ban meta"]},
]