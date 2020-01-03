import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get( env.BASE_API_URL + 'MovieFilm/Chart/Count_user.php');
  }

  getAllFilms() {
    return this.http.get( env.BASE_API_URL + 'MovieFilm/Chart/Count_film.php');
  }

  getAllCategories() {
    return this.http.get( env.BASE_API_URL + 'MovieFilm/Chart/Count_categorie.php');
  }

  getAllCommantaire() {
    return this.http.get( env.BASE_API_URL + 'MovieFilm/Chart/Count_commantaire.php');
  }

  PoucentTable() {
    return this.http.get( env.BASE_API_URL + 'MovieFilm/Chart/PorsantageUser.php');
  }

  ChartLine() {
    return this.http.get( env.BASE_API_URL + 'MovieFilm/Chart/chartLine.php');
  }
}
