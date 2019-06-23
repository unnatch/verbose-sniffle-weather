var weatherModel = require('./../models/index.js');

module.exports.getWeatherAndSave = function(body, resp){
    weatherModel.create({
        temp: body.main.temp,
        humidity: body.main.humidity,
        temp_min: body.main.temp_min,
        temp_max: body.main.temp_max,
        condition: body.weather[0].main,
        cloudiness: body.clouds.all
    }, function(err, weather){
        if (err){
            console.log(err);
        }
        resp.render('index', { title: 'Hong Kong Weather' , body: weather});
    })
}
module.exports.getLatestWeather = function(body, resp){
    weatherModel.find({}).sort({"date": -1}).limit(1).exec(function(err, weather){
        if (err){
            console.log(err);
        }
        resp.render('index', { title: 'Hong Kong Weather' , body: weather});
    })
}