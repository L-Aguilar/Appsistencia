import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.css']
})
export class CreateUsuarioComponent implements OnInit {

  createUsuario: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo:string = 'Crear Usuario';
  pastoreadores: any[] = [];
  asistencia: any[] = [];

  constructor(private fb: FormBuilder,
              private _usuarioService: UsuarioService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) {
    this.createUsuario = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      genero: ['', Validators.required],
      vivienda: ['', Validators.required],
      pastoreador: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getPastoreadores()
    this.esEditar()
    }

  agregarEditarUsuario(){
    this.submitted = true;
    if(this.createUsuario.invalid){
      return;
    }
    if(this.id === null){
      this.crearUsuario();
    }else{
      this.editarUsuario(this.id);
    }
  }
  crearUsuario(){
    const usuario: any ={
      nombre: this.createUsuario.value.nombre,
      telefono: this.createUsuario.value.telefono,
      genero: this.createUsuario.value.genero,
      vivienda: this.createUsuario.value.vivienda,
      pastoreador: this.createUsuario.value.pastoreador,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._usuarioService.agregarUsuario(usuario).then(() => {
      this.toastr.success('Usuario agregado con éxito', 'Usuario Registrado');
      this.loading = false;
      this.router.navigate(['/list-usuarios']);
    }).catch( err => {
      console.log("Error");
      this.loading = false;
    })
  }

  editarUsuario(id: string){
    const usuario: any ={
      nombre: this.createUsuario.value.nombre,
      telefono: this.createUsuario.value.telefono,
      genero: this.createUsuario.value.genero,
      vivienda: this.createUsuario.value.vivienda,
      pastoreador: this.createUsuario.value.pastoreador,
      fechaActualizacion: new Date()
    }
    this.loading = true;

    this._usuarioService.actualizarUsuario(id, usuario).then(()=>{
      this.loading = false;
      this.toastr.success('Usuario Actualizado')
    });
  }
  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Usuario';
      this.loading= true;
      this._usuarioService.getUsuario(this.id).subscribe(data => {
        this.loading = false;
        this.createUsuario.setValue({
          nombre: data.payload.data()['nombre'],
          telefono: data.payload.data()['telefono'],
          genero: data.payload.data()['genero'],
          vivienda: data.payload.data()['vivienda'],
          pastoreador: data.payload.data()['pastoreador'],
        })
      })
    }
  }

  getPastoreadores(){
    this._usuarioService.getPastoreadores(100).subscribe(data => {
      this.pastoreadores = [];
      data.forEach((element:any) => {
        this.pastoreadores.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })
    })
  }

  getAsistencias(){
    this._usuarioService.getAsistenciaUsuario(this.id).subscribe(data => {
      this.asistencia = []
      data.forEach((element:any) => {
        this.asistencia.push({
          ...element.data()
        })
      });
    })
  }

}
