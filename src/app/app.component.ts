import { Component, ViewChild } from "@angular/core";

// import { Platform, Nav } from '@ionic/angular';
import { Platform, NavController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ReporteViajesPage } from "./pages/reporte-viajes/reporte-viajes.page";
import { LoginPage } from "./pages/login/login.page";
import { Storage } from "@ionic/storage";
import { ViajesTerminadosPage } from "./pages/viajes-terminados/viajes-terminados.page";
import { ViajesPendientesPage } from "./pages/viajes-pendientes/viajes-pendientes.page";
import { IncidenciasPage } from "./pages/incidencias/incidencias.page";
import { FCM } from "@ionic-native/fcm";
import { LoginService } from "./services/login/login.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  @ViewChild(NavController) nav: NavController;

  rootPage: any = ReporteViajesPage;

  pages: Array<{ title: string; component: any }>;

  logged = false;
  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private service: LoginService,
    private fcm: FCM
  ) {
    this.splashScreen.show();

    this.storage.get("userData").then((hasLoggedIn) => {
      console.log(hasLoggedIn);
      if (hasLoggedIn) {
        this.logged = true;
        this.fcm.onTokenRefresh().subscribe((token) => {
          this.refreshToken(token, hasLoggedIn.username);
        });
        if (hasLoggedIn.idRol == 1) {
          this.rootPage = ViajesPendientesPage;
          // this.pages[0].component = ViajesTerminadosPage
          this.pages = [
            { title: "Viajes", component: ViajesPendientesPage },
            { title: "Incidencias", component: IncidenciasPage },
            //{ title: 'Correo Emergencia', component: MailPage },
            { title: "Cerrar Sesión", component: LoginPage },
          ];
        } else if (hasLoggedIn.idRol == 2) {
          this.rootPage = ViajesTerminadosPage;
          // this.pages[0].component = ViajesTerminadosPage
          this.pages = [
            { title: "Viajes", component: ViajesTerminadosPage },
            { title: "Incidencias", component: IncidenciasPage },
            //{ title: 'Correo Emergencia', component: MailPage },

            { title: "Cerrar Sesión", component: LoginPage },
          ];
        } else if (hasLoggedIn.idRol == 3) {
          this.rootPage = ViajesTerminadosPage;
          this.pages = [
            { title: "Viajes", component: ViajesTerminadosPage },
            { title: "Reporte", component: ReporteViajesPage },
            { title: "Incidencias", component: IncidenciasPage },
            //{ title: 'Correo Emergencia', component: MailPage },

            { title: "Cerrar Sesión", component: LoginPage },
          ];
          //  this.pages[0].component = ViajesTerminadosPage
        } else if (hasLoggedIn.idRol == 5) {
          this.rootPage = ViajesTerminadosPage;

          this.pages = [
            { title: "Viajes", component: ViajesTerminadosPage },
            { title: "Reporte", component: ReporteViajesPage },
            //{ title: 'Correo Emergencia', component: MailPage },

            { title: "Cerrar Sesión", component: LoginPage },
          ];
          //  this.pages[0].component = ReporteViajesPage
        }
        // this.rootPage = ViajesTerminadosPage;
        console.log(this.pages);
      } else {
        this.rootPage = LoginPage;
        this.logged = false;
      }
      this.initializeApp();
    });
  }

  refreshToken(token, user) {
    let notifications = {
      nameSystem: "AppMonitoreo",
      user: user,
      token: token,
    };
    this.service.update(notifications).subscribe((data) => {
      console.log(data);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      if (this.platform.is("android")) {
        this.statusBar.styleLightContent();
      }
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.title == "Cerrar Sesión") {
      this.storage.clear();
      this.rootPage = LoginPage;
      this.logged = false;
    } else {
      this.storage.get("userData").then((usuario) => {
        this.service
          .disenroll(usuario.nombreUsuario, "AppMonitoreo")
          .subscribe((data) => {});
      });
      this.nav.navigateRoot(page.component);
    }
  }

  menu() {
    this.storage.get("userData").then((hasLoggedIn) => {
      if (hasLoggedIn) {
        this.logged = true;

        if (hasLoggedIn.idRol == 1) {
          this.rootPage = ViajesPendientesPage;
          // this.pages[0].component = ViajesTerminadosPage
          this.pages = [
            { title: "Viajes", component: ViajesPendientesPage },
            { title: "Incidencias", component: IncidenciasPage },
            //{ title: 'Correo Emergencia', component: MailPage },

            { title: "Cerrar Sesión", component: LoginPage },
          ];
        } else if (hasLoggedIn.idRol == 2) {
          this.rootPage = ViajesTerminadosPage;
          this.pages = [
            { title: "Viajes", component: ViajesTerminadosPage },
            { title: "Incidencias", component: IncidenciasPage },
            //{ title: 'Correo Emergencia', component: MailPage },

            { title: "Cerrar Sesión", component: LoginPage },
          ];
        } else if (hasLoggedIn.idRol == 3) {
          this.rootPage = ViajesTerminadosPage;
          this.pages = [
            { title: "Viajes", component: ViajesTerminadosPage },
            { title: "Reporte", component: ReporteViajesPage },
            { title: "Incidencias", component: IncidenciasPage },
            //{ title: 'Correo Emergencia', component: MailPage },

            { title: "Cerrar Sesión", component: LoginPage },
          ];
        } else if (hasLoggedIn.idRol == 5) {
          this.rootPage = ViajesTerminadosPage;

          this.pages = [
            { title: "Viajes", component: ViajesTerminadosPage },
            { title: "Reporte", component: ReporteViajesPage },
            { title: "Incidencias", component: IncidenciasPage },
            //{ title: 'Correo Emergencia', component: MailPage },

            { title: "Cerrar Sesión", component: LoginPage },
          ];
        }
      } else {
        this.rootPage = LoginPage;
        this.logged = false;
      }
    });
  }
}
