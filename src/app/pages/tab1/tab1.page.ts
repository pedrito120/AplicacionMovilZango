import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  slides = [
    {
      img:'../../../assets/img/fabrica.png',
      titulo:'Bienvenido <br> ¿Que desea hacer?'
    },
    {
      img:'../../../assets/img/monta cargas.png',
      titulo:'Grupo Zango cuenta <br> con Asistencia Industrial'
    },
    {
      img:'../../../assets/img/radar.png',
      titulo:'Control <br> de plagas'
    },
    {
      img:'../../../assets/img/trabajador con casco.png',
      titulo:'Personal capacitado'
    }
  ]

  constructor(private router: Router) { }

  ngOnInit() {
  }

  registrarEmpresa(){
    this.router.navigateByUrl('/tabs/tab1/registrar')
  }
  analizarEmpresa(){
    this.router.navigateByUrl('/tabs/tab1/analizar')
  }
}
