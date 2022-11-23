import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Calif, UserClinica } from '../models/models';


@Injectable({
    providedIn: 'root'
})

export class ServiciosSolicitudes {
    calificaciones: Calif[] = [];
    clinica: UserClinica = {
        uID: '',
        nombreCli: '',
        calificacion: '',
        nit: '',
        numCelCli: '',
        numCelCliOp: '',
        ubicacion: {
            lat: '',
            lng: ''
        },
        serviciosClinica: [null]
    };

    constructor(private firestore: AngularFirestore) { }

    getClinicasByService(): Observable<any> {
        return this.firestore.collection('clinicasdb').snapshotChanges();
    }

    generarSolicitudCollection(id: any, data: any) {
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

    calificarClinica(data: any, idC: any) {
        return this.firestore.collection('calificacionesdb').add(data).then(dat => {
            this.getCal(idC).subscribe((ref: any) => {
                if (ref) {
                    this.calificaciones = [];
                    ref.forEach((element: any) => {
                        this.calificaciones.push({
                            ...element.payload.doc.data()
                        });
                    });
                    let sum = 0;
                    // eslint-disable-next-line @typescript-eslint/prefer-for-of
                    for (let index = 0; index < this.calificaciones.length; index++) {
                        sum = sum + this.calificaciones[index].calificacion;
                    }
                    this.getClinica(idC).subscribe((datos: any) => {
                        if (datos) {
                            this.clinica = datos;
                            const cali = sum / this.calificaciones.length;
                            this.clinica.calificacion = ('' + cali).substring(0, 3);
                            this.setCalificacionCli(idC, this.clinica);
                        }
                    });
                }
            });
        });

    }

    setCalificacionCli(idc: any, cal: any) {
        return this.firestore.collection('clinicasdb').doc(idc).set(cal);
    }

    getCal(idC: any): Observable<any> {
        return this.firestore.collection('calificacionesdb', ref => ref.where('idC', '==', idC)).snapshotChanges();
    }
}

interface Calificacion {
    calificacion: string;
}
