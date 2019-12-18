import { Injectable } from '@angular/core';
import { Commantaire } from '../Model/commantaire';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommantaireService {

  constructor(private http: HttpClient) { }

  getCommantaire() {
    return this.http.get<Commantaire[]>(env.BASE_API_URL + '/MovieFilm/Commantaire/list_commantaire.php');
  }

  DetailsCommantaireByID(id: any) {
    return this.http.get<Commantaire[]>(env.BASE_API_URL + 'MovieFilm/Commantaire/detailsById.php?id=' + id).pipe(map(res => res || []));
  }

  deleteCommantaire(id: number) {
    return this.http.delete<Commantaire[]>(env.BASE_API_URL + 'MovieFilm/Commantaire/delete.php?id=' + id);

  }
}
