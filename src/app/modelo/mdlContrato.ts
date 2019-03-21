export class MdlContrato {
    constructor(
        public id: number,
        public idUsuario: number,
        public idConductora: number,
        public fechaInicio: string,
        public fechaFin: string,
        public latOrigen: string,
        public longOrigen: string,
        public cantidadPasajeros: number,
        public latDestino: string,
        public longDestino: string,
        public montoTotal: number,
        public dias: string, // los dias seran separados con pipes, ejemplo(Lu|Ma|Mi|Ju|Vi|Sa|Do)
        public hora: string,
        public tipoPago: string,
        public estadoPago: string,
        public estado: boolean
    ) {

    }
}