import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { LoaderDirective } from "../../directives/loader.directive";
import { User } from '../../interfaces/user';
import { Storage } from '@ionic/storage';
import { LoginService } from '../../services/login/login.service'
import { FCM } from '@ionic-native/fcm/ngx';
import { Route } from '@angular/compiler/src/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: User = { 
    username: '', 
    password: '' 
  };
  submitted = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage,
    private route: Route,
    private loader: LoaderDirective,
    private platform: Platform,
    private firebase:FCM,
    public alertCtrl: AlertController,
    private loginService: LoginService,
    ) {
      this.platform.ready().then(() => {
        document.addEventListener('backbutton', () => {
          
         if (!this.navCtrl.navigateRoot('path')) {
          navigator['app'].exitApp();
           return;
         }
         this.navCtrl.pop()
       }, false);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin(form: NgForm) {
    

    this.submitted = true;
    if (form.valid) {
       this.loader.presentLoader2()
      
        this.loginService.login(this.login).subscribe(
          data => {
            this.loader.dismissLoader()
            this.storage.set('token', data.headers.get('Authorization'));
            let userData = (data.headers.get('Authorization')).split('.')
            let objUsuario = (JSON.parse(atob(userData[1])));
            this.firebase.getToken().then(token => {
              console.log(token);
              this.enrolarApp(token)
            });
            this.storage.set('userData', JSON.parse(atob(userData[1])));
            if (objUsuario.idRol == 1) {
              this.navCtrl.navigateRoot('ViajesPendientesPage');

            }else if (objUsuario.idRol == 2) {
              this.navCtrl.navigateRoot('ViajesTerminadosPage');

            }else if(objUsuario.idRol == 5 || objUsuario.idRol == 3){
              this.navCtrl.navigateRoot('ViajesTerminadosPage');
            }else{
              this.showAlert("Credenciales no validas para la aplicación")
            }
          },
          err => {            
            this.loader.dismissLoader();
            this.clearForm();
            if(err.status==401){
               this.showAlert("Los datos ingresados parecen ser incorrectos, intentelo nuevamente.");
            }else if(err.status==403){
              this.showAlert("El usuario está bloqueado, favor de comunicarse con el administrador.");

            }
            else{
              this.showAlert("Ocurrió un error inesperado, verifique su conexión");
            }
          }
        );        
    }
  }

  enrolarApp(token){
    let notifications = {
      "nameSystem": "AppMonitoreo",
      "user": this.login.username,
      "token": token
    }
    this.loginService.enroll(notifications).subscribe(data =>{
      console.log(data);
      
    })
  }
  async showAlert(msj) {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      subHeader: msj,
      buttons: ['Aceptar']
    });
    alert.present();
  }
  clearForm(){
    this.login.password = '';
    this.login.username = '';
  }
  resetPassword(){
    this.navCtrl.navigateRoot('PasswordPage')
  }

  ngOnInit() {
  }

}
