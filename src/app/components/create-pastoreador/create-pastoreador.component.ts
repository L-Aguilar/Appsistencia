import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-create-pastoreador',
  templateUrl: './create-pastoreador.component.html',
  styleUrls: ['./create-pastoreador.component.css']
})
export class CreatePastoreadorComponent implements OnInit {

  createPastoreador: FormGroup;
  submitted = false;
  loading: boolean = false;
  id: string | null;

  constructor(private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
      this.createPastoreador = this.fb.group({
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
    this.agregarEditarPastoreador()
    console.log(this.submitted)
  }

  agregarEditarPastoreador(){
    this.submitted = true;
    if(this.createPastoreador.invalid){
      return;
    }
    if(this.id === null){
      this.crearPastoreador();
    }else{
      this.editarPastoreador(this.id);
    }
  }

  crearPastoreador(){
    const pastoreador: any = {
      nombre: this.createPastoreador.value.nombre,
      apellido: this.createPastoreador.value.apellido,
      telefono: this.createPastoreador.value.telefono,
      genero: this.createPastoreador.value.genero,
      vivienda: this.createPastoreador.value.vivienda,
      email: this.createPastoreador.value.email,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._usuarioService.agregarPastoreador(pastoreador).then(() => {
      this.toastr.success('Pastoreador creado exitosamente!')
      this.router.navigate(['/dashboard']);
      this.loading = false;
    }).catch( err => {
      console.log("Error");
      this.loading = false;
    })
  }
  editarPastoreador(id:string){}

}
