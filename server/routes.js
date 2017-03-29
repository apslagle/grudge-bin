module.exports = function(app, express, db){
  app.post('/api/user', function(req, res) {
    db.Users.findOrCreate({where: {
      name: req.body.name,
    }})
      .then(u=>res.send(u))
  });

  app.delete('/api/user/:name', function(req, res) {
    db.Grudges.destroy({
      where: { name: req.params.name }
    })
      .then(function() {
        res.send('User deleted');
      });
  });

  app.get('/api/grudge/:id', function(req, res) {
    db.Grudges.findAll({
      where: {
        user_id: req.params.id
      }
    })
      .then(function(grudges) {
        res.send(grudges);
      })
  });

  app.get('/api/a-grudge/:id', function(req, res) {
    db.Grudges.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(grudges) {
        res.send(grudges);
      })
  });

  app.post('/api/grudge/:id', function(req, res) {
    db.Grudges.create({
      offender: req.body.offender,
      user_id: req.params.id,
      madSince: new Date(),
      offense: req.body.offense,
    })
    .then(grudge => res.send(grudge))
    .catch(e=>res.send(`Error: ${e}`))
  });

  app.put('/api/grudge/:id', function(req, res) {
    db.Grudges.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(task) {
        task.update(req.body);
        res.send(task);
      });
  });

  app.delete('/api/grudge/:id', function(req, res) {
    db.Grudges.destroy({
      where: { id: req.params.id }
    })
      .then(function() {
        res.send('Task deleted');
      });
  });

};