import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../Model/user';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  users: User[];
  messageErr: string;
  token: string;
  config: any;
  nom: string;
  p: number=1;

  // public maxSize: number = 10;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
      previousLabel: '<--',
      nextLabel: '-->',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };

  constructor(private userService: UserService,
              private router: Router) {}


  ngOnInit() {
    this.userService.getUsers()
    .subscribe( (data: User[]) => {

        this.users = data;
        // console.log(this.users);

    },
    err => {
      console.log(err);
      }
    );

    this.token =  window.sessionStorage.getItem('token');
    // console.log(this.token);
    if (!this.token) {
    this.router.navigate(['login']);
  }
  }

  delete(users: User): void {
    Swal.fire({
      title: 'Vous êtes sur?',
      text: 'Vous ne pourrez pas revenir sur cela!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUsers(users.id)
        .subscribe( (data: User[]) => {
          this.users = this.users.filter(u => u !== users);
          Swal.fire(
            'Effacé!',
            'Votre utilisateur a été supprimé.',
            'success'
          );
        });
      }
    });
  }

  search() {
    // tslint:disable-next-line: triple-equals
    if (this.nom != '') {
      this.users = this.users.filter(res => {
        return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase());
      });
    // tslint:disable-next-line: triple-equals
    } else if (this.nom == '') {
      this.ngOnInit();
    }

  }

}
