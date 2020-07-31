import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ConeccionService } from 'src/app/services/coneccion.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {
  id: any;
  datos: any;
  pdfObj: any;
  idReporte: any;
  datosEmpresa: any;
  reportes: any;
  numeroDeReporte: any;
  valorVerificar: any;
  constructor(private router: Router, private empresaService: ConeccionService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.empresaService.obtenerReportesPdf(this.id).subscribe((res) => {
      this.reportes = res;
    });
    this.empresaService.obtenerDatosEmpres(this.id).subscribe((res) => {
      this.datosEmpresa = res;
    })
  }
  verificar(id) {
    this.serviceVerificar(id);
  }
  async serviceVerificar(id) {
    await this.empresaService.verificarPdf(this.id, id).subscribe((res) => {
      this.valorVerificar = res;

      if (typeof (this.valorVerificar.interior) !== 'undefined' && typeof (this.valorVerificar.exterior)
        !== 'undefined' && typeof (this.valorVerificar.portada) !== 'undefined' && typeof (this.valorVerificar.lamparas) !== 'undefined') {
        this.cargarDatos(id);
      } else {
        let acu = '';
        if (typeof (this.valorVerificar.interior) !== 'undefined') {
          console.log('si hay interiores');
        } else {
          acu = acu + 'Falta interiores\n';
        }
        if (typeof (this.valorVerificar.exterior) !== 'undefined') {
          console.log('si  hay exteriores');
        } else {
          acu = acu + 'Falta exteriores\n';
        }
        if (typeof (this.valorVerificar.portada) !== 'undefined') {
          console.log('si hay portada');
        } else {
          acu = acu + 'Falta portada\n';
        }
        if (typeof (this.valorVerificar.lamparas) !== 'undefined') {
          console.log('si hay lamparas');
        } else {
          acu = acu + 'Falta lamparas\n';
        }
        alert(acu);
      }
    });
  }
  cargarDatos(id) {
    this.numeroDeReporte = id;
    this.empresaService.prueba(this.id, id).subscribe((res: any) => {
      this.pruebas(res.interior, res.exterior, res.lamparas, res.portada);
    });
  }
  pruebas(data1, data2, data3, data4) {
    let datosInteriores: any;
    let datosExteriores: any;
    let datosLamparas: any;
    let datosPortada: any;
    datosInteriores = data1;
    datosExteriores = data2;
    datosLamparas = data3;
    datosPortada = data4;
    const h = [15, 27];
    const h2 = [15, 27];
    const h3 = [15, 27];
    const headers = {
      fila_0: {
        col_1: { text: 'ESTACION', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] },
        col_2: { text: 'ACTIVIDAD', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] },
        col_3: { text: 'TRAMPAS INTERIORES', style: 'tableHeader', colSpan: 2, alignment: 'center' }
      },
      fila_1: {
        col_1: { text: 'Header 1', style: 'tableHeader', alignment: 'center' },
        col_2: { text: 'Header 2', style: 'tableHeader', alignment: 'center' },
        col_3: { text: 'CANTIDAD', style: 'tableHeader', alignment: 'center' },
        col_4: { text: 'OBSERVACIONES', style: 'tableHeader', alignment: 'center' },
      }
    };
    const headers2 = {
      fila_0: {
        col_1: { text: 'ESTACION', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] },
        col_2: { text: 'ACTIVIDAD', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] },
        col_3: { text: 'TRAMPAS EXTERIORES', style: 'tableHeader', colSpan: 2, alignment: 'center' }
      },
      fila_1: {
        col_1: { text: 'Header 1', style: 'tableHeader', alignment: 'center' },
        col_2: { text: 'Header 2', style: 'tableHeader', alignment: 'center' },
        col_3: { text: 'CANTIDAD', style: 'tableHeader', alignment: 'center' },
        col_4: { text: 'OBSERVACIONES', style: 'tableHeader', alignment: 'center' },
      }
    };
    const headers3 = {
      fila_0: {
        col_1: { text: 'TRAMPA #', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] },
        col_2: { text: 'LOCALIZACION', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] },
        col_3: { text: 'ACTIVIDAD', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] },
        col_4: { text: 'TRAMPAS DE LUZ', style: 'tableHeader', colSpan: 2, alignment: 'center' }
      },
      fila_1: {
        col_1: { text: 'Header 1', style: 'tableHeader', alignment: 'center' },
        col_2: { text: 'Header 2', style: 'tableHeader', alignment: 'center' },
        col_3: { text: 'Header 3', style: 'tableHeader', alignment: 'center' },
        col_4: { text: 'NC', style: 'tableHeader', alignment: 'center' },
        col_5: { text: 'OBSERVACIONES', style: 'tableHeader', alignment: 'center' },
      }
    };
    const body3 = [];
    for (var key in headers3) {
      if (headers3.hasOwnProperty(key)) {
        const header = headers3[key];
        const row = new Array();
        row.push(header.col_1);
        row.push(header.col_2);
        row.push(header.col_3);
        row.push(header.col_4);
        row.push(header.col_5);
        body3.push(row);
      }
    }
    const body2 = [];
    for (var key in headers2) {
      if (headers2.hasOwnProperty(key)) {
        const header = headers2[key];
        const row = new Array();
        row.push(header.col_1);
        row.push(header.col_2);
        row.push(header.col_3);
        row.push(header.col_4);
        body2.push(row);
      }
    }
    const body = [];
    for (var key in headers) {
      if (headers.hasOwnProperty(key)) {
        const header = headers[key];
        const row = new Array();
        row.push(header.col_1);
        row.push(header.col_2);
        row.push(header.col_3);
        row.push(header.col_4);
        body.push(row);
      }
    }
    for (var key in datosInteriores) {
      if (datosInteriores.hasOwnProperty(key)) {
        var data = datosInteriores[key];
        var row = new Array();
        var noTrampa = data.trampa + 1;
        row.push(noTrampa.toString());
        let acu = '';
        if (data.actividad.cc === true) {
          acu = acu + ' [CC] ';
        }
        if (data.actividad.ee === true) {
          acu = acu + ' [EE] ';
        }
        if (data.actividad.sc === true) {
          acu = acu + ' [SC] ';
        }
        if (data.actividad.er === true) {
          acu = acu + ' [ER] ';
        }
        if (data.actividad.ed === true) {
          acu = acu + ' [ED] ';
        }
        if (data.actividad.eb === true) {
          acu = acu + ' [EB] ';
        }
        if (data.actividad.sr === true) {
          acu = acu + ' [SR] ';
        }
        row.push(acu);

        row.push(data.noAnimal.toString());
        row.push(data.observacion.toString());
        body.push(row);
        h.push(27);
      }
    }
    for (var key in datosExteriores) {
      if (datosExteriores.hasOwnProperty(key)) {
        var data = datosExteriores[key];
        var row = new Array();
        var noTrampa = data.trampa + 1;
        row.push(noTrampa.toString());
        let acu = '';
        if (data.actividad.cc === true) {
          acu = acu + ' [CC] ';
        }
        if (data.actividad.ee === true) {
          acu = acu + ' [EE] ';
        }
        if (data.actividad.sc === true) {
          acu = acu + ' [SC] ';
        }
        if (data.actividad.er === true) {
          acu = acu + ' [ER] ';
        }
        if (data.actividad.ed === true) {
          acu = acu + ' [ED] ';
        }
        if (data.actividad.eb === true) {
          acu = acu + ' [EB] ';
        }
        row.push(acu);

        row.push(data.noAnimal.toString());
        row.push(data.observacion.toString());
        body2.push(row);
        h2.push(27);
      }
    }
    for (var key in datosLamparas) {
      if (datosLamparas.hasOwnProperty(key)) {
        var data = datosLamparas[key];
        var row = new Array();
        var noTrampa = data.lampara + 1;
        row.push(noTrampa.toString());
        row.push(data.localizacion.toString());
        let acu = '';
        if (data.actividad.ci === true) {
          acu = acu + ' [CI] ';
        }
        if (data.actividad.si === true) {
          acu = acu + ' [SI] ';
        }
        if (data.actividad.td === true) {
          acu = acu + ' [TD] ';
        }
        if (data.actividad.cg === true) {
          acu = acu + ' [CG] ';
        }
        if (data.actividad.sc === true) {
          acu = acu + ' [SC] ';
        }
        if (data.actividad.tb === true) {
          acu = acu + ' [TB] ';
        }
        row.push(acu);

        row.push(data.noAnimal.toString() + ' / ' + data.noAnimal2.toString());
        row.push(data.observacion.toString() + ' / ' + data.observacion2.toString());
        body3.push(row);
        h3.push(27);
      }
    }
    const element = [];
    for (let index = 0; index < datosPortada.check.length; index++) {
      if (datosPortada.check[index] === false) {
        element.push('[  ]');
      } else if (datosPortada.check[index] === true) {
        element.push('[X]');
      }
    }
    var dd = {
      pageMargins: [20, 40, 20, 40],

      content: [
        // {
        //   image: 'assets/img/logo'
        // },
        {
          text: ''
        },
        {
          columns:
            [
              {
                table: {
                  body: [
                    ['Hora de Inicio', 'Hora  de Salida'],
                    [{ text: datosPortada.inicio, style: 'letraDoc' }, { text: datosPortada.termino, style: 'letraDoc' }]
                  ],

                }

              },
              {
                text: 'REPORTE DE SERVICIO', alignment: 'center', bold: true, fontSize: 14
              },
              {
                text: datosPortada.fecha, alignment: 'right'

              },
            ],
          margin: 11,
          alignment: 'center'
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            body: [
              [{
                columns: [
                  { text: 'CONTACTO: ' + this.datosEmpresa.contacto.toUpperCase(), fontSize: 12, bold: true },
                  { text: 'TELEFONO: ' + this.datosEmpresa.telefono.toUpperCase(), fontSize: 12, bold: true, alignment: 'right' }
                ]

              }],
              [{ text: 'EMPRESA: ' + this.datosEmpresa.nombre.toUpperCase(), fontSize: 12, bold: true }],
              [{ text: 'DIRECCION: ' + this.datosEmpresa.direccion.toUpperCase(), fontSize: 12, bold: true }],

            ],

          },
          margin: [0, 0, 0, 10]
        },

        {
          table: {

            widths: ['*', '*'],
            body: [

              [{ style: 'letraDoc', text: 'SERVICIOS REALIZADOS' }, { style: 'letraDoc', text: 'AREAS TRATADAS' }],
              [{
                style: 'small',
                text: [
                  element[0] + 'supervicion y abasto de trampas\n',
                  element[1] + 'Supervisión y abasto de lamparas UV.\n',
                  element[2] + 'Supervisión y abasto de estaciones cebaderas.'
                ],
                alignment: 'left'

              },
              {
                style: 'small',
                text: [
                  element[3] + 'Servicio en interiores y oficinas.\n',
                  element[4] + 'Servicio en exteriores.\n',
                  element[5] + 'Servicio en interiores, oficinas y exteriores'
                ]
              }],
              [{
                style: 'small',
                text: [
                  element[6] + 'supervicion y abasto de trampas\n',
                  element[7] + 'Supervisión y abasto de lamparas UV.\n',
                  element[8] + 'Supervisión y abasto de estaciones cebaderas.'
                ]

              },
              {
                style: 'small',
                text: [
                  element[9] + 'Servicio en interiores.\n',
                  element[10] + 'Servicio en exteriores.\n',
                  element[11] + 'Servicio en interiores y exteriores'
                ]
              }],
              [{
                style: 'small',
                text: [
                  element[12] + 'supervicion y abasto de trampas\n',
                  element[13] + 'Supervisión y abasto de lamparas UV.\n',
                  element[14] + 'Supervisión y abasto de estaciones cebaderas.'
                ]

              },
              {
                style: 'small',
                text: [
                  element[15] + 'Servicio en interiores.\n',
                  element[16] + 'Servicio en exteriores.\n',
                  element[17] + 'Servicio en interiores y exteriores'
                ]
              }]
            ]

          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', 'auto', 'auto', '*'],
            body: [
              [{ text: 'Producto utilizado', alignment: 'center' }, 'Sustancia activa', 'Caducidad del frasco', 'Equipo de aplicacion'],

              [
                {
                  columns: [
                    {
                      style: 'small',
                      text: [
                        element[18] + 'Biothrine CE\n ',
                        element[19] + 'Demon 40PH\n ',
                        element[20] + 'Demand\n ',
                        element[21] + 'Biflex plus\n ',
                        element[22] + 'Tyson 4E'
                      ],
                      alignment: 'left'
                    },
                    {
                      style: 'small',
                      text: [
                        element[23] + 'Termidor\n',
                        element[24] + 'Pirenat\n',
                        element[25] + 'Cybor\n',
                        element[26] + 'Fulmitrol\n',
                        element[27] + 'Biothrine FLOW'
                      ],
                      alignment: 'left'
                    }

                  ]
                },
                { text: datosPortada.sustanciaActiva, alignment: 'center', style: 'letraDoc' },
                { text: datosPortada.caducidadFrasco, style: 'letraDoc' },
                {
                  style: 'small',
                  text: [
                    element[28] + 'Nebulizador Electrico\n',
                    element[29] + 'Nebulizador Motorizado\n',
                    element[30] + 'Termo-Nebulizador Gas\n',
                    element[31] + 'Termo-Nebulizador Motorizado\n',
                    element[32] + 'Aspersora electrica\n',
                    element[33] + 'Aspersora de Presión'
                  ]
                }]

            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            style: 'small',
            widths: ['auto', '*', 'auto', '*', 'auto'],
            body: [
              [{ style: 'letraDoc', text: 'AREAS A TRATAR' }, { style: 'letraDoc', text: 'PRODUCTOS UTILIZADOS' },
              { style: 'letraDoc', text: 'INGREDIENTES A.' }, { style: 'letraDoc', text: 'DOSIS' },
              { style: 'letraDoc', text: 'CANTIDAD' }],
              ['INTERIORES', 'Laminas Rastreros', 'Polisobuteno', 'Adhesivo', { text: datosPortada.cantidad[0], style: 'letraDoc' }],
              ['INTERIORES', 'Laminas Rastreros', 'Polisobuteno', 'Adhesivo', { text: datosPortada.cantidad[1], style: 'letraDoc' }],
              ['INTERIORES',
                {
                  style: 'small',
                  text: [
                    element[37] + 'Termo-Nebulización integral.\n',
                    element[38] + 'Nebulización de perímetros.\n'
                  ]
                },
                { text: datosPortada.ingrediente[0], bold: true, fontSize: 13 }, {
                  style: 'small',
                  text: [
                    element[39] + '10-20% x Lt .H2O\n',
                    element[40] + '10-20% x Lt .H2O\n'
                  ]
                },
                { text: datosPortada.cantidad[2], style: 'letraDoc' }
              ],
              ['INTERIORES',
                {
                  style: 'small',
                  text:
                    [
                      element[42] + 'Aplicación de repelente de aves.\n',
                      element[43] + 'Aplicación de repelente de reptiles.\n'
                    ]
                },
                { text: datosPortada.ingrediente[1], bold: true, fontSize: 13 },
                {
                  style: 'small',
                  text:
                    [
                      element[44] + '10-20% x Lt .H2O\n',
                      element[45] + '10-20% x Lt .H2O\n'
                    ]
                },
                { text: datosPortada.cantidad[3], style: 'letraDoc' }
              ],
              ['INTERIORES',
                {
                  style: 'small',
                  text:
                    [
                      element[47] + 'Aspersión de focalizada.\n',
                      element[48] + 'Sanitización.'
                    ]
                },
                {
                  style: 'small',
                  text:
                    [
                      datosPortada.ingrediente[2] + '\n',
                      element[49] + 'Ambietrol NOVARTIS'
                    ]
                },
                {
                  style: 'small',
                  text:
                    [
                      element[50] + '10-20% x Lt .H2O\n',
                      element[51] + '10-20% x Lt .H2O\n'
                    ]
                },
                { text: datosPortada.cantidad[4], style: 'letraDoc' }],
              ['EXTERIORES',
                {
                  style: 'small',
                  text:
                    [
                      element[53] + 'Aspersión de focalizada.\n',
                      element[54] + 'Supervisión y abasto de estaciones cebaderas.'
                    ]
                },
                { text: datosPortada.ingrediente[3], bold: true, fontSize: 13 },
                {
                  style: 'small',
                  text:
                    [
                      element[55] + '10-20% x Lt .H2O\n',
                      element[56] + '0.05 SUST. ACT.'
                    ]
                },
                { text: datosPortada.cantidad[5], style: 'letraDoc' }],
              ['EXTERIORES',
                {
                  style: 'small',
                  text:
                    [
                      element[58] + 'Termo-Nebulización integral.\n',
                      element[59] + 'Nebulización de perímetros'
                    ]
                },
                { text: datosPortada.ingrediente[4], bold: true, fontSize: 13 },
                {
                  style: 'small',
                  text:
                    [
                      element[60] + '10-20% x Lt .H2O\n',
                      element[61] + '10-20% x Lt .H2O'
                    ]
                },
                { text: datosPortada.cantidad[6], style: 'letraDoc' }
              ],
              ['EXTERIORES',
                {
                  style: 'small',
                  text:
                    [
                      element[63] + 'Aplicación de repelente de aves.\n',
                      element[64] + 'Aplicación de repelente de reptiles.'
                    ]
                },
                {
                  style: 'small',
                  text: [
                    element[65] + 'Bird Repellent\n',
                    element[66] + 'Red Cedar Punch'
                  ]
                },
                {
                  style: 'small',
                  text:
                    [
                      element[67] + '10-20% x Lt .H2O\n',
                      element[68] + '10-20% x Lt .H2O'
                    ]
                },
                { text: datosPortada.cantidad[7], style: 'letraDoc' }]
            ],

          },
          margin: [0, 0, 0, 10]
        },
        {
          table: {
            style: 'tableExample',
            widths: ['*'],
            body: [
              ['ACTIVIDADES REALIZADAS '],
              [{ text: datosPortada.actividadeRealizadas, style: 'letraDoc' }],

            ]
          }
        },
        {
          table: {
            style: 'tableExample',
            widths: ['*'],
            body: [
              ['RECOMENDACIÓN AL CLIENTE '],
              [{ text: datosPortada.recomendacion, style: 'letraDoc' }],

            ]
          }
        },
        {
          columns: [
            {
              table: {
                style: 'tableExample',
                widths: ['*'],
                body: [
                  ['RESPONSABLE '],
                  [{ text: datosPortada.responsable.toUpperCase(), style: 'letraDoc' }],
                ]
              }
            },
            {
              table: {
                style: 'tableExample',
                widths: ['*'],
                body: [
                  ['TECNICO '],
                  [{ text: datosPortada.tecnico.toUpperCase(), style: 'letraDoc' }],
                ]
              }
            }
          ]
        },
        {
          table: {
            style: 'tableExample',
            widths: ['*', 'auto'],
            body: [
              ['SITUACION QUE GUARDAN LAS ESTACIONES AL MOMENTO DE LA REVISIÓN EN: ', { text: this.datosEmpresa.nombre.toUpperCase() }],
              ['DIRECCION: '+this.datosEmpresa.direccion.toUpperCase(), { text: 'TEL: ' + this.datosEmpresa.telefono.toUpperCase() }],
              [{ text: 'AÑO: ' + new Date().getFullYear(), alignment: 'left' },
              { text: 'FECHA: ' + datosPortada.fecha, alignment: 'left' }]
            ]
          }

        },
        {
          style: 'tableExample',
          table: {
            heights: h,
            widths: ['auto', 'auto', 'auto', '*'],
            headerRows: 2,
            // keepWithHeaderRows: 1,
            body: body
          }
        },
        {
          table: {
            widths: ['*'],
            body: [
              [
                { text: 'CC= Con Consumo SC= Sin Consumo SR= Sin Roedores ED= Estación Dañada EE= Estación Extraviada ER= Estación Reubicada EB= Estación Bloqueada.' }
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            heights: h2,
            widths: ['auto', 'auto', 'auto', '*'],
            headerRows: 2,
            // keepWithHeaderRows: 1,
            body: body2
          }
        },
        {
          table: {
            widths: ['*'],
            body: [
              [
                { text: 'CC= Con Consumo SC= Sin Consumo ED= Estación Dañada EE= Estación Extraviada ER= Estación Reubicada EB= Estación Bloqueada.' }
              ]
            ]
          }
        },
        {

          style: 'tableExample',
          table: {
            heights: h3,
            widths: ['auto', 'auto', 'auto', 'auto', '*'],
            headerRows: 2,
            // keepWithHeaderRows: 1,
            body: body3
          }
        },
        {

          table: {
            widths: ['*'],
            body: [
              [
                { text: 'CI= Con Insectos SI= Sin Insectos CG= Cambio de Goma SC= Sin Cambio TD= Trampa Dañada TB= Trampa Bloqueada' }
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            body: [
              [
                {
                  text: 'Observacion: En estaciones de cebo se aplicó rodenticida anticoagulante en bloque al 0.005% de ingrediente activo.'
                }
              ]
            ]
          }
        }
      ],

      styles: {
        tableHeader: {
          fontSize: 13,
          bold: true
        },
        header: {
          fontSize: 28,
          bold: true
        },
        subheader: {
          fontSize: 15,
          bold: true
        },
        letraDoc: {
          fontSize: 11,
          bold: true,
          alignment: 'center'
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 9
        },
        sta: {
          fontSize: 11,
          bold: false,
          alignment: 'justify'
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
      }
    };

    this.pdfObj = pdfMake.createPdf(dd);

    this.pdfObj.download();
  }

}
