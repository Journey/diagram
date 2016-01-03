/**
 * The Canvas Component. is a drop zone which allowed drop an `pa-element`
 * @param {object} yuxin - global object
 * @return the Canvas Component
 */
"use strict";
import {generateUUID} from "./uuid";
import {Element} from "./element.jsx";
var Canvas = React.createClass({
  getInitialState: function(){
    return {
	width: 1024,
	height: 768,
	gridSize: 10,
      elements:[],
      links:[],
      selectedElement: null
    }
  },
  dragOver: function(evt){
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  },
  drop: function(event){
    var elementType = event.dataTransfer.getData("text");

    var elementImage = this.props.getElementImageById(elementType);
    var elementSize = this.props.getElementSizeById(elementType);
    var elementPosition = this.getPosition(event);
    
    this.state.elements.push({
      width: elementSize.width,
      height: elementSize.height,
      x: elementPosition.x,
      y: elementPosition.y,
      image:elementImage.image,
      typeId:elementType,
      key:generateUUID()
    });
    this.setState({"elements": this.state.elements});
    event.dataTransfer.clearData();
    event.preventDefault();
  },
  getPosition: function(evt){
    return {
      x: 30,
      y: 40
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
