import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../../services/viajes/viajes.service';
import { LoaderDirective } from "../../directives/loader.directive";
import { Storage } from '@ionic/storage';
import { NuevoGastoPage } from '../nuevo-gasto/nuevo-gasto.page';
import { LoginPage } from '../login/login.page';
import { ActionSheetController,  NavController, NavParams, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {

  viaje

  gastos =[]
  crearGasto={
    "idviaje": null,
    "idUsuario" : null
  }

  usuario;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private loader: LoaderDirective,
    private storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    private viajesProvider: ViajesService,
    public alertCtrl: AlertController) {
      this.viaje = this.navParams.get('viaje');
      this.crearGasto.idviaje = navParams.get('idViaje')
      this.getGastos(this.crearGasto.idviaje);
      this.storage.get('userData').then((user) => {
      this.usuario = user;      
      this.crearGasto.idUsuario = this.usuario.idUsuario
  })
}

  ngOnInit() {
  }

  // Obtener gastos
getGastos(id){
  this.loader.presentLoader()
  this.viajesProvider.gastos(id).subscribe(data=>{
    this.loader.dismissLoader()
    if (data.object) {
      this.gastos = data.object
    }else{
      this.gastos = []
    }
  }, error =>{
    console.log(error);
  this.loader.dismissLoader()

  })
}

// Fin obtener gastos

  ionViewDidLoad() {
    console.log('ionViewDidLoad GastosPage');
   }

  close(){
    this.navCtrl.pop()
  }

  async showAlert(msj) {
    const alert = await this.alertCtrl.create({
      subHeader: msj,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  // Direccionar modulo nuevo gasto

  // se agrego idViaje ... comprobar que este mandado el idViaje
  async nuevoGasto(idviaje){
    // Se modifico la original
    // this.navCtrl.push(NuevoGastoPage, idviaje)


   this.navCtrl.navigateRoot('NuevoGastoPage', idviaje)
  }

  // Fin rireccionar modulo nuevo gasto


  // Opciones Eliminar

  
  async menuEliminar(idGasto) {

     const actionSheet = await this.actionSheetCtrl.create({
      
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.mandarEliminar(idGasto);
            console.log('Eliminar gasto clicked');
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  // Fin opciones eliminar

  // Eliminar Gasto

  mandarEliminar(idGasto){
    this.loader.presentLoader2();
    this.viajesProvider.eliminarGasto(idGasto).subscribe(data=>{
      this.loader.dismissLoader();
      if (data.message == 'OK') {
        this.navCtrl.pop();
        this.showAlert('Gasto eliminado');
      }else{
        this.showAlert('Ocurrió un error al eliminar el gasto');
      }
    }, err=>{
      this.loader.dismissLoader()
      this.showAlert('Ocurrió un error inesperado')
      if (err.error.status == 401) {
        // 
        this.navCtrl.navigateRoot('LoginPage')
        // 
        this.storage.clear()
      }
    })
  }

  // Fin eliminar gasto

}
