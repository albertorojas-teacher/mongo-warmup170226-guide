import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
dotenv.config();
const uri = process.env.MONGO_DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const dbName = "Cafeteria_JS";
    const adminDb = client.db("admin");
    const dbList = await adminDb.admin().listDatabases();
    const exists = dbList.databases.some((db) => db.name === dbName);

    if (exists) {
      console.log(`La base de datos "${dbName}" existe.`);
    } else {
      console.log(`La base de datos "${dbName}" NO existe.`);
    }
  }
    catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
