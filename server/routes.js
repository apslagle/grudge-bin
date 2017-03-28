module.exports = function(app, express, db){
  app.post('/api/user', function(req, res) {
    db.Users.findOrCreate({where: {
      name: req.body.name,
    }})
      .then(u=>res.send(u))
  });

  app.get('/api/grudge/:id', function(req, res) {
    db.Users.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Grudge]
    })
      .then(function(user) {
        res.send(user);
      })
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

  app.delete('/api/grudge/:id', function(req, res) {
    db.Grudges.destroy({
      where: { id: req.params.id }
    })
      .then(function() {
        res.send('Task deleted');
      });
  });

};