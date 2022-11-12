import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ServiciosMascotas {

    constructor( private firestore: AngularFirestore){ }

    getTipos(): Observable<any> {
        return this.firestore.collection('tipomascotadb').snapshotChanges();
    }

    registrarMascotaCollection(data: any){
        const collection = this.firestore.collection('mascotasdb');
        return collection.add(data);
    }

    actualizarMascotaCollection(data: any, id: string){
        const collection = this.firestore.collection('mascotasdb');
        return collection.doc(id).update(data);
    }

    getMascotaData(idm: any): Observable<any> {
        return this.firestore.collection('mascotasdb').doc(idm).snapshotChanges();
    }

    getUserMascotas(uid: any): Observable<any> {
        return this.firestore.collection('mascotasdb', ref => ref.where('uID','==',uid)).snapshotChanges();
    }

    deleteMascota(idM: any) {
        return this.firestore.collection('mascotasdb').doc(idM).delete();
    }
}
