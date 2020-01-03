import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ChartService } from './chart.service';
import { User } from '../Model/user';
import { Film } from '../Model/film';
import { Categorie } from '../Model/categorie';
import { Commantaire } from '../Model/commantaire';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token: string;
  BarChart = [];
  myLineChart = [];
  PieChart = [];
  users;
  films;
  categories;
  commantaires;
  pourcentage;
  // tslint:disable-next-line: variable-name
  chart_line: any;



  constructor(private router: Router,
              private chartService: ChartService,
  ) { }

  ngOnInit() {

    this.chartService.getAllUsers()
      .subscribe((data: any) => {

        this.users = data;
        this.chartBar();

      },
        err => {
          console.log(err);
        }
      );

    this.chartService.getAllFilms()
      .subscribe((data: any) => {

        this.films = data;
        this.chartBar();

        // console.log(this.films);

      },
        err => {
          console.log(err);
        }
      );

    this.chartService.getAllCategories()
      .subscribe((data: any) => {

        this.categories = data;
        this.chartBar();

        // console.log(this.categories);

      },
        err => {
          console.log(err);
        }
      );

    this.chartService.getAllCommantaire()
      .subscribe((data: any) => {

        this.commantaires = data;
        this.chartBar();

        // console.log(this.commantaires);

      },
        err => {
          console.log(err);
        }
      );

    this.chartService.PoucentTable()
      .subscribe((data: any) => {

        this.pourcentage = data;
        this.ChartPie();


      },
        err => {
          console.log(err);
        }
      );

    this.chartService.ChartLine()
      .subscribe((data: any) => {

        this.chart_line = data;
        this.chartLine();

        console.log('chart_line');
        console.log(this.chart_line);


      },
        err => {
          console.log(err);
        }
      );

    this.token = window.sessionStorage.getItem('token');
    // console.log(this.token);
    if (!this.token) {
      this.router.navigate(['login']);
    }



  }





  // pie chart:
  private ChartPie() {
    this.PieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['Utilisateurs', 'Film', 'Categorie', 'Commantaire'],
        datasets: [{
          label: '# of Votes',
          // tslint:disable-next-line: max-line-length
          data: [Number(this.pourcentage.pourcentageUser), Number(this.pourcentage.pourcentageFilm), Number(this.pourcentage.pourcentagecategorie), Number(this.pourcentage.pourcentagecommantaire) ],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgb(49, 143, 69, 0.2)',
            'rgb(23, 162, 184, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgb(49, 143, 69, 1)',
            'rgb(23, 162, 184, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: 'Chart de toute les tables avec pourcentage',
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  private chartBar() {
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Utilisateurs', 'Films', 'Categories', 'Commantaires'],
        datasets: [{
          label: '# des votes',
          data: [Number(this.users), Number(this.films), Number(this.categories), Number(this.commantaires)],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgb(49, 143, 69, 0.2)',
            'rgb(23, 162, 184, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgb(49, 143, 69, 1)',
            'rgb(23, 162, 184, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: 'Chart de toute les tables',
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }



private chartLine() {
  this.myLineChart = new Chart('mylineChart', {
    type: 'line',
    data: {
      labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      datasets: [{
        label: 'Le nombre d\'utilisateurs qui visitent ce site par mois',
        // tslint:disable-next-line: max-line-length
        data: [Number(this.chart_line.jan), Number(this.chart_line.feb), Number(this.chart_line.march), Number(this.chart_line.april), Number(this.chart_line.may), Number(this.chart_line.june), Number(this.chart_line.july), Number(this.chart_line.aug), Number(this.chart_line.sep), Number(this.chart_line.oct), Number(this.chart_line.nov), Number(this.chart_line.dec)],
        fill: false,
        lineTension: 0.2,
        borderColor: 'red',
        borderWidth: 1
      }]
    },
    options: {
      title: {
        text: 'Chart ligne',
        display: true
      },
      scales: {
        yAxes: [{
          stacked: true
        }]
      }
    }
  });
}

}

