import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConeccionService } from 'src/app/services/coneccion.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {
  datos: any;
  nombre="";
  id: any;
  constructor(private router: Router, private empresaService: ConeccionService, private route: ActivatedRoute) {
    this.empresaService.obtenerEmpresas().subscribe((res) => {
      console.log(res);
      this.datos = res;
      console.log(this.datos);
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.empresaService.obtenerDatosEmpresa(this.id).subscribe((res)=>{
      this.datos=res;
      this.nombre=this.datos.nombre;
      console.log(this.datos)
    })
  }

  irExteriores() {
    this.router.navigateByUrl('exteriores/' + this.id);
  }
  irInterior() {
    this.router.navigateByUrl('interior/' + this.id);
  }
  irLamparas() {
    this.router.navigateByUrl('lamparas/' + this.id);
  }
  irPortada() {
    this.router.navigateByUrl('portada/' + this.id);
  }
  ngOnInit() {
  }

}
