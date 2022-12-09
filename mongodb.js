import { MongoClient } from "mongodb";
const url = 'mongodb://localhost:27017';
const databasename= 'jasser'
const client = new MongoClient(url)


async function dbConnect()
{
    let result = await client.connect();
    db= result.db(databasename);
    return db.collection('offres');
  
}
module.exports= dbConnect;