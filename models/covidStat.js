const mongoose = require('mongoose');
const casesSchema = require('./cases');
const Schema = mongoose.Schema;

const covidStatSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    continent: {
      type: String,
      required: true,
    },
    population: {
      type: String,
      required: true,
    },
    day: {
      type: Date,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    cases: {
      type: casesSchema.schema,
      required: true,
    },
    deaths: {
      type: casesSchema.schema,
      required: true,
    },
    tests: {
      type: casesSchema.schema,
      required: true,
    },
  },
  { timestamps: true }
);

const CovidStat = mongoose.model('covidStat', covidStatSchema);
module.exports = CovidStat;
