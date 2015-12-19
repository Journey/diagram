/**
 * The Canvas Component. is a drop zone which allowed drop an `pa-element`
 * @param {object} yuxin - global object
 * @return the Canvas Component
 */
"use strict";
import {generateUUID} from "./uuid";
import {Element} from "./element.jsx";
import {ElementsConfig} from "./config";
var Canvas = React.createClass({
  getInitialState: function(){
    return {
	width: 1024,
	height: 768,
	gridSize: 10,
      elements:[],
      selectedElement: null
    }
  },
  dragOver: function(evt){
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  },
  drop: function(event){
    var elementType = event.dataTransfer.getData("text");
    var oElemConfig = this.getElementConfigByType(elementType);
    this.state.elements.push(oElemConfig);
    this.setState({"elements": this.state.elements});
    event.dataTransfer.clearData();
    event.preventDefault();
  },
  getElementConfigByType: function(eleType){
    var oConfig = ElementsConfig[eleType];
    if(!oConfig){
      
    }
    //todo - fixed now
    return {
      width: 74,
      height: 74,
      x: 70,
      y: 70,
      image:"css/1.jpg",
      key: generateUUID()
    };
  },
  onElementUpdate: function(){
    console.log("on element update event triggered");
  },
  onElementSelectionChange: function(element){
    this.setState({selectedElement: element});
  },
  createElement: function(element){
	return <Element config={element} key={element.key} update="{this.onElementUpdate} onSelect={this.onSelect}"></Element>
  },
  render: function(){
    return (
	<div className="canvas">
	<svg width={this.state.width} height={this.state.height} onDrop={this.drop} onDragOver={this.dragOver}>
	{this.state.elements.map(this.createElement)}
	</svg>
	</div>
    );
  }
});

export {Canvas};
