'use strict';

module.exports = function(Player) {
  Player.disableRemoteMethodByName('prototype.__count__accessTokens');
  Player.disableRemoteMethodByName('prototype.__create__accessTokens');
  Player.disableRemoteMethodByName('prototype.__delete__accessTokens');
  Player.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
  Player.disableRemoteMethodByName('prototype.__findById__accessTokens');
  Player.disableRemoteMethodByName('prototype.__get__accessTokens');
  Player.disableRemoteMethodByName('prototype.__updateById__accessTokens');
  Player.disableRemoteMethodByName('confirm');
};
