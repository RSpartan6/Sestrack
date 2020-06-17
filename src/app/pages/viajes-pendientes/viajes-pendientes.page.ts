import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { ViajesModificarPage } from '../viajes-modificar/viajes-modificar.page';
import { LoginPage } from '../login/login.page';
import { Storage } from '@ionic/storage';
import { LoaderDirective } from "../../directives/loader.directive";
import { ViajesService } from '../../services/viajes/viajes.service';

@Component({
  selector: 'app-viajes-pendientes',
  templateUrl: './viajes-pendientes.page.html',
  styleUrls: ['./viajes-pendientes.page.scss'],
})
export class ViajesPendientesPage implements OnInit {

  
viajes = []
usuario
token
fecha = null
fechaFin = null
  constructor(
    public navCtrl: NavController, 
    private viajesProvider: ViajesService, 
    private storage : Storage,
    private alertCtrl: AlertController,
    private loader: LoaderDirective,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    
    this.storage.get('token').then((value) => {
      
      this.token = value
      this.storage.get('userData').then((user) => {
        this.usuario = user;
        if (this.token && this.usuario) {
          this.getViajes();
        }
      })
      
    }) 
    
  }
  viajesPorFecha(filtro){
      if (filtro) {
        if (this.fecha && this.fechaFin) {
          this.getViajesFecha()
        }
      }else{
        this.fecha = null
        this.fechaFin = null
        this.getViajes()
        
      }

  }
  getViajesFecha(){    
    this.loader.presentLoader()
    this.viajesProvider.viajesPendientesF(this.fecha, this.fechaFin,this.usuario.idEmpresa, this.token).subscribe(
      data => {
        this.loader.dismissLoader()
        if (data && data.message == 'OK') {
          this.viajes = data.object;
        }else{
          this.viajes = []
          this.showAlert("No se encontraron viajes")
        }
      },
      err => {
        this.loader.dismissLoader()
        if (err.error.status == 401) {
          this.navCtrl.navigateRoot('/LoginPage')
          this.storage.clear()
        }
          console.log(err)
      }
    );
  }   
  getViajes(){
    this.loader.presentLoader()
    this.viajesProvider.viajesPendientes(this.usuario.idEmpresa, this.token).subscribe(
          // this.viajesProvider.viajes(this.usuario.nombreUsuario, this.fecha, this.fechaFin, this.usuario.idEmpresa, this.token).subscribe(

      data => {
        this.loader.dismissLoader()
        if (data && data.message == 'OK') {
          this.viajes = data.object;
        }else{
          this.viajes = []
          this.showAlert("No se encontraron viajes")

        }
      },
      err => {
        this.loader.dismissLoader()
        if (err.error.status == 401) {
          this.navCtrl.navigateRoot('LoginPage')
          this.storage.clear()
        }
          console.log(err)
      }
    );
  }   
  showDetalle(item){
    // this.viajesProvider.detalleViaje(item.id).subscribe(
    //   data => {
    //     console.log(data);
    //     // console.log(data.headers.get('Authorization'));
    //     this.loader.dismissLoader()
    //     if (data.object) {
          
    //       // this.userData.login(this.login.username);
    //       // this.storage.set('UserData', data)
    //       let viaje = data.object;

          this.navCtrl.navigateRoot('ViajesModificarPage',item)

    //     }else{
    //       // this.showAlert("Credenciales no coinciden")
    //     }
    //     // this.loader.dismissLoader()
        
    //   },
    //   err => {
    //       this.loader.dismissLoader()
    //       this.showAlert(err.error.message)
    //       console.log(err)
    //       if (err.error.status == 401) {
    //         this.navCtrl.setRoot(LoginPage)
    //         this.storage.clear()
    //       }
    //   }
    // );
    
  }
  async showAlert(msj) {
    const alert = await this.alertCtrl.create({
      subHeader: msj,
      buttons:  [
        {
          text: 'Aceptar',
          handler: () => {
          }
        }
      ]
    });
    
    alert.present();
  }

  ngOnInit() {
  }

}
