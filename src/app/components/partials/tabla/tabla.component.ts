import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  @Input() usuarios: any[] = []
  usuariosPage: any[] = []

  constructor() { }

  ngOnInit() {
  }

  showTabla(data: any[]){
    this.usuariosPage = data;
  }

}
