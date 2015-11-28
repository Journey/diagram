/**
 * @fileOverview
 * @name pallet.jsx
 * @author Journey
 * @license BSD
 */
define([],function(){
  return Pallet;
  function Pallet(){
    var pallet = React.createClass({
      render:function(){
	<div class="pallet">
	  <h3>{this.props.title}</h3>
	  <div class="pallet-content">
	    {this.props.items.map(createGroups)}
	  </div>
	</div>
      }
    });
    return pallet;
  }

  function Group(){
    var test = true;
    return test;
  }

  function Item(name){
    return true;
  }
});

