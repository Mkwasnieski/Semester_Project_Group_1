/**
 * Contestant.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes:{

    first_name: {
      type: 'string',
      required: true
    },

    last_name: {
      type: 'string',
      required: true
    },

    street_address: {
      type: 'string',
      required: false,
    },

    city: {
      type: 'string',
      required: false,
    },

    state: {
      type: 'string',
      required: false,
    },

    zip: {
      type: 'string',
      required: false,
    },

    email: {
      type: 'string',
      email: true,
      required: false,

    },

    cell_phone: {
      type: 'string',
      required: false,
    },
  }
};
