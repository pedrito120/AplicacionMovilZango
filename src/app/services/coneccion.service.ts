import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConeccionService {
  constructor(private grupoZango: AngularFireDatabase) {
  }
  registrarEmpresas(empresa = {}, id: any) {
    return this.grupoZango.object(`grupoZangoApp/empresa/${id}`).update(empresa);
  }
  insertarTrampasInterior(trampas: any, trampa: any, id: any) {
    this.grupoZango.object(`grupoZangoApp/empresa/${id}/reportes/interior/${trampa}`).update(trampas);
  }
  insertarTrampasExteriores(trampas: any, trampa: any, id: any) {
    this.grupoZango.object(`grupoZangoApp/empresa/${id}/reportes/exteriores/${trampa}`).update(trampas);
  }
  insertarLamparas(lamparas: any, lampara: any, id: any) {
    this.grupoZango.object(`grupoZangoApp/empresa/${id}/reportes/lamparas/${lampara}`).update(lamparas);
  }
  obtenerEmpresas() {
    return this.grupoZango.list('grupoZangoApp/empresa/').valueChanges();
  }
  graficas(id:any,noReporte){
    return this.grupoZango.object(`grupoZangoApp/empresa/${id}/reportesPdf/${noReporte}`).valueChanges();
  }
  obtenerReportesPdf(id: any) {
    return this.grupoZango.list(`grupoZangoApp/empresa/${id}/reportesPdf`).valueChanges();
  }
  obtenerId(id: any) {
    return this.grupoZango.list(`grupoZangoApp/empresa/${id}/reportes/interior`).valueChanges();
  }
  obtenerObjectoPdf(id: any, nombreReport: any) {
    return this.grupoZango.object(`grupoZangoApp/empresa/${id}/reportes/${nombreReport}`).valueChanges();
  }
  obtenerExteriores(id: any) {
    return this.grupoZango.list(`grupoZangoApp/empresa/${id}/reportes/exteriores`).valueChanges();
  }
  obtenerLamparas(id: any) {
    return this.grupoZango.list(`grupoZangoApp/empresa/${id}/reportes/lamparas`).valueChanges();
  }
  guardarTrampa(idEmpresa: any, trampa: any, id: any, reporteNombre: any) {
    return this.grupoZango.object(`grupoZangoApp/empresa/${idEmpresa}/reportes/${reporteNombre}/${id}`).update(trampa);
  }
  guardarReportePdf(idEmpresa: any, idReportePdf: any, reporteNombre: any, datos: any) {
    this.grupoZango.database.ref(`grupoZangoApp/empresa/${idEmpresa}/reportesPdf/${idReportePdf}/id`).set(idReportePdf);
    return this.grupoZango.object(`grupoZangoApp/empresa/${idEmpresa}/reportesPdf/${idReportePdf}/${reporteNombre}`).update(datos);
  }
  verificarPdf(idEmpresa,idReportePdf){
    return this.grupoZango.object(`grupoZangoApp/empresa/${idEmpresa}/reportesPdf/${idReportePdf}`).valueChanges();
  }
  cargarDatosPdf(idEmpresa) {
    return this.grupoZango.object(`grupoZangoApp/empresa/${idEmpresa}/reportesPdf/`).valueChanges();
  }
  prueba(idEmpresa,idReportePdf) {
    return this.grupoZango.object(`grupoZangoApp/empresa/${idEmpresa}/reportesPdf/${idReportePdf}`).valueChanges();
  }
  prueba2(idEmpresa,idReportePdf) {
    return this.grupoZango.list(`grupoZangoApp/empresa/${idEmpresa}/reportesPdf/${idReportePdf}`).valueChanges();
  }
  prueba3(idEmpresa,idReportePdf) {
    return this.grupoZango.list(`grupoZangoApp/empresa/${idEmpresa}/reportesPdf/${idReportePdf}`).valueChanges();
  }
  prueba4(idEmpresa,idReportePdf) {
    return this.grupoZango.object(`grupoZangoApp/empresa/${idEmpresa}/reportesPdf/${idReportePdf}`).valueChanges();
  }
  obtenerDatosEmpres(idEmpresa){
    return this.grupoZango.object(`grupoZangoApp/empresa/${idEmpresa}`).valueChanges();
  }
  
}
