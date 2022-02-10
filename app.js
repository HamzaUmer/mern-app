const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config( {path: './config.env'});

require('./db/conn');
app.use(express.json());
// const User = require('./models/user');
app.use(require('./router/auth'));
//2: Step Heroku
const PORT= process.env.PORT || 5000;






// app.get('/about',middleware, (req,res) => {
//     res.send("About me from the server");
// });



app.get('/login', (req,res) => {
    res.send("Login from the server");
});

app.get('/signup', (req,res) => {
    res.send("SignUp from the server");
});

//3: Step Heroku
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req,res)=> {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});