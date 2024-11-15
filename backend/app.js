const express=require('express');
const mongoose = require('mongoose');
const Event = require('./models/event');
const cors = require('cors'); 
const app=express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

async function main() {
    await mongoose.connect("mongodb://localhost:27017/MSD1");
}

main().then(() => {
    console.log("Connected Successfully");
}).catch((err) => {
    console.log("Not Connected", err);
});


app.get('/api/event', async(req,res) => {
    try{
        const event=await Event.find();
        res.json(event);
    } catch(err) {
        res.status(500).json({message:err.message});
    }
})

app.post('/api/event', async(req, res) => {
    try {
        const {title, description, date} = req.body;
    let newDate = new Date(date);
    const event = new Event({title, description,date: newDate });
    await event.save();
    res.send(event);
    } catch(err) {
        console.log(err);
        res.status(500).json({message:err.message});
    }
} )

app.post('/api/event/filter',  async(req, res) => {
    try {
        const {date} = req.body;
        console.log(date);
        const event = await Event.find({ date: { $gte: new Date(date) } }).sort({ date: 1 });
        res.json(event);
    }catch(err) {
        res.status(500).json({message:err.message});
    }
});

app.get('/api/event/upcomming',  async(req, res) => {
    try {
        const date = new Date();

        const event = await Event.find({date:{$gte:date}});
        res.json(event);
    }catch(err) {
        res.status(500).json({message:err.message});
    }
});



app.listen(8080,(req,res)=>
{
    console.log("Connected to port");
});