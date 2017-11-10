module.exports = function (app, model, websiteService) {
  app.post('/api/user', createUser);
  app.get('/api/user/:uid', findUserById);
  app.put('/api/user/:uid', updateUser);
  app.delete('/api/user/:uid', deleteUser);
  app.get('/api/user', (req, res) => {
    if (req.query.username !== undefined) {
      if (req.query.password !== undefined) {
        findUserByCredentials(req, res);
      } else {
        findUserByUsername(req, res);
      }
    }
  });

  function createUser(req, res) {
    model
      .create(req.body, function (err, user) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
  }

  function findUserByCredentials(req, res) {
    model
      .findOne({username: req.query.username, password: req.query.password}, function (err, user) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
  }

  function findUserByUsername(req, res) {
    model
      .findOne({username: req.query.username}, function (err, user) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
  }

  function findUserById(req, res) {
    model
      .findById(req.params.uid, function (err, user) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
  }

  function updateUser(req, res) {
    model
      .findByIdAndUpdate(req.params.uid, req.body, function (err, user) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
  }

  function deleteUser(req, res) {
    model
      .findByIdAndRemove(req.params.uid, function (err, user) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
  }
};
