import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, ValiderEmail } from './Model/user';
import { environment as env } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiResponse } from './Model/api-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(loginData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(env.BASE_API_URL + 'MovieFilm/Users/login.php', loginData);
  }

  getUsers() {
    return this.http.get<User[]>('http://localhost:4432/MovieFilm/Users/list.php');
  }

  deleteUsers(id: number) {
    return this.http.delete<User[]>('http://localhost:4432/MovieFilm/Users/delete.php?id=' + id);

  }

  createUsers(user: User) {
    return this.http.post<User[]>(env.BASE_API_URL + env.APIs.createUser, user);
  }

  valideEmail() {
    return this.http.get<ValiderEmail[]>(env.BASE_API_URL + env.APIs.createUser);
  }

  updateUsers(user: User) {
    return this.http.post<User[]>(env.BASE_API_URL + env.APIs.updateUser, user);
  }

  getUsersByID(id: any) {
    return this.http.get<User[]>(env.BASE_API_URL + 'MovieFilm/Users/getById.php?id=' + id).pipe(map(res => res || []));
  }


  changeuserstatus(id, status) {

    return this.http.get<User[]>(env.BASE_API_URL + 'MovieFilm/Users/getByIdValide.php?id=' + id + '&status=' + status);
  }

}
