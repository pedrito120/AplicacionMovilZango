import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { ConeccionService } from 'src/app/services/coneccion.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  datos: any = [];
  constructor(private router: Router, private empresaService: ConeccionService, private navCtrl: NavController) {
    this.empresaService.obtenerEmpresas().subscribe((res) => {
      this.datos = res;
    });
  }

  empresa(id: number) {
    this.empresaService.obtenerDatosEmpres(id).subscribe((res:any)=>{
      console.log(res)
      if(typeof (res.reportesPdf) !== 'undefined' ){
           this.router.navigateByUrl('graficas/' + id);
      }else{
        alert('No existen datos');
      }
    })
  }
  verEmpresas() {
    console.log(this.empresaService.obtenerEmpresas())
  }


  ngOnInit() {
  }

}
