import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ServiciosSolicitudes {
    constructor(private firestore: AngularFirestore) { }

    getClinicasByService(): Observable<any> {
        return this.firestore.collection('clinicasdb')
        .snapshotChanges();
    }
}
