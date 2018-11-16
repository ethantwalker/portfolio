import { Component, OnInit } from '@angular/core';
import { PortfolioDataService } from './portfolioData.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PortfolioDataService]
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(public portfolioData:PortfolioDataService, private router:Router){}

  ngOnInit(){
    this.portfolioData.load();
  }
}
