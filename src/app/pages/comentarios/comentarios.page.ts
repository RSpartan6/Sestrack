import { Component, OnInit } from "@angular/core";
// import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ViajesService } from "../../services/viajes/viajes.service";
import { LoaderDirective } from "../../directives/loader.directive";
import { Storage } from "@ionic/storage";
import {
  NavController,
  NavParams,
  ToastController,
  AlertController,
} from "@ionic/angular";

@Component({
  selector: "app-comentarios",
  templateUrl: "./comentarios.page.html",
  styleUrls: ["./comentarios.page.scss"],
})
export class ComentariosPage implements OnInit {
  comentarios = [];
  crearComentario = {
    comentario: "string",
    idUsuario: null,
    idviaje: null,
  };

  usuario;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loader: LoaderDirective,
    private storage: Storage,
    public toastCtrl: ToastController,
    private viajesProvider: ViajesService,
    public alertCtrl: AlertController
  ) {
    this.crearComentario.idviaje = navParams.get("idViaje");
    this.getComentarios(this.crearComentario.idviaje);
    this.storage.get("userData").then((user) => {
      this.usuario = user;
      this.crearComentario.idUsuario = this.usuario.idUsuario;
    });
  }

  getComentarios(id) {
    this.loader.presentLoader();
    this.viajesProvider.comentarios(id).subscribe(
      (data) => {
        this.loader.dismissLoader();
        if (data.object) {
          this.comentarios = data.object;
        } else {
          this.comentarios = [];
        }
      },
      (error) => {
        console.log(error);
        this.loader.dismissLoader();
      }
    );
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad ComentariosPage");
  }

  async AddComentario() {
    const alert = await this.alertCtrl.create({
      header: "Nuevo Comentario",
      inputs: [
        {
          type: "textarea",
          name: "title",
          placeholder: "Comentario",
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          handler: (data) => {
            console.log("Cancel clicked");
          },
        },
        {
          text: "Guardar",
          handler: (data) => {
            this.crearComentario.comentario = data.title;
            this.enviarCrear();
          },
        },
      ],
    });
    alert.present();
  }

  close() {
    this.navCtrl.pop();
  }
  enviarCrear() {
    this.loader.presentLoader2();
    this.viajesProvider.insertarComentarios(this.crearComentario).subscribe(
      (data) => {
        this.loader.dismissLoader();
        if (data.message == "OK") {
          this.getComentarios(this.crearComentario.idviaje);
        } else {
          this.showAlert("Ocurrió un error al crear el comentario");
        }
      },
      (err) => {
        this.loader.dismissLoader();
        console.log(err);
        this.showAlert("Ocurrió un error al crear el comentario");
      }
    );
  }

  async showAlert(msj) {
    const alert = await this.alertCtrl.create({
      subHeader: msj,
      buttons: ["Aceptar"],
    });
    alert.present();
  }

  ngOnInit() {}
}
