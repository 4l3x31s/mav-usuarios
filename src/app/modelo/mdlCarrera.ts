export class MdlCarrera {
    constructor (
        public id: number,
        public idUsuario: number,
        public idConductora: number,
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
        public fechaInicio: string,
        public fechaFin: string,
        public tipoPago: string, // El tipo pago, (empresa, efectivo, total, deposito)
        public cobro: string,
        public estado: number, //1:solicitado (usuario), 2:aceptado (conductora), 3 terminado
        public nombreCliente: string,
        public nombreConductora: string,
        public enCamino: boolean,
        public ciudad: string,
        public pais: string
    ) {

    }
}