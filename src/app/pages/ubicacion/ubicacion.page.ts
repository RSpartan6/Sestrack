import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { GoogleMaps, GoogleMap, GoogleMapOptions, GoogleMapsEvent, CameraPosition } from '@ionic-native/google-maps';
import { LoaderDirective } from "../../directives/loader.directive";
import { ViajesService } from '../../services/viajes/viajes.service';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
})
export class UbicacionPage implements OnInit {


  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;

  map: any;
  viaje
  constructor(public navCtrl: NavController, 
    private loader: LoaderDirective,
    private service: ViajesService, private navParams: NavParams) {
    this.viaje = this.navParams.get('viaje');
    this.viaje.coordenadasViaje.forEach(coord => {
      let point = {
        lat: coord.lat,
        lng: coord.lon
      }
      this.coordinates.push(point)
    });
  }
 
  ionViewDidLoad(){
    setTimeout(() => {
           this.getAperturas()

    }, 300);
  }
 
  
 coordinates = []
  loadMap() {
    let center
    let coordinates = this.coordinates;
    if (this.viaje.coordenadasViaje.length>1) {
      center  = 0
    }else{
      center = Math.round(this.viaje.coordenadasViaje.length/2);
    }
    
    let lat = 19.390519
    let lon = -99.4238179
    
    if (this.viaje.coordenadasViaje.length>1) {
      lat = this.viaje.coordenadasViaje[center].lat
      lon = this.viaje.coordenadasViaje[center].lon
    }else if(this.viaje.coordenadasViaje.length>0){
      lat = this.viaje.coordenadasViaje[0].lat
      lon = this.viaje.coordenadasViaje[0].lon
    }
    let mapOptions: GoogleMapOptions = {
      mapType: 'MAP_TYPE_ROADMAP',
      camera: {
          target: {
            lat:  lat,
            lng: lon
          },
          zoom: 7
      }
    }
    let map = GoogleMaps.create(this.mapElement.nativeElement, mapOptions);

    map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
         if (this.listaAperturas.length>0) {
           this.listaAperturas.forEach(element => {
             var mark = element.coordenada.split(',')
            let lat = mark [0]
             let lon = mark [1]
             map.addMarker({
               position: {
                   lat: lat, lng:lon
               },
               title: 'Apertura en ' + element.localizacion,
               icon: {
                 url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
               }
            });
           });
         }
        map.addMarker({
            position: {
                lat: this.viaje.coordenadasViaje[0].lat, lng: this.viaje.coordenadasViaje[0].lon
            },
            title: '!Inicio de Viaje!'
        });
        if (this.viaje.estatusViaje=='FINALIZADO'||this.viaje.estatusViaje=='CERRADO') {
          map.addMarker({
            position: {
                lat: this.viaje.coordenadasViaje[this.viaje.coordenadasViaje.length-1].lat, lng: this.viaje.coordenadasViaje[this.viaje.coordenadasViaje.length-1].lon             
            },
            title: '!Fin de Viaje!'
          });
        }
        map.addPolyline({
            points: coordinates,
            'color' : '#AA00FF',
            'width': 5,
            'geodesic': true
        });
      }
    );   
  }

  getAperturas(){
    this.loader.presentLoader2()
    this.service.aperturas(this.viaje.id).subscribe( data=>{
      this.loader.dismissLoader()
      if (data.object) {
        this.listaAperturas = data.object
      }else{
        this.listaAperturas = []
      }
      this.loadMap();
  
    }, err =>{
      this.listaAperturas=[];
  
      this.loader.dismissLoader()
      this.loadMap();
    })
  }
  listaAperturas =[]  

  ngOnInit() {
  }

}
