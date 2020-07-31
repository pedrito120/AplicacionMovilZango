import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConeccionService } from 'src/app/services/coneccion.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-exteriores',
  templateUrl: './exteriores.page.html',
  styleUrls: ['./exteriores.page.scss'],
})
export class ExterioresPage implements OnInit {
  exterior: any;
  id: any;
  datos: number;
  cc = false;
  eb = false;
  ed = false;
  ee = false;
  er = false;
  sc = false;

  constructor(private route: ActivatedRoute, private empresaService: ConeccionService, private empresaForm: FormBuilder) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.empresaService.obtenerExteriores(this.id).subscribe((res) => {
      this.exterior = res;
      console.log(this.exterior);
      let acu1 = 0;
      let acu2 = 0;
      for (let r of this.exterior) {
        if (r.observacion.length > 0) {
          acu1 = acu1 + 1;
        } else {
          acu2 = acu2 + 1;
        }
      }
      this.datos = acu2;
    });
  }

  ngOnInit() {
  }

  guardarTrampa(f, id) {
    const trampa = {
      noAnimal: f.value.noAnimal,
      observacion: f.value.observacion,
      actividad: {
        cc: this.cc,
        eb: this.eb,
        ed: this.ed,
        ee: this.ee,
        er: this.er,
        sc: this.sc
      }
    }
    this.empresaService.guardarTrampa(this.id, trampa, id, 'exteriores');
    this.cc = false;
    this.eb = false;
    this.ed = false;
    this.ee = false;
    this.er = false;
    this.sc = false;
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
    }
  }
  subirCambios(f) {
    console.log(this.exterior);
    this.empresaService.guardarReportePdf(this.id, f.value.reporte, 'exterior', this.exterior);
    this.insertarExteriores(this.exterior.length);
    // console.log(this.interior.length);
  }
  insertarExteriores(cantidad) {
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
      this.empresaService.insertarTrampasExteriores(trampa, index, this.id);
    }
  }
}
