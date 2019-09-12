export class MdlContrato {
    constructor(
        public id: number,
        public idUsuario: number,
        public idConductora: number,
        public fechaInicio: string,
        public fechaFin: string,
        public latOrigen: number,
        public longOrigen: number,
        public cantidadPasajeros: number,
        public latDestino: number,
        public longDestino: number,
        public montoTotal: number,
        public dias: string, // los dias seran separados con pipes, ejemplo(Lu|Ma|Mi|Ju|Vi|Sa|Do)
        public hora: string,
        public tipoPago: string,
        public estadoPago: string,
        public estado: number, // 0 estimado(creado por el cliente), 1 aprobado, 2 terminado, 3 extendido.
        public pais: string,
        public ciudad: string,
        public codigoContrato: string,
        public generoCarrera: boolean,
        public dirOrigen: string,
        public dirDestino: string
    ) {

    }
}