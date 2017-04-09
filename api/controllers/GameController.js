/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function (req, res, next) {

    Game.create(req.params.all(), function gameCreated(err, game) {
      if (err) return next(err);


      function process_response(webservice_response, player, callback) {
        var webservice_data = "";
        webservice_response.on('error', function (e) {
          console.log(e.message);
          callback("Error: " + e.message);
        });

        webservice_response.on('data', function (chunk) {
          webservice_data += chunk;
        });

        webservice_response.on('end', function () {
          starwars_data = JSON.parse(webservice_data);
          player.starwars_name = starwars_data.name;
          console.log(starwars_data.name);
          player.save(callback);
        });

      }

      function get_starwars_name(player, callback) {

        var http = require('http');

        options = {
          host: 'swapi.co',
          port: 80,
          path: '/api/people/' + randomInt() + "/",
          method: 'GET'
        };

        var webservice_request = http.request(options, function (response) {
          process_response(response, player, callback)
        });
        webservice_request.end();
      };

      async.each([contestant], get_starwars_name, function (err) {
        if (err) console.log(err);

        res.view({
          contestant: [contestant]
        });
      });

      res.redirect('/contestant/show/' + contestant.id);
    });
  }
	
};

