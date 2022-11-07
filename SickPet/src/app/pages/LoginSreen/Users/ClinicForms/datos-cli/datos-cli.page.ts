import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { UbicacionCliPage } from '../ubicacion-cli/ubicacion-cli.page';

@Component({
  selector: 'app-datos-cli',
  templateUrl: './datos-cli.page.html',
  styleUrls: ['./datos-cli.page.scss'],
})
export class DatosCliPage implements OnInit {
  createCli: FormGroup;
  datos = {};

  ubicacionClinica = {
    ubicacion: null
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private alertController: AlertController,
    private fb: FormBuilder,
    private modalControl: ModalController) {
    this.createCli = this.fb.group({
      nombreCli: ['', [Validators.required, Validators.minLength(2)]],
      nit: ['', [Validators.required, Validators.minLength(5)]],
      numCelCli: ['', [Validators.required, Validators.minLength(7)]],
      numCelCliOp: ['']
    });
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
  // ==================================================

  ngOnInit() {
    this.userService.$getObjectSourse.subscribe(data => {
      this.datos = data;
      console.log('data =>',data);
    }).unsubscribe();
    console.log('DATOS =>',this.datos);
  }

  btnNext() {
    console.log('datos ->', this.createCli);
    this.datos = {...this.datos, ...this.createCli.value, ...this.ubicacionClinica};
    console.log(this.datos);
    this.userService.sendObjectSourse(this.datos);
    this.router.navigate(['/services-cli']);
  }

  async addDirection(){
    const ubicacion = this.ubicacionClinica.ubicacion;

    const modalAdd = await this.modalControl.create({
      component: UbicacionCliPage,
      mode:'ios',
      //swipeToClose: true,
    });
    await modalAdd.present();
    const {data} = await modalAdd.onWillDismiss();
    if (data) {
      console.log('data ->', data);
      this.ubicacionClinica.ubicacion = data.pos;
      console.log(this.ubicacionClinica);
    }
  }
}
