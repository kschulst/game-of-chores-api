'use strict';

module.exports = function(GameMaster) {
  GameMaster.disableRemoteMethodByName('prototype.__count__accessTokens');
  GameMaster.disableRemoteMethodByName('prototype.__create__accessTokens');
  GameMaster.disableRemoteMethodByName('prototype.__delete__accessTokens');
  GameMaster.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
  GameMaster.disableRemoteMethodByName('prototype.__findById__accessTokens');
  GameMaster.disableRemoteMethodByName('prototype.__get__accessTokens');
  GameMaster.disableRemoteMethodByName('prototype.__updateById__accessTokens');
};
