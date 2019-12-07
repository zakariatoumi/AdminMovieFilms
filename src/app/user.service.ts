import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

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
    return this.http.post<User[]>('http://localhost:4432/MovieFilm/Users/insert.php', user);

  }

}
