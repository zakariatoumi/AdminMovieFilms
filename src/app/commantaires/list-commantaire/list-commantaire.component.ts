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
  // tslint:disable-next-line: variable-name
  text_commantaire: string;
  p = 1;
  status = 0;


  public directionLinks = true;
  public autoHide = false;
  public responsive = true;
  public labels: any = {
      previousLabel: '<--',
      nextLabel: '-->',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };

  constructor(private commantaireService: CommantaireService,
              private router: Router) { }

  ngOnInit() {

    this.getCommantaire();

    this.commantaireService.getCommantaire()
    .subscribe( (data: Commantaire[]) => {

        this.commantaires = data;
        // console.log(this.commantaires);

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

  search() {
    // tslint:disable-next-line: triple-equals
    if (this.text_commantaire != '') {
      this.commantaires = this.commantaires.filter(res => {
        return res.text_commantaire.toLocaleLowerCase().match(this.text_commantaire.toLocaleLowerCase());
      });
    // tslint:disable-next-line: triple-equals
    } else if (this.text_commantaire == '') {
      this.ngOnInit();
    }

  }

  inputSelected(id, valid) {

    // tslint:disable-next-line: triple-equals
    this.status = (valid == 0) ? 1 : 0 ;

    this.commantaireService.changeuserstatus(id, this.status).subscribe(res => {
      // refrach data
      this.getCommantaire();
    });

  }
  private getCommantaire() {
    this.commantaireService.getCommantaire()
    .subscribe( (data: Commantaire[]) => {
        this.commantaires = [];
        this.commantaires = data;

    },
    err => {
      console.log(err);
      }
    );
  }

}
