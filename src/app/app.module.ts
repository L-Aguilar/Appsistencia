import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { ListUsuariosComponent } from './components/list-usuarios/list-usuarios.component';
import { CreateUsuarioComponent } from './components/create-usuario/create-usuario.component';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { NgChartsModule } from 'ng2-charts';
import { VerTeenComponent } from './components/ver-teen/ver-teen.component';
import { CreatePastoreadorComponent } from './components/create-pastoreador/create-pastoreador.component';
import { ListPastoreadoresComponent } from './components/list-pastoreadores/list-pastoreadores.component';
import { VerPastoreadorComponent } from './components/ver-pastoreador/ver-pastoreador.component';
import { ImportsTeensComponent } from './components/imports-teens/imports-teens.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './components/partials/navigation/navigation.component';
import { TablaComponent } from './components/partials/tabla/tabla.component';

@NgModule({
  declarations: [
    AppComponent,
    ListUsuariosComponent,
    CreateUsuarioComponent,
    AsistenciaComponent,
    DashboardComponent,
    VerTeenComponent,
    VerPastoreadorComponent,
    CreatePastoreadorComponent,
    ListPastoreadoresComponent,
    ImportsTeensComponent,
    NavigationComponent,
    TablaComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgChartsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
