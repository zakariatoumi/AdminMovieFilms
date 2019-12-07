import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
    .subscribe( (data: User[]) => {
        this.users = data;
        console.log(this.users);
    });
  }

  delete(users: User): void {
    this.userService.deleteUsers(users.id)
    .subscribe( (data: User[]) => {
      this.users = this.users.filter(u => u !== users);
    });
  }

}
