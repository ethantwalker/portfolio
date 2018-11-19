import { Component, OnInit } from '@angular/core';
import { PortfolioDataService } from './../portfolioData.service'
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss']
})
export class SamplesComponent implements OnInit {

  constructor(public portfolioData:PortfolioDataService, router:Router) { 
    router.events.forEach((e) => {
      if(this.portfolioData.isSelected){
        portfolioData.checkParams();
      } else {
        portfolioData.selected = null;
      }
    });
  }

  ngOnInit() {
    this.portfolioData.checkParams();
  }

}
