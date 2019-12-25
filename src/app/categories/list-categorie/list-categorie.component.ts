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

  constructor(private categorieService: CategorieService,
              private router: Router ) { }

  ngOnInit() {
    this.categorieService.getCategorie()
    .subscribe( (data: Categorie[]) => {

          this.categories = data;
          console.log(this.categories);

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


}
