import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './Model/user';
import { environment as env } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }



  getUsers() {
    return this.http.get<User[]>('http://localhost:4432/MovieFilm/Users/list.php');
  }

  deleteUsers(id: number) {
    return this.http.delete<User[]>('http://localhost:4432/MovieFilm/Users/delete.php?id=' + id);

  }

  createUsers(user: User) {
    return this.http.post<User[]>(env.BASE_API_URL + env.APIs.createUser , user);

  }

  updateUsers(user: User) {
    return this.http.post<User[]>(env.BASE_API_URL + env.APIs.updateUser, user);
  }

  getUsersByID(id: any) {
    return this.http.get<User[]>(env.BASE_API_URL + 'MovieFilm/Users/getById.php?id=' + id).pipe(map(res => res || []));
  }

}
