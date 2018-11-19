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
        portfolioData.checkParams();
    });
  }

  ngOnInit() {
    this.portfolioData.checkParams();
  }

}
