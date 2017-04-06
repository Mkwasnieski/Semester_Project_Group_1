/**
 * ContestantController
 *
 * @description :: Server-side logic for managing contestants
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function (req, res) {
    res.view();
  },

  create: function (req, res, next) {

    function randomInt() {
      var high = 88;
      var low = 1;
      return Math.floor(Math.random() * (high - low) + low);
    };

    var swname = "";
    /// response, player, and callback
    function process_response(webservice_response, callback) {
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
        swname = starwars_data.name;
        //player.starwars_name = starwars_data.name;
        //player.save()
        //pass contestant in both
        callback()
      });
    }

    //call contestant player here
    function get_starwars_name(contestant, callback) {

      var http = require('http');

      options = {
        host: 'swapi.co',
        port: 80,
        path: '/api/people/' + randomInt() + "/",
        method: 'GET'
      };

      var webservice_request = http.request(options, function(response) {
        //resposne, players, callback
        process_response(response, callback)
      });
      webservice_request.end();

      //console.log(starwars_name);
    };

    swname = get_starwars_name();


    async.each(contestant, get_starwars_name, function(err) {
      parms = req.params.all();
      parms.starwars_name = swname;

      Contestant.create(parms, function contestantCreated(err, contestant) {
        if (err) return next(err);

        res.redirect('/contestant/show/' + contestant.id);
      });
    },

      if(err) console.log(err);
      //console.log('done');

      res.view({
        contestant: contestant
      });
    });



  show: function (req, res, next) {
    Contestant.findOne(req.param('id'), function foundContestant(err, contestant) {
      if (err) return next(err);

      if (!contestant) return next();

      res.view({
        contestant: contestant
      });
    });
  },
};

