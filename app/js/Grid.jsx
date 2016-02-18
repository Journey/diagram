/**
 * @grid lines for canvas
 * @name LineForCanvas.jsx
 * @author 
 * @license 
 */

var Grid = React.createClass({
  getLines: function(){
    var width = this.props.width;
    var height = this.props.height;
    var gridSize = this.props.gridSize;
    var lines = [];
    //generat vertical lines
    for(let inx =1, count = width/gridSize; inx < count; inx++) {
      let line = `M${inx * gridSize} 0 v${height} Z`;
      lines.push(
	<path d={line} className="grid-line grid-v-line"/>
      );
    }
    //generate horizontal lines
    for (let inx = 1, count = height/gridSize; inx < count; inx++){
      let line = `M0 ${inx * gridSize} h${width}`;
      lines.push(
	<path d={line} className="grid-line grid-h-line"/>
      );
    }
    return lines;
  },
  render: function() {
    return (
      <g className="ca-grids">
	{this.getLines()}
      </g>
    );
  }
});

export {Grid};
