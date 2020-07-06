import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoaderDirective } from "../../directives/loader.directive";
import { ViajesService } from '../../services/viajes/viajes.service';
declare var google

@Component({
  selector: 'app-viajes-modificar',
  templateUrl: './viajes-modificar.page.html',
  styleUrls: ['./viajes-modificar.page.scss'],
})
export class ViajesModificarPage implements OnInit {

  
  carrocerias=[]
  clientes = []
  usuarios = []
  viajeCerrar = {
    "destino": "",
    "id": null,
    "idCliente": null,
    "idUsuario": null,
    "idTransporte": null,
    "referencia": ""
  }
  viaje
  GoogleAutocomplete
  autocomplete
  autocompleteItems
  map: any;

  constructor(public navCtrl: NavController, 
    private storage: Storage,
    private loader: LoaderDirective,
    public alertCtrl: AlertController, private service: ViajesService, public navParams: NavParams) {
    this.viaje = navParams.get('viaje')
    
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
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
    

    if (this.viaje.idCliente.id) {
      this.navCtrl.pop()
      
    }
  }
 
  async cancelar(){
    
    let alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas cancelar el viaje?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.mandarCancelar()
          }
        }
      ]
    });
    alert.present();
  }
  mandarCancelar(){
    this.loader.presentLoader2()
    this.service.cancelarViaje(this.viaje.id).subscribe(data=>{
      this.loader.dismissLoader()
      if (data.message == 'OK') {
        this.navCtrl.navigateRoot('ListPage');

        this.showAlert('Viaje cancelado')
      }else{
        this.showAlert('Ocurrió un error al cancelar el viaje')
      }
    }, err=>{
      this.loader.dismissLoader()
      this.showAlert('Ocurrió un error inesperado')
      if (err.error.status == 401) {
        this.navCtrl.navigateRoot('LoginPage')
        this.storage.clear()
      }
    })
  }
  actualizarViaje(){
    // recupero ids por el componente searcheable
    this.viajeCerrar = {
      "destino": this.viaje.destino,
      "id": this.viaje.id,
      "idCliente": this.viaje.idCliente.id,
      "idUsuario": this.viaje.idUsuario.idUsuario,
      "idTransporte": this.viaje.idTransporte.id,
      "referencia": this.viaje.referencia
    }
    this.loader.presentLoader2()
    this.service.completarViaje(this.viajeCerrar).subscribe( data =>{
      this.showAlert(data.message)
      this.loader.dismissLoader()
    }, err=>{
      console.log(err);
      this.loader.dismissLoader()
      this.showAlert("Ocurrió un error inesperado")
      if (err.error.status == 401) {
        this.navCtrl.navigateRoot('LoginPage')
        this.storage.clear()
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
            // this.navCtrl.pop();
            // this.navCtrl.parent.select(0);
            this.navCtrl.navigateRoot('ListPage')
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
  cambioTransportista(){
    this.navCtrl.navigateRoot('TransportistaPage', this.viaje.id)
  }

     
  updateSearchResults(){
    this.viaje.destino = ''
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
          console.log(prediction);
          
        });
    });
  }
  selectSearchResult(item){
    console.log(item);
    
    this.autocompleteItems = []
    this.viaje.destino = item.description
    this.autocomplete.input = item.description
    
  }

  ngOnInit() {
  }

}
