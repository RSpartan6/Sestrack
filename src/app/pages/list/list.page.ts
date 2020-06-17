import { Component, OnInit} from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ViajesPendientesPage } from '../viajes-pendientes/viajes-pendientes.page';
import { ViajesTerminadosPage } from '../viajes-terminados/viajes-terminados.page';
import { ViajesService } from '../../services/viajes/viajes.service'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  // @ViewChild('myTabs') tabRef: Tabs;

  chatRoot2 = ViajesPendientesPage;
  chatRoot1 = ViajesTerminadosPage;

  constructor(public navCtrl: NavController,
    private viajesProvider: ViajesService,
    private storage: Storage,
    public navParams: NavParams) {
      if (this.navParams.get('reload')) {
        this.getUsuario()
      }
      this.index = 0
      this.getUsuario() 
  }

  index = 1
  getUsuario(){
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
  usuario
  token
  viajes = 0;

  ionViewWillEnter(){

    if (this.usuario) {
      
      this.getViajes()

    }
  }

  ionViewCanEnter(){
    this.ionViewWillEnter()

}
ionViewCanLeave(){
    this.ionViewWillEnter()

}
ionViewDidEnter(){
    this.ionViewWillEnter()

}
ionViewDidLeave(){
    this.ionViewWillEnter()

}
ionViewDidLoad(){
    this.ionViewWillEnter()

}
ionViewWillLeave(){
    this.ionViewWillEnter()

}
ionViewWillUnload(){
    this.ionViewWillEnter()

}
// tabChange(tab: Tab){
//  console.log(tab);
 
//  this.ionViewWillEnter()
// }

tabChange(){
    
  this.ionViewWillEnter()
 }

getViajes(){
 this.index = 0
 this.viajesProvider.viajesPendientes(this.usuario.idEmpresa,this.token).subscribe(
   data => {

     if (data && data.message == 'OK') {
      
       this.viajes = data.object.length;
       
     }else{
       this.viajes = 0

     }
   },
   err => {
     this.viajes = 0
       console.log(err)
   }
 );
}   



  ngOnInit() {
  }

}
