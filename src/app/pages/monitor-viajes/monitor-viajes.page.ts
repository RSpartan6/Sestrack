import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { DetalleViajePage } from '../detalle-viaje/detalle-viaje.page';
import { ViajesService } from '../../services/viajes/viajes.service';
import { LoaderDirective } from "../../directives/loader.directive";
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-monitor-viajes',
  templateUrl: './monitor-viajes.page.html',
  styleUrls: ['./monitor-viajes.page.scss'],
})
export class MonitorViajesPage implements OnInit {

  viajeObject
  constructor(public navCtrl: NavController, 
    private loader: LoaderDirective,
    private alertCtrl: AlertController,
    private viajesProvider: ViajesService, 
    public navParams: NavParams) {
    this.viajeObject = navParams.get('viajes')
    
  }


  detalle(){
    this.navCtrl.navigateRoot('/DetalleViajePage')
  }

  showDetalle(item){
    this.loader.presentLoader2()
    this.viajesProvider.detalleViaje(item.id).subscribe(
      data => {
        this.loader.dismissLoader()

        if (data.object) {
          let viaje = data.object;

          this.navCtrl.navigateForward('DetalleViajePage', viaje)
          // this.navCtrl.navigateForward('DetalleViajePage', {'viaje':viaje,'monitor':true})


        }else{
        }
        
      },
      err => {
        this.showAlert(err.error.message)
        this.loader.dismissLoader()
          console.log(err)
          if (err.error.status == 401) {
            this.navCtrl.navigateRoot('/LoginPage')
          }
      }
    );
    
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
