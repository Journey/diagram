/**
 * @fileOverview The Store for the component. used to bridge the dispatch and the view.
 * @name Store.js
 * @author Journey
 * @license TBD
 */
import {AppDispatcher} from "./AppDispatcher";
import {EventEmitter} from "./EventEmitter";
import {Constants} from "./Constants";
var CHANGE_EVENT = "change";
var _selectedElement = null;//null mean no element is selected
var Store = Object.assign({},EventEmitter.prototype,{
    /**
     * determine if the selection change on the canvas area.
     * @param {ca-element} element
     * @returns {bool} 
     */
    isSelectionChanged: function(element){
	if(_selectedElement === element){
	    return false;
	}
	return true;
    },
    /**
     * set the selected element to new element.
     * @param {ca-element} element
     */
    setSelection: function(element) {
	_selectedElement = element;
    },
    emitChange: function(){
	this.emit(CHANGE_EVENT);
    },
    addRepositionListener: function(key, callback){
	
    },
    removeRepositionListener: function(key, callback){
	
    },
    emitReposition: function(key, position){
	
    },
    addChangeListener: function(callback) {
	this.on(CHANGE_EVENT,callback);
    },
    removeChangeListener: function(callback){
	this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action){
    switch(action.actionType){
        case Constants.SELECTION_CHANGE:
    	//emit the changed to the view
    	//Store.();
    	break;
    }
});

export {Store};
