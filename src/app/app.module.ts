import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { IonicStorageModule } from '@ionic/storage';

// Paginas

import { HomePage } from "./pages/home/home.page";
// import { HomePage } from "./home/home.page";
import { ListPage } from "./pages/list/list.page";
import { LoginPage } from "./pages/login/login.page";
import { DetalleViajePage } from "./pages/detalle-viaje/detalle-viaje.page";
import { ViajesPendientesPage } from "./pages/viajes-pendientes/viajes-pendientes.page";
import { ViajesTerminadosPage } from "./pages/viajes-terminados/viajes-terminados.page";
import { ViajesNuevoPage } from "./pages/viajes-nuevo/viajes-nuevo.page";
import { ComentariosPage } from "./pages/comentarios/comentarios.page";
import { GastosPage } from "./pages/gastos/gastos.page";
import { NuevoGastoPage } from "./pages/nuevo-gasto/nuevo-gasto.page";
import { UbicacionPage } from "./pages/ubicacion/ubicacion.page";
import { MonitoresPage } from "./pages/monitores/monitores.page";
import { MonitorGasolinaPage } from "./pages/monitor-gasolina/monitor-gasolina.page";
import { MonitorTemperaturaPage } from "./pages/monitor-temperatura/monitor-temperatura.page";
import { MonitorTrackingPage } from "./pages/monitor-tracking/monitor-tracking.page";
import { MonitorViajesPage } from "./pages/monitor-viajes/monitor-viajes.page";
import { ReporteViajesPage } from "./pages/reporte-viajes/reporte-viajes.page";
import { MapPage } from "./pages/map/map.page";
import { PasswordPage } from "./pages/password/password.page";
import { IncidenciasPage } from "./pages/incidencias/incidencias.page";
import { MailPage } from "./pages/mail/mail.page";
import { TransportistaPage } from "./pages/transportista/transportista.page";
import { ViajesModificarPage } from "./pages/viajes-modificar/viajes-modificar.page";


// // Servicios

import { LoginService } from "./services/login/login.service";
import { ViajesService } from "./services/viajes/viajes.service";
import { MonitoresService } from "./services/monitores/monitores.service";
import { ReportesService } from "./services/reportes/reportes.service";
import { HttpClientModule } from "@angular/common/http";



import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoaderDirective } from "./directives/loader.directive";
import { GoogleMaps } from "@ionic-native/google-maps";
import { FcmService } from './services/fcm/fcm.service';
import { HomePageModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent,
    LoaderDirective,
    HomePage,
    ListPage,
    LoginPage,
    DetalleViajePage,
    ViajesPendientesPage,
    ViajesTerminadosPage,
    ComentariosPage,
    GastosPage,
    NuevoGastoPage,
    UbicacionPage,
    MonitoresPage,
    MonitorGasolinaPage,
    MonitorTemperaturaPage,
    MonitorTrackingPage,
    MonitorViajesPage,
    ReporteViajesPage,
    MapPage,
    PasswordPage,
    ViajesModificarPage,
    ViajesNuevoPage,
    TransportistaPage,
    IncidenciasPage,
    MailPage
  ],
  entryComponents: [
    
    HomePage,
    ListPage,
    LoginPage,
    DetalleViajePage,
    ViajesPendientesPage,
    ViajesTerminadosPage,
    ComentariosPage,
    GastosPage,
    NuevoGastoPage,
    UbicacionPage,
    MonitoresPage,
    MonitorGasolinaPage,
    MonitorTemperaturaPage,
    MonitorTrackingPage,
    MonitorViajesPage,
    ReporteViajesPage,
    MapPage,
    PasswordPage,
    ViajesModificarPage,
    ViajesNuevoPage,
    TransportistaPage,
    IncidenciasPage,
    MailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // IonicSelectableModule,    
    IonicModule.forRoot({
      backButtonText: 'Atras'
    }),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HomePageModule    

    // BrowserModule,  
    // IonicModule.forRoot(), 
    // IonicStorageModule.forRoot() , 
    // AppRoutingModule, 
    // HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    HttpClientModule,
    LoaderDirective,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LoginService,
    ViajesService,
    MonitoresService,
    ReportesService,
    FcmService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
