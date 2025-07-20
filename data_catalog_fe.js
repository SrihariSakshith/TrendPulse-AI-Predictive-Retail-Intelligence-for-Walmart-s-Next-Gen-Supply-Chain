

// src/data_catalog_fe.js

// --- FIX: This catalog now matches the backend's international stores ---
// The coordinates are in [longitude, latitude] format for the map library.
export const STORES = {
    "DEL": {"name": "New Delhi, India",    "coords": [77.2090, 28.6139]},
    "KTM": {"name": "Kathmandu, Nepal",    "coords": [85.3240, 27.7172]},
    "BEJ": {"name": "Beijing, China",      "coords": [116.4074, 39.9042]},
    "MSK": {"name": "Moscow, Russia",      "coords": [37.6173, 55.7558]},
    "COL": {"name": "Colombo, Sri Lanka",  "coords": [79.8612, 6.9271]},
};

// No products are needed here, as all product data comes directly from the backend API alert.


// // src/data_catalog_fe.js

// export const STORES = {
//     "MUM": {"name": "Mumbai, MH", "coords": [72.8777, 19.0760]}, // [lng, lat]
//     "HYD": {"name": "Hyderabad, TS", "coords": [78.4867, 17.3850]},
//     "BLR": {"name": "Bengaluru, KA", "coords": [77.5946, 12.9716]},
//     "VJW": {"name": "Vijayawada, AP", "coords": [80.6480, 16.5062]},
//     "CHN": {"name": "Chennai, TN", "coords": [80.2707, 13.0827]},
// };

// // No products needed here anymore as all data comes from the backend API alert