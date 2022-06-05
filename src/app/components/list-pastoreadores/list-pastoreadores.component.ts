import { UsuarioService } from '../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-pastoreadores',
  templateUrl: './list-pastoreadores.component.html',
  styleUrls: ['./list-pastoreadores.component.css']
})
export class ListPastoreadoresComponent implements OnInit {
  pastoreadores: any[] = []
  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getPastoreadores()
  }

  getPastoreadores(){
    this._usuarioService.getPastoreadores(100).subscribe(data => {
      this.pastoreadores = [];
      data.forEach((pastoreador: any) => {
        this.pastoreadores.push({
          id: pastoreador.payload.doc.id,
          ...pastoreador.payload.doc.data()
        })
      })
      console.log(this.pastoreadores)
    })
  }

}
