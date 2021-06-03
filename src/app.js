/*
    Twilito 2021
    GitHub: https://github.com/Twilito
*/

const express = require('express');
const path = require('path');
const app = express();
const port = process.argv[2]||3000;

app.use(express.static(path.join(__dirname,"../public/")));

app.all("/", (req,res) => {
    res.sendFile(path.join(__dirname,"../public/index.html"))
});

app.all("/Jobs", (req,res) => {
    res.sendFile(path.join(__dirname,"../public/Jobs.html"))
});

app.all("/About", (req,res) => {
    res.sendFile(path.join(__dirname,"../public/About.html"))
});

app.all("/Contact", (req,res) => {
    res.sendFile(path.join(__dirname,"../public/Contact.html"))
});

app.listen(port, () =>{
    console.log("Running on", port);
})