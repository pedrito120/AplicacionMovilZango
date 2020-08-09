import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConeccionService } from 'src/app/services/coneccion.service';


@Component({
  selector: 'app-portada',
  templateUrl: './portada.page.html',
  styleUrls: ['./portada.page.scss'],
})
export class PortadaPage implements OnInit {
  portada = {
    noReporte: null,
    inicio: Date,
    termino: Date,
    check: [],
    cantidad: [],
    ingrediente: [],
    fecha: Date,
    caducidadFrasco: '',
    actividadeRealizadas: '',
    recomendacion: '',
    sustanciaActiva: '',
    tecnico: '',
    responsable: ''
  }
  id:any;
  // check = [];
  constructor(private route: ActivatedRoute, private empresaService: ConeccionService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    for (let index = 0; index < 70; index++) {
      const array = [];
      this.portada.check.push(array[index] = false);
    }
    for (let index = 0; index < 4; index++) {
      const array = [];
      this.portada.ingrediente.push(array[index] = '');

    }
    for (let index = 0; index < 8; index++) {
      const array = [];
      this.portada.cantidad.push(array[index] = 0);

    }
  }
  // async ver() {
  //   const element = [];
  //   // for (let index = 0; index < this.check.length; index++) {
  //   //   if (this.check[index] === false) {
  //   //     element.push('[ ]');
  //   //   } else if (this.check[index] === true) {
  //   //     element.push('[X]');
  //   //   }
  //   // }
  //   console.log(this.portada, element);
  // }
  ver() {
    this.empresaService.guardarReportePdf(this.id,this.portada.noReporte, 'portada', this.portada);
    this.limpiaeDatos()
  }
limpiaeDatos(){
  this.portada = {
    noReporte: null,
    inicio: Date,
    termino: Date,
    check: [],
    cantidad: [],
    ingrediente: [],
    fecha: Date,
    caducidadFrasco: '',
    actividadeRealizadas: '',
    recomendacion: '',
    sustanciaActiva: '',
    tecnico: '',
    responsable: ''
  }
}
}
