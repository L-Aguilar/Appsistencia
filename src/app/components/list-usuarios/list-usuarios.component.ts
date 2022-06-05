import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.css']
})
export class ListUsuariosComponent implements OnInit {

  usuarios: any[] = [];
  nombrePastoreador: string = '';
  pastoreadores: any[] = [];
  idPastoreador: string = '';
  usuariosPage: any[] = [];
  usuariosInicio: number = 0;
  usuariosFin: number = 0;
  load: any = false;


  constructor(private _usuarioService: UsuarioService,
    private toastr: ToastrService) { }

  ngOnInit() {
  this.getPastoreadores()
  this.getUsuarios()
  }

  getUsuarios() {
    this.load = false;
    this._usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = [];
      this.nombrePastoreador = '';
      this.idPastoreador = ""
      data.forEach((element:any) => {
        let idPastoreador = element.payload.doc.data().pastoreador
        this.getPastoreador(idPastoreador)
        this.usuarios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
          pastoreador: this.nombrePastoreador
        })
      });
      this.load = true;
    })
    return
  }

  eliminarUsuario(id: string) {
    console.log('eliminando');
    this._usuarioService.eliminarUsuario(id).then(() => {
      this.toastr.success('', 'Usuario Eliminado');
    })
  }

  getPastoreadores(){
    this._usuarioService.getPastoreadores(10).subscribe(pastoreadores => {
      pastoreadores.forEach((pastoreador:any) => {
        let id = pastoreador.payload.doc.id
        this.pastoreadores.push({
          id: pastoreador.payload.doc.id,
          ...pastoreador.payload.doc.data()
        })
      })

    })
  }

  getPastoreador(id:any) {
    let pastoreador:any = this.pastoreadores.find(element => element.id === id);
    this.nombrePastoreador = pastoreador.nombre + " " + pastoreador.apellido
  }

}

