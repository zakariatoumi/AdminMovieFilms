import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { Film } from '../Model/film';
import { Categorie } from '../Model/categorie';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient) { }

  getCategorie() {
    return this.http.get<Categorie[]>(env.BASE_API_URL + 'MovieFilm/Categorie/list_categorie.php');
  }

  getFilms() {
    return this.http.get<Film[]>(env.BASE_API_URL + '/MovieFilm/Films/list_Film.php');
  }

  addFilms(film: Film) {
    return this.http.post<Film[]>(env.BASE_API_URL + 'MovieFilm/Films/insert_film.php', film);
  }
}
