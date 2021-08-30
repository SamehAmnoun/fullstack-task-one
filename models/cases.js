const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const casesSchema = new Schema({
  new: {
    type: Number,
    required: false,
  },
  active: {
    type: Number,
    required: false,
  },
  critical: {
    type: Number,
    required: false,
  },
  recovered: {
    type: Number,
    required: false,
  },
  total: {
    type: Number,
    required: true,
  },
  '1M_pop': {
    type: Number,
    required: true,
  },
});

const Cases = mongoose.model('cases', casesSchema);
module.exports = Cases;
