export interface UserReg {
    nombres: string;
    apellidos: string;
    uID: string;
    email: string;
    numDoc: string;
    numCon: string;
    perfil: 'per' | 'cli';
    mascota: [
        {
            idM: string;
        }
    ];
}

export interface UserClinica {
    uID: string;
    nombreCli: string;
    calificacion: string;
    nit: string;
    numCelCli: string;
    numCelCliOp: string;
    ubicacion: {
        lat: string;
        lng: string;
    };
    serviciosClinica: [
        {
            precio: number;
            service: string;
            isselected: boolean;
        }
    ];
}

export interface MascotaData {
    uID: string;
    tipomascota: string;
    nombreMasc: string;
    edad: string;
    raza: string;
    inf: string;
}

export interface TipoMascota {
    idTipo: string;
    tipomascota: string;
}

export interface Solicitud {
    uID: string;
    idC: string;
    estadoSol: boolean;
    end: boolean;
    service: string;
    hora: string;
    infoSolicitud: string;
    mascota: {
        nombreMasc: string;
        edad: string;
        raza: string;
        info: string;
        tipomascota: string;
    };
    usuario: {
        nombre: string;
        numCel: string;
    };
    ubicacion: {
        lat: string;
        lng: string;
    };
}

export interface SolClinica {
    idC: string;
    nombreCli: string;
    numCelCli: string;
    numCelCliOp: string;
    calificacion: string;
    ubicacion: {
        lat: string;
        lng: string;
    };
    serviciosClinica: [
        {
            precio: number;
            service: string;
        }
    ];
}

export interface SolClinicafil {
    idC: string;
    nombreCli: string;
    numCelCli: string;
    numCelCliOp: string;
    calificacion: string;
    ubicacion: {
        lat: string;
        lng: string;
    };
    serviciosClinica: {
        precio: number;
        service: string;
    }
    ;
}
