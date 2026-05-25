import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Observable, Subscription } from 'rxjs';
import { AppFacade } from 'src/app/store/app.facade';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() places: { latitude: number; longitude: number }[] = [];

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

  center: google.maps.LatLngLiteral = { lat: 51.15545988651341, lng: -0.18199239817920657 };
  zoom = 8;
  markers: Map<string, google.maps.Marker> = new Map();
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  placesLat$: Observable<{ latitude: number; longitude: number }[]> | undefined;
  private subscription: Subscription | undefined;

  constructor(private appFacade: AppFacade, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['places'] && this.places.length) {
      this.updateMarkersAndRoute();
      this.adjustMapBounds();
      this.cdr.detectChanges();
    }
  }
//TODO fixing is needed.. whenever a pickup added, and then removed and enter a new one...  and more around placeArrays
  ngOnInit(): void {
    this.placesLat$ = this.appFacade.placesArrays$;
    this.subscription = this.placesLat$?.subscribe((coordinates) => {
      this.places = [...this.places, ...coordinates];
      this.removeGatwickPin();
      this.updateMarkersAndRoute();
      this.adjustMapBounds();
    });
  }

  ngAfterViewInit(): void {
    this.adjustMapBounds();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private updateMarkersAndRoute(): void {
    // Always consider only the last two places in the array
    const latestPlaces = this.places.slice(-2); // Extract the last two places (pickup and destination)

    // Remove all markers from the map and clear the markers map
    this.markers.forEach(marker => marker.setMap(null));
    this.markers.clear();

    // Add markers for the latest places
    latestPlaces.forEach((place, index) => {
      const key = `${place.latitude},${place.longitude}`;
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(place.latitude, place.longitude),
        map: this.map.googleMap ?? undefined,
        icon: index === 0
          ? 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' // Pickup icon
          : 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png', // Destination icon
        title: index === 0 ? 'Pickup' : 'Destination'
      });
      this.markers.set(key, marker);
    });

    // If exactly two places exist, draw a route
    if (latestPlaces.length === 2) {
      this.drawRoute(latestPlaces[0], latestPlaces[1]);
    } else {
      this.directionsRenderer.setMap(null); // Clear the route if not exactly two places
    }
  }

  private drawRoute(origin: { latitude: number; longitude: number }, destination: { latitude: number; longitude: number }): void {
    const request: google.maps.DirectionsRequest = {
      origin: new google.maps.LatLng(origin.latitude, origin.longitude),
      destination: new google.maps.LatLng(destination.latitude, destination.longitude),
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: false, // Ensure the order of origin and destination
      provideRouteAlternatives: true // Allow multiple routes to compare
    };

        // Set route color to purple
        this.directionsRenderer.setOptions({
          polylineOptions: {
            strokeColor: "#800080", // Purple color
            strokeWeight: 6, // Adjust thickness as needed
            strokeOpacity: 0.8 // Adjust opacity as needed
          }
        });

    this.directionsRenderer.setMap(this.map.googleMap || null);

    this.directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        if (result.routes.length > 0) {
          // Find the shortest route based on total distance
          const shortestRoute = result.routes.reduce((shortest, current) => {
            const currentDistance = current.legs.reduce((sum, leg) => sum + (leg.distance?.value || 0), 0);
            const shortestDistance = shortest.legs.reduce((sum, leg) => sum + (leg.distance?.value || 0), 0);
            return currentDistance < shortestDistance ? current : shortest;
          });

          // Render the shortest route
          this.directionsRenderer.setDirections({ ...result, routes: [shortestRoute] });
        }
      } else {
        console.error(`Error generating route: ${status}`, request);
      }
    });
  }



  private adjustMapBounds(): void {
    if (this.map && !this.places.length) {
      this.map.googleMap?.setCenter(this.center);
      this.map.googleMap?.setZoom(this.zoom);

      this.map.googleMap?.setOptions({
        mapTypeControl: false,
        // mapTypeControlOptions: {
        //   position: google.maps.ControlPosition.TOP_RIGHT,
        //   style: google.maps.MapTypeControlStyle.DEFAULT, // Ensures the control is visible
        //   mapTypeIds: [
        //     google.maps.MapTypeId.ROADMAP,
        //     google.maps.MapTypeId.SATELLITE,
        //     google.maps.MapTypeId.HYBRID,
        //     google.maps.MapTypeId.TERRAIN // Ensure all types are available
        //   ]
        // }
      })

      return;
    }

    const bounds = new google.maps.LatLngBounds();
    this.places.forEach((place) => {
      const position = new google.maps.LatLng(place.latitude, place.longitude);
      bounds.extend(position);
    });


    if(this.map) {
    this.map.googleMap?.fitBounds(bounds);

    const map = this.map.googleMap;

    if (map) {
      google.maps.event.addListenerOnce(map, 'idle', () => {
        const currentZoom = map.getZoom();
        if (currentZoom && currentZoom > 12) {
          map.setZoom(5);
        }
      });
    }
  }
  }

  private removeGatwickPin(): void {
    const gatwickKey = `51.15545988651341,-0.18199239817920657`;
    if (this.markers.has(gatwickKey)) {
      this.markers.get(gatwickKey)?.setMap(null);
      this.markers.delete(gatwickKey);
    }
  }
}
