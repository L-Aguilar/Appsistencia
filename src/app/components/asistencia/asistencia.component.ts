import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

  fecha: any = Date.now();
  hoy = new Date(this.fecha).toISOString().slice(0, 10);
  usuarios: any[] = [];
  usuariosMarcados: any[] = [];
  busqueda: any[] = [];
  noEncontrado: any = false;
  id: string | null;
  buscador: boolean = true;
  termino: string = '';

  constructor(private _usuarioService: UsuarioService,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) {

    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.marcados()
  }


  buscar(telefono: string) {
    this.noEncontrado = false;
    if(telefono !== ""){
      this._usuarioService.buscarUsuario("telefono",telefono).subscribe(data => {
        this.usuarios = [];
        this.busqueda = [];
        data.forEach((element:any) => {
          this.usuarios.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        });
        if(this.usuarios.length > 0){
          this.busqueda = this.usuarios;
        }else{
          this.noEncontrado = true;
        }
      })
    }else{
      this.usuarios = [];
        this.busqueda = [];
    }
  }
  marcarAsistencia(id: string) {
    if(this.usuariosMarcados.filter(usuario => usuario.id === id).length > 0){
      this.toastr.warning('Ya se marco asistencia');
    }else{
      const usuario = this.usuarios.filter(usuario => usuario.id === id);
      const asistencia: any ={
        id: usuario[0].id,
        nombre: usuario[0].nombre,
        telefono: usuario[0].telefono,
        createAt: new Date(),
        fechaCreacion: new Date().toISOString().slice(0, 10)
      }
      this._usuarioService.marcasAsistencia(asistencia).then(() => {
        this.toastr.success('Asistencia marcada');
      }).catch(err => {
        console.log('error');
      })
    }
  }

  marcados(){
    let fecha: any = ""
    if(this.id !== null){
      fecha = this.id
      this.hoy = this.id
      this.buscador = false;
    }else{
      fecha = this.hoy
    }

    this._usuarioService.marcados(fecha).subscribe(data => {
      this.usuariosMarcados = [];
      data.forEach((element:any) => {
        this.usuariosMarcados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      //const today = new Date(this.usuariosMarcados[0].fechaCreacion.toDate()).toISOString().slice(0, 10)
      console.log(fecha);
    })
  }

}
