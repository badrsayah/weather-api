const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Algiers&appid=7e1658c5c8d11674c3e7484f3bdf7300&units=metric";

    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherdata = JSON.parse(data);
            console.log(weatherdata);
            const val = weatherdata.main.temp;
            const icon = "http://openweathermap.org/img/wn/" + weatherdata.weather[0].icon + "@2x.png"
            const desc = weatherdata.weather[0].description;
            console.log(desc);
            res.write("<div style='text-align: center;'>");
            res.write("<h2 style='font-size: 24px; font-family: arial;'>The weather is " + desc + "</h2>");
            res.write("<h1 style='font-size: 48px;font-family: arial;'>The temperature in Algiers is °" + val + "C</h1>");
            res.write("<img src='" + icon + "' style='width: 300px; height: 300px;'>");
            res.write("</div>");
            res.send();
        });
    });
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
