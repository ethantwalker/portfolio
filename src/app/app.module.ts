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
import { FormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    SamplesComponent,
    HomeComponent,
    ContactComponent,
    ResumeComponent,
    SelectedComponent,
    LoginComponent,
    AddComponent,
    DeleteComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "home", component: HomeComponent },
      { path: "resume", component: ResumeComponent },
      { path: "samples", component: SamplesComponent },
      { path: "contact", component: ContactComponent },
      { path: "samples/selected",  component: SelectedComponent},
      { path: "login", component: LoginComponent},
      { path: "admin/add", component: AddComponent},
      { path: "admin/delete", component: DeleteComponent},
      { path: "admin/update", component: UpdateComponent},
      { path: "", redirectTo: "home", pathMatch:"full" },
      { path: "**", redirectTo: "home", pathMatch:"full" }
    ])
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
