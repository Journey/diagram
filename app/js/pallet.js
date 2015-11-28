/**
 * @Define Pallet Component. The Component is composed by Group Component which is composed by Item Component.
 * @name pallet.js
 * @author Journey
 * @license BSD
 */

/**
* Depends on UUID function
* @param {} function
* @returns {} 
*/
(function(){
   
  /* Item Component is displayed via an image + text. And will capture the drag event of the element.
     The component depends on html5's drag&drop capability:
     the html5's data attribute - 
     The configration data is like:
     {
       src:"",
       name:"",
       id:"",
       type:""
     }
   */
  
  var UUID = yuxin.UUID;
  var Item = React.createClass({
    drag: function(event){
      event.dataTransfer.setData("text/plain", event.target.dataset.id);
      event.dataTransfer.dropEffect = "copy";
      event.dataTransfer.effectAllowed = "copyMove";
      //event.target.style.cursor = "move";
    },
    render: function(){
      return (
	<li>
	  <img src={this.props.config.src} data-id={this.props.config.id} alt={this.props.config.name} title={this.props.config.name} draggable="true" onDragStart={this.drag} />
	</li>
      )
    }
  });

  var Group = React.createClass({
    render: function(){
      function createItem(oConfig){
	return <Item key={UUID.generate()} config={oConfig}></Item>
      };
      return (
	<div className="pallet-group">
	<h4>{this.props.title}</h4>
	<ul>
	{this.props.items.map(createItem)}
	</ul>
	</div>
      )
    }
  });

  var Pallet = React.createClass({
    render: function(){
      function createGroup(oGroup){
	return <Group key={UUID.generate()} title={oGroup.title} items={oGroup.items}></Group>
      };
      return (
	<div className="pallet">
	<h3>{this.props.title}</h3>
	<div className="pallet-content">
	{this.props.items.map(createGroup)}
	</div>
	</div>
      );
    }
  });
  yuxin.Pallet = Pallet;
  return Pallet;
})();

