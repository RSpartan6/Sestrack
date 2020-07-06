import { Injectable } from '@angular/core';
import { Platform, } from "@ionic/angular";
import { FirebaseOriginal } from '@ionic-native/firebase/ngx';


@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor
  (
    private firebase: FirebaseOriginal,
    private platform: Platform,
    
  ) {
    console.log('Hello FcmProvider Provider');  
  }
  async getToken() { 
    let token;

  if (this.platform.is('android')) {
    token = await this.firebase.getToken()
  } 

  if (this.platform.is('ios')) {
    token = await this.firebase.getToken();
    await this.firebase.grantPermission();
  } 
  
  return this.saveTokenToFirestore(token)
  }

  // Save the token to firestore
  private saveTokenToFirestore(token) {
    console.log('-------------------------------------------------------');
    
    console.log(token);
    
  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebase.onNotificationOpen()
  }
}
