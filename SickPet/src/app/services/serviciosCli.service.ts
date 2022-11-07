import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ServiciosClinica {

    constructor(private firestore: AngularFirestore) { }

    getServices(): Observable<any> {
        return this.firestore.collection('servicedb').snapshotChanges();
    }

    registrarClinicaCollection(data: any, id: string){
        const collection = this.firestore.collection('clinicasdb');
        return collection.doc(id).set(data);
    }
}
