import { Component, OnInit } from '@angular/core';
import { PortfolioDataService } from '../portfolioData.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  constructor(public portfolioData:PortfolioDataService) { }

  ngOnInit() {
    this.portfolioData.redirectToLogin();
  }

}
