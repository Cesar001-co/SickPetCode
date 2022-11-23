import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Solicitud, SolicitudCli, UserClinica } from 'src/app/models/models';
import { ServiciosClinica } from 'src/app/services/serviciosCli.service';
import { ServiciosSolicitudes } from 'src/app/services/solicitudes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-clinica',
  templateUrl: './home-clinica.page.html',
  styleUrls: ['./home-clinica.page.scss'],
})
export class HomeClinicaPage implements OnInit {

  idC: any;

  solicitudes: SolicitudCli[] = [];
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
    },
    idSol: ''
  };

  solFiltEspera: SolicitudCli[] = [];
  //solFiltCurso: Solicitud[] = [];

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
  async logOutAlert() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesion',
      message: 'Desea cerrar sesion?',
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
            this.logout();
          },
        },
      ],
      mode: 'ios',
      backdropDismiss: false
    });

    await alert.present();
  }

  async aceptarAlert(solicitud: any) {
    const alert = await this.alertController.create({
      header: 'Solicitud',
      message: 'Desea aporbar solicitud?',
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
            this.acpetarSol(solicitud);
          },
        },
      ],
      mode: 'ios',
      backdropDismiss: false
    });

    await alert.present();
  }

  async rechazarAlert(solicitud: any) {
    const alert = await this.alertController.create({
      header: 'Solicitud',
      message: 'Desea rechazar solicitud?',
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
            this.rechazarSol(solicitud);
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
            ...element.payload.doc.data(),
          });
        });
        this.getSoliFilt();
      }
    });
  }

  getSoliFilt() {
    this.solFiltEspera = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.solicitudes.length; i++) {
      if (this.solicitudes[i].estadoSol === false) {
        this.solFiltEspera.push({
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
  //----------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------[...]-----------------------------------------------------------------
  logout(){
    //this.userService.logout();
    this.router.navigate(['/login']);
  }

  acpetarSol(solicitud: any) {
    //aceptar solicutud estadoSol = true
    this.selectedSoli = solicitud;
    this.selectedSoli.estadoSol = true;
    console.log(this.selectedSoli);
    this.clinicaService.updateSolicitud(this.selectedSoli.idSol, this.selectedSoli);
  }

  rechazarSol(solicitud: any) {
    //aceptar solicutud cancelled = true
    this.selectedSoli = solicitud;
    this.selectedSoli.cancelled = true;
    console.log(this.selectedSoli);
    this.clinicaService.updateSolicitud(this.selectedSoli.idSol, this.selectedSoli);
  }
  //----------------------------------------------------------------------------------------------------------------------------------------



}
