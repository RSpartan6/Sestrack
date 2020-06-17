import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { LoaderDirective } from "../../directives/loader.directive";
import { ViajesService } from '../../services/viajes/viajes.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-transportista',
  templateUrl: './transportista.page.html',
  styleUrls: ['./transportista.page.scss'],
})
export class TransportistaPage implements OnInit {

  
  ports =[];
  port;
  idViaje
  transportista
  transportistas = []
  constructor(public navCtrl: NavController, 
    private service: ViajesService, 
    private loader: LoaderDirective,
    private storage: Storage,
    private alertCtrl: AlertController, public navParams: NavParams) {
    this.idViaje = navParams.get('idViaje')
    this.ports = [
      { id: 1, name: 'Tokai' },
      { id: 2, name: 'Vladivostok' },
      { id: 3, name: 'Navlakhi' }
    ];
  }
  usuario
  ionViewDidLoad() {
    this.storage.get('userData').then((user) => {
      this.usuario = user;
      if (this.usuario) {
        this.getUsuarios()
      }
    })
    
  }
  getUsuarios(){
    this.service.usuarios(this.usuario.idEmpresa).subscribe(data=>{
     
      data.object.forEach(element => {
        if (element.idRol == 2) {
          this.transportistas.push(element)
        }
      });
      
    }, err=>{
      this.transportistas = []
    })
  }
  portChange(ev){
    console.log(this.transportista);
    
    
  }
 async cambiar(){
    let alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas cambiar el transportista?',
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
            this.cambiarTransp()
          }
        }
      ]
    });
    alert.present();
  
    
  }
  cambiarTransp(){
    this.loader.presentLoader2()
    this.service.cambiarTransportista(this.transportista.idUsuario, this.idViaje).subscribe(data=>{
      this.loader.dismissLoader()
      if (data && data.message == 'OK') {
        this.showAlert("Se ha cambiado el Transportista correctamente")
      }else{
        this.showAlert("No es posible cambiar el transportista")
      }
      this.navCtrl.pop();
    }, err =>{
      this.loader.dismissLoader()
      this.showAlert("Ocurrió un error inesperado")
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

  ngOnInit() {
  }

}
