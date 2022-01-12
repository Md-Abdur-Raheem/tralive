const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middle wear
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aimii.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function run() {
    try {
        await client.connect();
        const database = client.db("Tralive");
        const dectinationsCollection = database.collection("destinations");
        const bookingsCollection = database.collection('Bookings');
        const usersCollection = database.collection("Users");


        //get api to get 6 destinations
        app.get('/destinations', async (req, res) => {
            const cursor = dectinationsCollection.find({}).limit(6);
            const destinations = await cursor.toArray();
            res.send(destinations);
        });

        //get api to get all destinations
        app.get('/all-destinations', async (req, res) => {
            const cursor = dectinationsCollection.find({});
            const destinations = await cursor.toArray();
            res.send(destinations);
        });

        //get api to find a destination
        app.get('/all-destinations/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await dectinationsCollection.findOne(query);
            res.json(result);
        });

        //api to delete a destination
        app.delete('/all-destinations/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await dectinationsCollection.deleteOne(query);
            res.json(result);
        });

        // api to get wish lists
        app.get('/allDestinations', async (req, res) => {
            const wishLists = req.query.wishLists;
            const id = JSON.parse(wishLists);
            
            const idArray = id.map(i => ObjectId(i));

            const filter = { _id: { $in: idArray } };
            const result = await dectinationsCollection.find(filter).toArray();
            
            res.json(result);
        });

        //post api to add new destination
        app.post('/add-new-destination', async (req, res) => {
            const newDestination = req.body;
            const result = await dectinationsCollection.insertOne(newDestination);
            res.json(result);
        });

        //get users booking
        app.get('/bookings/:email', async (req, res) => {
            const email = req.params.email;
            const exists = await bookingsCollection.find({ email: email }).toArray();
            res.send(exists)
        });


        //delete api to delete one users booking
        app.delete('/bookings/:id', async (req, res) => {
            const id = req.params.id;
            const result = await bookingsCollection.deleteOne({ _id: ObjectId(id) });
            res.json(result);
        });

        //new api to add users booking
        app.post('/bookings', async (req, res) => {
            const newBooking = req.body;
            const result = await bookingsCollection.insertOne(newBooking);
            res.json(result);
        });


        //api to get all users bookings
        app.get('/allBookings', async (req, res) => {
            const cursor = bookingsCollection.find({});
            const bookings = await cursor.toArray();
            res.send(bookings);
        });


        //api to delete any users booking
        app.delete('/all-bookings/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await bookingsCollection.deleteOne(query);
            res.json(result);

        });

        //api to update booking status
        app.put('/all-bookings/:id', async (req, res) => {
            const id = req.params.id;
            const updatedStatus = req.body.status;
            const filter = { _id: ObjectId(id) };
            const result = await bookingsCollection.updateOne(filter, { $set: { status: updatedStatus } });
            res.json(result);
        });

        //api to save users
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            res.json(result);
        });

        //api to upsert google login user
        app.put('/users', async (req, res) => {
            const user = req.body;
            const filter = { Email: user.Email };
            const options = { upsert: true };
            const updateDoc = { $set: user }
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            res.json(result)
        });

        //api to make admin
        app.post('/adminUsers', async (req, res) => {
            const email = req.body.email;
            const filter = { Email: email };
            const user = await usersCollection.findOne(filter);
            const updateDoc = { Role: "Admin" };
            const result = await usersCollection.updateOne(user, { $set: updateDoc });
            res.json(result);
        });

        //api to get admin
        app.get('/adminUsers', async (req, res) => {
            const filter = { Role: "Admin" };
            const admin = await usersCollection.find(filter).toArray();
            res.json(admin);
        });

        //api to delete admin
        app.put('/adminUsers/:email', async (req, res) => {
            const email = req.params.email;
            console.log(email);
            const filter = { Email: email };
            const currentAdmin = await usersCollection.findOne(filter);
            console.log(currentAdmin);
            const result = await usersCollection.updateOne(filter, { $unset: { Role: '' } });
            res.json(result);
        });

        //api to check an admin
        app.get('/checkAdmin/:email', async (req, res) => {
            const email = req.params.email;

            const filter = { Email: email };
            const user = await usersCollection.findOne(filter);
            if (user.Role) {
                res.json({ admin: true });
            }
            else {
                res.json({ admin: false });
            }
        });


        // api to check email verified
        app.get('/emailVerified/:email', async (req, res) => {
            const email = req.params.email;
            const filter = { Email: email };
            const user = await usersCollection.findOne(filter);

            if (user && user.Email_Verified) {
                res.json({ emailVerified: true });
            }
            else {
                res.json({ emailVerified: false });
            }
        });


        // api to update user emailVerifeid
        app.put('/emailVerified/:email', async (req, res) => {
            const email = req.params.email;
            const updatedEmailVerified = req.body.Email_Verified;

            const filter = { Email: email };
            const result = await usersCollection.updateOne(filter, { $set: { Email_Verified: updatedEmailVerified } });
            res.json(result);
        })

        //api for payment
        app.post("/create-payment-intent", async (req, res) => {
            const paymentInfo = req.body;
            price = parseFloat(paymentInfo.price);

            const amount = price * 100;
          
            // Create a PaymentIntent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
              amount: amount,
              currency: "usd",
              automatic_payment_methods: {
                enabled: true,
              },
            });
            res.send({clientSecret: paymentIntent.client_secret});
        });
        
    }
    finally {
        //await client.close()
    }
}
run().catch(console.dir);


app.get('/', (req, res) => res.send('Hello world from Tralive'));
app.listen(port, () => console.log("Running server on port", port))
