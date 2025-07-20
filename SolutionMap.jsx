// src/components/SolutionMap.jsx
import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Box } from '@mui/material';

const SolutionMap = ({ deficitStore, surplusStore = null }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    
    // Load the API key from the frontend's environment variables.
    const myAPIKey = import.meta.env.VITE_MAPTILER_API_KEY;
    
    useEffect(() => {
        if (!mapContainer.current) return;
        
        // --- CORRECTED LOGIC ---
        // This now correctly checks if the API key is actually missing or is still a placeholder.
        // It no longer blocks your real API key.
        if (!myAPIKey || myAPIKey === 'YOUR_MAPTILER_API_KEY') {
            mapContainer.current.innerHTML = '<div style="color: red; padding: 20px; text-align: center;"><b>Map Error</b><br/>MapTiler API Key is missing.<br/>Please ensure it is set in the <code>.env</code> file and the server is restarted.</div>';
            return;
        }

        const mapStyle = `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${myAPIKey}`;
        
        if (map.current) return; // Initialize map only once

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: mapStyle,
            center: deficitStore.coords, // Coords are [lng, lat]
            zoom: 1, // Start more zoomed out for a global view
        });

        map.current.on('load', () => {
            if (!map.current) return;
            const bounds = new maplibregl.LngLatBounds();

            // Add deficit store (RED)
            new maplibregl.Marker({color: '#f44336'})
                .setLngLat(deficitStore.coords)
                .setPopup(new maplibregl.Popup({ offset: 25, closeButton: false }).setHTML(`<h6>Deficit at: ${deficitStore.name}</h6>`))
                .addTo(map.current);
            bounds.extend(deficitStore.coords);
            
            // If it's a transfer, add the surplus store (GREEN) and the route
            if (surplusStore) {
                new maplibregl.Marker({color: '#4caf50'})
                    .setLngLat(surplusStore.coords)
                    .setPopup(new maplibregl.Popup({ offset: 25, closeButton: false }).setHTML(`<h6>Surplus at: ${surplusStore.name}</h6>`))
                    .addTo(map.current);
                bounds.extend(surplusStore.coords);

                map.current.addSource('route', {
                    'type': 'geojson',
                    'data': {'type': 'Feature', 'properties': {}, 'geometry': {'type': 'LineString', 'coordinates': [surplusStore.coords, deficitStore.coords]}}
                });
                map.current.addLayer({
                    'id': 'route', 'type': 'line', 'source': 'route',
                    'layout': {'line-join': 'round', 'line-cap': 'round'},
                    'paint': {'line-color': '#00AEEF', 'line-width': 4, 'line-dasharray': [0, 2]}
                });
            }

            // Automatically zoom and pan to fit all markers perfectly.
            if (!bounds.isEmpty()) {
                 map.current.fitBounds(bounds, { padding: 100, duration: 1000, maxZoom: 8 });
            }
        });

        // Cleanup on unmount
        return () => {
            if(map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [deficitStore, surplusStore, myAPIKey]); // Rerun effect if data changes

    return <Box ref={mapContainer} sx={{ height: 400, borderRadius: 2, overflow: 'hidden' }} />;
};
export default SolutionMap;