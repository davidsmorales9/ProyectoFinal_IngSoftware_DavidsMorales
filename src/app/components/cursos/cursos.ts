
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Curso } from '../../models/curso';
import { CursoService } from '../../services/curso';

@Component({
  selector: 'app-cursos',
  standalone: true,
  
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css'
})
export class Cursos implements OnInit { 
  private fb = inject(FormBuilder);
  private cursoService = inject(CursoService);

  cursos: Curso[] = [];
  formCurso!: FormGroup;
  modoEdicion: boolean = false;
  idEdicion: string | null = null;

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarCursos();
  }

  inicializarFormulario(): void {
    this.formCurso = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      creditos: [3, [Validators.required, Validators.min(1), Validators.max(10)]],
      carrera: ['', Validators.required],
      estatus: ['Activo', Validators.required]
    });
  }

  cargarCursos(): void {
    this.cursos = this.cursoService.getCursos();
  }

  guardarCurso(): void {
    if (this.formCurso.invalid) return;

    const datos = this.formCurso.value;
    const cursoPayload: Curso = {
      id: this.idEdicion || '',
      codigo: datos.codigo,
      nombre: datos.nombre,
      creditos: Number(datos.creditos),
      carrera: datos.carrera,
      estatus: datos.estatus
    };

    if (this.modoEdicion && this.idEdicion !== null) {
      this.cursoService.actualizarCurso(cursoPayload);
    } else {
      this.cursoService.agregarCurso(cursoPayload);
    }

    this.resetearFormulario();
    this.cargarCursos();
  }

  editarCurso(curso: Curso): void {
    this.modoEdicion = true;
    this.idEdicion = curso.id;
    this.formCurso.patchValue({
      codigo: curso.codigo,
      nombre: curso.nombre,
      creditos: curso.creditos,
      carrera: curso.carrera,
      estatus: curso.estatus
    });
  }

  eliminarCurso(id: string): void {
    if (confirm('¿Deseas eliminar este curso?')) {
      this.cursoService.eliminarCurso(id);
      this.cargarCursos();
    }
  }

  resetearFormulario(): void {
    this.modoEdicion = false;
    this.idEdicion = null;
    this.formCurso.reset({ estatus: 'Activo', creditos: 3 });
  }
}