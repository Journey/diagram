import {groupData, atomData} from "../../__tests__/data/rawdata.js";
import {Component} from "../../app/js/Component.jsx";
import {ComponentModel} from "../../app/js/Component";
var componentModel = new ComponentModel(groupData(), atomData());
ReactDOM.render(<Component model={componentModel}/>,
  document.getElementById('example'));
