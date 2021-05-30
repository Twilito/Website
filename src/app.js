const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname,"../public/")));

app.all("/", (req,res) => {
    
});

app.listen(port, () =>{
    console.log("Running on", port);
})