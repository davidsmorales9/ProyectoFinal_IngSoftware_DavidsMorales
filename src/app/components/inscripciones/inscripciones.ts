import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InscripcionService } from '../../services/inscripcion';
import { Inscripcion } from '../../models/inscripcion';
import { CursoService } from '../../services/curso';
import { Curso } from '../../models/curso';
import { ESTATUS_INSCRIPCION, PERIODOS_INSCRIPCION } from '../../models/inscripcion';

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inscripciones.html',
  styleUrl: './inscripciones.css'
})
export class Inscripciones implements OnInit {
  inscripciones: Inscripcion[] = [];
  cursosDisponibles: Curso[] = [];
  formInscripcion!: FormGroup;
  modoEdicion: boolean = false;
  idEdicion: string | null = null;

  // Catálogos dinámicos sincronizados con el modelo (cero valores quemados)
  listaEstatus = ESTATUS_INSCRIPCION;
  listaPeriodos = PERIODOS_INSCRIPCION;

  constructor(
    private fb: FormBuilder,
    private inscripcionService: InscripcionService,
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarDatos();
  }

  // Inicialización del chasis del formulario con valores por defecto válidos para habilitar el botón
  inicializarFormulario(): void {
    this.formInscripcion = this.fb.group({
      estudianteId: ['', Validators.required],
      cursoId: ['', Validators.required],
      fechaInscripcion: ['', Validators.required],
      periodo: ['Matutino', Validators.required],
      estatus: ['Registrada', Validators.required]
    });
  }

// Sincronización de datos desde el almacenamiento local utilizando la clave real del curso (codigo)
  cargarDatos(): void {
    this.inscripciones = this.inscripcionService.getInscripciones();
    this.cursosDisponibles = this.cursoService.getCursos();

    // Si existen cursos y el control está vacío, preseleccionamos la clave 'codigo' del primer curso
    if (this.cursosDisponibles.length > 0 && !this.formInscripcion.get('cursoId')?.value) {
      const primerCurso = this.cursosDisponibles[0];
      this.formInscripcion.patchValue({ cursoId: primerCurso.codigo || primerCurso.id });
    }
  }

  guardarInscripcion(): void {
    if (this.formInscripcion.invalid) return;

    const datos = this.formInscripcion.value;
    const payload: Inscripcion = {
      id: this.idEdicion || '',
      estudianteId: datos.estudianteId,
      cursoId: datos.cursoId,
      fechaInscripcion: datos.fechaInscripcion,
      periodo: datos.periodo,
      estatus: datos.estatus
    };

    if (this.modoEdicion) {
      this.inscripcionService.actualizarInscripcion(payload);
    } else {
      this.inscripcionService.agregarInscripcion(payload);
    }

    this.resetearFormulario();
    this.cargarDatos();
  }

  editarInscripcion(ins: Inscripcion): void {
    this.modoEdicion = true;
    this.idEdicion = ins.id;
    this.formInscripcion.patchValue(ins);
  }

  eliminarInscripcion(id: string): void {
    if (confirm('¿Desea eliminar esta inscripción?')) {
      this.inscripcionService.eliminarInscripcion(id);
      this.cargarDatos();
    }
  }

  resetearFormulario(): void {
    this.modoEdicion = false;
    this.idEdicion = null;
    this.formInscripcion.reset({ periodo: 'Matutino', estatus: 'Registrada' });
  }
}