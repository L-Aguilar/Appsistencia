import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-ver-pastoreador',
  templateUrl: './ver-pastoreador.component.html',
  styleUrls: ['./ver-pastoreador.component.css']
})
export class VerPastoreadorComponent implements OnInit {
  Usuario: FormGroup;
  teens: any[] = [];
  id: string | null;
  loading: boolean = false;
  submitted: boolean = false;

  constructor(private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
      this.Usuario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      genero: ['', Validators.required],
      vivienda: ['', Validators.required],
      email: ['', Validators.required]
      })
      this.id = this.aRoute.snapshot.paramMap.get('id');
    }

  ngOnInit() {
    this.getPastoreador(this.id);
    this.getTeens()
  }

  getPastoreador(id:any) {
    this._usuarioService.buscarPastoreador(id).subscribe(pastoreador => {
      console.log(pastoreador.data());
      this.Usuario.setValue({
        nombre: pastoreador.data()['nombre'],
        apellido: pastoreador.data()['apellido'],
        telefono: pastoreador.data()['telefono'],
        genero: pastoreador.data()['genero'],
        vivienda: pastoreador.data()['vivienda'],
        email: pastoreador.data()['email'],
      })
    })
  }

  getTeens(){
    this._usuarioService.buscarUsuario("pastoreador", this.id).subscribe(results => {
      this.teens = [];
      results.forEach((teen:any) => {
        console.log(teen.payload.doc.get);
        this.teens.push({
          id: teen.payload.doc.id,
          ...teen.payload.doc.data()
        })
      })
    })
    console.log(this.teens)
  }

}

