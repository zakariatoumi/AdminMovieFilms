import { Component, OnInit } from '@angular/core';
import { Film } from '../../Model/film';
import { FilmService } from '../../films/film.service';

@Component({
  selector: 'app-list-films',
  templateUrl: './list-films.component.html',
  styleUrls: ['./list-films.component.css']
})
export class ListFilmsComponent implements OnInit {
  film: Film[];

  constructor(private filmService: FilmService) { }

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

}
