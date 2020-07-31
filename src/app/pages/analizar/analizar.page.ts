import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConeccionService } from 'src/app/services/coneccion.service';
import { NavController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-analizar',
  templateUrl: './analizar.page.html',
  styleUrls: ['./analizar.page.scss'],
})
export class AnalizarPage implements OnInit {
  
  datos: any = [];
  constructor(private router: Router, private empresaService: ConeccionService, private navCtrl: NavController) {
    this.empresaService.obtenerEmpresas().subscribe((res) => {
      this.datos = res;
    });
  }

  empresa(id: number) {
    // this.navCtrl.navigateForward('/tabs/tab1/analizar/empresa/' + id);
    this.router.navigateByUrl('empresa/' + id);
  }
  verEmpresas() {
    console.log(this.empresaService.obtenerEmpresas())
  }


  ngOnInit() {
  }

}
