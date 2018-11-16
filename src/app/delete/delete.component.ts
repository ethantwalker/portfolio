import { Component, OnInit } from '@angular/core';
import { PortfolioDataService } from '../portfolioData.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(public portfolioData:PortfolioDataService) { }

  ngOnInit() {
    this.portfolioData.redirectToLogin();
  }

}
