import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Chart } from 'chart.js';
import { Storage } from '@ionic/storage';
import { ViajesService } from 'src/app/services/viajes/viajes.service';

@Component({
  selector: 'app-monitor-gasolina',
  templateUrl: './monitor-gasolina.page.html',
  styleUrls: ['./monitor-gasolina.page.scss'],
})
export class MonitorGasolinaPage implements OnInit {

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;
  viaje;

  labels = []
  datos = []
  datosTermo = []
  usuario

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private storage: Storage,
    private service: ViajesService) {
      this.viaje = navParams.get('viaje');
    // redondear
    this.viaje.litrosConsumidosTracto =  Math.round(this.viaje.litrosConsumidosTracto * 100) / 100
    this.viaje.litrosConsumidosThermo =  Math.round(this.viaje.litrosConsumidosThermo * 100) / 100
    this.viaje.litrosThermo =  Math.round(this.viaje.litrosThermo * 100) / 100
    this.viaje.litrosTracto =  Math.round(this.viaje.litrosTracto * 100) / 100
    this.viaje.valoresTracto.forEach(element => {
        this.labels.push(String(element.hora).slice(0,5))
        this.datos.push(element.nivel)
    });
    if ( this.viaje.valoresThermo) {
        this.viaje.valoresThermo.forEach(element => {
            this.datosTermo.push(element.nivel)
        });
    }
    this.storage.get('userData').then((user) => {
        this.usuario = user;
        if (navParams.get('incidencia')) {
            this.incidencias()
        }
      })
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
                    
                    if (data.object[i].tipoAlerta == 'COMBUSTIBLE') {

                        this.alertaString = data.object[i].descripcion
                    }
                }
            }
                
        }
        
    }, err =>{
        console.log(err);
        
    })
  }

  ionViewDidLoad() {
    Chart.defaults.global.legend.display = false;
    // Chart.defaults.scale.gridLines.display = false;

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
      type: 'line',
      data: {
          labels: this.labels,
          datasets: [
              {
                  label: "Diesel Tracto",
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
              {
                label: "Diesel Termo",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(129,100,222,0.4)",
                borderColor: "rgba(129,100,222,1)",
                borderCapStyle: 'butt',
                // borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(129,100,222,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(129,100,222,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 10,
                data: this.datosTermo,
                spanGaps: true,
                showLine: true,
                legend: false
            }
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

  ngOnInit() {
  }

}
