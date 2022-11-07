import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserReg } from 'src/app/models/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-tipes',
  templateUrl: './user-tipes.page.html',
  styleUrls: ['./user-tipes.page.scss'],
})
export class UserTipesPage implements OnInit {

  userdata = {
    uID: '',
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    repeatPassword: '',
    numDoc: '',
    numCel: ''
  };

  datos: UserReg = {
    nombres: null,
    apellidos: null,
    uID: null,
    email: null,
    numDoc: null,
    numCon: null,
    perfil: null,
    mascota: [null],
  };

  constructor(private router: Router, private alertController: AlertController, private userService: UserService) {
    this.userService.$getObjectSourse.subscribe(data => {
      this.userdata = data;
    }).unsubscribe();
  }

  ngOnInit() {
  }

  // ==================================================
  async confirmAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmacion',
      message: 'Usuario registrado con exito',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Algo mal ocurrio, verifica tu email',
      buttons: ['OK']
    });
    this.router.navigate(['/sigin']);
    await alert.present();
  }
  // ==================================================

  async presentAlertPersona() {
    const alert = await this.alertController.create({
      header: 'Aviso!',
      subHeader: 'Mensaje importante',
      message: 'Confirmar seleccion PERSONA ',
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
            console.log('confirmado');
            this.agregarUsuer();
            //this.goToIngresar();
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlertClinica() {
    const alert = await this.alertController.create({
      header: 'Aviso!',
      subHeader: 'Mensaje importante',
      message: 'Confirmar seleccion CLINICA, debera llenar informacion importante sobre la clinica.',
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
            console.log('confirmado');
            this.router.navigate(['/datos-cli']);
          },
        },
      ],
    });

    await alert.present();
  }

  goToIngresar() {
    this.router.navigate(['/ingresar']);
  }

  async agregarUsuer() {
    console.log('datos ->', this.userdata);
    const res = await this.userService.register(this.userdata)
      .catch(error => {
        this.errorAlert();
      });
    if (res) {
      this.confirmAlert();
      this.router.navigate(['/register-confi']);
      const id = res.user.uid;
      this.datos.uID = id;
      this.datos.nombres = this.userdata.nombre;
      this.datos.apellidos = this.userdata.apellidos;
      this.datos.email = this.userdata.email;
      this.datos.numDoc = this.userdata.numDoc;
      this.datos.numCon = this.userdata.numCel;
      this.datos.perfil = 'per';
      this.userService.registrarUserCollection(this.datos, id);
    }
  }
}
