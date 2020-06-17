import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { TransportistaPage } from '../transportista/transportista.page';
import { LoginPage } from '../login/login.page';
import { Storage } from '@ionic/storage';
import {ListPage} from '../list/list.page'
import { LoaderDirective } from "../../directives/loader.directive";
import { ViajesService } from '../../services/viajes/viajes.service';
declare var google

@Component({
  selector: 'app-viajes-nuevo',
  templateUrl: './viajes-nuevo.page.html',
  styleUrls: ['./viajes-nuevo.page.scss'],
})
export class ViajesNuevoPage implements OnInit {

  
  carrocerias=[]
  clientes = []
  usuarios = []
  nuevo = {
    "referencia": "",
    "idCliente": null,
    "idUsuario": null,
    "idTransporte": null,
    "origen": "La Piedad",
    "destino": "Irapuato",
    "latOrigen": "",
    "latDestino": "",
    "lonOrigen": "",
    "lonDestino": ""
  }
  viaje
  GoogleAutocomplete
  autocompleteOrigen
  autocompleteDestino
  autocompleteItemsOrigen
  autocompleteItemsDestino
  autocomplete
  map: any;
  autocompleteItems

  constructor(public navCtrl: NavController, 
    private storage: Storage,
    private loader: LoaderDirective,
    public alertCtrl: AlertController, private service: ViajesService, 
    public navParams: NavParams) {
    this.viaje = navParams.get('viaje')
    
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteOrigen = { input: '' };
    this.autocompleteDestino = { input: '' };
    this.autocompleteItemsOrigen = [];
    this.autocompleteItemsDestino = [];
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];

    this.getCarrocerias();
    this.getClientes()
  }

  ionViewDidLoad() {
    // this.map = new google.maps.Map(document.getElementById('map'), { 
    //   center: { lat: -34.9011, lng: -56.1645 },
    //   zoom: 15
    // });
  }
  usuario
  ionViewWillEnter(){
    this.storage.get('userData').then((user) => {
      this.usuario = user;
      if (this.usuario) {
        this.getUsuarios()
      }
    })
    
  }
 

  nuevoViaje() {
    this.nuevo = {
      "referencia": this.nuevo.referencia,
      "idCliente": this.nuevo.idCliente.id,
      "idUsuario": this.nuevo.idUsuario.idUsuario,
      "idTransporte": this.nuevo.idTransporte.id,
      "origen": this.nuevo.origen,
      "destino": this.nuevo.destino,
      "latOrigen": "",
      "latDestino": "",
      "lonOrigen": "",
      "lonDestino": ""
    }
    this.loader.presentLoader2()
    this.service.crearViaje(this.nuevo).subscribe( data =>{
      this.showAlert(data.message)
      this.loader.dismissLoader()
    }, err=>{
      console.log(err);
      console.log(err.error);
      this.loader.dismissLoader()
     // this.showAlert("Ocurrió un error inesperado")
      if (err.error.status == 401) {
        this.navCtrl.navigateRoot('LoginPage')
        this.storage.clear()
      }
      if (err.status == 409) {
        this.showAlert(err.error.message);
      }
    })
  }


  getCarrocerias(){
    this.service.transportes().subscribe(data =>{
      this.carrocerias = data.object;
      
    }, error =>{
      console.log(error);
      if (String(error.error.message).includes('The Token has expired')) {
        this.navCtrl.navigateRoot('LoginPage')
        this.storage.clear()
      }
      
    })
  }

  async showAlert(msj) {
    const alert = await this.alertCtrl.create({
      subHeader: msj,
      buttons:  [
        {
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.pop()
          }
        }
      ]
    });
    
    alert.present();
  }
  
  getClientes(){
    this.service.clientes().subscribe(data =>{
      this.clientes = data.object;
      
    }, error =>{
      console.log(error);
      
    })
  }
  getUsuarios(){
    this.service.usuarios(this.usuario.idEmpresa).subscribe(data =>{
      this.usuarios = data.object;
      
    }, error =>{
      console.log(error);
      
    })
  }
  updateOrigenResults(){
    this.nuevo.origen = ''
    if (this.autocompleteOrigen.input == '') {
      this.autocompleteItemsOrigen = [];
      return;
    }
    
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocompleteOrigen.input },
    (predictions, status) => {
      this.autocompleteItemsOrigen = [];
      
        predictions.forEach((prediction) => {
          this.autocompleteItemsOrigen.push(prediction);
          console.log(prediction);
          
        });
    });
  }
  selectOrigen(item){
    console.log(item);
    
    this.autocompleteItemsOrigen = []
    this.nuevo.origen = item.description
    this.autocompleteOrigen.input = item.description
    
  }
  updateDestinoResults(){
    this.nuevo.destino = ''
    if (this.autocompleteDestino.input == '') {
      this.autocompleteItemsDestino = [];
      return;
    }
    
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocompleteDestino.input },
    (predictions, status) => {
      this.autocompleteItemsDestino = [];
      
        predictions.forEach((prediction) => {
          this.autocompleteItemsDestino.push(prediction);
          console.log(prediction);
          
        });
    });
  }
  selectDestino(item){
    console.log(item);
    
    this.autocompleteItemsDestino = []
    this.nuevo.destino = item.description
    this.autocompleteDestino.input = item.description
    
  }

  ngOnInit() {
  }

}
