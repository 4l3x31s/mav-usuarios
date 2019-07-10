export class MdlConductora {
    constructor(
        public id: number,
        public nombre: string,
        public paterno: string,
        public materno: string,
        public fechaNac: string,
        public ci: string,
        public tipoLicencia: string,
        public direccion: string,
        public genero: string,
        public nroCtaBancaria: string,
        public telefono: number,
        public celular: number,
        public nroResidencia: number,
        public user: string,
        public email: string,
        public pass: string,
        public lat: string,
        public long: string,
        public pais: string,
        public ciudad: string,
        public ui: string,
        public foto,
        public admin: boolean,
        public estado: boolean
    ) {

    }
}