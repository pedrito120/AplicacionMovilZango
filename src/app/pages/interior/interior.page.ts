import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConeccionService } from 'src/app/services/coneccion.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { TranslationWidth } from '@angular/common';

@Component({
  selector: 'app-interior',
  templateUrl: './interior.page.html',
  styleUrls: ['./interior.page.scss'],
})
export class InteriorPage implements OnInit {
  interior = [];
  id: any;
  datos: number;
  cc = false;
  eb = false;
  ed = false;
  ee = false;
  er = false;
  sc = false;
  sr = false;

  constructor(private route: ActivatedRoute, private empresaService: ConeccionService, private empresaForm: FormBuilder) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.empresaService.obtenerId(this.id).subscribe((res) => {
      this.interior = res;
      let acu1 = 0;
      let acu2 = 0;
      for (let r of this.interior) {
        if (r.observacion.length > 0) {
          acu1 = acu1 + 1;
        } else {
          acu2 = acu2 + 1;
        }
      }
      this.datos = acu2;
    });
  }

  async guardarTrampa(f, id) {
    await this.generarDatos(f, id);

    this.cc = false;
    this.eb = false;
    this.ed = false;
    this.ee = false;
    this.er = false;
    this.sc = false;
    this.sr = false;
  }
  generarDatos(f, id) {
    const trampa = {
      noAnimal: f.value.noAnimal,
      observacion: f.value.observacion,
      actividad: {
        cc: this.cc,
        eb: this.eb,
        ed: this.ed,
        ee: this.ee,
        er: this.er,
        sc: this.sc,
        sr: this.sr
      }
    };
    this.empresaService.guardarTrampa(this.id, trampa, id, 'interior');
  }
  check(e, name) {
    const checked = e.detail.checked;
    if (name === 'cc') {
      this.cc = checked;
    } else if (name === 'ee') {
      this.ee = checked;
    } else if (name === 'eb') {
      this.eb = checked;
    } else if (name === 'ed') {
      this.ed = checked;
    } else if (name === 'er') {
      this.er = checked;
    } else if (name === 'sc') {
      this.sc = checked;
    } else if (name === 'sr') {
      this.sr = checked;
    }
  }
  subirCambios(f) {
    console.log(this.interior);
    this.empresaService.guardarReportePdf(this.id, f.value.reporte, 'interior', this.interior);
    this.insertarInterirores(this.interior.length);
    // console.log(this.interior.length);
  }
  insertarInterirores(cantidad) {

    for (let index = 0; index < cantidad; index++) {
      const trampa = {
        trampa: index,
        noAnimal: 0,
        observacion: '',
        actividad: {
          cc: false,
          eb: false,
          ed: false,
          ee: false,
          er: false,
          sc: false
        }
      };
      this.empresaService.insertarTrampasInterior(trampa, index, this.id);
    }
  }
}
