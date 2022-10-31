import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateEmail } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private objectSourse = new BehaviorSubject<any>({});
    // eslint-disable-next-line @typescript-eslint/member-ordering
    $getObjectSourse = this.objectSourse.asObservable();

    constructor(private auth: Auth, private firestore: AngularFirestore) { }

    register({ email, password }: any) {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    registrarUserCollection(data: any, id: string){
        const collection = this.firestore.collection('usuariosdb');
        return collection.doc(id).set(data);
    }

    login({ email, password }: any) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    resetPassword({email}: any) {
        try {
            return sendPasswordResetEmail(this.auth, email);
        } catch (error) {
            console.log(error);
        }
    }

    sendObjectSourse(data: any){
        this.objectSourse.next(data);
    }
}
