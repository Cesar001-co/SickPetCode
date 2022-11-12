import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { UserClinica, UserReg } from 'src/app/models/models';
import { ServiciosClinica } from 'src/app/services/serviciosCli.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-services-cli',
  templateUrl: './services-cli.page.html',
  styleUrls: ['./services-cli.page.scss'],
})
export class ServicesCliPage implements OnInit {
  datos = {
    //Datos user
    uID: '',
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    repeatPassword: '',
    numDoc: '',
    numCel: '',
    //DatosClinica
    nombreCli: '',
    nit: '',
    numCelCli: '',
    numCelCliOp: '',
    ubicacion: {
      lat: '',
      lng: ''
    },
    serviciosClinica: null
  };

  userData: UserReg = {
    nombres: null,
    apellidos: null,
    uID: null,
    email: null,
    numDoc: null,
    numCon: null,
    perfil: null,
    mascota: null,
  };

  datosClinica: UserClinica = {
    uID: null,
    nombreCli: null,
    nit: null,
    numCelCli: null,
    numCelCliOp: null,
    ubicacion: {
      lat: null,
      lng: null
    },
    serviciosClinica: null
  };

  services: any[] = [];

  servicesList: getser[];
  precio: any;
  serviciosPrecioList: servicesList[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private alertController: AlertController,
    private clinicaService: ServiciosClinica) {

  }

  ngOnInit() {
    this.userService.$getObjectSourse.subscribe(data => {
      this.datos = data;
      console.log('data =>', data);
    }).unsubscribe();

    this.getServiciosClinica();
  }

  // ==================================================
  async cancelAlert() {
    const alert = await this.alertController.create({
      header: 'Aviso!',
      message: 'Si cancela perdera todo el progreso',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('cancelado');
          },
        },
        {
          text: 'CONFIRMAR',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }

  async confirmAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmacion',
      message: 'Usuario registrado con exito',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async confirmregisterAlert() {
    const alert = await this.alertController.create({
      header: 'Aviso!',
      subHeader: 'Mensaje importante',
      message: 'Confirmar Registro clinica ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('cancelado');
          },
        },
        {
          text: 'CONFIRMAR',
          role: 'confirm',
          handler: () => {
            this.agregaClinica();
          },
        },
      ],
    });

    await alert.present();
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Algo mal ocurrio, verifica tu email',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/login']);
          },
        }
      ]
    });
    await alert.present();
  }

  // ==================================================

  async agregaClinica() {
    this.datos = {
      ...this.datos,
      serviciosClinica: this.serviciosPrecioList
    };
    console.log(this.datos);

    console.log('DATOS CLINICA ->', this.datos);

    const res = await this.userService.register(this.datos)
      .catch(error => {
        this.errorAlert();
      });
    if (res) {
      const id = res.user.uid;
      this.userData.uID = id;
      this.userData.nombres = this.datos.nombre;
      this.userData.apellidos = this.datos.apellidos;
      this.userData.email = this.datos.email;
      this.userData.numDoc = this.datos.numDoc;
      this.userData.numCon = this.datos.numCel;
      this.userData.perfil = 'cli';

      this.userService.registrarUserCollection(this.userData, id);
      //guardar clinica
      this.datosClinica.uID = id;
      this.datosClinica.nombreCli = this.datos.nombreCli;
      this.datosClinica.nit = this.datos.nit;
      this.datosClinica.numCelCli = this.datos.numCelCli;
      this.datosClinica.numCelCliOp = this.datos.numCelCliOp;
      this.datosClinica.ubicacion = this.datos.ubicacion;
      this.datosClinica.serviciosClinica = this.datos.serviciosClinica;

      console.log(this.datosClinica);
      this.clinicaService.registrarClinicaCollection(this.datosClinica, id);
      this.confirmAlert();
      this.router.navigate(['/register-confi']);
    }
  }

  getServiciosClinica() {
    this.clinicaService.getServices().subscribe(data => {
      this.services = [];
      data.forEach((element: any) => {
        this.services.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
          precio: this.precio,
          isselected: false,
        });
      });
      this.servicesList = this.services;
    });
  }

  onchange() {
    this.serviciosPrecioList = this.servicesList.filter(x => x.isselected === true);
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
class getser {
  id: any;
  service: any;
  precio: any;
  isselected: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
class servicesList {
  id: any;
  service: any;
  precio: any;
}
