import { Directive } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Directive({
  selector: '[appLoader]'
})
export class LoaderDirective {

  constructor(private loadingCtrl: LoadingController) {
    
  }
  loading;
  // presentLoader(){
  //   this.loading = this.loadingCtrl.create({
  //     spinner: 'circles',
  //     content: 'cargando...',
  //     duration: 5000
  //   });
  //   this.loading.present();
  // }


  // presentLoader2(){
  //   this.loading = this.loadingCtrl.create({
  //     spinner: 'circles',
  //     content: 'cargando...',
  //     duration: 500000
  //   });
  //   this.loading.present();
  // }

  dismissLoader(){
    this.loading.dismiss();
  }

  async presentLoader() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere...',
      duration: 1500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async presentLoader2() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere...',
      duration: 1500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

}
