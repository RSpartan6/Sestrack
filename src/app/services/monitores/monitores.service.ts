import { Injectable } from '@angular/core';
import { GLOBAL } from '../base.service';


@Injectable({
  providedIn: 'root'
})
export class MonitoresService {
  url = GLOBAL.url

  constructor(
  ) {
    console.log('Hello MonitoresProvider Provider');
   }
}
