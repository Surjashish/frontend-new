import { Component, OnInit } from '@angular/core';
import { Articles } from './articles'
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-trendingvideos',
  templateUrl: './trendingvideos.component.html',
  styleUrls: ['./trendingvideos.component.css']
})
export class TrendingvideosComponent implements OnInit {
  public articles={};
  public USArticles = {};
  public SportsArticles = {};
  public BusinessArticles = {};
  constructor(private apiService : NewsService) { }


  ngOnInit() {
    this.apiService.getApi().subscribe(data => this.articles = data);
    this.apiService.getApiforUS().subscribe(data => this.USArticles = data);
    this.apiService.getApiforSports().subscribe(data => this.SportsArticles = data);
    this.apiService.getApiforBusiness().subscribe(data => this.BusinessArticles = data);


    console.log(this.articles);
  }
  
}
