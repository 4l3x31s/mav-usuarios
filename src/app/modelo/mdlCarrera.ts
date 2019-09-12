export class MdlCarrera {
  constructor (
        public id: number,
        public idUsuario: number,
        public idConductora: number,
        public idContrato: number,
        public latInicio: number,
        public longInicio: number,
        public latFin: number,
        public longFin: number,
        public costo: number,
        public moneda: string,
        public califCliente: string,
        public califConductora: number, // 1-5
        public obsCliente: string,
        public obsConductora: string,
        public obsCarrera: string,
        public descLugar: string,
        public fechaInicio: string,
        public fechaFin: string,
        public tipoPago: string, // El tipo pago, (empresa, efectivo, total, deposito)
        public cobro: string,
        public estado: number, // 1: pendiente, 2: aceptado, 3 terminado
        public nombreCliente: string,
        public nombreConductora: string,
        public enCamino: boolean,
        public ciudad: string,
        public pais: string
    ) {

    }
}