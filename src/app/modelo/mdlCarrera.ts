export class MdlCarrera {
    constructor (
        public id: number,
        public idUsuario: number,
        public idCarrera: number,
        public idContrato: number,
        public latInicio: string,
        public longInicio: string,
        public latFin: string,
        public longFin: string,
        public costo: number,
        public moneda: string,
        public califCliente: string,
        public califConductora: string,
        public obsCliente: string,
        public obsConductora: string,
        public obsCarrera: string,
        public descLugar: string,
        public fecha: string,
        public horaInicio: string,
        public horaFin: string,
        public tipoPago: string, // El tipo pago, (empresa, efectivo, total, deposito)
        public cobro: string,
        public estado: boolean
    ) {

    }
}