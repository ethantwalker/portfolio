let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let bcrypt = require("bcrypt");
let session = require("express-session");
let MongoClient = require("mongodb").MongoClient;

const URL = "mongodb://localhost:27017/";
const DB_NAME = "dbSamples";

let app = express();

const port =  process.env.PORT || 8080;

app.use(cors());

app.use(session({
    secret: 'Mb&Ml5Snd6L'
}));

app.use(bodyParser.json());
app.use(express.static("./dist"));

app.get("/api/getSamples", (request, response) => {
    let mongoClient;
    MongoClient.connect((process.env.MONGODB_URI || URL), { useNewUrlParser: true})
        .then(client => {

            mongoClient = client;
            //reference to DB
            let db = client.db();
            //reference to the the samples collection
            let samplesCollection = db.collection("samples");

            //get all samples
            let cursor = samplesCollection.find();
            return cursor.toArray();
        
        }).then(samplesArray => {

            mongoClient.close();

            let json = {
                "samples" : samplesArray
            };

            //status OK
            response.status(200);
            response.send(json);
        
        }).catch(err => {

            console.log(`>>>ERROR: ${err}`);
            //status FAILED
            response.status(500);
            response.send({error: `SERVER ERROR WITH GET: ${err}`});
            throw err;
        });
});

app.post("/loginpost", (request, response) => {

    let mongoClient;
    MongoClient.connect((process.env.MONGODB_URI || URL), { useNewUrlParser: true}).then( client => {

        mongoClient = client;
        let adminCollection = mongoClient.db("dbAdmin").collection("admin");

        return adminCollection.find({username: request.body.username}).toArray();

    }).then(user => {

        if(user.length == 0){
            response.status(401);
            response.send("Incorrect username or password");
        } else{
            console.log("User found");
            bcrypt.compare(request.body.password, user[0].password, (err, result) => {
                if(result){
                    request.session.loggedin = true;
                    request.session.cookie.expires = false;
                    response.redirect("/");
                } else{
                    response.status(401);
                    response.send("Incorrect username or password");
                }
            });
        }

    }).catch(err => {
        response.status(500);
        response.send(`AN ERROR OCCURED: ${err}`);
    });
    
});

app.get("/#/login", (request, response) => {
    if(request.response.loggedin){
        response.redirect("/#/admin");
    }
});

app.get("/#/admin/:route?", (request, response) => {
    if(!request.response.loggedin){
        response.redirect("/#/home");
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));