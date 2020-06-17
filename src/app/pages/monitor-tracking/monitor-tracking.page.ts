import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { ListPage } from '../list/list.page';

@Component({
  selector: 'app-monitor-tracking',
  templateUrl: './monitor-tracking.page.html',
  styleUrls: ['./monitor-tracking.page.scss'],
})
export class MonitorTrackingPage implements OnInit {

  mensaje = ''
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController ) {
    this.mensaje = navParams.get('mensaje')
    this.showAlert(this.mensaje)
  }

  ionViewDidLoad() {
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
