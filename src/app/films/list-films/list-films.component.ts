import { Component, OnInit } from '@angular/core';
import { Film } from '../../Model/film';
import { FilmService } from '../../films/film.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-films',
  templateUrl: './list-films.component.html',
  styleUrls: ['./list-films.component.css']
})
export class ListFilmsComponent implements OnInit {
  titreFilm: string;

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
  p: number=1;
  status = 0


  constructor(private filmService: FilmService,
              sanitizer: DomSanitizer,
              private router: Router ) { }
  film: Film[];
  token: string;
  addForm: FormGroup;


  ngOnInit() {
    this.getFilms();

    this.token =  window.localStorage.getItem('token');
    console.log(this.token);
    if (!this.token) {
    this.router.navigate(['login']);
  }
  }

  private getFilms() {
    this.filmService.getFilms()
      .subscribe((data: Film[]) => {
        this.film = [];
        this.film = data;
      }, err => {
        console.log(err);
      });
  }

  delete(films: Film): void {
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
        this.filmService.deleteFilms(films.id)
        .subscribe( (data: Film[]) => {
          this.film = this.film.filter(u => u !== films);
          Swal.fire(
            'Effacé!',
            'Votre utilisateur a été supprimé.',
            'success'
          );
        });
      }
    });
  }

  inputSelected(id,valid) {
    console.log('id');
    console.log(valid);
    this.status = (valid == 0) ? 1:0;
    this.filmService.changeuserstatus(id,this.status).subscribe(res => {
      // refrach data
      this.getFilms();
    });
  }

  search() {
    // tslint:disable-next-line: triple-equals
    if (this.titreFilm != '') {
      this.film = this.film.filter(res => {
        return res.titre_film.toLocaleLowerCase().match(this.titreFilm.toLocaleLowerCase());
      });
    // tslint:disable-next-line: triple-equals
    } else if (this.titreFilm == '') {
      this.ngOnInit();
    }

  }




}
