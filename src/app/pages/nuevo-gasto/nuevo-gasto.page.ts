import { Component, OnInit } from '@angular/core';

import { NavController, NavParams, AlertController } from '@ionic/angular';
import { LoaderDirective } from "../../directives/loader.directive";
import { ViajesService } from '../../services/viajes/viajes.service';
import { LoginPage } from '../login/login.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-nuevo-gasto',
  templateUrl: './nuevo-gasto.page.html',
  styleUrls: ['./nuevo-gasto.page.scss'],
})
export class NuevoGastoPage implements OnInit {

  gastos =[]
  nuevo = {
    
    "tipoGasto" : "",
    "descripcion" : "",
    "monto" : "",
    "fecha" : "",
    "idViaje" : "343"
  }
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loader: LoaderDirective,
    private service: ViajesService,
    public alertCtrl: AlertController,
    private storage: Storage) {
      // this.nuevo.idViaje = navParams.get('idViaje')   
  }

  nuevoGasto(){
    this.nuevo = {
      "idViaje" : this.nuevo.idViaje,
      "tipoGasto" : this.nuevo.tipoGasto,
      "descripcion" : this.nuevo.descripcion,
      "monto" : this.nuevo.monto,
      "fecha" : this.nuevo.fecha
    }
    this.service.crearGasto(this.nuevo).subscribe( data =>{
      this.loader.dismissLoader()
      if (data.message == 'OK'){
        this.showAlert('Gasto agregado correctamente')
        this.navCtrl.pop();
      }
      // Alerta con mensaje predeterminado = OK
      // this.showAlert(data.message)
      
    }, err=>{
      console.log(err);
      console.log(err.error);
      this.loader.dismissLoader()
      this.showAlert("Ocurrió un error inesperado al agregar gasto")
      if (err.error.status == 401) {
        this.navCtrl.navigateRoot('LoginPage')
        this.storage.clear()
      }
      if (err.status == 409) {
        // this.showAlert("Error al ingresar a la BD")
        // this.showAlert(err.error.message);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoGastoPage');
  }


  ngOnInit() {
  }

}
