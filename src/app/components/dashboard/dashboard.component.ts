import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Var
  teens: any[] = [];
  pastoreadores: any[] = [];
  teensTotal: { hombres: number, mujeres: number, total: number}[] = [
    {hombres:0, mujeres:0, total:0}
  ];

  myChart: any;
  chartCanvas: any = ''
  labels: any[] = [];
  data: any[]=[];

  fechaUnica: any[] = [];
  asistencias: any[] = [];
  fechasReverse: any[] = [];
  indices: number = 0;
  fechaLimite: {antigua: any, reciente: any, unMes: any} = {
    antigua: "",
    reciente: "",
    unMes: ""
  }
  fechas: { fecha: string, cantidad: number, mes: any, anio: any }[] = [
    {
      fecha: "",
      cantidad:0,
      mes: "",
      anio:""
    }
  ];


  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getUsuariosLimit()
    this.getAsistencias()
    this.getPastoreadores()
    this.getUsuarios()
    this.chart();
  }

  getUsuarios(){
    this._usuarioService.getUsuarios().subscribe(data => {
      this.teensTotal = [{hombres:0, mujeres:0, total:0}];
      data.forEach((element:any) => {
        this.teensTotal[0].total += 1;
        if(element.payload.doc.data()['genero'] === 'masculino'){
          this.teensTotal[0].hombres += 1;
        }else{
          this.teensTotal[0].mujeres += 1;
        }

      });
      this.donaChart()
    })
  }

  getUsuariosLimit(){
    this._usuarioService.getUsuariosLimit(10).subscribe(data => {
      this.teens = [];
      data.forEach((element:any) => {
        this.teens.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

  getPastoreadores(){
    this._usuarioService.getPastoreadores(10).subscribe(data => {
      this.pastoreadores = [];
      data.forEach((element:any) => {
        this.pastoreadores.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

  getAsistencias(){
    this._usuarioService.getAsistencias().subscribe(data => {
      this.asistencias = [];
      let idx: number = 0;
      data.forEach((element:any) => {
        if(idx != 10){
          this.asistencias.push(element.data()['fechaCreacion'])
          idx++;
        }
      });
      //this.asistenciasReverse = this.asistencias.reverse();
      this.getFechas()
      //console.log(this.asistencias)
    })
  }

  getFechas(){

    this.asistencias.forEach((dato:any) => {
      if (this.fechaUnica.indexOf(dato) === -1){
        let date = new Date(dato);
        this.fechaUnica.push(dato)
      }
    })

    this.fechaUnica.forEach((fecha:any) => {
      let idx:number = this.asistencias.indexOf(fecha);
      this.indices = 0;
      while(idx != -1){
        this.indices = this.indices + 1;
        idx = this.asistencias.indexOf(fecha, idx + 1);
      }
      let date = new Date(fecha)
      let anio: any = date.getFullYear()
      let meses = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      let mes: any = meses[date.getMonth()];
      this.fechas.unshift({
        fecha: fecha,
        cantidad: this.indices,
        mes: mes,
        anio: anio,
      });
    })


    this.fechas.pop()
    this.fechaLimite.reciente = this.fechas[this.fechas.length-1].fecha;
    this.fechaLimite.antigua = this.fechas[0].fecha;;

    this.fechasReverse = this.fechas.reverse();

    //console.log(this.fechaLimite)
    //console.log("fechas", this.fechas.reverse())
    this.filtroFecha(this.fechaLimite.antigua,this.fechaLimite.reciente)
  }

  filtroFecha(fechaAntigua:any, fechaReciente: any){
    this.labels = []
    this.data = []
    console.log(fechaAntigua, fechaReciente)
    let idx: number = 0;
    this.fechas.forEach((fecha) => {
      if(fecha.fecha >= fechaAntigua && fecha.fecha <= fechaReciente){
        this.labels.push(fecha.fecha)
        this.data.push(fecha.cantidad)
      }
    })
    this.myChart.data.labels = this.labels;
    this.myChart.data.datasets.forEach((dataset:any) => {
      dataset.data = this.data
    });
    this.myChart.update();
  }

  chart() {
    let ctx: any = document.getElementById("lineChart");
    let myChart = new Chart( ctx,
          {
        type: 'line',
        data: {
            labels: this.labels,
            datasets: [{
                label: 'Asistencia',
                data: this.data,
                tension: 0.5,
            }]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            yAxes: {
                ticks: {
                    precision: 0
                }
            }
        }
        }
      }
    );
    this.myChart = myChart;
  }

  donaChart(){
    let ctx: any = document.getElementById("donaChart");
    let myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ['Mujeres', 'Hombres'],
          datasets: [{
              data: [this.teensTotal[0].mujeres, this.teensTotal[0].hombres],
          }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
      }
    });
  }

  fechaAntiguaFunction( event:any ){
    this.filtroFecha(event.target.value, this.fechaLimite.reciente);
  }

  fechaRecienteFunction( event:any ){
    this.filtroFecha(this.fechaLimite.antigua, event.target.value);
  }

}
