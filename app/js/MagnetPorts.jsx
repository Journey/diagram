/**
 * @fileOverview MangnentPorts Class: use in ca-element which is used to draw lines between ca-elements
 * @name MagnetPorts.jsx
 * @author your name <journey@gmail.com>
 * @license TBD
 */

"use strict";
import {generateUUID} from "./uuid";
import {Actions} from "./Actions";
import {Store} from "./Store";
import {Utility} from "./utility";
import {Position} from "./Position";
var MagnetPorts = React.createClass({
  getPositions: function(){
    var width = this.props.width;
    var height = this.props.height;
    width = width? width : 50;
    height = height? height : 50;
    var positions = [];
    positions.push({x:width/2,y:0});
    positions.push({x:width,y:height/2});
    positions.push({x:width/2,y:height});
    positions.push({x:0,y:height/2});
    return positions;
  },
  
  /**
   * @description render MagnetPorts
   * @param {} function
   * @returns {} 
   */
  render: function(){
    return (
      <g className="magnet-ports">
	{
	  this.getPositions().map(function(position){
	   return <circle r="6" key={generateUUID()} fill="f1c40f" stroke="#000" opcity="0.9" transform={`translate(${position.x},${position.y})`}></circle>;
	  })
	}
      </g>
    );
  }
});

export {MagnetPorts};
