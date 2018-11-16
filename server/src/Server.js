let express = require("express");
let cors = require("cors");
let MongoClient = require("mongodb").MongoClient;

const URL = "mongodb://localhost:27017/";
const DB_NAME = "dbSamples";

let app = express();

const port =  process.env.PORT || 8080;

app.use(cors());
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

app.listen(port, () => console.log(`Listening on port ${port}`));