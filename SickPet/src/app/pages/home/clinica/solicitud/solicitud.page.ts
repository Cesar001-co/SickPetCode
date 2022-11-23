import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SolicitudCli } from 'src/app/models/models';
import { ServiciosClinica } from 'src/app/services/serviciosCli.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
})
export class SolicitudPage implements OnInit {

  idC: any;
  idSol: any;
  time: Date;
  dateformat: any;

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private userService: UserService,
    private router: Router,
    private clinicaService: ServiciosClinica,
  ) { }

  ngOnInit() {
    this.idC = this.activatedRoute.snapshot.paramMap.get('id');
    this.idSol = this.activatedRoute.snapshot.paramMap.get('solicitud');
    console.log(this.idC);
    console.log(this.idSol);
    this.getSelectedSol();
    this.time = new Date(this.selectedSoli.hora);
    this.dateformat = this.time.getDay()+'/'+this.time.getMonth()+'/'+this.time.getFullYear();
  }

  //----------------------------------------------------------------[Alerts]----------------------------------------------------------------
  async finalizarAlert() {
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
            this.finalizarSol();
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
  getSelectedSol() {
    this.clinicaService.getSolicitud(this.idSol).subscribe((data: any) => {
      this.selectedSoli = data;
    });
  }
  //----------------------------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------[Rutas]----------------------------------------------------------------
  goToSolicitudes() {
    this.router.navigate(['/solicitudes-curso', this.idC]);
  }

  goToSoliciCurso() {
    this.router.navigate(['/solicitudes-curso', this.idC]);
  }

  goToSolicitud(solicitud: any) {
    this.selectedSoli = solicitud;
    this.router.navigate(['/solicitud', this.idC, this.selectedSoli.idSol]);
  }
  //----------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------[...]-----------------------------------------------------------------
  finalizarSol() {
    this.selectedSoli.end = true;
    console.log(this.selectedSoli);
    this.clinicaService.updateSolicitud(this.selectedSoli.idSol, this.selectedSoli);
  }
  //----------------------------------------------------------------------------------------------------------------------------------------
}
