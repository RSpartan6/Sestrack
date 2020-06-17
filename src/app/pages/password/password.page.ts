import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { LoginPage } from '../login/login.page'
import { NgForm } from '@angular/forms';
import { LoaderDirective } from "../../directives/loader.directive";
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  mail
  submitted = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loader: LoaderDirective,
    private loginService: LoginService, 
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
  }

  onSubmit(form: NgForm) {
    
    this.loader.presentLoader2()
    this.submitted = true;
    if (form.valid) { 
        this.loginService.password(this.mail).subscribe(
          data => {
            this.loader.dismissLoader()
            this.showAlert(data.message)
            this.onLogin()
          },
          err => {
            this.clearForm();
            this.loader.dismissLoader()
            this.showAlert(err.error.message);
              console.log(err.error)
          }
        );    
    }
  }
  clearForm(){
    this.mail = ''
  }
  async showAlert(msj) {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      subHeader: msj,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  onLogin(){
    this.navCtrl.navigateRoot('/LoginPage')
  }


  ngOnInit() {
  }

}
