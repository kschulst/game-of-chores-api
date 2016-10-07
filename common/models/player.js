'use strict';

module.exports = function(Player) {
  Player.disableRemoteMethod('__count__accessTokens', false);
  Player.disableRemoteMethod('__create__accessTokens', false);
  Player.disableRemoteMethod('__delete__accessTokens', false);
  Player.disableRemoteMethod('__destroyById__accessTokens', false);
  Player.disableRemoteMethod('__findById__accessTokens', false);
  Player.disableRemoteMethod('__get__accessTokens', false);
  Player.disableRemoteMethod('__updateById__accessTokens', false);
};
