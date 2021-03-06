import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

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
import { DetailsFilmsComponent } from './films/details-films/details-films.component';
import { SafePipePipe } from './safe-pipe.pipe';
import { EditFilmComponent } from './films/edit-film/edit-film.component';
import { ListCategorieComponent } from './categories/list-categorie/list-categorie.component';
import { AddCategorieComponent } from './categories/add-categorie/add-categorie.component';
import { EditCategorieComponent } from './categories/edit-categorie/edit-categorie.component';
import { ListCommantaireComponent } from './commantaires/list-commantaire/list-commantaire.component';
import { DetailCommantaireComponent } from './commantaires/detail-commantaire/detail-commantaire.component';
import { AccueilComponent } from './accueil/accueil.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'accueil', component: AccueilComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'AjouterFilm', component: AddFilmComponent },
      { path: 'listFilms', component: ListFilmsComponent },
      { path: 'AjouterUser', component: RegisterComponent },
      { path: 'view', component: ViewComponent },
      { path: 'edit/:id', component: EditUserComponent },
      { path: 'details/:id', component: DetailsFilmsComponent },
      { path: 'EditFilm/:id', component: EditFilmComponent },
      { path: 'listCategorie', component: ListCategorieComponent },
      { path: 'addCategorie', component: AddCategorieComponent },
      { path: 'editCategorie/:id', component: EditCategorieComponent },
      { path: 'listCommantaire', component: ListCommantaireComponent },
      { path: 'detailCommantaire/:id', component: DetailCommantaireComponent }
    ]
  }
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
    DetailsFilmsComponent,
    SafePipePipe,
    EditFilmComponent,
    ListCategorieComponent,
    AddCategorieComponent,
    EditCategorieComponent,
    ListCommantaireComponent,
    DetailCommantaireComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
