export class MdlParametrosCarrera {
    constructor (
        public id: number,
        public ciudad: string,
        public pais: string,
        public base: number,
        public cuotaSolicitud: number,
        public tarifaMinima: number,
        public tiempo: number,
        public distancia: number,
        public tarifaDinamica: number,
        public peajes: number
    ) {}
}