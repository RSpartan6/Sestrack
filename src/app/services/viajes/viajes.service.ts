import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL, token } from '../base.service';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  url = GLOBAL.url+'truckapi/'
  httpHeaders;
  options

  constructor(
    public http: HttpClient,
    private storage: Storage) {    
  }


  carrocerias(): Observable<any> {
    return this.http.get(this.url + 'carrocerias', this.options).pipe()
  }
  transportes(): Observable<any> {
    return this.http.get(this.url + 'transporte', this.options).pipe()
  }
  aperturas(id): Observable<any> {
    return this.http.get(this.url + 'viajes/apertura-puertas?idViaje='+id, this.options).pipe()
  }

  pdf(id): Observable<any>{
   
    const options: {
      headers?: HttpHeaders,
      observe?: 'body',
      params?: HttpParams,
      reportProgress?: boolean,
      responseType: 'text',
      withCredentials?: boolean
  } = {
      headers: this.httpHeaders,
      responseType: 'text'
  };
    return this.http.get(this.url + 'reportes/temperaturas?idViaje='+id, options).pipe()

  }
  temperaturas(idV, param): Observable<any> {
    return this.http.get(this.url + 'viajes/temperatura?idViaje=' + idV + '&rango=' + param, this.options).pipe()
  }
  diesel(idV): Observable<any> {
    return this.http.get(this.url + 'viajes/monitor-diesel?idViaje=' + idV, this.options).pipe()
  }
  clientes(): Observable <any>{
    return this.http.get(this.url + 'clientes', this.options).pipe()
  }
  usuarios(id): Observable <any>{
    return this.http.get(this.url + 'usuarios/transportistas?idEmpresa='+id, this.options).pipe()
  }

  viajes(usuario, fechaInicio,fechaFin, empresa, token): Observable <any>{
    this.httpHeaders = new HttpHeaders()
    .set('Authorization', token)
    this.options = {
      headers: this.httpHeaders,
    }
    if (fechaInicio && fechaFin) {
      let today = new Date()
      let ffin = (today.toISOString().substring(0, 10));
      return this.http.get(this.url + 'viajes/por-usuario?nombreUsuario='+usuario+'&fechaInicio='+fechaInicio+'&fechaFin='+fechaFin+'&empresaId='+empresa, this.options).pipe()
    }else{
      return this.http.get(this.url + 'viajes/por-usuario?nombreUsuario='+usuario+'&empresaId='+empresa, this.options).pipe()
    }
  }
  viajesMonitor(inicio, fin, empresa,token): Observable <any>{
    this.httpHeaders = new HttpHeaders()
    .set('Authorization', token)
    this.options = {
      headers: this.httpHeaders
    }
    
    return this.http.get(this.url + 'viajes/monitor-viajes?fFin='+fin+'&fInicio='+inicio+'&empresaId='+empresa, this.options).pipe()

  }
  viajesPendientes(empresa,token): Observable <any>{
    if (token) {
      this.httpHeaders = new HttpHeaders()
      .set('Authorization', token)
      this.options = {
        headers: this.httpHeaders
      }
    }
    
    return this.http.get(this.url + 'viajes/pendientes-completar?empresaId='+empresa, this.options).pipe()
  }
  viajesPendientesF(fechaInicio,fechaFin, empresa, token): Observable <any>{
    this.httpHeaders = new HttpHeaders()
    .set('Authorization', token)
    this.options = {
      headers: this.httpHeaders,
    }
    console.log("service");
    
    if (fechaInicio && fechaFin) {
      let today = new Date()
      let ffin = (today.toISOString().substring(0, 10));
      return this.http.get(this.url + 'viajes/pendientes-completar/filtrados?fInicio='+fechaInicio+'&fFin='+fechaFin, this.options).pipe()
    }else{
      return this.http.get(this.url + 'viajes/pendientes-completar?empresaId='+empresa, this.options).pipe()
    }
  }
  
  detalleViaje(id): Observable <any>{
    return this.http.get(this.url + 'viajes/'+id, this.options).pipe()
  }
  incidencias(empresa, dias, usuario): Observable <any>{
    return this.http.get(this.url + 'incidencias?empresaId='+empresa+'&rangoDias='+dias+'&usuarioId='+usuario, this.options)
  }
  incidenciasMarcar(id): Observable <any>{
    return this.http.post(this.url + 'incidencias/'+id, null,  this.options)
  }
  incidenciasTkn(empresa,leidas, dias, usuario, token): Observable <any>{
    console.log('-------------------------------------', token);
    
    this.httpHeaders = new HttpHeaders()
    .set('Authorization', token)
    this.options = {
      headers: this.httpHeaders,
    }
    return this.http.get(this.url + 'incidencias?empresaId='+empresa+'&leidas='+leidas+'&rangoDias='+dias+'&usuarioId='+usuario, this.options)
  }
  incidenciasTknLeidas(empresa, dias, usuario, token): Observable <any>{
    console.log('-------------------------------------', token);
    
    this.httpHeaders = new HttpHeaders()
    .set('Authorization', token)
    this.options = {
      headers: this.httpHeaders,
    }
    return this.http.get(this.url + 'incidencias?empresaId='+empresa+'&leidas='+'&rangoDias='+dias+'&usuarioId='+usuario, this.options)
  }

  // Comentarios

  comentarios(id): Observable <any>{
    return this.http.get(this.url + 'comentarios/buscar-por?id_viaje='+id, this.options).pipe()
  }

  //Fin comentarios

  // Insertar comentarios

  insertarComentarios(comentario): Observable <any>{
    return this.http.post(this.url + 'comentarios', comentario, this.options)
    .pipe() 
  }
  // Fin insertar comentarios

  // Gastos

  gastos(id): Observable <any>{
    return this.http.get(this.url + 'gastos/?idViaje='+id, this.options).pipe()
  }

  // Fin gastos

  // Insertar Gastos

  insertarGastos(gastos): Observable <any>{
    return this.http.post(this.url + 'gastos', gastos, this.options)
    .pipe()
  }

  // Fin insertar Gastos


  // Eliminar gasto

  eliminarGasto(idGasto): Observable <any>{
    return this.http.delete(this.url + 'gastos/'+idGasto, this.options)
    .pipe()  
  }

  // Fin eliminar gasto

  // Crear Gasto

  crearGasto(viaje): Observable <any>{
    return this.http.post(this.url + 'gastos', viaje, this.options)
    .pipe()
  }

  // Fin Crear Gasto

  completarViaje(viaje): Observable <any>{
    return this.http.put(this.url + 'viajes/completar', viaje, this.options)
    .pipe()
  }

  crearViaje(viaje): Observable <any>{
    return this.http.post(this.url + 'viajes/crear', viaje, this.options)
    .pipe()
  }
 
  cerrarViaje(id): Observable <any>{
    return this.http.put(this.url + 'viajes/cerrar/'+id,id, this.options)
    .pipe()  
  }

  finalizaViaje(id, token): Observable <any>{
    console.log('-------------------------------------', token);
    
    this.httpHeaders = new HttpHeaders()
    .set('Authorization', token)
    this.options = {
      headers: this.httpHeaders,
    }
    return this.http.put(this.url + 'viajes/finalizar/'+id,null, this.options)
    .pipe()
  }

  cambiarTransportista(idT, idV): Observable <any>{
    let body = {
      'idTransportista' : idT
    }
    return this.http.put(this.url + 'viajes/cambiar-transportista/'+idV, idT,this.options).pipe()
 
  }
  cancelarViaje(id): Observable <any>{
    return this.http.delete(this.url + 'viajes?idViaje='+id, this.options)
    .pipe()  
  }
  enviarReporteCorreo(mail, id): Observable <any>{
    return this.http.post(this.url + 'reportes/temperatura/enviar-email?correoDestino='+mail+'&idViaje='+id,null, this.options)
  }
  enviarCorreo(asunto,mail,cuerpo): Observable <any>{
    return this.http.post(this.url + 'reportes/nuevo-email?asunto='+asunto+'&correoDestino='+mail+'&cuerpo='+cuerpo,null, this.options)
    
  }

}
