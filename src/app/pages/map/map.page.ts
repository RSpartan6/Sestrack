import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NavController, NavParams } from "@ionic/angular";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  GoogleMapsEvent,
  CameraPosition,
} from "@ionic-native/google-maps";

@Component({
  selector: "app-map",
  templateUrl: "./map.page.html",
  styleUrls: ["./map.page.scss"],
})
export class MapPage implements OnInit {
  @ViewChild("map") mapElement: ElementRef;
  @ViewChild("directionsPanel") directionsPanel: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps) {}

  ionViewDidLoad() {
    this.loadMap();
    // this.startNavigating();
  }
  loadMap() {
    let coordinates = this.coordinates;

    let mapOptions: GoogleMapOptions = {
      mapType: "MAP_TYPE_ROADMAP",
      camera: {
        target: {
          lat: 21.1218562,
          lng: -101.8061003,
        },
        zoom: 8,
      },
    };

    let map = GoogleMaps.create(this.mapElement.nativeElement, mapOptions);

    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log("Map is ready!");
      map.addMarker({
        position: {
          lat: 21.0751,
          lng: -101.7537,
        },
        title: "Inicio de Viaje!",
      });
      map.addMarker({
        position: {
          lat: 20.3681,
          lng: -102.0031,
        },
        title: "Fin de Viaje!",
      });
      map.addPolyline({
        points: coordinates,
        color: "#AA00FF",
        width: 5,
        geodesic: true,
      });
    });
  }

  coordinates = [
    { lat: 21.0751, lng: -101.7537 },
    { lat: 21.0643, lng: -101.7644 },
    { lat: 21.0542, lng: -101.7768 },
    { lat: 21.0392, lng: -101.8128 },
    { lat: 21.035, lng: -101.8251 },
    { lat: 21.0243, lng: -101.8256 },
    { lat: 21.0067, lng: -101.8303 },
    { lat: 20.997038, lng: -101.833499 },
    { lat: 20.994218, lng: -101.842606 },
    { lat: 20.99492, lng: -101.845173 },
    { lat: 20.9736, lng: -101.8561 },
    { lat: 20.9592, lng: -101.867 },
    { lat: 20.8841, lng: -101.8873 },
    { lat: 20.8427, lng: -101.8982 },
    { lat: 20.8046, lng: -101.9059 },
    { lat: 20.7543, lng: -101.9233 },
    { lat: 20.7111, lng: -101.9369 },
    { lat: 20.7025, lng: -101.9334 },
    { lat: 20.7025, lng: -101.9334 },
    { lat: 20.67, lng: -101.9447 },
    { lat: 20.6568, lng: -101.9552 },
    { lat: 20.6241, lng: -101.9889 },
    { lat: 20.6074, lng: -101.9906 },
    { lat: 20.5839, lng: -101.9801 },
    { lat: 20.5117, lng: -101.9753 },
    { lat: 20.5117, lng: -101.9753 },
    { lat: 20.5117, lng: -101.9753 },
    { lat: 20.5117, lng: -101.9753 },
    { lat: 20.4149, lng: -101.996 },
    { lat: 20.3979, lng: -101.9994 },
    { lat: 20.3979, lng: -101.9994 },
    { lat: 20.3711, lng: -102.0028 },
    { lat: 20.3711, lng: -102.0028 },
    { lat: 20.3711, lng: -102.0028 },
    { lat: 20.3681, lng: -102.0031 },
    { lat: 21.0751, lng: -101.7537 },
    { lat: 21.0643, lng: -101.7644 },
    { lat: 21.0542, lng: -101.7768 },
    { lat: 21.0463, lng: -101.7904 },
    { lat: 21.0392, lng: -101.8128 },
    { lat: 21.035, lng: -101.8251 },
    { lat: 21.0243, lng: -101.8256 },
    { lat: 21.0067, lng: -101.8303 },
    { lat: 21.021, lng: -101.8263 },
    { lat: 21.0124, lng: -101.8154 },
    { lat: 21.0075, lng: -101.8032 },
    { lat: 20.9736, lng: -101.8561 },
    { lat: 20.9592, lng: -101.867 },
    { lat: 20.8841, lng: -101.8873 },
    { lat: 20.8427, lng: -101.8982 },
    { lat: 20.8046, lng: -101.9059 },
    { lat: 20.7543, lng: -101.9233 },
    { lat: 20.7111, lng: -101.9369 },
    { lat: 20.7025, lng: -101.9334 },
    { lat: 20.7025, lng: -101.9334 },
    { lat: 20.67, lng: -101.9447 },
    { lat: 20.6568, lng: -101.9552 },
    { lat: 20.6241, lng: -101.9889 },
    { lat: 20.6074, lng: -101.9906 },
    { lat: 20.5839, lng: -101.9801 },
    { lat: 20.5117, lng: -101.9753 },
    { lat: 20.5117, lng: -101.9753 },
    { lat: 20.5117, lng: -101.9753 },
    { lat: 20.5117, lng: -101.9753 },
    { lat: 20.4149, lng: -101.996 },
    { lat: 20.3979, lng: -101.9994 },
    { lat: 20.3979, lng: -101.9994 },
    { lat: 20.3711, lng: -102.0028 },
    { lat: 20.3711, lng: -102.0028 },
    { lat: 20.3711, lng: -102.0028 },
    { lat: 20.3681, lng: -102.0031 },
  ];

  ngOnInit() {}
}
