/**
 * The Canvas Component. is a drop zone which allowed drop an `pa-element`
 * @param {object} yuxin - global object
 * @return the Element Component
 */
"use strict";
import {generateUUID} from "./uuid";
var Element = React.createClass({
  createImageMarkup: function(){
    return {
      __html:`<image x="0" y="0" height=${this.props.config.height} width=${this.props.config.width} xlink:href=${this.props.config.image}></image>`
    }
  },
  toggleSelection: function(){
    console.log("double click Element");
  },
  /**
   * @description render ca-element with properties
   * @param {} function
   * @returns {} 
   */
  render: function(){
    //todo:: react does not support image tag now.
    return (
      <g onDoubleClick={this.toggleSelection} className="ca-element" transform={`translate(${this.props.config.x},${this.props.config.y})`}>
	<g className="ca-border">
	  <rect width={this.props.config.width} height={this.props.config.width}></rect>
	</g>
	<g className="ca-img" dangerouslySetInnerHTML={this.createImageMarkup()}></g>
      </g>
    );
  }
});

export {Element};
