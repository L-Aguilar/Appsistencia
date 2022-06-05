import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsuariosComponent } from './components/list-usuarios/list-usuarios.component';
import { CreateUsuarioComponent } from './components/create-usuario/create-usuario.component';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VerTeenComponent } from './components/ver-teen/ver-teen.component';
import { CreatePastoreadorComponent } from './components/create-pastoreador/create-pastoreador.component';
import { ListPastoreadoresComponent } from './components/list-pastoreadores/list-pastoreadores.component';
import { VerPastoreadorComponent } from './components/ver-pastoreador/ver-pastoreador.component';
import { ImportsTeensComponent } from './components/imports-teens/imports-teens.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'list-usuarios', component: ListUsuariosComponent },
  { path: 'pastoreadores', component: ListPastoreadoresComponent},
  { path: 'crear-usuario', component: CreateUsuarioComponent },
  { path:'crear-pastoreador', component: CreatePastoreadorComponent },
  { path: 'editar-usuario/:id', component: CreateUsuarioComponent },
  { path: 'asistencias', component: AsistenciaComponent },
  { path: 'asistencia/:id', component: AsistenciaComponent },
  { path: 'ver-teen/:id', component: VerTeenComponent },
  { path: 'pastoreador/:id', component: VerPastoreadorComponent },
  { path: 'imports', component: ImportsTeensComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: 'list-usuarios', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
