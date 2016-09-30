'use strict';

var async = require('async');

module.exports = function(app) {
  // data sources
  var mongoDs = app.dataSources.mongoDbLocal;

  // create all models
  async.parallel({
    games: async.apply(createGames),
    roles: async.apply(createRoles)
  }, function(err, results) {
    if (err) throw err;

    createGameMasters(results.games, function(err) {
      if (err) throw err;
      console.log('> created GameMasters');
    });

    createPlayers(results.games, function(err) {
      if (err) throw err;
      console.log('> created Players');
    });

    createRewards(results.games, function(err) {
      if (err) throw err;
      console.log('> created Rewards');
    });
    createChores(results.games, function(err) {
      if (err) throw err;
      console.log('> created Chores');
    });
  });

  function createRoles(cb) {
    mongoDs.automigrate('Role', function(err) {
      app.models.Role.create([
        {name: 'player'},
        {name: 'gm'}
      ], cb);
    });
    // TODO: Cleanup RoleMappings etc
    var lbTables = ['User', 'RoleMapping']; //['User', 'AccessToken', 'ACL', 'RoleMapping']
    mongoDs.automigrate(lbTables, function(err) {
    });
  }

  function createGames(cb) {
    mongoDs.automigrate('Game', function(err) {
      if (err) return cb(err);

      app.models.Game.create([
        {id: 'g1', name: 'Fam Leines Game of Chores'},
        {id: 'g2', name: 'Fam Lagmis Game of Chores'}
      ], cb);
    });

//    cb();
  }

  function createGameMasters(games, cb) {
    mongoDs.automigrate('GameMaster', function(err) {
      if (err) return cb(err);

      games[0].gameMasters.create([
        {id: 'gm1', name: 'Kenneth', username: 'kenneth', email: 'ks@udp.no', password: 'opensesame'},
        {id: 'gm2', name: 'Kristin', username: 'kristin', email: 'kristin@leine.cc', password: 'opensesame'}
      ], function(err, gameMasters) {
        assignRole(gameMasters, 'gm');
      });

      games[1].gameMasters.create([
        {id: 'gm3', name: 'Bjørn Arve', username: 'bjornarve', email: 'bal@udp.no', password: 'opensesame'},
        {id: 'gm4', name: 'Benedikte', username: 'benedikte', email: 'ssdlkfjsdlfkjsdlfk@sdfsdlfkjsdfsdflkjsdfkld.com', password: 'opensesame'}
      ], function(err, gameMasters) {
        assignRole(gameMasters, 'gm');
      });
    });

//    cb();
  }

  function createPlayers(games, cb) {
    mongoDs.automigrate('Player', function(err) {
      if (err) return cb(err);

      games[0].players.create([
        {id: 'p1', name: 'Caroline', username: 'caroline',  password: 'opensesame', email: 'devnull@game-of-chores.com'},
        {id: 'p2', name: 'Jonathan', username: 'jonathan',  password: 'opensesame', email: 'devnull@game-of-chores.com'}
      ], function(err, players) {
        assignRole(players, 'player');
      });

      games[1].players.create([
        {id: 'p3', name: 'Martinius', username: 'martinius',  password: 'opensesame', email: 'devnull@game-of-chores.com'},
        {id: 'p4', name: 'Leander', username: 'leander',  password: 'opensesame', email: 'devnull@game-of-chores.com'}
      ], function(err, players) {
        assignRole(players, 'player');
      });
    });

//    cb();
  }

  function createRewards(games, cb) {
    mongoDs.automigrate('Reward', function(err) {
      if (err) return cb(err);

      games[0].rewards.create([
        {id: 'r1', name: 'Erfarenhetspoeng', shortname: 'XP'},
        {id: 'r2', name: 'Skylanderpoeng', shortname: 'SP'}
      ]);

      games[1].rewards.create([
        {id: 'r3', name: 'Erfarenhetspoeng', shortname: 'XP'},
        {id: 'r4', name: 'Kroner', shortname: 'kr'}
      ]);
    });

    cb();
  }

  function createChores(games, cb) {
    mongoDs.automigrate('Chore', function(err) {
      if (err) return cb(err);

      games[0].chores.create([
        {id: 'ch1', name: 'Rydde rommet', rewards: [{shortname: 'XP', count: 500}, {shortname: 'SP', count: 2}]},
        {id: 'ch2', name: 'Re opp sengen', rewards: [{shortname: 'XP', count: 100}]},
        {id: 'ch3', name: 'Levere matboks', rewards: [{shortname: 'XP', count: 100}]}
      ]);

      games[1].chores.create([
        {id: 'ch4', name: 'Pusse tenner', rewards: [{shortname: 'XP', count: 100}]},
        {id: 'ch5', name: 'Gå med søpla', rewards: [{shortname: 'XP', count: 100}]}
      ]);
    });

    cb();
  }

  function assignRole(users, rolename) {
    app.models.Role.find(
      {where: {name: rolename}}
    , function(err, roles) {
      if (err) return cb(err);
      if (roles.length !== 1) throw err;
      var role = roles[0];

      users.forEach(function(user) {
        app.models.RoleMapping.create({
          principalType: app.models.RoleMapping.USER,
          principalId: user.id,
          roleId: role.id
        }, function(err, roleMapping) {
          if (err) return console.log(err);
          console.log('User (' + user.name + ') assigned RoleID ' + role.name  + ' (' + role.id + ')');
        });
      });
    });
  }
};
