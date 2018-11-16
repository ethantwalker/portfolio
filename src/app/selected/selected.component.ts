import { Component, OnInit } from '@angular/core';
import { PortfolioDataService } from './../portfolioData.service';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss']
})
export class SelectedComponent implements OnInit {

  constructor(public portfolioData:PortfolioDataService) { }

  ngOnInit() {
    this.portfolioData.setSelectedSample();
  }

}
