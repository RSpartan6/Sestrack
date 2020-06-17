import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { MonitorGasolinaPage } from '../monitor-gasolina/monitor-gasolina.page'
import { MonitorTemperaturaPage } from '../monitor-temperatura/monitor-temperatura.page'
import { HomePage } from '../home/home.page';
import { LoaderDirective } from "../../directives/loader.directive";
import { ViajesService } from '../../services/viajes/viajes.service';
import { UbicacionPage } from '../ubicacion/ubicacion.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-monitores',
  templateUrl: './monitores.page.html',
  styleUrls: ['./monitores.page.scss'],
})
export class MonitoresPage implements OnInit {

  viaje
  diesel
  temperatura = false;
  gps = false;
  gas = false;
  aperturas = false;
  cantidad;
  usuario;
  constructor(public navCtrl: NavController, 
    private loader: LoaderDirective, 
    private service: ViajesService,
    private storage: Storage, 
    public navParams: NavParams) {
    this.cantidad = 0 
    this.viaje = navParams.get('viaje');
    this.sensores();
    this.storage.get('userData').then((user) => {
      this.usuario = user;
  })
  }

  sensores(){
    if (this.viaje) {
      if (this.viaje.sensores) {
        this.viaje.sensores.forEach(sensor => {
          if (sensor.tipo == 'T') {
            this.temperatura = true
            this.cantidad = this.cantidad+1;
          }
          if (sensor.tipo == 'G') {
            this.gps = true
            this.cantidad = this.cantidad+1;
          }
          if (sensor.tipo == 'C') {
            this.gas = true
            this.cantidad = this.cantidad+1;
          }
          if (sensor.tipo == 'P') {
            this.aperturas = true
          }
          
        });
      }
    }
  }

  
  goMonitor(param){
    
    if (param == 3) {
      this.getDiesel()
    }
    if (param == 1)  {
      this.navCtrl.navigateForward('MonitorTemperaturaPage', this.viaje)
    }
    if (param == 2) {
      // this.navCtrl.navigateForward('HomePage', {'viaje': this.viaje, 'aperturas':this.aperturas})
      this.navCtrl.navigateForward('HomePage', this.viaje)


    }
    if (param == 4) {
      this.navCtrl.navigateForward('UbicacionPage', this.viaje)
    }
  }
  
  getDiesel(){
    this.loader.presentLoader2()
    this.service.diesel(this.viaje.id).subscribe(data =>{
      this.diesel = data.object
      
      this.navCtrl.navigateForward('MonitorGasolinaPage', this.diesel)

      this.loader.dismissLoader()
    }, err =>{
      this.loader.dismissLoader()
    })
  }

  ngOnInit() {
  }

}
