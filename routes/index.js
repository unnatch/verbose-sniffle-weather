var express = require('express');
var router = express.Router();
const request = require('request');
var weatherController = require('./../controllers/index.js');
var weatherModel = require('./../models/index.js');

/* GET home page. */


router.get('/', function (req, resp, next) {
    request('http://api.openweathermap.org/data/2.5/weather?id=8223932&units=metric&APPID=61126aecbde1a45b3bdfd8e38b24c6f2', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        // console.log(body);
        if (body.cod == 200){
            weatherController.getWeatherAndSave(body, resp);
            // weatherModel.create({
            //     temp: body.main.temp,
            //     humidity: body.main.humidity,
            //     temp_min: body.main.temp_min,
            //     temp_max: body.main.temp_max,
            //     condition: body.weather[0].main,
            //     cloudiness: body.clouds.all
            // }, function(err, weather){
            //     if (err){
            //         console.log(err);
            //     }
            //     resp.render('index', { title: 'Hong Kong Weather' , body: weather});
            // })
        }
        else{
            weatherController.getLatestWeather(body, resp);
            // weatherModel.find({}).sort({"date": -1}).limit(1).exec(function(err, weather){
            //     if (err){
            //         console.log(err);
            //     }
            //     resp.render('index', { title: 'Hong Kong Weather' , body: weather});
            // })
        }
    });
});



module.exports = router;
