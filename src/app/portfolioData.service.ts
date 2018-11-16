import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {JSONRoot} from "./samples.model";
import {Sample} from "./samples.model";
import {Router, ActivatedRoute, Params} from "@angular/router";
//import * as process from 'process';

@Injectable()
export class PortfolioDataService {
    
    //private retrieveScript = 'http://localhost:' + ( process.env.PORT || '8080') + '/getSamples';
    private retrieveScript = 'https://ethantwalker.herokuapp.com/api/getSamples'
    private http:HttpClient;

    //whether the page is loader or not
    public loaded:boolean = false;
    //all of the work samples
    public samples:Sample[];

    //the currently selected sample
    public selected;
    
    constructor(myHttp:HttpClient, private router:Router, private activatedRoute: ActivatedRoute) { 
        this.http = myHttp;
    }

    //gets the selected sample for viewing the details of a sample
    public setSelectedSample():void{
        this.samples.filter(json => {
            if(json._id == this.getQueryParam()){
                this.selected = json;
            }
        });
    }

    //grabs the currently selected route
    //used for the button selection
    //lazy i know
    public getRoute():string{
        return this.router.url.split("/")[1].toLowerCase();
    }

    public getQueryParam():string{
        let id:string;
        this.activatedRoute.queryParams.subscribe(params => {
            id = params['id'];
        });
        return id;
    }

    public load():void{
        //sample api url
        this.http.get<JSONRoot>(this.retrieveScript).subscribe(
            data => {
                //grab samples data
                let json:JSONRoot = data;
                this.samples = data.samples;
                this.loaded = true;
            },
            err => {
                console.log(`>>>ERROR OCCURED IN RETRIEVING SAMPLES: ${err}`);
            }
        );
    }

}