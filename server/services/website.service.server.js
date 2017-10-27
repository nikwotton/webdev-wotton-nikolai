module.exports = function (app) {
  let websites = [
    {'_id': '123', 'name': 'Facebook', 'developerId': '456', 'description': 'Lorem'},
    {'_id': '234', 'name': 'Tweeter', 'developerId': '456', 'description': 'Lorem'},
    {'_id': '456', 'name': 'Gizmodo', 'developerId': '456', 'description': 'Lorem'},
    {'_id': '890', 'name': 'Go', 'developerId': '123', 'description': 'Lorem'},
    {'_id': '567', 'name': 'Tic Tac Toe', 'developerId': '123', 'description': 'Lorem'},
    {'_id': '678', 'name': 'Checkers', 'developerId': '123', 'description': 'Lorem'},
    {'_id': '789', 'name': 'Chess', 'developerId': '234', 'description': 'Lorem'}
  ];

  app.post('/api/user/:uid/website', createWebsite);
  app.get('/api/user/:uid/website', findAllWebsitesForUser);
  app.get('/api/website/:wid', findWebsiteById);
  app.put('/api/website/:wid', updateWebsite);
  app.delete('/api/website/:wid', deleteWebsite);

  function createWebsite(req, res) {
    req.body._id = Math.random().toString();
    req.body.developerId = req.params.uid;
    websites.push(req.body);
    res.json(req.body);
  }

  function findAllWebsitesForUser(req, res) {
    const ret = [];
    for (let x = 0; x < websites.length; x++) {
      if (websites[x].developerId === req.params.uid) {
        ret.push(websites[x]);
      }
    }
    res.json(ret);
  }

  function findWebsiteById(req, res) {
    for (let x = 0; x < websites.length; x++) {
      if (websites[x]._id === req.params.wid) {
        res.json(websites[x]);
        return;
      }
    }
    res.json({});
  }

  function updateWebsite(req, res) {
    for (let x = 0; x < websites.length; x++) {
      if (websites[x]._id === req.params.wid) {
        websites[x] = req.body;
        res.send('Success!');
        return;
      }
    }
    res.send('Fail!');
  }

  function deleteWebsite(req, res) {
    for (let x = 0; x < websites.length; x++) {
      if (websites[x]._id === req.params.wid) {
        websites.splice(x, 1);
        res.send('Success!');
        return;
      }
    }
    res.send('Fail!');
  }
};
