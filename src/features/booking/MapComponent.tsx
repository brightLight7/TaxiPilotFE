import { useEffect, useRef } from 'react';
import { useAppStore } from '../store/appStore';

export default function MapComponent() {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const rendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const placesArrays = useAppStore((s) => s.placesArrays);

  useEffect(() => {
    if (!mapDivRef.current) return;

    function initMap() {
      if (!mapDivRef.current || mapRef.current) return;

      mapRef.current = new window.google.maps.Map(mapDivRef.current, {
        center: { lat: 51.1537, lng: -0.1821 }, // Gatwick Airport
        zoom: 10,
      });

      rendererRef.current = new window.google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: '#800080',
          strokeWeight: 6,
          strokeOpacity: 0.8,
        },
      });
      rendererRef.current.setMap(mapRef.current);
    }

    if (window.google?.maps) {
      initMap();
    } else {
      // Retry after a short delay — Maps script may still be loading
      const timer = setTimeout(initMap, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current || !rendererRef.current) return;
    if (placesArrays.length < 2) return;

    const origin = placesArrays[placesArrays.length - 2];
    const destination = placesArrays[placesArrays.length - 1];

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: { lat: origin.latitude, lng: origin.longitude },
        destination: { lat: destination.latitude, lng: destination.longitude },
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      },
      (result, status) => {
        if (status !== window.google.maps.DirectionsStatus.OK || !result) return;

        // Pick the shortest route by total distance
        let shortestIdx = 0;
        let shortestDist = Infinity;
        result.routes.forEach((route, idx) => {
          const dist = route.legs.reduce((sum, leg) => sum + (leg.distance?.value ?? 0), 0);
          if (dist < shortestDist) { shortestDist = dist; shortestIdx = idx; }
        });

        rendererRef.current!.setDirections(result);
        rendererRef.current!.setRouteIndex(shortestIdx);

        const bounds = result.routes[shortestIdx].bounds;
        if (bounds && mapRef.current) {
          mapRef.current.fitBounds(bounds);
          window.google.maps.event.addListenerOnce(mapRef.current, 'idle', () => {
            if (mapRef.current && (mapRef.current.getZoom() ?? 0) > 12) {
              mapRef.current.setZoom(12);
            }
          });
        }
      }
    );
  }, [placesArrays]);

  return <div ref={mapDivRef} className="map-div" />;
}
