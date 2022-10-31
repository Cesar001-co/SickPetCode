import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ubicacion-cli',
  templateUrl: './ubicacion-cli.page.html',
  styleUrls: ['./ubicacion-cli.page.scss'],
})
export class UbicacionCliPage implements OnInit {

  constructor(private userService: UserService, private router: Router, private alertController: AlertController, private fb: FormBuilder) {

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
  }

}
