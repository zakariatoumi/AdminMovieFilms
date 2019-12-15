import { Component, OnInit } from '@angular/core';
import { Film } from '../../Model/film';
import { FilmService } from '../../films/film.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-films',
  templateUrl: './list-films.component.html',
  styleUrls: ['./list-films.component.css']
})
export class ListFilmsComponent implements OnInit {
  film: Film[];

  constructor(private filmService: FilmService,
              sanitizer: DomSanitizer, ) { }

  ngOnInit() {
    this.filmService.getFilms()
    .subscribe( (data: Film[]) => {

        this.film = data;
        console.log(this.film);

    },
    err => {
      console.log(err);
      }
    );
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

}
