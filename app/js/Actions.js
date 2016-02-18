import {AppDispatcher} from "./AppDispatcher";
import {Constants} from "./Constants";

var Actions = {
    /**
     * event triggerred when dbclick on the element in the canvas area. or click blank space of  the ca-area. 
     * @param {ca-element} element the cavas element or null which represent the canvas area.
     */
    changeSelection: function(element) {
	AppDispatcher.dispatch({
	    actionType:Constants.SELECTION_CHANGE,
	    element: element
	});
    }
};

export {Actions};
