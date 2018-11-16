import { Component, OnInit } from '@angular/core';
import { PortfolioDataService } from './../portfolioData.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public portfolioData:PortfolioDataService) { }

  ngOnInit() {
  }

}
