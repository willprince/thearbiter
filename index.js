var express = require("express");
var app = express();

const sqlite3 = require("sqlite3");

var Chart = require('chart.js');

const port = 8080;

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/Image'));
//Get landing page

//Depending on the pair studied
app.get("/btcusdt", function(req, res) {
    var pair = 'BTC/USDT';
    var temp = [];
    var highPrice = 0;
    var lowPrice = 999999999;
    var highName = "";
    var lowName = "";
    var difference = 0;
    var marge = 0;
    var topList = [];
    //Connect to the database
    var db = new sqlite3.Database('./venv/arbiter.db');


    //Fetch data
    db.all("with a as(\n" +
        "select idPair, idEx as idEx1, max(closing) as max\n" +
        "from pricedata\n" +
        "group by idPair\n" +
        "),\n" +
        "\n" +
        "b as(\n" +
        "select idPair, idEx as idEx2, min(closing) as min\n" +
        "from pricedata\n" +
        "group by idPair\n" +
        ")\n" +
        "\n" +
        "select *, (max-min) as dif, ((max/min)-1)*100 as marge\n" +
        "from a join b using(idPair)\n" +
        "ORDER BY marge desc", function (err, rows) {

        rows.forEach((row)=>{
            //console.log("sup");
            temp.push(row);
        });

        temp.forEach((exchange)=>{
            if(exchange['idPair'] == pair){
                highName = exchange['idEx1'];
                highPrice = exchange['max'];
                lowName = exchange['idEx2'];
                lowPrice = exchange['min'];
                difference = exchange['dif'];
                marge = exchange['marge'];
            }
            topList.push(exchange);

            // if(exchange['price'] > highPrice){
            //     highPrice = exchange['price'];
            //     highName = exchange['name'];
            // }
            // if(exchange['price'] < lowPrice){
            //     lowPrice = exchange['price'];
            //     lowName = exchange['name'];
            // }

            });



        res.render("btcusdt", {highName: highName, highPrice : highPrice, lowName : lowName, lowPrice : lowPrice, difference : difference, marge : marge, topList : topList });

        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    });
});
//Display ETH/USDT
app.get("/ethusdt", function(req, res) {
    var pair = 'ETH/USDT';
    var temp = [];
    var highPrice = 0;
    var lowPrice = 999999999;
    var highName = "";
    var lowName = "";
    var difference = 0;
    var marge = 0;
    var topList = [];
    //Connect to the database
    var db = new sqlite3.Database('./venv/arbiter.db');


    //Fetch data
    db.all("with a as(\n" +
        "select idPair, idEx as idEx1, max(closing) as max\n" +
        "from pricedata\n" +
        "group by idPair\n" +
        "),\n" +
        "\n" +
        "b as(\n" +
        "select idPair, idEx as idEx2, min(closing) as min\n" +
        "from pricedata\n" +
        "group by idPair\n" +
        ")\n" +
        "\n" +
        "select *, (max-min) as dif, ((max/min)-1)*100 as marge\n" +
        "from a join b using(idPair)\n" +
        "ORDER BY marge desc", function (err, rows) {

        rows.forEach((row)=>{
            //console.log("sup");
            temp.push(row);
        });

        temp.forEach((exchange)=>{
            if(exchange['idPair'] == pair){
                highName = exchange['idEx1'];
                highPrice = exchange['max'];
                lowName = exchange['idEx2'];
                lowPrice = exchange['min'];
                difference = exchange['dif'];
                marge = exchange['marge'];
            }
            topList.push(exchange);

            // if(exchange['price'] > highPrice){
            //     highPrice = exchange['price'];
            //     highName = exchange['name'];
            // }
            // if(exchange['price'] < lowPrice){
            //     lowPrice = exchange['price'];
            //     lowName = exchange['name'];
            // }

        });



        res.render("ethusdt", {highName: highName, highPrice : highPrice, lowName : lowName, lowPrice : lowPrice, difference : difference, marge : marge, topList : topList });

        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    });
});
//Display TRX/USDT
app.get("/trxusdt", function(req, res) {
    var pair = 'TRX/USDT';
    var temp = [];
    var highPrice = 0;
    var lowPrice = 999999999;
    var highName = "";
    var lowName = "";
    var difference = 0;
    var marge = 0;
    var topList = [];
    //Connect to the database
    var db = new sqlite3.Database('./venv/arbiter.db');


    //Fetch data
    db.all("with a as(\n" +
        "select idPair, idEx as idEx1, max(closing) as max\n" +
        "from pricedata\n" +
        "group by idPair\n" +
        "),\n" +
        "\n" +
        "b as(\n" +
        "select idPair, idEx as idEx2, min(closing) as min\n" +
        "from pricedata\n" +
        "group by idPair\n" +
        ")\n" +
        "\n" +
        "select *, (max-min) as dif, ((max/min)-1)*100 as marge\n" +
        "from a join b using(idPair)\n" +
        "ORDER BY marge desc", function (err, rows) {

        rows.forEach((row)=>{
            //console.log("sup");
            temp.push(row);
        });

        temp.forEach((exchange)=>{
            if(exchange['idPair'] == pair){
                highName = exchange['idEx1'];
                highPrice = exchange['max'];
                lowName = exchange['idEx2'];
                lowPrice = exchange['min'];
                difference = exchange['dif'];
                marge = exchange['marge'];
            }
            topList.push(exchange);

            // if(exchange['price'] > highPrice){
            //     highPrice = exchange['price'];
            //     highName = exchange['name'];
            // }
            // if(exchange['price'] < lowPrice){
            //     lowPrice = exchange['price'];
            //     lowName = exchange['name'];
            // }

        });



        res.render("trxusdt", {highName: highName, highPrice : highPrice, lowName : lowName, lowPrice : lowPrice, difference : difference, marge : marge, topList : topList });

        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    });
});
//Display ETH/BTC
app.get("/ethbtc", function(req, res) {
    var pair = 'ETH/BTC';
    var temp = [];
    var highPrice = 0;
    var lowPrice = 999999999;
    var highName = "";
    var lowName = "";
    var difference = 0;
    var marge = 0;
    var topList = [];
    //Connect to the database
    var db = new sqlite3.Database('./venv/arbiter.db');


    //Fetch data

    db.all("with a as(\n" +
        "select idPair, idEx as idEx1, max(closing) as max\n" +
        "from pricedata\n" +
        "group by idPair\n" +
        "),\n" +
        "\n" +
        "b as(\n" +
        "select idPair, idEx as idEx2, min(closing) as min\n" +
        "from pricedata\n" +
        "group by idPair\n" +
        ")\n" +
        "\n" +
        "select *, (max-min) as dif, ((max/min)-1)*100 as marge\n" +
        "from a join b using(idPair)\n" +
        "ORDER BY marge desc", function (err, rows) {
        try{
            rows.forEach((row)=>{
                //console.log("sup");
                temp.push(row);
            });
        }catch (e) {
            console.log(e);
        }


        temp.forEach((exchange)=>{
            if(exchange['idPair'] == pair){
                highName = exchange['idEx1'];
                highPrice = exchange['max'];
                lowName = exchange['idEx2'];
                lowPrice = exchange['min'];
                difference = exchange['dif']
                marge = exchange['marge'];
            }
            topList.push(exchange);

            // if(exchange['price'] > highPrice){
            //     highPrice = exchange['price'];
            //     highName = exchange['name'];
            // }
            // if(exchange['price'] < lowPrice){
            //     lowPrice = exchange['price'];
            //     lowName = exchange['name'];
            // }

        });



        res.render("ethbtc", {highName: highName, highPrice : highPrice, lowName : lowName, lowPrice : lowPrice, difference : difference, marge : marge, topList : topList });

        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    });
});
//Display XRP/USDT
app.get("/xrpusdt", function(req, res) {
    var pair = 'XRP/USDT';
    var temp = [];
    var highPrice = 0;
    var lowPrice = 999999999;
    var highName = "";
    var lowName = "";
    var difference = 0;
    var marge = 0;
    var topList = [];
    //Connect to the database
    var db = new sqlite3.Database('./venv/arbiter.db');


    //Fetch data
    db.all("with a as(\n" +
        "select idPair, idEx as idEx1, max(closing) as max\n" +
        "from pricedata\n" +
        "group by idPair\n" +
        "),\n" +
        "\n" +
        "b as(\n" +
        "select idPair, idEx as idEx2, min(closing) as min\n" +
        "from pricedata\n" +
        "group by idPair\n" +
        ")\n" +
        "\n" +
        "select *, (max-min) as dif, ((max/min)-1)*100 as marge\n" +
        "from a join b using(idPair)\n" +
        "ORDER BY marge desc", function (err, rows) {

        rows.forEach((row)=>{
            //console.log("sup");
            temp.push(row);
        });

        temp.forEach((exchange)=>{
            if(exchange['idPair'] == pair){
                highName = exchange['idEx1'];
                highPrice = exchange['max'];
                lowName = exchange['idEx2'];
                lowPrice = exchange['min'];
                difference = exchange['dif']
            }
            topList.push(exchange);

            // if(exchange['price'] > highPrice){
            //     highPrice = exchange['price'];
            //     highName = exchange['name'];
            // }
            // if(exchange['price'] < lowPrice){
            //     lowPrice = exchange['price'];
            //     lowName = exchange['name'];
            // }

        });



        res.render("xrpusdt", {highName: highName, highPrice : highPrice, lowName : lowName, lowPrice : lowPrice, difference : difference, marge : marge, topList : topList });

        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    });
});
//Display XRP/BTC
app.get("/xrpbtc", function(req, res) {
    var pair = 'XRP/BTC';
    var temp = [];
    var highPrice = 0;
    var lowPrice = 999999999;
    var highName = "";
    var lowName = "";
    var difference = 0;
    var marge = 0;
    var topList = [];
    //Connect to the database
    var db = new sqlite3.Database('./venv/arbiter.db');


    //Fetch data
    db.all("with a as(\n" +
        "select idPair, idEx as idEx1, max(closing) as max\n" +
        "from pricedata\n" +
        "group by idPair\n" +
        "),\n" +
        "\n" +
        "b as(\n" +
        "select idPair, idEx as idEx2, min(closing) as min\n" +
        "from pricedata\n" +
        "group by idPair\n" +
        ")\n" +
        "\n" +
        "select *, (max-min) as dif, ((max/min)-1)*100 as marge\n" +
        "from a join b using(idPair)\n" +
        "ORDER BY marge desc", function (err, rows) {

        rows.forEach((row)=>{
            //console.log("sup");
            temp.push(row);
        });

        temp.forEach((exchange)=>{
            if(exchange['idPair'] == pair){
                highName = exchange['idEx1'];
                highPrice = exchange['max'];
                lowName = exchange['idEx2'];
                lowPrice = exchange['min'];
                difference = exchange['dif']
            }
            topList.push(exchange);

            // if(exchange['price'] > highPrice){
            //     highPrice = exchange['price'];
            //     highName = exchange['name'];
            // }
            // if(exchange['price'] < lowPrice){
            //     lowPrice = exchange['price'];
            //     lowName = exchange['name'];
            // }

        });



        res.render("xrpbtc", {highName: highName, highPrice : highPrice, lowName : lowName, lowPrice : lowPrice, difference : difference, marge : marge, topList : topList });

        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    });
});
//Display LTC/BTC
app.get("/ltcbtc", function(req, res) {
    var pair = 'LTC/BTC';
    var temp = [];
    var highPrice = 0;
    var lowPrice = 999999999;
    var highName = "";
    var lowName = "";
    var difference = 0;
    var marge = 0;
    var topList = [];
    //Connect to the database
    var db = new sqlite3.Database('./venv/arbiter.db');


    //Fetch data
    db.all("with a as(\n" +
        "select idPair, idEx as idEx1, max(closing) as max\n" +
        "from pricedata\n" +
        "group by idPair\n" +
        "),\n" +
        "\n" +
        "b as(\n" +
        "select idPair, idEx as idEx2, min(closing) as min\n" +
        "from pricedata\n" +
        "group by idPair\n" +
        ")\n" +
        "\n" +
        "select *, (max-min) as dif, ((max/min)-1)*100 as marge\n" +
        "from a join b using(idPair)\n" +
        "ORDER BY marge desc", function (err, rows) {

        rows.forEach((row)=>{
            //console.log("sup");
            temp.push(row);
        });

        temp.forEach((exchange)=>{
            if(exchange['idPair'] == pair){
                highName = exchange['idEx1'];
                highPrice = exchange['max'];
                lowName = exchange['idEx2'];
                lowPrice = exchange['min'];
                difference = exchange['dif'];
                marge = exchange['marge'];
            }
            topList.push(exchange);

            // if(exchange['price'] > highPrice){
            //     highPrice = exchange['price'];
            //     highName = exchange['name'];
            // }
            // if(exchange['price'] < lowPrice){
            //     lowPrice = exchange['price'];
            //     lowName = exchange['name'];
            // }

        });



        res.render("ltcbtc", {highName: highName, highPrice : highPrice, lowName : lowName, lowPrice : lowPrice, difference : difference, marge : marge, topList : topList });

        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    });
});
//Display LTC/USDT
app.get("/ltcusdt", function(req, res) {
    var pair = 'LTC/USDT';
    var temp = [];
    var highPrice = 0;
    var lowPrice = 999999999;
    var highName = "";
    var lowName = "";
    var difference = 0;
    var marge = 0;
    var topList = [];
    //Connect to the database
    var db = new sqlite3.Database('./venv/arbiter.db');


    //Fetch data
    db.all("with a as(\n" +
        "select idPair, idEx as idEx1, max(closing) as max\n" +
        "from pricedata\n" +
        "group by idPair\n" +
        "),\n" +
        "\n" +
        "b as(\n" +
        "select idPair, idEx as idEx2, min(closing) as min\n" +
        "from pricedata\n" +
        "group by idPair\n" +
        ")\n" +
        "\n" +
        "select *, (max-min) as dif, ((max/min)-1)*100 as marge\n" +
        "from a join b using(idPair)\n" +
        "ORDER BY marge desc", function (err, rows) {

        rows.forEach((row)=>{
            //console.log("sup");
            temp.push(row);
        });

        temp.forEach((exchange)=>{
            if(exchange['idPair'] == pair){
                highName = exchange['idEx1'];
                highPrice = exchange['max'];
                lowName = exchange['idEx2'];
                lowPrice = exchange['min'];
                difference = exchange['dif']
            }
            topList.push(exchange);

            // if(exchange['price'] > highPrice){
            //     highPrice = exchange['price'];
            //     highName = exchange['name'];
            // }
            // if(exchange['price'] < lowPrice){
            //     lowPrice = exchange['price'];
            //     lowName = exchange['name'];
            // }

        });



        res.render("ltcusdt", {highName: highName, highPrice : highPrice, lowName : lowName, lowPrice : lowPrice, difference : difference, marge : marge, topList : topList });

        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    });
});
//Display Neo/BTC
app.get("/neobtc", function(req, res) {
    var pair = 'NEO/BTC';
    var temp = [];
    var highPrice = 0;
    var lowPrice = 999999999;
    var highName = "";
    var lowName = "";
    var difference = 0;
    var marge = 0;
    var topList = [];
    //Connect to the database
    var db = new sqlite3.Database('./venv/arbiter.db');


    //Fetch data
    db.all("with a as(\n" +
        "select idPair, idEx as idEx1, max(closing) as max\n" +
        "from pricedata\n" +
        "group by idPair\n" +
        "),\n" +
        "\n" +
        "b as(\n" +
        "select idPair, idEx as idEx2, min(closing) as min\n" +
        "from pricedata\n" +
        "group by idPair\n" +
        ")\n" +
        "\n" +
        "select *, (max-min) as dif, ((max/min)-1)*100 as marge\n" +
        "from a join b using(idPair)\n" +
        "ORDER BY marge desc", function (err, rows) {

        rows.forEach((row)=>{
            //console.log("sup");
            temp.push(row);
        });

        temp.forEach((exchange)=>{
            if(exchange['idPair'] == pair){
                highName = exchange['idEx1'];
                highPrice = exchange['max'];
                lowName = exchange['idEx2'];
                lowPrice = exchange['min'];
                difference = exchange['dif']
            }
            topList.push(exchange);

            // if(exchange['price'] > highPrice){
            //     highPrice = exchange['price'];
            //     highName = exchange['name'];
            // }
            // if(exchange['price'] < lowPrice){
            //     lowPrice = exchange['price'];
            //     lowName = exchange['name'];
            // }

        });



        res.render("neobtc", {highName: highName, highPrice : highPrice, lowName : lowName, lowPrice : lowPrice, difference : difference, marge : marge, topList : topList });

        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    });
});
//Display XLM/USDT
app.get("/xmlusdt", function(req, res) {
    var pair = 'XLM/USDT';
    var temp = [];
    var highPrice = 0;
    var lowPrice = 999999999;
    var highName = "";
    var lowName = "";
    var difference = 0;
    var marge = 0;
    var topList = [];
    //Connect to the database
    var db = new sqlite3.Database('./venv/arbiter.db');


    //Fetch data
    db.all("with a as(\n" +
        "select idPair, idEx as idEx1, max(closing) as max\n" +
        "from pricedata\n" +
        "group by idPair\n" +
        "),\n" +
        "\n" +
        "b as(\n" +
        "select idPair, idEx as idEx2, min(closing) as min\n" +
        "from pricedata\n" +
        "group by idPair\n" +
        ")\n" +
        "\n" +
        "select *, (max-min) as dif, ((max/min)-1)*100 as marge\n" +
        "from a join b using(idPair)\n" +
        "ORDER BY marge desc", function (err, rows) {

        rows.forEach((row)=>{
            //console.log("sup");
            temp.push(row);
        });

        temp.forEach((exchange)=>{
            if(exchange['idPair'] == pair){
                highName = exchange['idEx1'];
                highPrice = exchange['max'];
                lowName = exchange['idEx2'];
                lowPrice = exchange['min'];
                difference = exchange['dif']
            }
            topList.push(exchange);

            // if(exchange['price'] > highPrice){
            //     highPrice = exchange['price'];
            //     highName = exchange['name'];
            // }
            // if(exchange['price'] < lowPrice){
            //     lowPrice = exchange['price'];
            //     lowName = exchange['name'];
            // }

        });



        res.render("xmlusdt", {highName: highName, highPrice : highPrice, lowName : lowName, lowPrice : lowPrice, difference : difference, marge : marge, topList : topList });

        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    });
});


//Start the server
app.listen(port, process.env.IP, function(){

    console.log("The Arbiter is ONLINE");
});
