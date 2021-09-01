const CovidStat = require('../models/covidStat');
var axios = require('axios').default;

const requestCountryStatistics = (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://covid-193.p.rapidapi.com/history',
    params: { country: req.query.country, day: req.query.day },
    headers: {
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
      'x-rapidapi-key': process.env.API_KEY,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      const covidStat = new CovidStat(response.data.response[0]);
      covidStat
        .save()
        .then((result) => {
          res.redirect('/covid');
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch(function (error) {
      console.error(error);
    });
};

const statisticDetails = (req, res) => {
  const id = req.params.id;
  CovidStat.findById(id)
    .then((result) => {
      res.render('stat-details', { request: result, title: 'Stat Details' });
    })
    .catch((err) => {
      console.log(err);
      res.render('404', { title: 'Stat not found' });
    });
};

const getStatistics = async (req, res) => {
  CovidStat.find()
    .sort({ day: -1 })
    .then((result) => {
      res.render('covid', { requests: result, title: 'All Covid Stats' });
    })
    .catch((err) => {
      console.log(err);
    });
};

const removeStatistics = async (req, res) => {
  await CovidStat.deleteOne({ _id: req.params.id });
  res.json({ redirect: '/covid' });
};

const updateStatistics = async (req, res) => {
  const updatedStatFields = req.body;
  const statToUpdate = await CovidStat.findById(req.params.id);
  console.log(updatedStatFields);
  statToUpdate.set(updatedStatFields);
  await statToUpdate.save();
  res.json({ redirect: `/covid/${req.params.id}` });
};

module.exports = {
  requestCountryStatistics,
  getStatistics,
  updateStatistics,
  removeStatistics,
  statisticDetails,
};
