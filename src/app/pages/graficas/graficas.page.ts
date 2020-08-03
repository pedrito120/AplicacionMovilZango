import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Router, ActivatedRoute } from '@angular/router';
import { ConeccionService } from 'src/app/services/coneccion.service';
import { NavController } from '@ionic/angular';
import { database } from 'firebase';
@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.page.html',
  styleUrls: ['./graficas.page.scss'],
})
export class GraficasPage implements OnInit {
  datos: any[] = [];
  datos2: any[] = [];
  datos1: any[] = [];
  datos12: any[] = [];
  interiores: any;
  exteriores: any;
  id: any;
  @ViewChild('barChart', { static: true }) barChart;
  @ViewChild('barChart2', { static: true }) barChart2;
  bars: any;
  bars2: any;
  dato: any;
  nombre="";
  constructor(private router: Router, private empresaService: ConeccionService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');

    this.empresaService.obtenerReportesPdf(this.id).subscribe((res: any) => {
      console.log(res);
      this.fechas(res);
    });
    this.empresaService.obtenerDatosEmpresa(this.id).subscribe((res)=>{
      this.dato=res;
      this.nombre=this.dato.nombre.toUpperCase();
      console.log(this.dato)
    })
  }
  fechas(data: any) {
    let acu = '0000-00-00';
    let noReporte = 0;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const datas = data[key];
        if (typeof (datas.interior) !== 'undefined' && typeof (datas.exterior)
          !== 'undefined' && typeof (datas.portada) !== 'undefined' && typeof (datas.lamparas) !== 'undefined') {
          if (acu <= datas.portada.fecha) {
            acu = datas.portada.fecha;
            noReporte = datas.portada.noReporte;
          }
        } else {
          console.error('no hay datos');
        }
      }
    }
    console.log(acu);
    this.empresaService.graficas(this.id, noReporte).subscribe((res: any) => {
      console.log(res);
      this.interiores = res.interior;
      this.exteriores = res.exterior;
      console.log(this.interiores, this.exteriores);
      this.ionViewDidEnter(this.interiores, this.exteriores);
    });
  }

  ionViewDidEnter(data, data2) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const datas = data[key];
        this.datos.push(datas.trampa + 1);
        this.datos2.push(datas.noAnimal);
      }
    }
    for (const key in data2) {
      if (data2.hasOwnProperty(key)) {
        const datas = data2[key];
        this.datos1.push(datas.trampa + 1);
        this.datos12.push(datas.noAnimal);
        console.log(datas.noAnimal)
      }
    }

    this.GraficaInteriores(this.datos, this.datos2);
    this.GraficaExteriores(this.datos1, this.datos12);
  }

  ngOnInit() {
  }

  GraficaInteriores(trampas, observaciones) {
    let label = ['1', '2', '3', '4', '5', '6', '7', '8'];
    let datas = [2, 0, 5, 11, 0, 3, 0, 1];
    if (trampas != 0) {
      label = trampas;
    }
    if (observaciones != 0) {
      datas = observaciones;
    }
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: label,
        datasets: [{
          label: 'Consumo de Trampas Interiores',
          data: datas,
          backgroundColor: 'rgba(0,187,100)'
        }]
      },
    });
  }

  GraficaExteriores(trampas, observaciones) {
    let label = ['1', '2', '3', '4', '5', '6', '7', '8'];
    let datas = [2, 0, 5, 11, 0, 3, 0, 1];
    if (trampas != 0) {
      label = trampas;
    }
    if (observaciones.length != 0) {
      datas = observaciones;
    }
    this.bars2 = new Chart(this.barChart2.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: label,
        datasets: [{
          label: 'Consumo de Trampas Exteriores',
          data: datas,
          backgroundColor: 'rgba(0,187,100)'
        }]
      },
    });
  }
}
