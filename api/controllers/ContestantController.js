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
      Contestant.create(req.params.all(), function contestantCreated(err,contestant) {
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

