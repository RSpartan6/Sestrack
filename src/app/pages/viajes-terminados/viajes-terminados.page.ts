import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from '@ionic/angular';
import { DetalleViajePage } from '../detalle-viaje/detalle-viaje.page'
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login.page';
import { ViajesNuevoPage } from '../viajes-nuevo/viajes-nuevo.page';
import { LoaderDirective } from "../../directives/loader.directive";
import { ViajesService } from '../../services/viajes/viajes.service';

@Component({
  selector: 'app-viajes-terminados',
  templateUrl: './viajes-terminados.page.html',
  styleUrls: ['./viajes-terminados.page.scss'],
})
export class ViajesTerminadosPage implements OnInit {

  
  
  // @ViewChild(Nav) nav: Nav;
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  constructor(
    public platform: Platform, 
    private navCtrl: NavController, 
    public navParams: NavParams,
    private viajesProvider: ViajesService, 
    private alertCtrl: AlertController,
    private storage: Storage,
    private loader: LoaderDirective
    // public appCtrl: App
    ) {
    this.selectedItem = navParams.get('item');
    
    
  }
 
  pushPage() {
   this.navCtrl.navigateRoot('ViajesNuevoPage'); 
  } 
 
  token = null 
  usuario
  ionViewWillEnter() {
    
    this.storage.get('token').then((value) => {
      
      this.token = value
      this.storage.get('userData').then((user) => {
        this.usuario = user; 
        if (this.token && this.usuario) {
          this.getViajes(false);
        }
      })
      
    }) 
    

  }

  viajes = [];
  

  fecha = null
  fechaFin = null
  log(){
    console.log(this.fecha);
    
  }
  getViajes(filtro){
    if (filtro) {
      if (this.fecha && this.fechaFin) {
        this.listarViajes()
      }
    }else{
      this.fecha = null
      this.fechaFin = null
      this.listarViajes()
      
    }

  }   

  showDetalle(item){
    this.loader.presentLoader()
    this.viajesProvider.detalleViaje(item.id).subscribe(
      data => {
        this.loader.dismissLoader()
        if (data.object) {
          
          let viaje = data.object;
          
          this.navCtrl.navigateRoot('DetalleViajePage', viaje)

        }else{
           this.showAlert("No se ha podido recuperar el viaje")
        }
        
      },
      err => {
        this.showAlert(err.error.message)
        this.loader.dismissLoader()
        console.log(err)
        if (err.error.status == 401) {
          this.navCtrl.navigateRoot('/LoginPage')
          this.storage.clear()
        }
      }
    );
    
  }
  listarViajes(){
    this.loader.presentLoader();
    this.viajesProvider.viajes(this.usuario.nombreUsuario, this.fecha, this.fechaFin, this.usuario.idEmpresa, this.token).subscribe(
      data => {
        this.loader.dismissLoader()
        if (data.message == 'OK') {
         
          this.viajes = data.object;
          this.viajes.forEach(element => {
            
          });
        }else{
          this.viajes = []
          this.showAlert("No se encontraron viajes dentro del rango de fechas")
        }
      },
      err => {
        this.loader.dismissLoader()

        this.viajes = []
          this.showAlert(err.error.message)
          if (err.error.status == 401) {
            this.navCtrl.navigateRoot('/LoginPage')
            this.storage.clear()
          }
          console.log(err)
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
