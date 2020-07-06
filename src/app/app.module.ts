import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Agregados

// Servicios
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login/login.service';
import { MonitoresService } from './services/monitores/monitores.service';
import { ReportesService } from './services/reportes/reportes.service';
import { ViajesService } from './services/viajes/viajes.service';
import { LoaderDirective } from './directives/loader.directive';
import { FCM } from '@ionic-native/fcm/ngx';

// import { GoogleMap } from '@ionic-native/google-maps';




@NgModule({
  declarations: [AppComponent,LoaderDirective],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot(), HttpClientModule,FCM  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
    LoginService,
    MonitoresService,
    ReportesService,
    ViajesService  
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}