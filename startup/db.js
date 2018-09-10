const Fawn = require('fawn');

const { mongoose } = require('../config/db');

module.exports = () => Fawn.init(mongoose);
