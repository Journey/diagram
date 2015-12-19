/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1);
	__webpack_require__(5);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./css.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./css.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "*[draggable=true]{\r\n    -moz-user-select:none;\r\n    -khtml-user-drag: element;\r\n    -webkit-user-drag: element;\r\n    -khtml-user-select: none;\r\n    -webkit-user-select: none;\r\n    cursor: move;\r\n}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _pallet = __webpack_require__(6);

	var _canvas = __webpack_require__(8);

	var aGroups = [{
	  "title": "微网",
	  "items": [{
	    "src": "css/1.jpg",
	    "id": "1",
	    "name": "单晶硅光伏",
	    "type": "micro"
	  }, {
	    "src": "css/2.jpg",
	    "id": "2",
	    "name": "多晶硅光伏",
	    "type": "micro"
	  }]
	}, {
	  "title": "光热",
	  "items": [{
	    "src": "css/3.jpg",
	    "id": "1",
	    "name": "储油罐",
	    "type": "micro"
	  }, {
	    "src": "css/4.jpg",
	    "id": "2",
	    "name": "绑点",
	    "type": "micro"
	  }]
	}];
	ReactDOM.render(React.createElement(
	  "div",
	  null,
	  React.createElement(_pallet.Pallet, { title: "Toolbox", items: aGroups }),
	  React.createElement(_canvas.Canvas, null)
	), document.getElementById('example'));

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * @Define Pallet Component. The Component is composed by Group Component which is composed by Item Component.
	 * @name pallet.jsx
	 * @author Journey
	 * @license BSD
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Pallet = undefined;

	var _uuid = __webpack_require__(7);

	/**
	* Depends on UUID function
	* @param {} function
	* @returns {} 
	*/

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

	var Item = React.createClass({
	  displayName: 'Item',

	  drag: function drag(event) {
	    event.dataTransfer.setData("text/plain", event.target.dataset.id);
	    event.dataTransfer.dropEffect = "copy";
	    event.dataTransfer.effectAllowed = "copyMove";
	    //event.target.style.cursor = "move";
	  },
	  render: function render() {
	    return React.createElement(
	      'li',
	      null,
	      React.createElement('img', { src: this.props.config.src, 'data-id': this.props.config.id, alt: this.props.config.name, title: this.props.config.name, draggable: 'true', onDragStart: this.drag })
	    );
	  }
	});

	var Group = React.createClass({
	  displayName: 'Group',

	  render: function render() {
	    function createItem(oConfig) {
	      return React.createElement(Item, { key: (0, _uuid.generateUUID)(), config: oConfig });
	    };
	    return React.createElement(
	      'div',
	      { className: 'pallet-group' },
	      React.createElement(
	        'h4',
	        null,
	        this.props.title
	      ),
	      React.createElement(
	        'ul',
	        null,
	        this.props.items.map(createItem)
	      )
	    );
	  }
	});

	var Pallet = React.createClass({
	  displayName: 'Pallet',

	  render: function render() {
	    function createGroup(oGroup) {
	      return React.createElement(Group, { key: (0, _uuid.generateUUID)(), title: oGroup.title, items: oGroup.items });
	    };
	    return React.createElement(
	      'div',
	      { className: 'pallet' },
	      React.createElement(
	        'h3',
	        null,
	        this.props.title
	      ),
	      React.createElement(
	        'div',
	        { className: 'pallet-content' },
	        this.props.items.map(createGroup)
	      )
	    );
	  }
	});

	exports.Pallet = Pallet;

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * @Define UUID Component - used to generate the uuid;
	 * @name uuid.js
	 * @author journey
	 * @license BSD
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var uuidTemplate = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
	function generateUUID() {
	    return uuidTemplate.replace(/[xy]/g, function (c) {
	        var r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0,
	            v = c == 'x' ? r : r & 0x3 | 0x8;
	        return v.toString(16);
	    });
	};

	exports.generateUUID = generateUUID;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The Canvas Component. is a drop zone which allowed drop an `pa-element`
	 * @param {object} yuxin - global object
	 * @return the Canvas Component
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Canvas = undefined;

	var _uuid = __webpack_require__(7);

	var _element = __webpack_require__(9);

	var _config = __webpack_require__(10);

	var Canvas = React.createClass({
	  displayName: "Canvas",

	  getInitialState: function getInitialState() {
	    return {
	      width: 1024,
	      height: 768,
	      gridSize: 10,
	      elements: []
	    };
	  },
	  dragOver: function dragOver(evt) {
	    evt.preventDefault();
	    evt.dataTransfer.dropEffect = "move";
	  },
	  drop: function drop(event) {
	    var elementType = event.dataTransfer.getData("text");
	    var oElemConfig = this.getElementConfigByType(elementType);
	    this.state.elements.push(oElemConfig);
	    this.setState({ "elements": this.state.elements });
	    event.dataTransfer.clearData();
	    event.preventDefault();
	  },
	  getElementConfigByType: function getElementConfigByType(eleType) {
	    var oConfig = _config.ElementsConfig[eleType];
	    if (!oConfig) {}
	    //todo - fixed now
	    return {
	      width: 74,
	      height: 74,
	      x: 70,
	      y: 70,
	      image: "css/1.jpg",
	      key: (0, _uuid.generateUUID)()
	    };
	  },
	  onElementUpdate: function onElementUpdate() {
	    console.log("on element update event triggered");
	  },
	  createElement: function createElement(element) {
	    return React.createElement(_element.Element, { config: element, key: element.key, update: "{this.onElementUpdate}" });
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "canvas" },
	      React.createElement(
	        "svg",
	        { width: this.state.width, height: this.state.height, onDrop: this.drop, onDragOver: this.dragOver },
	        this.state.elements.map(this.createElement)
	      )
	    );
	  }
	});

	exports.Canvas = Canvas;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The Canvas Component. is a drop zone which allowed drop an `pa-element`
	 * @param {object} yuxin - global object
	 * @return the Element Component
	 */
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Element = undefined;

	var _uuid = __webpack_require__(7);

	var Element = React.createClass({
	  displayName: "Element",

	  createImageMarkup: function createImageMarkup() {
	    return {
	      __html: "<image x=\"0\" y=\"0\" height=" + this.props.config.height + " width=" + this.props.config.width + " xlink:href=" + this.props.config.image + "></image>"
	    };
	  },
	  toggleSelection: function toggleSelection() {
	    console.log("double click Element");
	  },
	  /**
	   * @description render ca-element with properties
	   * @param {} function
	   * @returns {} 
	   */
	  render: function render() {
	    //todo:: react does not support image tag now.
	    return React.createElement(
	      "g",
	      { onDoubleClick: this.toggleSelection, className: "ca-element", transform: "translate(" + this.props.config.x + "," + this.props.config.y + ")" },
	      React.createElement(
	        "g",
	        { className: "ca-border" },
	        React.createElement("rect", { width: this.props.config.width, height: this.props.config.width })
	      ),
	      React.createElement("g", { className: "ca-img", dangerouslySetInnerHTML: this.createImageMarkup() })
	    );
	  }
	});

	exports.Element = Element;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ElementsConfig = {};

	exports.ElementsConfig = ElementsConfig;

/***/ }
/******/ ]);