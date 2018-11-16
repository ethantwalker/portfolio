import { Component, OnInit } from '@angular/core';
import { PortfolioDataService } from '../portfolioData.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(public portfolioData:PortfolioDataService) { }

  ngOnInit() {
    this.portfolioData.redirectToLogin();
  }

}
