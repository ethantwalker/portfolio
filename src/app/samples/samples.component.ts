import { Component, OnInit } from '@angular/core';
import { PortfolioDataService } from './../portfolioData.service'

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss']
})
export class SamplesComponent implements OnInit {

  constructor(public portfolioData:PortfolioDataService) { }

  ngOnInit() {
  }

}
