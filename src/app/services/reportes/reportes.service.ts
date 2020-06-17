import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from '../base.service';
import * as firebase from '@ionic-native/firebase';

@Injectable({
  providedIn: 'root'
})

export class ReportesService {
  url = GLOBAL.url

  constructor(public http: HttpClient) {
    console.log('Hello ReportesProvider Provider');
  }
  getToken(){
    firebase.Firebase.getToken().then(token => {
      console.log(token);
      
    });
  }
  
}