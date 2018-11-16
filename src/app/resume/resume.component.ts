import { Component, OnInit } from '@angular/core';
import { PortfolioDataService } from './../portfolioData.service'

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  constructor(public portfolioData:PortfolioDataService) { }

  ngOnInit() {
  }

}
