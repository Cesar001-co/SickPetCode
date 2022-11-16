import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MascotaData, Solicitud, UserReg, SolClinica, SolClinicafil } from 'src/app/models/models';
import { ServiciosMascotas } from 'src/app/services/mascotas.service';
import { ServiciosClinica } from 'src/app/services/serviciosCli.service';
import { ServiciosSolicitudes } from 'src/app/services/solicitudes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-persona',
  templateUrl: './home-persona.page.html',
  styleUrls: ['./home-persona.page.scss'],
})
export class HomePersonaPage implements OnInit {

  uid: any;
  mascotas: MascotaData[] = [];
  clinicabyServicios: SolClinica[] = [];
  clinicabyServiciosFilt: SolClinicafil[] = [];

  lookSolicitud = true;
  searchSolicitud: false;
  generateSolicitud: false;
  isModalOpen = false;

  selectmascota: MascotaData;
  solicform: FormGroup;
  dataSolicitud: Solicitud = {
    uID: '',
    idC: '',
    estadoSol: false,
    end: false,
    service: '',
    hora: '',
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
  };

  userData: UserReg = {
    nombres: null,
    apellidos: null,
    uID: null,
    email: null,
    numDoc: null,
    numCon: null,
    perfil: null,
    mascota: null
  };
  services: any[] = [];
  selectedService: any;

  slidesOptions = {
    slidesPerView: 3.5,
    spaceBetween: 10,
    slidesOffsetBefore: 0
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private userService: UserService,
    private router: Router,
    private clinicaService: ServiciosClinica,
    private mascotasService: ServiciosMascotas,
    private fb: FormBuilder,
    private solicitudService: ServiciosSolicitudes) {
    this.solicform = this.fb.group({
      infoSolicitud: [''],
      service: ['', Validators.required],
      mascota: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.uid = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('user id', this.uid);
    this.getUserData();
    this.getServiciosClinica();
    this.getMascotas(this.uid);
  }

  handleChange(ev) {
    this.selectmascota = ev.target.value;
    this.solicform.get('service').setValue(this.selectmascota);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  getUserData() {
    this.userService.getDatosUsuario(this.uid).subscribe(data => {
      this.userData = data;
      this.mascotnum();
    });
  }

  mascotnum() {
    try {
      const lg = this.userData.mascota.length;
      const lhg = '0';
      //console.log('mascota => ', this.userData.mascota.length);
      if (lg === Number(lhg)) {
        this.presentAlert();
      }
    } catch (error) {
      if (this.userData.mascota === null) {
        this.presentAlert();
      }
    }
  }

  getServiciosClinica() {
    this.clinicaService.getServices().subscribe(data => {
      this.services = [];
      data.forEach((element: any) => {
        this.services.push({
          ...element.payload.doc.data(),
        });
      });
    });
  }

  getClinicasServicio(service: any) {
    this.solicitudService.getClinicasByService().subscribe((actionArray) => {
      this.clinicabyServicios = actionArray.map((item) => ({
        idC: item.payload.doc.id,
        nombreCli: item.payload.doc.data().nombreCli,
        numCelCli: item.payload.doc.data().numCelCli,
        numCelCliOp: item.payload.doc.data().numCelCliOp,
        calificacion: item.payload.doc.data().calificacion,
        ubicacion: {
          lat: item.payload.doc.data().ubicacion.lat,
          lng: item.payload.doc.data().ubicacion.lng,
        },
        serviciosClinica: item.payload.doc.data().serviciosClinica
      }));
      this.getCliFilterByService(service);
    });
  }

  getCliFilterByService(service: any) {
    this.clinicabyServiciosFilt = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.clinicabyServicios.length; i++) {
      console.log(this.clinicabyServicios[i].serviciosClinica.map(x => x.service === service));
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let y = 0; y < this.clinicabyServicios[i].serviciosClinica.length; y++) {
        const a = this.clinicabyServicios[i].serviciosClinica[y].service;
        if (a === service) {
          this.clinicabyServiciosFilt.push({
            idC: this.clinicabyServicios[i].idC,
            nombreCli: this.clinicabyServicios[i].nombreCli,
            numCelCli: this.clinicabyServicios[i].numCelCli,
            numCelCliOp: this.clinicabyServicios[i].numCelCliOp,
            calificacion: this.clinicabyServicios[i].calificacion,
            ubicacion: {
              lat: this.clinicabyServicios[i].ubicacion.lat,
              lng: this.clinicabyServicios[i].ubicacion.lng,
            },
            serviciosClinica: {
              precio: this.clinicabyServicios[i].serviciosClinica[y].precio,
              service: this.clinicabyServicios[i].serviciosClinica[y].service,
            }
          });
        }
      }
    }
    console.log('Lista filtrada => ', this.clinicabyServiciosFilt);
  }

  getMascotas(id: any) {
    this.mascotasService.getUserMascotas(id).subscribe(data => {
      this.mascotas = [];
      data.forEach((element: any) => {
        this.mascotas.push({
          idM: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    });
  }

  getSelectedService(serv: any) {
    this.setDefaultColor();
    this.selectedService = serv;
    // console.log(this.selectedService);
    this.solicform.get('mascota').setValue(serv);

    this.setColor(serv, 'var(--ion-color-myColor)');
  }

  setColor(serv: any, color: any) {
    const intro = document.getElementById(serv);
    intro.style.cssText = '--background: ' + color + ';';
  }

  setDefaultColor() {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let index = 0; index < this.services.length; index++) {
      this.setColor(this.services[index].service, '#D6B0F2');
    }
  }

  // ==================
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'AVISO',
      message: 'Para poder generar una solicitud debes agregar a tu amigo peludo.',
      buttons: [
        {
          text: '+ Agregar',
          role: 'confirm',
          handler: () => {
            console.log('go to agregar');
            this.goToRegisterMasc();
          },
        },
      ],
      mode: 'ios',
      backdropDismiss: false
    });

    await alert.present();
  }

  async selectErrAlert(err: any) {
    const alert = await this.alertController.create({
      header: 'AVISO',
      message: 'Debe seleccionar ' + err,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
          }
        },
      ],
      mode: 'ios',
      backdropDismiss: false
    });

    await alert.present();
  }

  async confirmAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmacion',
      message: 'Desea generar la solicitud?',
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
            //this.geneararSolicitud();
          },
        },
      ],
      mode: 'ios',
      backdropDismiss: false
    });

    await alert.present();
  }
  // ==================

  goToRegisterMasc() {
    this.router.navigate(['/mascotas-user', this.uid]);
  }

  goToHomeUser() {
    this.router.navigate(['/home-persona', this.uid]);
  }

  goToInicio() {
    this.lookSolicitud = true;
    this.solicform.get('service').setValue('');
    this.solicform.get('mascota').setValue('');
  }

  goTolocalizacion(idC: any) {
    this.setOpen(false);
    console.log(idC);
    this.lookSolicitud = false;
  }

  geneararSolicitud() {
    this.isModalOpen = true;
    if (this.selectedService === undefined) {
      this.selectErrAlert('el servicio para la solicitud');
    } else if (this.selectmascota === undefined) {
      this.selectErrAlert('la mascota');
    } else {
      this.getClinicasServicio(this.selectedService);
      console.log(this.clinicaService);
      // this.dataSolicitud.estadoSol = true;
      // this.dataSolicitud.service = this.selectedService;
      // //this.dataSolicitud.hora = ;
      // // data mascta
      // this.dataSolicitud.infoSolicitud = this.solicform.get('infoSolicitud').value;
      // this.dataSolicitud.mascota.nombreMasc = this.selectmascota.nombreMasc;
      // this.dataSolicitud.mascota.edad = this.selectmascota.edad;
      // this.dataSolicitud.mascota.raza = this.selectmascota.raza;
      // this.dataSolicitud.mascota.tipomascota = this.selectmascota.tipomascota;
      // // data usuario
      // this.dataSolicitud.uID = this.uid;
      // this.dataSolicitud.usuario.nombre = this.userData.nombres + ' ' + this.userData.apellidos;
      // this.dataSolicitud.usuario.numCel = this.userData.numCon;
      // // data clinica
      // //this.dataSolicitud.idC = ;
      // // this.dataSolicitud.ubicacion.lat = ;
      // // this.dataSolicitud.ubicacion.lng = ;
      // console.log(this.dataSolicitud);
    }
  }
}
