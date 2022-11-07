export interface UserReg{
    nombres: string;
    apellidos: string;
    uID: string;
    email: string;
    numDoc: string;
    numCon: string;
    perfil: 'per'|'cli';
    mascota: [
        {
            idmas: string;
        }
    ];
}

export interface UserClinica{
    uID: string;
    nombreCli: string;
    nit: string;
    numCelCli: string;
    numCelCliOp: string;
    ubicacion: {
      lat: string;
      lng: string;
    };
    serviciosClinica: any;
}
