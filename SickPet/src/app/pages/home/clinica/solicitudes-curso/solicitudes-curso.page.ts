import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Solicitud, SolicitudCli, UserClinica } from 'src/app/models/models';
import { ServiciosClinica } from 'src/app/services/serviciosCli.service';
import { ServiciosSolicitudes } from 'src/app/services/solicitudes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-solicitudes-curso',
  templateUrl: './solicitudes-curso.page.html',
  styleUrls: ['./solicitudes-curso.page.scss'],
})
export class SolicitudesCursoPage implements OnInit {

  idC: any;

  solicitudes: Solicitud[] = [];
  clinicaData: UserClinica = {
    uID: '',
    nombreCli: '',
    calificacion: '',
    nit: '',
    numCelCli: '',
    numCelCliOp: '',
    ubicacion: {
      lat: '',
      lng: ''
    },
    serviciosClinica: [null]
  };
  selectedSoli: SolicitudCli = {
    idSol: '',
    idC: '',
    nombreCli: '',
    estadoSol: false,
    cancelled: false,
    end: false,
    service: '',
    hora: undefined,
    infoSolicitud: '',
    mascota: {
      nombreMasc: '',
      edad: '',
      raza: '',
      info: '',
      tipomascota: ''
    },
    usuario: {
      nombre: '',
      numCel: ''
    },
    ubicacion: {
      lat: '',
      lng: ''
    }
  };

  solFiltCurso: Solicitud[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private userService: UserService,
    private router: Router,
    private clinicaService: ServiciosClinica,
    private solicitudService: ServiciosSolicitudes) { }

  ngOnInit() {
    this.idC = this.activatedRoute.snapshot.paramMap.get('id');
    //console.log(this.idC);
    this.getUserdata();
    this.getSolicitudes();
  }

  //----------------------------------------------------------------[Alerts]----------------------------------------------------------------
  async rechazarAlert(solicitud: any) {
    const alert = await this.alertController.create({
      header: 'Finalizar',
      message: 'Desea finalizar solicitud?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'destructive',
          handler: () => {
          },
        },
        {
          text: 'CONFIRMAR',
          role: 'confirm',
          handler: () => {
            this.finalizarSol(solicitud);
          },
        },
      ],
      mode: 'ios',
      backdropDismiss: false
    });

    await alert.present();
  }
  //----------------------------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------[Gets]-----------------------------------------------------------------
  getUserdata() {
    this.clinicaService.getClinica(this.idC).subscribe((data: any) => {
      if (data) {
        this.clinicaData = data;
        console.log(this.clinicaData);
      }
    });
  }

  getSolicitudes() {
    this.clinicaService.getSolicitudesbyClinc(this.idC).subscribe((data: any) => {
      if (data) {
        this.solicitudes = [];
        data.forEach((element: any) => {
          this.solicitudes.push({
            idSol: element.payload.doc.id,
            ...element.payload.doc.data()
          });
        });
        this.getSoliFilt();
      }
    });
  }

  getSoliFilt() {
    this.solFiltCurso = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.solicitudes.length; i++) {
      if (this.solicitudes[i].estadoSol === true) {
        this.solFiltCurso.push({
          ...this.solicitudes[i]
        });
      }
    }
  }
  //----------------------------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------[Rutas]----------------------------------------------------------------
  goToSolicitudes() {
    this.router.navigate(['/home-clinica', this.idC]);
  }

  goToSoliciCurso() {
    this.router.navigate(['/solicitudes-curso', this.idC]);
  }

  goToSolicitud(solicitud: any){
    this.selectedSoli = solicitud;
    this.router.navigate(['/solicitud', this.idC,this.selectedSoli.idSol]);
  }
  //----------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------[...]-----------------------------------------------------------------
  finalizarSol(solicitud: any){
    this.selectedSoli = solicitud;
    this.selectedSoli.end = true;
    console.log(this.selectedSoli);
    this.clinicaService.updateSolicitud(this.selectedSoli.idSol, this.selectedSoli);
  }
  //----------------------------------------------------------------------------------------------------------------------------------------
}
