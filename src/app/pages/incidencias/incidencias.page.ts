import { Component, OnInit } from "@angular/core";
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { ViajesService } from "../../services/viajes/viajes.service";
import { Storage } from "@ionic/storage";
import { LoaderDirective } from "../../directives/loader.directive";
import { MonitorTemperaturaPage } from "../monitor-temperatura/monitor-temperatura.page";
import { MonitorGasolinaPage } from "../monitor-gasolina/monitor-gasolina.page";

@Component({
  selector: "app-incidencias",
  templateUrl: "./incidencias.page.html",
  styleUrls: ["./incidencias.page.scss"],
})
export class IncidenciasPage implements OnInit {
  usuario;
  token = null;
  tipo;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private loader: LoaderDirective,
    private alertCtrl: AlertController,
    private service: ViajesService,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad IncidenciasPage");
  }

  incidentes = [];
  incidentesTodos = [];
  incidencias() {
    this.loader.presentLoader2();
    let usuario = "";
    if (this.usuario.idRol == 2) {
      usuario = this.usuario.idUsuario;
    }
    this.service
      .incidenciasTkn(this.usuario.idEmpresa, 0, 2, usuario, this.token)
      .subscribe(
        (data) => {
          console.log(data);
          this.incidentes = [];

          this.loader.dismissLoader();
          if (data && data.object) {
            data.object.forEach((element) => {
              if (element.tipoAlerta != "GPS") {
                this.incidentes.push(element);
              }
            });
          } else {
            this.showAlert("No se han encontrado Incidencias");
          }
        },
        (err) => {
          console.log(err);
          this.showAlert(err.error.message);
          this.loader.dismissLoader();
        }
      );
  }

  incidenciasLeidas() {
    this.loader.presentLoader2();
    let usuario = "";
    if (this.usuario.idRol == 2) {
      usuario = this.usuario.idUsuario;
    }
    this.service
      .incidenciasTknLeidas(this.usuario.idEmpresa, 2, usuario, this.token)
      .subscribe(
        (data) => {
          console.log(data);
          this.loader.dismissLoader();
          this.incidentesTodos = [];

          if (data && data.object) {
            data.object.forEach((element) => {
              if (element.tipoAlerta != "GPS") {
                this.incidentesTodos.push(element);
              }
            });
          } else {
            this.showAlert("No se han encontrado Incidencias");
          }
        },
        (err) => {
          console.log(err);
          this.showAlert(err.error.message);
          this.loader.dismissLoader();
        }
      );
  }

  detalle(incidente) {
    this.loader.presentLoader2();
    this.service.detalleViaje(incidente.idViaje).subscribe(
      (data) => {
        console.log(data);
        this.loader.dismissLoader();
        if (data && data.object) {
          if (incidente.tipoAlerta == "COMBUSTIBLE") {
            this.getDiesel(incidente.idViaje);
          }
          // if (incidente.tipoAlerta == "TEMPERATURA") {
          //   this.navCtrl.navigateRoot(MonitorTemperaturaPage, {
          //     temperatura: data.object,
          //     incidencia: true,
          //   });
          // }

          if (incidente.tipoAlerta == "TEMPERATURA") {
            this.navCtrl.navigateRoot('MonitorTemperaturaPage', 
              data.object,
            );
          }
        }
      },
      (err) => {
        this.loader.dismissLoader();
        console.log(err);
        this.showAlert(err.error.message);
      }
    );
  }

  marcar(row) {
    // let alert = this.alertCtrl.create({
    //   title: 'Confirmación',
    //   message: '¿Deseas marcar la incidencia como leída?',
    //   buttons: [
    //     {
    //       text: 'Cancelar',
    //       role: 'cancel',
    //       handler: () => {
    //       }
    //     },
    //     {
    //       text: 'Aceptar',
    //       handler: () => {
    this.leido(row);
    //       }
    //     }
    //   ]
    // });
    // alert.present();
  }

  leido(row) {
    // this.loader.presentLoader2()
    this.service.incidenciasMarcar(row.id).subscribe(
      (data) => {
        console.log(data);
        // this.loader.dismissLoader()
        // if (data.message == 'OK') {
        //   this.showAlert("¡La Incidencia con el id " +row.id+' fue marcada como leída!' )
        // }
        // this.incidencias()
      },
      (err) => {
        // this.loader.dismissLoader()
        console.log(err);
      }
    );
  }
  ionViewWillEnter() {
    this.storage.get("token").then((value) => {
      console.log(value);
      this.tipo = 1;
      this.token = value;
      this.storage.get("userData").then((user) => {
        this.usuario = user;
        if (this.token && this.usuario) {
          this.incidencias();
        }
      });
    });
  }

 async showAlert(msj) {
    const alert = await this.alertCtrl.create({
      subHeader: msj,
      buttons: [
        {
          text: "Aceptar",
          handler: () => {},
        },
      ],
    });

    alert.present();
  }

  getDiesel(idV) {
    this.loader.presentLoader2();
    this.service.diesel(idV).subscribe(
      (data) => {
        console.log(data);
        data.object.id = idV;
        // this.navCtrl.push(MonitorGasolinaPage, { viaje: data.object });
        this.navCtrl.navigateRoot('MonitorGasolinaPage',  data.object);

        this.loader.dismissLoader();
      },
      (err) => {
        this.loader.dismissLoader();
      }
    );
  }

  ngOnInit() {}
}
