/**
 * The Canvas Component. is a drop zone which allowed drop an `pa-element`
 * @param {object} yuxin - global object
 * @return the Canvas Component
 */
(function(){
    var UUID = yuxin.UUID;
  var Element = React.createClass({
	getInitialState: function(){
	    return {
		config:this.props.config
	    };
	},
	render: function(){
	    return (
		    <g className="pa-element" key={UUID.generate()}>

		</g>
	    )
	}
  });
    
  var Canvas = React.createClass({
    getInitialState: function(){
      return {
	width: 1024,
	height: 768,
	gridSize: 10,
	elements:[]
      }
    },
    dragOver: function(evt){
      evt.preventDefault();
      evt.dataTransfer.dropEffect = "move"
    },
    drop: function(event){
      var elementType = event.dataTransfer.getData("text");
      console.log("element-type" + elementType);
      event.dataTransfer.clearData();
    },
    createElement: function(element){
	return <Element config={element}></Element>
    },
    render: function(){
      return (
	<div className="canvas">
	<svg width={this.state.width} height={this.state.height} onDrop={this.drop} onDragOver={this.dragOver}>
	{this.state.elements.map(createElement)}
	</svg>
	</div>
      );
    }
  });
  yuxin.Canvas = Canvas;
  return Canvas;
    
})();
