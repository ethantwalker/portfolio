import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PortfolioDataService } from './portfolioData.service';
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SamplesComponent } from './samples/samples.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ResumeComponent } from './resume/resume.component';
import { SelectedComponent } from './selected/selected.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {enableProdMode} from '@angular/core';
import { LoginComponent } from './login/login.component';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    SamplesComponent,
    HomeComponent,
    ContactComponent,
    ResumeComponent,
    SelectedComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "home", component: HomeComponent },
      { path: "resume", component: ResumeComponent },
      { path: "samples", component: SamplesComponent },
      { path: "contact", component: ContactComponent },
      { path: "samples/selected",  component: SelectedComponent},
      { path: "login", component: LoginComponent},
      { path: "", redirectTo: "home", pathMatch:"full" },
      { path: "**", redirectTo: "home", pathMatch:"full" }
    ])
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
