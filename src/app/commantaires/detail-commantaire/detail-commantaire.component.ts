import { Component, OnInit } from '@angular/core';
import { CommantaireService } from '../commantaire.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Commantaire } from '../../Model/commantaire';

@Component({
  selector: 'app-detail-commantaire',
  templateUrl: './detail-commantaire.component.html',
  styleUrls: ['./detail-commantaire.component.css']
})
export class DetailCommantaireComponent implements OnInit {

  id: any;
  commantaires: Commantaire[];

  constructor(private commantaireService: CommantaireService,
              private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.DetailsCommantaireByID(this.id);
  }

  DetailsCommantaireByID(id: any) {
    this.commantaireService.DetailsCommantaireByID(id).subscribe(
      (data: Commantaire[]) => {

        this.commantaires = data;
        console.log(this.commantaires);

    },
    err => {
      console.log(err);
      }
      );
  }

}
