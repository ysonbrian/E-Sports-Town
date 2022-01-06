const Metadata = require('../models/Metadata');

let metadataController = {};

metadataController.save = (req, res) => {
  console.log(req);
  let metadata = new Metadata(req.body);

  metadata.save((err) => {
    if (err) {
      console.log(err);
      res.render('Something is Wrong!');
    } else {
      console.log('Success!');
      res.redirect('/');
    }
  });
};

metadataController.findAll = (req, res) => {
  Metadata.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || 'Retrieve document failed!' });
    });
};

module.exports = metadataController;
