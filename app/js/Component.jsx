/**
 * The Canvas Component. is a drop zone which allowed drop an `pa-element`
 * @param {object} yuxin - global object
 * @return the Element Component
 */
"use strict";
import {generateUUID} from "./uuid";
import {Pallet} from "./pallet.jsx";
import {Canvas} from "./canvas.jsx";
import {Property} from "./property.jsx";
var Component = React.createClass({
  render: function(){
    return (
      <div className="diagram-component">
	<div className="first-col">
	  <Pallet model={this.props.model.palletModel}></Pallet>
	</div>
	<div className="mid-col">
	  <Canvas model={this.props.model.canvasModel}></Canvas>
	</div>
	<div className="last-col">
	  <Property model={this.props.model.propertyModel}></Property>
	</div>
      </div>
    );
  }
});

export {Component};