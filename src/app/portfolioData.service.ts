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

    //used for displaying error messages
    public loginFailed = false;

    //current state of user session
    private sessionState = "signed out";

    //the currently selected sample
    public selected;

    //the username and password
    public userJSON = {
        "username" : "",
        "password" : ""
    }

    //json sample object to be sent
    public sampleJSON = {
        "title":"",
        "description":"",
        "technologies":[],
        "link":"",
        "thumb":"",
        "images":[]
    }

    public formTechs = "";

    
    constructor(myHttp:HttpClient, private router:Router, private activatedRoute: ActivatedRoute) { 
        this.http = myHttp;
    }

    //resets all json/form variables
    public restoreDefaults():void{
        this.sampleJSON.title = "";
        this.sampleJSON.description = "";
        this.sampleJSON.technologies = [];
        this.sampleJSON.link = "";
        this.sampleJSON.thumb = "";
        this.sampleJSON.images = [];

        this.formTechs = "";
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

    //gets the query paramaters of the selected sample
    //the id of the sample
    public getQueryParam():string{
        let id:string;
        this.activatedRoute.queryParams.subscribe(params => {
            id = params['id'];
        });
        return id;
    }

    //loads all samples
    public load():void{
        this.loaded = false;
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

    //submits the sample json object
    public submitSample():void{
        this.http.post(
            "https://ethantwalker.herokuapp.com/api/addSample",
            this.sampleJSON,
            {observe: "response", responseType: 'text'}
        ).subscribe(
            data => {
                console.log("SENT DATA STATUS: " + data.status)
                this.restoreDefaults();
                this.load();
            },
            err => {
                console.log(">>>ERROR SENDING DATA: " + err.error);
            }

        )
    }

    public login():void{
        if((this.userJSON.username != "" || this.userJSON.username != null) && (this.userJSON.password != "" || this.userJSON.username != null)){
            this.loginFailed = false;

            console.log(">>>LOGGING IN...");

            

            this.http.post(
                "https://ethantwalker.herokuapp.com/api/login",
                this.userJSON,
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

                            this.userJSON.username = "";
                            this.userJSON.password = "";

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

    public addTech():void{
        if(this.formTechs != null && this.formTechs != ""){
            this.sampleJSON.technologies.push(this.formTechs);
            this.formTechs = "";
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