import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { User } from '../../interfaces/user';
import { MonitorViajesPage } from '../monitor-viajes/monitor-viajes.page';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login.page';
import { LoaderDirective } from "../../directives/loader.directive";
import { ViajesService } from '../../services/viajes/viajes.service';

@Component({
  selector: 'app-reporte-viajes',
  templateUrl: './reporte-viajes.page.html',
  styleUrls: ['./reporte-viajes.page.scss'],
})
export class ReporteViajesPage implements OnInit {

  inicio
  fin
  submitted = false;
  token
  usuario
  constructor(public navCtrl: NavController,
    private loader: LoaderDirective,
    private viajesProvider: ViajesService, private alertCtrl:AlertController,   private storage: Storage,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.storage.get('token').then((value) => {      
      this.token = value
      this.storage.get('userData').then((user) => {
        this.usuario = user;
     
      })
      
    }) 
  }

  buscar(){
    if (this.inicio && this.fin) {
      this.loader.presentLoader()
      this.viajesProvider.viajesMonitor(this.inicio, this.fin, this.usuario.idEmpresa, this.token).subscribe(data=>{
        if (data.message == 'OK') {
            this.navCtrl.navigateForward('MonitorViajesPage', data.object)

        } else {
          this.showAlert("No se encontraron viajes")
        }
        this.loader.dismissLoader()
      }, err =>{
        console.log(err);
        this.loader.dismissLoader()
        if (err.error.status == 401) {
          this.navCtrl.navigateRoot('LoginPage')
        }
        this.showAlert("Ocurrió un error inesperado")
      })
    }
  }
  async showAlert(msj) {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      subHeader: msj,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  ngOnInit() {
  }

}
