import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../categorie.service';
import { Categorie } from '../../Model/categorie';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.css']
})
export class ListCategorieComponent implements OnInit {
  categories: Categorie[];
  token: string;
  libelle: string;
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

  constructor(private categorieService: CategorieService,
              private router: Router ) { }

  ngOnInit() {

    this.getCategorie();

    this.categorieService.getCategorie()
    .subscribe( (data: Categorie[]) => {

          this.categories = data;
          // console.log(this.categories);

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


  delete(categories: Categorie): void {
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
        this.categorieService.deleteCategorie(categories.id)
        .subscribe( (data: Categorie[]) => {
          this.categories = this.categories.filter(u => u !== categories);
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
    if (this.libelle != '') {
      this.categories = this.categories.filter(res => {
        return res.libelle.toLocaleLowerCase().match(this.libelle.toLocaleLowerCase());
      });
    // tslint:disable-next-line: triple-equals
    } else if (this.libelle == '') {
      this.ngOnInit();
    }

  }

  inputSelected(id, valid) {
    // tslint:disable-next-line: triple-equals
    this.status = (valid == 0) ? 1 : 0 ;
    this.categorieService.changeuserstatus(id, this.status).subscribe(res => {
      // refrach data
      this.getCategorie();
    });
  }
  private getCategorie() {
    this.categorieService.getCategorie()
      .subscribe((data: Categorie[]) => {
        this.categories = [];
        this.categories = data;
      }, err => {
        console.log(err);
      });
  }


}
