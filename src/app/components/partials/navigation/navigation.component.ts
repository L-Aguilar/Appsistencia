import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input() usuarios: any[] = []
  @Output() onUserPorPage: EventEmitter<any[] > = new EventEmitter();

  totalPage: number = 0
  cantidad: number = 10;
  usuariosPage: any[] = [];
  usuariosInicio: number = 0;
  usuariosFin: number = 0;

  constructor() {
  }

  ngOnInit() {
    this.pagination(this.cantidad)
  }

  counter(i: number) {
    return new Array(+i);
  }

  pagination(cantidad: number) {
    if(this.usuarios.length <= cantidad){
      this.usuariosFin = this.usuarios.length;
    }else{
      this.totalPage = this.usuarios.length/cantidad;
      this.usuariosFin = cantidad;
    }
    this.usuariosPage = this.usuarios.slice(this.usuariosInicio, cantidad);
    this.onUserPorPage.emit(this.usuariosPage)

  }

  next(){
    if(this.usuariosFin < this.usuarios.length){
      this.usuariosInicio = this.usuariosInicio+this.cantidad;
      this.usuariosFin = this.usuariosInicio+this.cantidad;
      this.usuariosPage = this.usuarios.slice(this.usuariosInicio, this.usuariosFin);
      this.onUserPorPage.next(this.usuariosPage)
      //console.log(this.usuariosInicio, this.usuariosFin, this.usuarios)
    }

  }

  previous(){
    if(this.usuariosInicio > 0){
      this.usuariosInicio = this.usuariosInicio-this.cantidad;
      this.usuariosFin = this.usuariosInicio+this.cantidad;
      this.usuariosPage = this.usuarios.slice(this.usuariosInicio, this.usuariosFin);
      this.onUserPorPage.next(this.usuariosPage)
    }
    //console.log(this.usuariosInicio, this.usuariosFin, this.usuarios)
  }

  numberPage(page: number){
      this.usuariosInicio = this.cantidad*page;
      this.usuariosFin = this.usuariosInicio+this.cantidad;
      this.usuariosPage = this.usuarios.slice(this.usuariosInicio, this.usuariosFin);
      this.onUserPorPage.next(this.usuariosPage)
      console.log(this.usuariosInicio, this.usuariosFin, this.usuarios)
  }

}
