'use strict';

module.exports = function(app) {
  var router = app.loopback.Router();

  router.get('/login-gm', function(req, res) {
    res.render('projects');
  });

  router.post('/projects', function(req, res) {
    var email = 'ks@udp.no';
    var password = 'opensesame';

    app.models.GameMaster.login({
      email: email,
      password: password
    }, 'gameMaster', function(err, token) {
      if (err) throw err;

      token = token.toJSON();

      res.render('projects', {
        username: token.user.username,
        accessToken: token.id
      });
    });
  });

  router.get('/logout', function(req, res) {
    var AccessToken = app.models.AccessToken;
    var token = new AccessToken({id: req.query['access_token']});
    token.destroy();

    res.redirect('/');
  });

  app.use(router);
};
