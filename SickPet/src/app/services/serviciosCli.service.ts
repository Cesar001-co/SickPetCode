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
        const collection = this.firestore.collection('clinicasdb').doc(id).set(data);
    }

    getClinica(idC: any): Observable<any> {
        return this.firestore.collection('clinicasdb').doc(idC).valueChanges();
    }

    getSolicitudesbyClinc(idC: any): Observable<any> {
        return this.firestore.collection('solicitudesdb', ref => ref.where('idC','==',idC)).snapshotChanges();
    }

    updateSolicitud(idSol: any, data: any) {
        return this.firestore.collection('solicitudesdb').doc(idSol).set(data);
    }

    getSolicitud(idSol: any): Observable<any> {
        return this.firestore.collection('solicitudesdb').doc(idSol).valueChanges();
    }
}
