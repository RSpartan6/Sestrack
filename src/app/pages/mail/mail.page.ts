import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "@ionic/angular";
import { User } from "../../interfaces/user";

@Component({
  selector: "app-mail",
  templateUrl: "./mail.page.html",
  styleUrls: ["./mail.page.scss"],
})
export class MailPage implements OnInit {
  asunto;
  email;
  cuerpo;
  submitted = false;
  login: User = {
    username: "",
    password: "",
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad MailPage");
  }

  ngOnInit() {}
}
