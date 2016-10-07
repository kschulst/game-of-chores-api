'use strict';

module.exports = function(GameMaster) {
  GameMaster.disableRemoteMethod('__count__accessTokens', false);
  GameMaster.disableRemoteMethod('__create__accessTokens', false);
  GameMaster.disableRemoteMethod('__delete__accessTokens', false);
  GameMaster.disableRemoteMethod('__destroyById__accessTokens', false);
  GameMaster.disableRemoteMethod('__findById__accessTokens', false);
  GameMaster.disableRemoteMethod('__get__accessTokens', false);
  GameMaster.disableRemoteMethod('__updateById__accessTokens', false);
};
