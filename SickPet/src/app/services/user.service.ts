import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, confirmPasswordReset } from '@angular/fire/auth';
import { UserReg } from '../models/models';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root'
})

export class UserService{

    constructor(private auth: Auth) {}

    register({ email, password1}: any) {
        return createUserWithEmailAndPassword(this.auth, email, password1);
    }

    login({email, password}: any){
        return signInWithEmailAndPassword(this.auth, email, password);
    }

}
