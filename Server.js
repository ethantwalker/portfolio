let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let bcrypt = require("bcrypt");
let MongoClient = require("mongodb").MongoClient;

const URL = "mongodb://localhost:27017/";
const DB_NAME = "dbSamples";

let app = express();

const port =  process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.json());
app.use(express.static("./dist"));

app.get("/api/getSamples", (request, response) => {
    let mongoClient;
    MongoClient.connect((process.env.MONGODB_URI || URL), { useNewUrlParser: true})
        .then(client => {

            mongoClient = client;
            //reference to DB
            let db = mongoClient.db() || mongoClient.db("dbSamples");
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

app.post("/api/addSample", (request, response) => {
    let mongoClient;
    MongoClient.connect((process.env.MONGODB_URI || URL), { useNewUrlParser: true }).then( client => {
        mongoClient = client;
        let db = mongoClient.db() || mongoClient.db("dbSamples");
        let dbSamples = db.collection("samples");

        return dbSamples.insertOne(request.body);
    }).then( result => {
        response.status(200);
        response.send(result);
        mongoClient.close();
    }).catch(err => {
        console.log(`>>> ERROR : ${err}`);
        response.status(500);
        response.send({error: `Server error with get ${err}`});
        throw err;
    });
});

app.post("/api/login", (request, response) => {

    let mongoClient;
    MongoClient.connect((process.env.MONGODB_URI || URL), { useNewUrlParser: true }).then( client => {

        mongoClient = client;
        let adminDB = mongoClient.db() || mongoClient.db("dbAdmin");
        let adminCollection = adminDB.collection("admin");
        return adminCollection.find({username: request.body.username}).toArray();

    }).then(user => {

        if(user.length == 0){
            response.status(401);
            response.send("Incorrect username or password");
        } else{
            console.log("User found");
            bcrypt.compare(request.body.password, user[0].password, (err, result) => {
                if(result){
                    console.log("Password correct");
                    response.status(200);
                    response.send("Login successful");
                } else{
                    response.status(401);
                    response.send("Incorrect username or password");
                }
            });
        }

    }).catch(err => {
        response.status(500);
        response.send(`AN ERROR OCCURED: ${err}`);
        throw err;
    });
    
});

app.listen(port, () => console.log(`Listening on port ${port}`));