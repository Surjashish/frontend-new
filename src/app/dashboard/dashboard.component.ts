import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboard:DashboardService) { }

  ngOnInit() {
    console.log(localStorage.getItem('jwt'));
      let obj = this.dashboard.checkToken(JSON.stringify(localStorage.getItem('jwt')));
      console.log("sur " + obj);
      let username = obj.sub;
      console.log(username);
      this.dashboard.getUser(username).subscribe((data) => {
        console.log(data);
      })
  }

    // Number of cards to be generated with column and rows to be covered  

    cards = [  

      { title: 'Card 1', cols: 1, rows: 1 },  
  
      { title: 'Card 2', cols: 1, rows: 1 },  
  
      { title: 'Card 3', cols: 1, rows: 1 },  
  
      { title: 'Card 4', cols: 1, rows: 1 } ,
      { title: 'Card 5', cols: 1, rows: 1 },
      { title: 'Card 6', cols: 1, rows: 1 } 
  
    ];  

}
