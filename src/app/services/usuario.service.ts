import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // It will inject this provider at the root level of the application so it can be accessed anywhere.
})
export class UsuarioService {


constructor(private firestore: AngularFirestore,
    private http: HttpClient) {}

  agregarUsuario(usuario: any): Promise<any> {
    return this.firestore.collection('usuarios').add(usuario)
  }

  getUsuarios(): Observable<any> {
    return this.firestore.collection('usuarios', ref => ref.orderBy('fechaCreacion', 'desc').limit(10)).snapshotChanges();
  }

  getUsuariosLimit(limit: number): Observable<any> {
    return this.firestore.collection('usuarios', ref => ref.orderBy('fechaCreacion', 'desc').limit(limit)).snapshotChanges();
  }

  eliminarUsuario(id:string): Promise<any> {
    return this.firestore.collection('usuarios').doc(id).delete();
  }

  getUsuario(id: string): Observable<any> {
    return this.firestore.collection('usuarios').doc(id).snapshotChanges();
  }

  actualizarUsuario(id:string, data: any): Promise<any> {
    return this.firestore.collection('usuarios').doc(id).update(data)
  }

  buscarUsuario(dato: string, valor: any){
    console.log(dato, valor)
    return this.firestore.collection('usuarios', ref => ref.where(dato, "==", valor)).snapshotChanges();
  }

  marcasAsistencia(asistencia: any): Promise<any> {
    return this.firestore.collection('asistencias').add(asistencia)
  }

  marcados(fecha: string){
    return this.firestore.collection('asistencias', ref => ref.where("fechaCreacion", "==", fecha)).snapshotChanges();
  }

  getAsistencias(): Observable<any> {
    return this.firestore.collection('asistencias', ref => ref.orderBy('fechaCreacion', 'desc')).get();
  }

  getAsistenciaUsuario(id:any){
    return this.firestore.collection('asistencias', ref => ref.where("id", "==", id)).get();
  }

  agregarPastoreador(pastoreador: any): Promise<any> {
    return this.firestore.collection('pastoreadores').add(pastoreador)
  }
  getPastoreadores(limit: number): Observable<any> {
    return this.firestore.collection('pastoreadores', ref => ref.orderBy('fechaCreacion', 'desc').limit(limit)).snapshotChanges();
  }

  buscarPastoreador(id:string): Observable<any> {
    return this.firestore.collection('pastoreadores').doc(id).get()
  }
}
