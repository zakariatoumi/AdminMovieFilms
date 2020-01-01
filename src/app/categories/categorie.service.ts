import { Injectable } from '@angular/core';
import { Categorie } from '../Model/categorie';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  changeuserstatus(id, status) {
    return this.http.get<Categorie[]>(env.BASE_API_URL + 'MovieFilm/Categorie/getByIdValide.php?id=' + id + '&status=' + status);
  }

  constructor(private http: HttpClient) { }

  addCategorie(categorie: Categorie) {
    return this.http.post<Categorie[]>(env.BASE_API_URL + 'MovieFilm/Categorie/add_categorie.php', categorie);
  }

  getCategorie() {
    return this.http.get<Categorie[]>(env.BASE_API_URL + '/MovieFilm/Categorie/list_categorie.php');
  }

  deleteCategorie(id: number) {
    return this.http.delete<Categorie[]>(env.BASE_API_URL + '/MovieFilm/Categorie/delete.php?id=' + id);

  }

  getCategorieByID(id: any) {
    return this.http.get<Categorie[]>(env.BASE_API_URL + 'MovieFilm/Categorie/getById.php?id=' + id).pipe(map(res => res || []));
  }

  updateCategorie(categorie: Categorie) {
    return this.http.post<Categorie[]>(env.BASE_API_URL + 'MovieFilm/Categorie/update.php', categorie);
  }
}
