export interface Curso {
    id: string;
    codigo: string;
    nombre: string;
    creditos: number;
    carrera: string; 
    estatus: 'Activo' | 'Inactivo';
}

//estatus: 'Planificado' | 'Abierto' | 'En curso' | 'Cerrado' | 'Cancelado';
