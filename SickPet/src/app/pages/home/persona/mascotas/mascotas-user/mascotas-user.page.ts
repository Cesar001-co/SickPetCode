import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { UserReg } from 'src/app/models/models';
import { ServiciosMascotas } from 'src/app/services/mascotas.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mascotas-user',
  templateUrl: './mascotas-user.page.html',
  styleUrls: ['./mascotas-user.page.scss'],
})
export class MascotasUserPage implements OnInit {

  uid: any;
  mascotas: MascotaData[] = [];
  as: any;

  userData: UserReg;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: ActionSheetController,
    private mascotasService: ServiciosMascotas,
    private userService: UserService,
    private router: Router) { }

  // ==========================================
  async deleteActionSheet(name: any, id: any) {
    const actionSheet = await this.alertController.create({
      header: 'Eliminar mascota',
      subHeader: 'Desea ELIMINAR mascota ' + name,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deleteMascota(id);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
      mode: 'ios'
    });

    await actionSheet.present();
  }
  // ==========================================

  ngOnInit() {
    this.uid = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('user id', this.uid);
    this.getMascotas(this.uid);

    this.getUserData();
  }

  goToAdd() {
    this.router.navigate(['/registrarmascota', this.uid]);
  }

  goToHome() {
    this.router.navigate(['/home-persona', this.uid]);
  }

  goToSettings(idm: any) {
    this.router.navigate(['/mascotasform', idm, this.uid]);
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
      console.log('macotas => ', this.mascotas);
    });
  }

  deleteMascota(idm: any) {
    this.as = '';
    this.mascotasService.deleteMascota(idm)
      .then(ac => {
        this.as = this.userData.mascota.filter(item => item.idM !== idm);
        this.userData.mascota = this.as;
        console.log(this.userData.mascota);
        this.userService.actualizarUserCollection(this.userData, this.uid);
      });
  }

  getUserData() {
    this.userService.getDatosUsuario(this.uid).subscribe(data => {
      this.userData = data;
    });
  }
}

interface MascotaData {
  idM: string;
  uID: string;
  mascotaTipe: {
    idTipo: string;
    tipomascota: string;
  };
  nombreMasc: string;
  edad: string;
  raza: string;
  inf: string;
}
