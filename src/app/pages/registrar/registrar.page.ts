import { Component, OnInit } from '@angular/core';
import { ConeccionService } from 'src/app/services/coneccion.service';
import { NgModule } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  empresa = {
    id: '',
    nombre: '',
    noInterior: null,
    noExterior: null,
    noLamparas: null,
    contacto: '',
    telefono: '',
    direccion: '',
  };

  constructor(private registrarEmpresa: ConeccionService, private cargarCtrl: LoadingController,
              public alertaCtrl: AlertController, private route: Router) { }

  ngOnInit() {
  }
  registrar() {
    this.registrarEmpresa.registrarEmpresas(this.empresa, this.empresa.id);
    console.log(this.empresa);
    this.insertarInterirores(this.empresa.noInterior);
    this.insertarExteriores(this.empresa.noExterior);
    this.insertarLamparas(this.empresa.noLamparas);
    this.limpiarDatos()
  }


  insertarInterirores(cantidad) {

    for (let index = 0; index < cantidad ; index++) {
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
          sc: false,
          sr: false
        }
      };
      this.registrarEmpresa.insertarTrampasInterior(trampa, index, this.empresa.id);
    }
  }
  insertarExteriores(cantidad) {
    for (let index = 0; index < cantidad ; index++) {
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
      this.registrarEmpresa.insertarTrampasExteriores(trampa, index, this.empresa.id);
    }
  }
  insertarLamparas(cantidad) {
    for (let index = 0; index < cantidad; index++) {
      const lampara = {
        lampara: index,
        noAnimal2: 0,
        noAnimal: 0,
        observacion: '',
        observacion2: '',
        localizacion: '',
        actividad: {
          ci: false,
          cg: false,
          si: false,
          sc: false,
          td: false,
          tb: false
        }
      };
      this.registrarEmpresa.insertarLamparas(lampara, index, this.empresa.id);
    }
  }

  async cargar() {
    const loading = await this.cargarCtrl.create({
      message: 'Cargando...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();

    }, 2000);
  }
  async alerta() {
    const alert = await this.alertaCtrl.create({
      header: 'Registrado',
      message: 'Se ha registrado con éxito',
      buttons: [
        {
          text: 'OK',
          handler: () => {

          }
        }
      ]
    });
    setTimeout(() => {
      alert.present();
    }, 2000);
    alert.dismiss();
  }

  limpiarDatos() {
    this.empresa = {
      id: '',
      nombre: '',
      noInterior: '',
      noExterior: '',
      noLamparas: '',
      contacto: '',
      telefono: '',
      direccion: '',
    };
  }
}
