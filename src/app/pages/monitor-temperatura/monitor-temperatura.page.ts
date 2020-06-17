import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Chart } from 'chart.js';
import { ViajesService } from '../../services/viajes/viajes.service';
import { LoaderDirective } from "../../directives/loader.directive";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-monitor-temperatura',
  templateUrl: './monitor-temperatura.page.html',
  styleUrls: ['./monitor-temperatura.page.scss'],
})
export class MonitorTemperaturaPage implements OnInit {

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;


  viaje;
  labels = []
  datos = []
  colores =[
      'light',
      'light',
      'light',
      'light',
      'light',
      'light',
      'light',
      'light',
      'primary',
      'light'
  ]
  usuario

  constructor(public navCtrl: NavController, 
    private service: ViajesService, 
    private loader: LoaderDirective,
    private storage: Storage,
    public navParams: NavParams) {
      this.viaje = navParams.get('temperatura')
      this.storage.get('userData').then((user) => {
        this.usuario = user;
        if (navParams.get('incidencia')) {
            this.incidencias()
        }
      })
      
      this.getData('todo')
  }
  alertaString = null

  incidencias(){
    let usuario = '';
    if (this.usuario.idRol == 2) {
      usuario = this.usuario.idUsuario;
    }
    this.service.incidencias(this.usuario.idEmpresa, 2, usuario).subscribe(data =>{
        if (data && data.object) {
            for (let i = 0; i < data.object.length; i++) {
                if (data.object[i].idViaje == this.viaje.id) {
                    if (data.object[i].tipoAlerta == 'TEMPERATURA') {
                        this.alertaString = data.object[i].descripcion
                    }
                }
            }
                
        }
        
    }, err =>{
        console.log(err);
        
    })
  }

  getData(rango){
    this.loader.presentLoader()
  this.service.temperaturas(this.viaje.id, rango).subscribe(data=>{
      if (data && data.object) {
          this.labels = []
          this.datos = []
          this.viaje.temperaturaPromedio = Math.round(data.object.promedio * 100) / 100
          this.viaje.temperaturaMaxima = Math.round(data.object.maxima * 100) / 100
          this.viaje.temperaturaMinima = Math.round(data.object.minima* 100) / 100
          data.object.nivelesTemperatura.forEach(element => {
              this.labels.push(String(element.hora).slice(0,5))
              this.datos.push(element.temp)
          });
      }
      
      setTimeout(() => {
          this.loader.dismissLoader()
          this.chartRefresh()
      }, 300);
  })
}
clicked(posicion){
  for (let i = 0; i < this.colores.length; i++) {
      this.colores[i] = 'light';
      
  }
  this.colores[posicion] = 'primary'

}

chartRefresh(){
  Chart.defaults.global.legend.display = false;
  // Chart.defaults.scale.gridLines.display = false;

  this.lineChart = new Chart(this.lineCanvas.nativeElement, {

    type: 'line',
    data: {
        labels: this.labels,
        datasets: [
     
         
            {
                label: "Temperatura",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(129,199,222,0.4)",
                borderColor: "rgba(129,199,222,1)",
                borderCapStyle: 'butt',
                // borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(129,199,222,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(129,199,222,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 10,
                data: this.datos,
                spanGaps: true,
                showLine: true,
                legend: false
            },
            
        ],
     
    },
    options:{
        scales:{
            xAxes:[{
                gridLines:{
                    display: false
                }
            }]
        }
    }

});
}

ionViewDidLoad() {
  this.chartRefresh()
}

  ngOnInit() {
  }

}
