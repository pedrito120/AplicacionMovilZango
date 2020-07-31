import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConeccionService } from 'src/app/services/coneccion.service';
import { FormGroupName, FormControlName } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { NavController, Platform, LoadingController } from '@ionic/angular';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  datos: any = [];
  pdfObj: any;
  constructor(private router: Router, private empresaService: ConeccionService, public navCtrl: NavController, platform: Platform) {
    this.empresaService.obtenerEmpresas().subscribe((res) => {
      this.datos = res;
    });
  }
  irReportes(id) {
    this.empresaService.obtenerDatosEmpres(id).subscribe((res: any) => {
      console.log(res)
      if (typeof (res.reportesPdf) !== 'undefined') {
        this.router.navigateByUrl('reportes/' + id);
      } else {
        alert('No existen datos');
      }
    });

  }
  ngOnInit() {
  }
}
