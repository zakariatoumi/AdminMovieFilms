import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AddFilmComponent } from './films/add-film/add-film.component';
import { ListFilmsComponent } from './films/list-films/list-films.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
//import { FormsModule } from '@angular/forms';


const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'AjouterFilm', component: AddFilmComponent },
  { path: 'listFilms', component: ListFilmsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },


];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddFilmComponent,
    ListFilmsComponent,
    LoginComponent,
    RegisterComponent,
    //FormsModule,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
