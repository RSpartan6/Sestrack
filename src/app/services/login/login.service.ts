import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from '../base.service';
import { Observable } from 'rxjs/Observable';
import { map, filter, catchError, mergeMap, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = GLOBAL.url

  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');
  }

  login(user): Observable <any>{
    console.log(user);
    let usuario = {
      "nombreUsuario": user.username,
      "contrasena": user.password
    }
    return this.http.post(GLOBAL.url+'login',JSON.stringify(usuario), {observe: 'response'})
    .pipe(
      tap(resp => console.log('heaeder', resp.headers.get('ReturnStatus')))
    );
    
  }
  enroll(json){
    console.log("enrolling");
    
    return this.http.post('http://ec2-52-14-234-67.us-east-2.compute.amazonaws.com:8080/notificaciones-push/services/enroll', json).pipe()
  }
  update(json){
    console.log("updating");
    return this.http.put('http://ec2-52-14-234-67.us-east-2.compute.amazonaws.com:8080/notificaciones-push/services/update-token', json).pipe()
  }
  disenroll(usuario, sistema){
    console.log("disenrolling");
    return this.http.delete('http://ec2-52-14-234-67.us-east-2.compute.amazonaws.com:8080/notificaciones-push/services/disenroll/'+usuario+'/'+sistema).pipe()
  }
  password(mail): Observable<any> {
    
    const params = new HttpParams().set('correo', mail);

    return this.http.post(this.url + 'truckapi/usuarios/recuperar-contrasena', null, {params}).pipe()
    
  }

}