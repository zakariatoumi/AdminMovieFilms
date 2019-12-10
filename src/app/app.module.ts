import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AddFilmComponent } from './films/add-film/add-film.component';
import { ListFilmsComponent } from './films/list-films/list-films.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './users/view/view.component';
import { HttpClientModule } from '@angular/common/http';
import { EditUserComponent } from './users/edit-user/edit-user.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'AjouterFilm', component: AddFilmComponent },
  { path: 'listFilms', component: ListFilmsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'view', component: ViewComponent },
  { path: 'edit/:id', component: EditUserComponent },


];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddFilmComponent,
    ListFilmsComponent,
    LoginComponent,
    RegisterComponent,
    ViewComponent,
    EditUserComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true },

    ),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
