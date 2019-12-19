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
  users: User[];
  films: Film[];
  categories: Categorie[];
  commantaires: Commantaire[];



  constructor(private router: Router,
              private chartService: ChartService,
               ) { }

  ngOnInit() {

    this.chartService.getAllUsers()
    .subscribe( (data: User[]) => {

        this.users = data;
        console.log(this.users);

    },
    err => {
      console.log(err);
      }
    );

    this.chartService.getAllFilms()
    .subscribe( (data: Film[]) => {

        this.films = data;
        console.log(this.films);

    },
    err => {
      console.log(err);
      }
    );

    this.chartService.getAllCategories()
    .subscribe( (data: Categorie[]) => {

        this.categories = data;
        console.log(this.categories);

    },
    err => {
      console.log(err);
      }
    );

    this.chartService.getAllCommantaire()
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



    this.BarChart = new Chart('barChart', {
  type: 'bar',
  data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
    title: {
      text: 'Bar Chart',
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

    this.myLineChart = new Chart('mylineChart', {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
        label: 'Number of Items Sold in Months',
        data: [9, 7 , 3, 5, 2, 10, 15, 16, 19, 3, 1, 9],
        fill: false,
        lineTension: 0.2,
        borderColor: 'red',
        borderWidth: 1
    }]
   },

  options: {
    title: {
      text: 'Line Chart',
      display: true
  },
    scales: {
        yAxes: [{
            stacked: true
        }]
    }
}
});

// pie chart:
    this.PieChart = new Chart('pieChart', {
  type: 'pie',
data: {
 labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
 datasets: [{
     label: '# of Votes',
     data: [9, 7 , 3, 5, 2, 10],
     backgroundColor: [
         'rgba(255, 99, 132, 0.2)',
         'rgba(54, 162, 235, 0.2)',
         'rgba(255, 206, 86, 0.2)',
         'rgba(75, 192, 192, 0.2)',
         'rgba(153, 102, 255, 0.2)',
         'rgba(255, 159, 64, 0.2)'
     ],
     borderColor: [
         'rgba(255,99,132,1)',
         'rgba(54, 162, 235, 1)',
         'rgba(255, 206, 86, 1)',
         'rgba(75, 192, 192, 1)',
         'rgba(153, 102, 255, 1)',
         'rgba(255, 159, 64, 1)'
     ],
     borderWidth: 1
 }]
},
options: {
 title: {
     text: 'Bar Chart',
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

}
