import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { Film } from '../Model/film';
import { Categorie } from '../Model/categorie';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  DetailsFilmByID(id: any) {
    return this.http.get<Film[]>(env.BASE_API_URL + 'MovieFilm/Films/detailsById.php?id=' + id).pipe(map(res => res || []));
  }

  deleteFilms(id: number) {
    return this.http.delete<Film[]>('http://localhost:4432/MovieFilm/Films/delete.php?id=' + id);

  }

  getFilmsByID(id: any) {
    return this.http.get<Film[]>(env.BASE_API_URL + 'MovieFilm/Films/getById.php?id=' + id).pipe(map(res => res || []));
  }

  updateFilms(film: Film) {
    return this.http.post<Film[]>(env.BASE_API_URL + 'MovieFilm/Films/update.php', film);
  }
}
