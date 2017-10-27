module.exports = function (app) {
  let pages = [
    {'_id': '321', 'name': 'Post 1', 'websiteId': '456', 'description': 'Lorem'},
    {'_id': '432', 'name': 'Post 2', 'websiteId': '456', 'description': 'Lorem'},
    {'_id': '543', 'name': 'Post 3', 'websiteId': '456', 'description': 'Lorem'}
  ];
  app.post('/api/website/:wid/page', createPage);
  app.get('/api/website/:wid/page', findAllPagesForWebsite);
  app.get('/api/page/:pid', findPageById);
  app.put('/api/page/:pid', updatePage);
  app.delete('/api/page/:pid', deletePage);

  function createPage(req, res) {
    req.body.websiteId = req.params.wid;
    req.body._id = Math.random().toString();
    pages.push(req.body);
    res.json(req.body);
  }

  function findAllPagesForWebsite(req, res) {
    const ret = [];
    for (let x = 0; x < pages.length; x++) {
      if (pages[x].websiteId === req.params.wid) {
        ret.push(pages[x]);
      }
    }
    res.json(ret);
  }

  function findPageById(req, res) {
    for (let x = 0; x < pages.length; x++) {
      if (pages[x]._id === req.params.pid) {
        res.json(pages[x]);
        return;
      }
    }
    res.json({});
  }

  function updatePage(req, res) {
    for (let x = 0; x < pages.length; x++) {
      if (pages[x]._id === req.params.pid) {
        pages[x] = req.body;
        res.send('Success!');
        return;
      }
    }
    res.send('Fail!');
  }

  function deletePage(req, res) {
    for (let x = 0; x < pages.length; x++) {
      if (pages[x]._id === req.params.pid) {
        pages.splice(x, 1);
        res.send('Success!');
        return;
      }
    }
    res.send('Fail!');
  }
};
