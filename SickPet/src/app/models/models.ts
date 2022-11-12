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
    nit: string;
    numCelCli: string;
    numCelCliOp: string;
    ubicacion: {
        lat: string;
        lng: string;
    };
    serviciosClinica: [
        {
            id: string;
            precio: number;
            service: string;
            isselected: boolean;
        }
    ];
}

export interface MascotaData {
    uID: string;
    mascotaTipe: {
        idTipo: string;
        tipomascota: string;
    };
    nombreMasc: string;
    edad: string;
    raza: string;
    inf: string;
}

export interface TipoMascota {
    idTipo: string;
    tipomascota: string;
}
