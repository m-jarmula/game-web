import angular from 'angular';
global.PIXI = require( 'phaser/dist/pixi' )
global.p2 = require( 'phaser/dist/p2' )
global.Phaser = require('phaser');

import BoardDirective from './directives/board/board.directive';

let moduleName = 'game';

let gameModule = angular.module(moduleName, [])
  .directive('board', BoardDirective)

export default moduleName;
