/**
 * The Canvas Component. is a drop zone which allowed drop an `pa-element`
 * @param {object} yuxin - global object
 * @return the Element Component
 */
"use strict";
import {generateUUID} from "./uuid";
import {Actions} from "./Actions";
import {Store} from "./Store";
import {Utility} from "./utility";
import {Position} from "./Position";
var Element = React.createClass({
  getInitialState: function() {
    return {
      x: this.props.config.x,
      y: this.props.config.y
    };
  },
  /**
   * event triggered when double clicked on the 
   */
  dbclick: function(){
    Actions.changeSelection(this);
  },

  drag: function(event){
    Position.logMistakes(event, ReactDOM.findDOMNode(this));
    event.dataTransfer.setData("text/plain",Utility.prefixReposition(this.props.config.key));
    event.dataTransfer.dropEffect = "copy";
    event.dataTransfer.effectAllowed = "copyMove";
  },
  reposition: function(position) {
    this.setState({
      x: position.x,
      y: position.y
    });
  },
  
  /**
   * @description render ca-element with properties
   * @param {} function
   * @returns {} 
   */
  render: function(){
    return (
      <g onDoubleClick={this.dbclick} className="ca-element" transform={`translate(${this.state.x},${this.state.y})`} draggable="true" onDragStart={this.drag}>
	<g className="ca-border">
	  <rect width={this.props.config.width} height={this.props.config.width}></rect>
	</g>
	<g className="ca-img">
	  <image x="0" y="0" height={this.props.config.height} width={this.props.config.width} xlinkHref={this.props.config.image}></image>
	</g>
      </g>
    );
  }
});

export {Element};
