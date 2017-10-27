module.exports = function (app) {
  let users = [
    {
      _id: '123',
      email: 'alice@wonderland.com',
      username: 'alice',
      password: 'alice',
      firstName: 'Alice',
      lastName: 'Wonder'
    },
    {
      _id: '234',
      email: 'bob@marley.com',
      username: 'bob',
      password: 'bob',
      firstName: 'Bob',
      lastName: 'Marley'
    },
    {
      _id: '345',
      email: 'charly@Garcia.com',
      username: 'charly',
      password: 'charly',
      firstName: 'Charly',
      lastName: 'Garcia'
    },
    {
      _id: '456',
      email: 'jose@annunzi.com',
      username: 'jannunzi',
      password: 'jannunzi',
      firstName: 'Jose',
      lastName: 'Annunzi'
    }
  ];
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
    req.body['_id'] = Math.random().toString();
    users.push(req.body);
    res.json(req.body);
  }

  function findUserByCredentials(req, res) {
    for (let x = 0; x < users.length; x++) {
      if (users[x].username === req.query.username && users[x].password === req.query.password) {
        res.json(users[x]);
        return;
      }
    }
    res.json({});
  }

  function findUserByUsername(req, res) {
    for (let x = 0; x < users.length; x++) {
      if (users[x].username === req.query.username) {
        res.json(users[x]);
        return;
      }
    }
    res.json({});
  }

  function findUserById(req, res) {
    for (let x = 0; x < users.length; x++) {
      if (users[x]._id === req.params.uid) {
        res.json(users[x]);
        return;
      }
    }
    res.json({});
  }

  function updateUser(req, res) {
    for (let x = 0; x < users.length; x++) {
      if (users[x]._id === req.params.uid) {
        users[x] = req.body;
        res.send('Success!');
        return;
      }
    }
    res.send('Fail!');
  }

  function deleteUser(req, res) {
    for (let x = 0; x < users.length; x++) {
      if (users[x]._id === req.params.userId) {
        users.splice(x, 1);
        res.send('Success!');
        return;
      }
    }
    res.send('Fail!');
  }
};
