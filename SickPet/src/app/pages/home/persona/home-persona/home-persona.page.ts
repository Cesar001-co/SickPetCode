import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserReg } from 'src/app/models/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-persona',
  templateUrl: './home-persona.page.html',
  styleUrls: ['./home-persona.page.scss'],
})
export class HomePersonaPage implements OnInit {

  uid: any;

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.uid = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('user id', this.uid);
    this.getUserData();
  }

  getUserData() {
    this.userService.getDatosUsuario(this.uid).subscribe(data => {
      this.userData = data;
      console.log(this.userData);
      this.mascotnum();
    });
  }

  mascotnum() {
    try {
      const lg = this.userData.mascota.length;
      const lhg = '0';
      console.log('mascota => ', this.userData.mascota.length);
      if (lg === Number(lhg)) {
        console.log('Error: NO TIENE MASCOTAS');
        this.presentAlert();
      } else {
        console.log('SI TIENE MASCOTAS');
      }
    } catch (error) {
      if (this.userData.mascota === null) {
        console.log('Error: NO TIENE MASCOTAS');
        this.presentAlert();
      } else {
        console.log('SI TIENE MASCOTAS');
      }
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
  // ==================

  goToRegisterMasc() {
    this.router.navigate(['/mascotas-user', this.uid]);
  }
}
