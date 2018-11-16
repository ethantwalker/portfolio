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

    public loginFailed = false;

    private sessionState = "signed out";

    //the currently selected sample
    public selected;

    public username = "";
    public password = "";
    
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
        return this.router.url.split("/").splice(0).join("/");
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

    public login():void{
        if((this.username != "" || this.username != null) && (this.password != "" || this.username != null)){
            this.loginFailed = false;

            console.log(">>>LOGGING IN...");

            let sendJSON = {
                "username": this.username,
                "password": this.password
            };

            this.http.post(
                "https://ethantwalker.herokuapp.com/loginpost",
                sendJSON,
                {observe: "response", responseType: 'text'}
            ).subscribe(
                //if sending data was a sucess, load the data again
                data =>{
                    console.log("LOGIN POST STATUS: " + data.status);
                    
                    switch(data.status){
                        case 401:
                            this.loginFailed = true;
                            break;
                        case 200:

                            this.loginFailed = false;
                            this.router.navigate(['admin']);
                            sessionStorage.setItem(this.sessionState, "signed in");

                            this.username = "";
                            this.password = "";

                            break;
                    }
                },
                err =>{
                    console.log(">>>ERROR SENDING DATA: " + err.error);
                    this.loginFailed = true;
                }
            );

        }
    }

    public checkSessionState():string{
        return sessionStorage.getItem(this.sessionState);
    }

    public redirectToLogin():void{
        if(this.checkSessionState() != "signed in"){
            this.router.navigate(['login']);
        }
    }

    public redirectToAdmin():void{
        if(this.checkSessionState() == "signed in"){
            this.router.navigate(['admin']);
        }
    }

    public killSession():void{
        sessionStorage.removeItem(this.sessionState);
        this.redirectToLogin();
    }
}