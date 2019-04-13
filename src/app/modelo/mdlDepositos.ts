export class MdlDepositos {
    constructor(
        public id: number,
        public idCliente: number,
        public tipo: string,
        public fecha: string,
        public monto: number,
        public verificado: boolean,
        public observaciones: string
    ) {

    }
}