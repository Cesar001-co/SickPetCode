import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.page.html',
  styleUrls: ['./ingresar.page.scss'],
})
export class IngresarPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoNewPassword(){
    this.router.navigate(['/new-password']);
  }

  gotoHome(){
    this.router.navigate(['/home']);
  }

  gotoLogin(){
    this.router.navigate(['/login']);
  }
}
