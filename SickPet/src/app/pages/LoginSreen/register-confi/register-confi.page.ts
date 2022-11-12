import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-confi',
  templateUrl: './register-confi.page.html',
  styleUrls: ['./register-confi.page.scss'],
})
export class RegisterConfiPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoLogin(){
    this.router.navigate(['/login']);
  }
}
