'use strict';

module.exports = function(app) {
  var Role = app.models.Role;

  Role.registerResolver('gameOwner', function(role, context, cb) {
    var gameId = context.modelId;
    var userId = context.accessToken.userId;
    console.log("KEN> gameOwner resolver' +
      ', modelName=' + context.modelName +
      ', gameId=' + gameId +
      ', userId=' + userId);

    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }

    if (context.modelName !== 'Game') {
      return reject();
    }

    // do not allow anonymous users
    if (!userId) {
      return reject();
    }

    app.models.Game.findById(context.modelId, {
      include: {
        relation: "gameMasters",
        scope: {
          where: {id: userId}
        }
      }
    })
    .then(function(game) {
      return cb(null, game.toObject().gameMasters.length > 0);
    })
    .catch(function(err) {
      console.log(err);
      return cb(null, false);
    })
  });
};
