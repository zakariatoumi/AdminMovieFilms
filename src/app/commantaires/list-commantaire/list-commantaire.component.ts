import { Component, OnInit } from '@angular/core';
import { CommantaireService } from '../commantaire.service';
import { Commantaire } from '../../Model/commantaire';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-commantaire',
  templateUrl: './list-commantaire.component.html',
  styleUrls: ['./list-commantaire.component.css']
})
export class ListCommantaireComponent implements OnInit {
  commantaires: Commantaire[];
  token: string;

  constructor(private commantaireService: CommantaireService,
              private router: Router) { }

  ngOnInit() {
    this.commantaireService.getCommantaire()
    .subscribe( (data: Commantaire[]) => {

        this.commantaires = data;
        console.log(this.commantaires);

    },
    err => {
      console.log(err);
      }
    );

    this.token =  window.localStorage.getItem('token');
    console.log(this.token);
    if (!this.token) {
    this.router.navigate(['login']);
  }

  }


  delete(commantaires: Commantaire): void {
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
        this.commantaireService.deleteCommantaire(commantaires.id)
        .subscribe( (data: Commantaire[]) => {
          this.commantaires = this.commantaires.filter(u => u !== commantaires);
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
