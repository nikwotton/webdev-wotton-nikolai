module.exports = function (app) {
  let widgets = [
    {'_id': '123', 'widgetType': 'HEADING', 'pageId': '321', 'size': 2, 'text': 'GIZMODO'},
    {'_id': '234', 'widgetType': 'HEADING', 'pageId': '321', 'size': 4, 'text': 'Lorem ipsum'},
    {
      '_id': '345',
      'widgetType': 'IMAGE',
      'pageId': '321',
      'width': '100%',
      'url': 'http://lorempixel.com/400/200/'
    },
    {'_id': '456', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'},
    {'_id': '567', 'widgetType': 'HEADING', 'pageId': '321', 'size': 4, 'text': 'Lorem ipsum'},
    {
      '_id': '678',
      'widgetType': 'YOUTUBE',
      'pageId': '321',
      'width': '854',
      'height': '480',
      'url': 'https://youtu.be/AM2Ivdi9c4E'
    },
    {'_id': '789', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'}
  ];
  app.post('/api/page/:pid/widget', createWidget);
  app.get('/api/page/:pid/widget', findAllWidgetsForPage);
  app.get('/api/widget/:wid', findWidgetById);
  app.put('/api/widget/:wid', updateWidget);
  app.delete('/api/widget/:wid', deleteWidget);

  function createWidget(req, res) {
    req.body.pageId = req.params.pid;
    req.body._id = Math.random().toString();
    widgets.push(req.body);
    res.json(req.body);
  }

  function findAllWidgetsForPage(req, res) {
    const ret = [];
    for (let x = 0; x < widgets.length; x++) {
      if (widgets[x].pageId === req.params.pid) {
        ret.push(widgets[x]);
      }
    }
    res.json(ret);
  }

  function findWidgetById(req, res) {
    for (let x = 0; x < widgets.length; x++) {
      if (widgets[x]._id === req.params.wid) {
        res.json(widgets[x]);
        return;
      }
    }
    res.json({});
  }

  function updateWidget(req, res) {
    for (let x = 0; x < widgets.length; x++) {
      if (widgets[x]._id === req.params.wid) {
        widgets[x] = req.body;
        res.send('Success!');
        return;
      }
    }
    res.send('Fail!');
  }

  function deleteWidget(req, res) {
    for (let x = 0; x < widgets.length; x++) {
      if (widgets[x]._id === req.params.wid) {
        widgets.splice(x, 1);
        res.send('Success!');
        return;
      }
    }
    res.send('Fail!');
  }
};
