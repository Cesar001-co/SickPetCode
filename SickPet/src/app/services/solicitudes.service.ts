import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Calif } from '../models/models';

@Injectable({
    providedIn: 'root'
})

export class ServiciosSolicitudes {
    calificaciones: Calif [] = [];

    constructor(private firestore: AngularFirestore) { }

    getClinicasByService(): Observable<any> {
        return this.firestore.collection('clinicasdb').snapshotChanges();
    }

    generarSolicitudCollection(id: any, data: any){
        const collection = this.firestore.collection('solicitudesdb');
        return collection.doc(id).set(data);
    }

    getSolicitudbyUser(uid: string): Observable<any> {
        return this.firestore.collection('solicitudesdb').doc(uid).valueChanges();
    }

    deleteSolicitud(id: any) {
        return this.firestore.collection('solicitudesdb').doc(id).delete();
    }

    getClinica(id: any): Observable<any> {
        return this.firestore.collection('clinicasdb').doc(id).valueChanges();
    }

    calificarClinica(data: any, idC) {
        this.calificaciones = [];
        this.firestore.collection('calificacionesdb').add(data).then(dat => {
            this.getCal(idC).subscribe(ref => {
                this.calificaciones.push({
                    ...ref.payload.doc.data()
                });
            });
            let sum = 0;
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for (let index = 0; index < this.calificaciones.length; index++) {
                sum = sum + this.calificaciones[index].calificacion;
            }
            const calificacion = sum / this.calificaciones.length;
        });

    }

    getCal(idC: any): Observable<any> {
        return this.firestore.collection('calificacionesdb', ref => ref.where('idC','==',idC)).snapshotChanges();
    }
}
