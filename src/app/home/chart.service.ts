import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Model/user';
import { Film } from '../Model/film';
import { Categorie } from '../Model/categorie';
import { environment as env } from 'src/environments/environment';
import { Commantaire } from '../Model/commantaire';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get( env.BASE_API_URL + 'MovieFilm/Chart/list_user.php');
  }

  getAllFilms() {
    return this.http.get( env.BASE_API_URL + 'MovieFilm/Chart/list_film.php');
  }

  getAllCategories() {
    return this.http.get( env.BASE_API_URL + 'MovieFilm/Chart/list_categorie.php');
  }

  getAllCommantaire() {
    return this.http.get( env.BASE_API_URL + 'MovieFilm/Chart/list_commantaire.php');
  }
}
