import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-ver-teen',
  templateUrl: './ver-teen.component.html',
  styleUrls: ['./ver-teen.component.css']
})
export class VerTeenComponent implements OnInit {

  Usuario: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo:string = 'Crear Usuario';
  asistencia: any[] = [];
  nombrePastoreador: string = ''
  idPastoreador: string = ''

  constructor(private fb: FormBuilder,
              private _usuarioService: UsuarioService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) {
    this.Usuario = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      genero: ['', Validators.required],
      vivienda: ['', Validators.required],
      pastoreador: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.setUsuario()
  }

  setUsuario(){
    if(this.id !== null){
      this.titulo = 'Editar Usuario';
      this.loading= true;
      this._usuarioService.getUsuario(this.id).subscribe(data => {
        this.loading = false;
        this.idPastoreador = data.payload.data().pastoreador

          this._usuarioService.buscarPastoreador(this.idPastoreador).subscribe(pastoreador => {
            this.nombrePastoreador = pastoreador.data()['nombre'] + " " + pastoreador.data()['apellido']

            this.Usuario.setValue({
              nombre: data.payload.data()['nombre'],
              telefono: data.payload.data()['telefono'],
              genero: data.payload.data()['genero'],
              vivienda: data.payload.data()['vivienda'],
              pastoreador: this.nombrePastoreador,
            })

          })

      })
      this._usuarioService.getAsistenciaUsuario(this.id).subscribe(data => {
        this.asistencia = []
        this.nombrePastoreador = ""
        this.idPastoreador = ""

        data.forEach((element:any) => {
          this.asistencia.push({
            ...element.data()
          })
        });
      })
      //console.log('asistencias',this.asistencia)
    }
  }

}
