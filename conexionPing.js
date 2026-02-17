

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
    await client.db("").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const dbName = "";
    const adminDb = client.db("");
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
    await client.close();
  }
}
run().catch(console.dir);
