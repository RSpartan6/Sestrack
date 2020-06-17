import { ViajesTerminadosPage } from './../viajes-terminados/viajes-terminados.page';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
// import { NavController, NavParams, ModalController, AlertController, FabContainer, App } from '@ionic/angular';
import { NavController, NavParams, ModalController, AlertController, } from '@ionic/angular';

import { ComentariosPage } from '../comentarios/comentarios.page';
import { MonitoresPage } from '../monitores/monitores.page'
import { ViajesModificarPage } from '../viajes-modificar/viajes-modificar.page'
import { GoogleMaps, GoogleMapOptions, GoogleMapsEvent } from '@ionic-native/google-maps';
import { Storage } from '@ionic/storage';
import { TransportistaPage } from '../transportista/transportista.page';
import { LoaderDirective } from "../../directives/loader.directive";
import { ViajesService } from '../../services/viajes/viajes.service';
import { LoginPage } from '../login/login.page';
import { GastosPage } from '../gastos/gastos.page';

declare var google;

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;

  viaje

  arrayGastos = []
  arrayComentarios = []
  token
  usuario
  hora = ''
  monitor = null;
  cancelaViaje = false;

  constructor(
    // public appCtrl: App,
    public navCtrl: NavController, 
    private alertCtrl : AlertController,
    public navParams: NavParams,
    private storage: Storage,
    private loader: LoaderDirective,
    private viajesProvider: ViajesService,
    public modalCtrl: ModalController) {

      this.viaje = this.navParams.get('viaje');
      if (this.navParams.get('monitor')) {
        this.monitor = this.navParams.get('monitor')
      }
      if ( this.viaje.horaInicioViaje) {
        // this.hora = String(this.viaje.horaInicioViaje).slice(0,2)+':'+String(this.viaje.horaInicioViaje).slice(2,4)+':'+String(this.viaje.horaInicioViaje).slice(4,6)
        this.hora = this.viaje.horaInicioViaje
      }
      this.storage.get('userData').then((user) => {
        this.usuario = user;
        console.log(this.usuario);

        if (this.viaje.estatusViaje=='INICIADO' && this.usuario.idRol==5) {
          this.cancelaViaje= true;
        } else {
          this.cancelaViaje = false;
        }

      })

      this.viaje.coordenadasViaje.forEach(coord => {
        let point = {
          lat: coord.lat,
          lng: coord.lon
        }
        this.coordinates.push(point)
      });
     
  }

  ngOnInit() {
  }

  engine = 0;
  checkEngine(){
    if (this.viaje.transporte.kmTotal < (parseFloat(this.viaje.transporte.noKmServicio)*0.6)) {
      this.engine = 0
    }else
    if(this.viaje.transporte.kmTotal > (parseFloat(this.viaje.transporte.noKmServicio)*0.6) && this.viaje.transporte.kmTotal < this.viaje.transporte.noKmServicio){
      this.engine = 1;
    }else{
      this.engine = 2
    }
  }
  
  // async cerrarViaje(fab: FabContainer){
    async cerrarViaje(){



      let alert = await this.alertCtrl.create({
        header: 'Confirmación',
        message: '¿Estás seguro de que deseas cerrar el viaje?',
        
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
              // fab.close();
            }
          },
          {
            text: 'Aceptar',
            handler: () => {
             this.mandarCerrar()

              // fab.close();
            }
          }
        ]
      });
      alert.present();
    
  }

  async modalCorreoTemp(){
    // if (fab) {
    //   fab.close();
    // }
    let alert = await this.alertCtrl.create({
      header: '¿Deseas enviar correo con reporte de temperatura?',
      message: 'Si es así ingresar correo de destinatario',
      inputs: [
        {
          name: 'mail',
          placeholder: 'Email',
          type: 'email',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            if(data.mail == "") {
              this.showAlert("Email requerido");
              } else {
                if (data.mail.includes('.')&&data.mail.includes('@')) {
                  this.correoTemp(data.mail)

                }else{
                  this.showAlert("Email no es valido");
                  return false

                }
              }
          }
        }
      ]
    });
    alert.present();
  
  }

  correoTemp(mail){
    this.loader.presentLoader2()
    this.viajesProvider.enviarReporteCorreo(mail,this.viaje.id).subscribe(data =>{
      this.loader.dismissLoader()
      this.showAlert('Se envió el reporte de temperaturas al correo ' + mail)
      // if (data.message == 'OK') {
      //   this.navCtrl.pop();
      //   // this.showAlert('Viaje cerrado')
      //   this.modalCorreoTemp()
      // }else{
      //   this.showAlert('Ocurrió un error al cerrar el viaje')
      // }
      
    }, err =>{
      this.loader.dismissLoader()
      this.showAlert(err.error.message)
      if (err.error.status == 401) {
        this.navCtrl.navigateRoot('LoginPage')
        this.storage.clear()
      }

    })
  }

  mandarCerrar(){
    this.loader.presentLoader2()
    this.viajesProvider.cerrarViaje(this.viaje.id).subscribe(data =>{
      this.loader.dismissLoader()
      if (data.message == 'OK') {
        this.navCtrl.pop();
        // this.showAlert('Viaje cerrado')


        // Se le quito el null dentro de modal Correo Temp
        this.modalCorreoTemp()
      }else{
        this.showAlert('Ocurrió un error al cerrar el viaje')
      }
      
    }, err =>{
      this.loader.dismissLoader()
      this.showAlert(err.error.message)
      if (err.error.status == 401) {
        this.navCtrl.navigateRoot('LoginPage')
        this.storage.clear()
      }

    })
  }
  modificar(){
    this.navCtrl.navigateRoot('ViajesModificarPage', (this.viaje))
  }
  ionViewDidLoad() {
    setTimeout(() => {    
      this.loadMap(); 
    }, 300);
  }

  ionViewWillEnter(){
    
    this.storage.get('token').then((value) => {
      this.token = value;
    }) 
    
  }
  loadMap() {
    let center 
    if (this.viaje.coordenadasViaje.length>1) {
      center = Math.round(this.viaje.coordenadasViaje.length/2);

    }else{
      center = 0

    }
    
    let coordinates = this.coordinates;
    let lat = 19.390519
    let lon = -99.4238179
    if (this.viaje.coordenadasViaje.length>0) {
      lat = this.viaje.coordenadasViaje[center].lat
      lon = this.viaje.coordenadasViaje[center].lon
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

coordinates = [];



  arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
 
  comentarios(){
    this.navCtrl.navigateRoot('ComentariosPage', this.viaje.id);
   
  }

  gastos(){
    this.navCtrl.navigateRoot('GastosPage', this.viaje.id);
  }

  monitores(){
    // this.navCtrl.setRoot(ListPage)
    this.navCtrl.navigateRoot('MonitoresPage', this.viaje)
  }

  async showAlert(msj) {
    const alert = await this.alertCtrl.create({
      subHeader: msj,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  cambioTransportista(){
    // fab.close();
    this.navCtrl.navigateRoot('TransportistaPage',  this.viaje.id)
  }

 async  cancelarViaje(){
    // fab.close();
    
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
    this.loader.presentLoader2();
    this.viajesProvider.cancelarViaje(this.viaje.id).subscribe(data=>{
      this.loader.dismissLoader();
      if (data.message == 'OK') {
        this.navCtrl.pop();

        this.showAlert('Viaje cancelado');
      }else{
        this.showAlert('Ocurrió un error al cancelar el viaje');
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
  
  async finalizarViaje() {
    let alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas finalizar el viaje?',
      
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {

            this.loader.presentLoader2()
            this.viajesProvider.finalizaViaje(this.viaje.id, this.token).subscribe( data =>{
              this.showAlert(data.message)
              this.loader.dismissLoader()
              this.navCtrl.navigateRoot('ViajesTerminadosPage')
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
        }
      ]
    });
    alert.present();
  }

}
