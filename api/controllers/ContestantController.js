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

  create: function(req, res, next) {

    function randomInt(low, high){
      var high = 88;
      var low = 1;
      return Math.floor(Math.random() * (high - low) + low);
    };

    function get_starwars_name(contestant, callback) {

      var http = require('http');
      getstarwars_name = 0;

      options = {
        host: 'http://swapi.co/api/',
        port: 80,
        path: '/person/JSON?symbol=' + randomInt,
        method: 'GET'
      };

    };

    Contestant.create(req.params.all(), function contestantCreated(err,contestant) {
      swname: getstarwars_name();
      parms = req.params.all();
      parms = starwars_name = swname;
      contestant.create (params);

      if (err) return next(err);

      res.redirect('/contestant/show/' + contestant.id);
    });
  },

  show: function(req, res, next) {
    Contestant.findOne(req.param('id'), function foundContestant(err,contestant) {
      if (err) return next(err);

      if (!contestant) return next();

      res.view({
        contestant: contestant
      });
    });
  },
};

