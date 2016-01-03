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
	exports.push([module.id, "*[draggable=true]{\r\n    -moz-user-select:none;\r\n    -khtml-user-drag: element;\r\n    -webkit-user-drag: element;\r\n    -khtml-user-select: none;\r\n    -webkit-user-select: none;\r\n    cursor: move;\r\n}\r\n.diagram-component{\r\n    display: flex;\r\n    flex-direction: row;\r\n}\r\n.diagram-component>div{\r\n    border: 1px solid #ccc;\r\n}\r\n.first-col{\r\n    width: 300px;\r\n}\r\n.mid-col{\r\n    flex-grow: 1;\r\n}\r\n.last-col{\r\n    width: 300px;\r\n}\r\n", ""]);

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

	var _rawdata = __webpack_require__(6);

	var _ComponentModel = __webpack_require__(13);

	var _Component = __webpack_require__(16);

	var componentModel = new _ComponentModel.ComponentModel((0, _rawdata.jsonAtomData)(), (0, _rawdata.jsonGroupData)());
	ReactDOM.render(React.createElement(_Component.Component, { model: componentModel }), document.getElementById('example'));

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.oPalletModel = exports.oAtomModel = exports.oGroupModel = exports.jsonAtomData = exports.jsonGroupData = undefined;

	var _GroupModel = __webpack_require__(7);

	var _AtomModel = __webpack_require__(9);

	var _PalletModel = __webpack_require__(12);

	function groupData() {
	  var map = new Map();
	  map.set("groupId1", { groupName: "group name 1" });
	  map.set("groupId2", { groupName: "group name 2" });
	  return map;
	};

	function jsonGroupData() {
	  return {
	    "groupId1": { "groupName": "group name 1" },
	    "groupId2": { "groupName": "group name 2" }
	  };
	}
	function jsonAtomData() {
	  return atomData();
	}

	function atomData() {
	  var atomData = {
	    "item-id-1": {
	      name: "item name 1",
	      width: 50,
	      height: 50,
	      groupId: "groupId1",
	      statusList: [{
	        id: "status-1",
	        name: "status name 1",
	        image: "css/1.jpg",
	        isDefault: true
	      }, {
	        id: "status-2",
	        name: "status name 2",
	        image: "css/2.jpg",
	        isDefault: false
	      }]
	    },
	    "item-id-2": {
	      name: "item name 2",
	      width: 50,
	      height: 50,
	      groupId: "groupId1",
	      statusList: [{
	        id: "status-3",
	        name: "status name 2",
	        image: "css/3.jpg",
	        isDefault: true
	      }]
	    },
	    "item-id-3": {
	      name: "item name 3",
	      width: 50,
	      height: 50,
	      groupId: "groupId2",
	      statusList: [{
	        id: "status-3",
	        name: "status name 3",
	        image: "css/4.jpg",
	        isDefault: true
	      }]
	    }
	  };
	  return atomData;
	};
	function groupModel() {
	  return new _GroupModel.GroupModel(groupData());
	}
	function atomModel() {
	  return new _AtomModel.AtomModel(atomData());
	}

	var oGroupModel = groupModel();
	var oAtomModel = atomModel();
	var oPalletModel = new _PalletModel.PalletModel(oAtomModel, oGroupModel);

	exports.jsonGroupData = jsonGroupData;
	exports.jsonAtomData = jsonAtomData;
	exports.oGroupModel = oGroupModel;
	exports.oAtomModel = oAtomModel;
	exports.oPalletModel = oPalletModel;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var _createClass = (function () {
				function defineProperties(target, props) {
							for (var i = 0; i < props.length; i++) {
										var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
							}
				}return function (Constructor, protoProps, staticProps) {
							if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
				};
	})();

	Object.defineProperty(exports, "__esModule", {
				value: true
	});
	exports.GroupModel = undefined;

	var _DataModel2 = __webpack_require__(8);

	function _classCallCheck(instance, Constructor) {
				if (!(instance instanceof Constructor)) {
							throw new TypeError("Cannot call a class as a function");
				}
	}

	function _possibleConstructorReturn(self, call) {
				if (!self) {
							throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
				if (typeof superClass !== "function" && superClass !== null) {
							throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
				}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var GroupModel = (function (_DataModel) {
				_inherits(GroupModel, _DataModel);

				function GroupModel(mData) {
							_classCallCheck(this, GroupModel);

							//this._className = GroupMOdel.name;
							return _possibleConstructorReturn(this, Object.getPrototypeOf(GroupModel).call(this, mData));
				}

				_createClass(GroupModel, [{
							key: "getGroupNameById",
							value: function getGroupNameById(groupId) {
										console.assert(this.data.has(groupId), "GroupModel.getGroupNameById, need a validate groupId");
										var oGroupInfo = this.data.get(groupId);
										return oGroupInfo.groupName;
							}
				}]);

				return GroupModel;
	})(_DataModel2.DataModel);

	;

	exports.GroupModel = GroupModel;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () {
	   function defineProperties(target, props) {
	      for (var i = 0; i < props.length; i++) {
	         var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	      }
	   }return function (Constructor, protoProps, staticProps) {
	      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	   };
	})();

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});

	function _classCallCheck(instance, Constructor) {
	   if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	   }
	}

	var DataModel = (function () {
	   function DataModel(mData) {
	      _classCallCheck(this, DataModel);

	      if (!this._className) {
	         this._className = DataModel.name;
	      }
	      var sError = this._className + ":constructor need a Map type as parameter";
	      mData = this._processData(mData);
	      console.assert(mData instanceof Map, sError);
	      this._mData = mData;
	   }

	   _createClass(DataModel, [{
	      key: "_processData",
	      value: function _processData(oData) {
	         //override it if neccessary
	         return oData;
	      }
	   }, {
	      key: "data",
	      get: function get() {
	         return this._mData;
	      },
	      set: function set(value) {
	         throw new Error(this._className + ":- you can not set value to groupData");
	      }
	   }]);

	   return DataModel;
	})();

	;

	exports.DataModel = DataModel;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var _createClass = (function () {
				function defineProperties(target, props) {
							for (var i = 0; i < props.length; i++) {
										var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
							}
				}return function (Constructor, protoProps, staticProps) {
							if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
				};
	})();

	Object.defineProperty(exports, "__esModule", {
				value: true
	});
	exports.AtomModel = undefined;

	var _DataModel2 = __webpack_require__(8);

	var _AtomItemModel = __webpack_require__(10);

	function _classCallCheck(instance, Constructor) {
				if (!(instance instanceof Constructor)) {
							throw new TypeError("Cannot call a class as a function");
				}
	}

	function _possibleConstructorReturn(self, call) {
				if (!self) {
							throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				}return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
				if (typeof superClass !== "function" && superClass !== null) {
							throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
				}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	} /**
	   * @the data model class for the yuxin js, will provide variouse data formates for the application
	   * @name AtomModel.js
	   * @author 
	   * @license 
	   */

	var AtomModel = (function (_DataModel) {
				_inherits(AtomModel, _DataModel);

				/** mData - data format:
	    {
	     id: AtomItemModelInstance
	    }
	    */

				function AtomModel(oData) {
							_classCallCheck(this, AtomModel);

							//this._className = AtomModel.name;
							return _possibleConstructorReturn(this, Object.getPrototypeOf(AtomModel).call(this, oData));
				}

				_createClass(AtomModel, [{
							key: "_processData",
							value: function _processData(oData) {
										//translate json data to Map model data
										var _mData = new Map();
										Object.keys(oData).forEach((function (key) {
													var curItem = oData[key];
													var atomItemModel = new _AtomItemModel.AtomItemModel(key, curItem.name, curItem.width, curItem.height, curItem.groupId, curItem.statusList);
													_mData.set(key, atomItemModel);
										}).bind(this));
										return _mData;
							}
				}, {
							key: "getDefaultImageById",
							value: function getDefaultImageById(id) {
										console.assert(this.data.has(id), "AtomModel:" + id + " not exsits");
										var item = this.data.get(id);
										return item.defaultStatusImage;
							}
				}, {
							key: "getImageByIdAndStatus",
							value: function getImageByIdAndStatus(id, statusId) {
										console.assert(this.data.has(id), "AtomModel:item id -" + id + " does not exsited");
										var item = this.data.get(id);
										return item.getStatusImage(statusId);
							}
				}, {
							key: "getItemNameById",
							value: function getItemNameById(id) {
										var item = this.data.get(id);
										return item.name;
							}
				}, {
							key: "getGroupIdByItemId",
							value: function getGroupIdByItemId(itemId) {
										console.assert(this.data.has(itemId), "AtomModel: item id - " + itemId + " does not exsit");
										return this.data.get(itemId).groupId;
							}
				}, {
							key: "getDefaultStatusById",
							value: function getDefaultStatusById(itemId) {
										console.assert(this.data.has(itemId), "AtomModel-" + itemId + " does not exsit");
										return this.data.get(itemId).defaultStatus;
							}
				}, {
							key: "getImageSizeById",
							value: function getImageSizeById(itemId) {
										console.assert(this.data.has(itemId), "AtomModel-" + itemId + " does not exsit");
										var item = this.data.get(itemId);
										return {
													width: item.width,
													height: item.height
										};
							}
				}]);

				return AtomModel;
	})(_DataModel2.DataModel);

	;

	exports.AtomModel = AtomModel;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () {
	   function defineProperties(target, props) {
	      for (var i = 0; i < props.length; i++) {
	         var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	      }
	   }return function (Constructor, protoProps, staticProps) {
	      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	   };
	})(); /**
	       * @the data model class for the yuxin js, will provide variouse data formates for the application
	       * @name AtomModel.js
	       * @author 
	       * @license 
	       */

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	exports.AtomItemModel = undefined;

	var _DataModel = __webpack_require__(8);

	var _AtomItemStatusModel = __webpack_require__(11);

	function _classCallCheck(instance, Constructor) {
	   if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	   }
	}

	var AtomItemModel = (function () {
	   function AtomItemModel(id, name, width, height, groupId, aStatusModels) {
	      _classCallCheck(this, AtomItemModel);

	      //[this.id,this._name,this.width,this.height,this._groupId] = [...arguments];
	      this.id = id;
	      this._name = name;
	      this.width = width;
	      this.height = height;
	      this._groupId = groupId;
	      this.mStatusModels = this._translateStatusFromArrayToMap(aStatusModels);
	   }

	   _createClass(AtomItemModel, [{
	      key: "_translateStatusFromArrayToMap",
	      value: function _translateStatusFromArrayToMap(aStatusModels) {
	         var _mRet = new Map();
	         aStatusModels.forEach(function (oStatus) {
	            var id = oStatus.id;
	            var name = oStatus.name;
	            var image = oStatus.image;
	            var isDefault = oStatus.isDefault;

	            _mRet.set(id, new _AtomItemStatusModel.AtomItemStatusModel(oStatus.id, name, image, isDefault));
	         });
	         return _mRet;
	      }
	   }, {
	      key: "isDefaultStatus",
	      value: function isDefaultStatus(statusId) {
	         console.log(this.mStatusModels.has(statusId), "AtomItemModel:status id-" + statusId + " does not exist");
	         return this.mStatusModels.get(statusId).isDefault;
	      }
	   }, {
	      key: "getStatusImage",
	      value: function getStatusImage(statusId) {
	         console.assert(this.mStatusModels.has(statusId), "AtomItemModel: status id -" + statusId + " does not exsited");
	         return this.mStatusModels.get(statusId).image;
	      }
	   }, {
	      key: "getStatusName",
	      value: function getStatusName(statusId) {
	         console.assert(this.mStatusModels.has(statusId), "AtomItemModel: status id -" + statusId + " does not exsited");
	         return this.mStatusModels.get(statusId).name;
	      }
	   }, {
	      key: "defaultStatus",
	      get: function get() {
	         var that = this;
	         if (this._defaultStatus === undefined) {
	            this.mStatusModels.forEach(function (value) {
	               if (value.isDefault) {
	                  that._defaultStatus = value;
	               }
	            });
	         };
	         console.assert(this._defaultStatus !== undefined, "AtomItemModel-" + this.name + ": does not have default status");
	         return this._defaultStatus;
	      }
	   }, {
	      key: "groupId",
	      get: function get() {
	         return this._groupId;
	      }
	   }, {
	      key: "name",
	      get: function get() {
	         return this._name;
	      }
	   }, {
	      key: "defaultStatusImage",
	      get: function get() {
	         return this.defaultStatus.image;
	      }
	   }, {
	      key: "defaultStatusId",
	      get: function get() {
	         return this.defaultStatus.id;
	      }
	   }]);

	   return AtomItemModel;
	})();

	;

	exports.AtomItemModel = AtomItemModel;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var AtomItemStatusModel = (function () {
	  function AtomItemStatusModel(id, name, image, isDefault) {
	    _classCallCheck(this, AtomItemStatusModel);

	    this.id = id;
	    this.name = name;
	    this.image = image;
	    this._isDefault = isDefault;
	  }

	  _createClass(AtomItemStatusModel, [{
	    key: "isDefault",
	    get: function get() {
	      return !!this._isDefault;
	    },
	    set: function set(value) {
	      if (this._isDefault === undefined) {
	        this._isDefault = !!value;
	      } else {
	        throw new Error("AtomItemStatusModel.isDefault- can not assign value to it");
	      }
	    }
	  }]);

	  return AtomItemStatusModel;
	})();

	;
	exports.AtomItemStatusModel = AtomItemStatusModel;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	})();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PalletModel = undefined;

	var _AtomModel = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	var PalletItemModel = function PalletItemModel(id, sName, image) {
	    _classCallCheck(this, PalletItemModel);

	    this.id = id;
	    this.name = sName;
	    this.image = image;
	    this.width = 50;
	    this.height = 50;
	};

	;

	var PalletModel = (function () {
	    function PalletModel(atomModel, groupModel) {
	        _classCallCheck(this, PalletModel);

	        var map = new Map();
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	            for (var _iterator = groupModel.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var group = _step.value;

	                var groupId = group[0];
	                map.set(groupId, {
	                    "groupName": groupModel.getGroupNameById(groupId),
	                    "items": []
	                });
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }

	        ;

	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	            for (var _iterator2 = atomModel.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                var item = _step2.value;

	                var itemId = item[0];
	                var groupId = atomModel.getGroupIdByItemId(itemId);
	                var name = atomModel.getItemNameById(itemId);
	                var image = atomModel.getDefaultImageById(itemId);
	                console.assert(map.has(groupId), "GroupModel does not have groupId-" + groupId + " from AtomModel");
	                map.get(groupId).items.push(new PalletItemModel(itemId, name, image));
	            }
	        } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                    _iterator2.return();
	                }
	            } finally {
	                if (_didIteratorError2) {
	                    throw _iteratorError2;
	                }
	            }
	        }

	        this._mData = map;
	    }

	    _createClass(PalletModel, [{
	        key: "data",
	        get: function get() {
	            return this._mData;
	        }
	    }]);

	    return PalletModel;
	})();

	exports.PalletModel = PalletModel;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	})();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ComponentModel = undefined;

	var _PalletModel = __webpack_require__(12);

	var _CanvasModel = __webpack_require__(14);

	var _PropertyModel = __webpack_require__(15);

	var _AtomModel = __webpack_require__(9);

	var _GroupModel = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError("Cannot call a class as a function");
	    }
	}

	var ComponentModel = exports.ComponentModel = (function () {
	    function ComponentModel(atomData, groupData) {
	        _classCallCheck(this, ComponentModel);

	        this.groupModel = new _GroupModel.GroupModel(this.trnansformRawDataToGroupModelData(groupData));
	        this.atomModel = new _AtomModel.AtomModel(this.transformRawDataToAtomModelData(atomData));
	        this.palletModel = new _PalletModel.PalletModel(this.atomModel, this.groupModel);
	        this.canvasModel = new _CanvasModel.CanvasModel();
	        this.propertyModel = new _PropertyModel.PropertyModel();
	    }

	    _createClass(ComponentModel, [{
	        key: "trnansformRawDataToGroupModelData",

	        //from json to map
	        value: function trnansformRawDataToGroupModelData(oData) {
	            console.assert(oData, "Component.transformRawDataToGroupModelData need an object as the parameter");
	            //todo:: replace the logic with the real logic
	            var oMap = new Map();
	            Object.keys(oData).forEach(function (key) {
	                oMap.set(key, {
	                    "groupName": oData[key].groupName
	                });
	            });
	            return oMap;
	        }
	    }, {
	        key: "transformRawDataToAtomModelData",

	        //from json to map
	        value: function transformRawDataToAtomModelData(oData) {
	            console.assert(oData, "Component.transformRawDataToAtomModelData need an object as it's parameter");
	            return oData;
	            //todo::does not need map as the parameter
	            var oMap = new Map();
	            /*oMap.set("atom_1",{name:"Atom 1",width:50,height: 50,groupId:"group_id_1",statusList:[{
	              id:1,name:"yun xing",image:"css/1.jpg",isDefault: true
	            },{
	              id: 2,name:"ting ji",image:"css/1.jpg",isDefault: false
	            }]});*/
	            Object.keys(oData, function (key) {
	                oMap.set(key, oData[key]);
	            });
	            return oMap;
	        }
	    }, {
	        key: "getPalletDataModel",
	        value: function getPalletDataModel(groupModel, atomModel) {
	            var oMap = new Map();
	            groupModel.keys().forEach(function (key, item) {
	                oMap.set(key, {
	                    groupName: item.groupName,
	                    items: []
	                });
	            });
	            atomModel.keys().forEach(function (key) {
	                var itemId = key;
	                var groupId = atomModel.getGroupIdByItemId(key);
	                var image = atomModel.getDefaultImageById(key);
	                var name = atomModel.getItemNameById(id);
	                console.assert(groupModel.has(groupId), "Component.getPalletDataModel- groupId -" + groupId + " does not exist");
	                oMap.get(groupId).items.push({
	                    id: itemId,
	                    name: name,
	                    image: image
	                });
	            });
	            return oMap;
	        }
	    }, {
	        key: "getElementDefaultImageById",
	        value: function getElementDefaultImageById(eleId) {
	            return this.atomModel.getDefaultStatusById(eleId);
	        }
	    }, {
	        key: "getElementImageSizeById",
	        value: function getElementImageSizeById(eleId) {
	            return this.atomModel.getImageSizeById(eleId);
	        }
	    }]);

	    return ComponentModel;
	})();

	exports.ComponentModel = ComponentModel;

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () {
				function defineProperties(target, props) {
							for (var i = 0; i < props.length; i++) {
										var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
							}
				}return function (Constructor, protoProps, staticProps) {
							if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
				};
	})();

	Object.defineProperty(exports, "__esModule", {
				value: true
	});

	function _classCallCheck(instance, Constructor) {
				if (!(instance instanceof Constructor)) {
							throw new TypeError("Cannot call a class as a function");
				}
	}

	var CanvasElementModel = (function () {
				function CanvasElementModel(typeId, image, width, height, xPosition, yPosition, key) {
							_classCallCheck(this, CanvasElementModel);

							this.typeId = typeId;
							this.image = image;
							this.width = width;
							this.height = height;
							this.xPosition = xPosition;
							this.yPosition = yPosition;
							this.key = key;
				}

				_createClass(CanvasElementModel, null, [{
							key: "getInstanceFromObject",
							value: function getInstanceFromObject(obj) {
										var typeId = obj.typeId;
										var image = obj.image;
										var width = obj.width;
										var height = obj.height;
										var xPosition = obj.xPosition;
										var yPosition = obj.yPosition;
										var key = obj.key;

										return new CanvasElementModel(typeId, image, width, height, xPosition, yPosition, key);
							}
				}]);

				return CanvasElementModel;
	})();

	;

	var CanvasModel = (function () {
				function CanvasModel(width, height, elements, lines) {
							_classCallCheck(this, CanvasModel);

							this.width = width;
							this.height = height;
							this.elements = elements;
							this.lines = lines;
				}

				_createClass(CanvasModel, [{
							key: "addElement",
							value: function addElement(element) {
										this.elements.set(element.key, element);
							}
				}, {
							key: "removeElements",
							value: function removeElements(element) {
										if (this.elements.has(element.key)) {
													this.elements.delete(element.key);
										}
							}
				}, {
							key: "addLine",
							value: function addLine(line) {}
				}, {
							key: "removeLine",
							value: function removeLine(line) {}
				}, {
							key: "width",
							set: function set(width) {
										this._width = width;
							},
							get: function get() {
										return this._width;
							}
				}, {
							key: "height",
							set: function set(height) {
										this._height = height;
							},
							get: function get() {
										return this._height;
							}
				}, {
							key: "elements",
							set: function set(elements) {
										if (elements === undefined) {
													elements = new Map();
										}
										if (elements instanceof Array) {
													elements = elements.map(function (item) {
																return new CanvasElementModel.getInstanceFromObject(item);
													});
										}
										if (elements instanceof Map) {
													this._elements = elements;
										} else {
													throw new Error("CanvasModel.elements need an array/map as the value.");
										}
										return this._elements;
							},
							get: function get() {
										return this._elements;
							}
				}, {
							key: "lines",
							set: function set(lines) {
										this._lines = lines;
							},
							get: function get() {
										return this._lines;
							}
				}]);

				return CanvasModel;
	})();

	exports.CanvasModel = CanvasModel;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var PropertyModel = (function () {
	  function PropertyModel(mData) {
	    _classCallCheck(this, PropertyModel);
	  }

	  _createClass(PropertyModel, [{
	    key: "xPosition",
	    get: function get() {
	      return this._xPosition;
	    },
	    set: function set(value) {
	      this._xPosition = value;
	    }
	  }, {
	    key: "yPosition",
	    get: function get() {
	      return this._yPosition;
	    },
	    set: function set(value) {
	      this._yPosition = value;
	    }
	  }, {
	    key: "width",
	    get: function get() {
	      return this._width;
	    },
	    set: function set(width) {
	      this._width = width;
	    }
	  }, {
	    key: "height",
	    get: function get() {
	      return this._height;
	    },
	    set: function set(height) {
	      this._height = height;
	    }
	  }]);

	  return PropertyModel;
	})();

	;

	exports.PropertyModel = PropertyModel;

/***/ },
/* 16 */
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
	exports.Component = undefined;

	var _uuid = __webpack_require__(17);

	var _pallet = __webpack_require__(18);

	var _canvas = __webpack_require__(19);

	var _property = __webpack_require__(21);

	var Component = React.createClass({
			displayName: "Component",

			render: function render() {
					return React.createElement(
							"div",
							{ className: "diagram-component" },
							React.createElement(
									"div",
									{ className: "first-col" },
									React.createElement(_pallet.Pallet, { model: this.props.model.palletModel })
							),
							React.createElement(
									"div",
									{ className: "mid-col" },
									React.createElement(_canvas.Canvas, {
											model: this.props.model.canvasModel,
											getElementImageById: this.props.model.getElementDefaultImageById.bind(this.props.model),
											getElementSizeById: this.props.model.getElementImageSizeById.bind(this.props.model) })
							),
							React.createElement(
									"div",
									{ className: "last-col" },
									React.createElement(_property.Property, { model: this.props.model.propertyModel })
							)
					);
			}
	});

	exports.Component = Component;

/***/ },
/* 17 */
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
/* 18 */
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

	var _uuid = __webpack_require__(17);

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
	  },
	  render: function render() {
	    return React.createElement(
	      'li',
	      null,
	      'n   ',
	      React.createElement('img', { src: this.props.config.image, 'data-id': this.props.config.id, alt: this.props.config.name, title: this.props.config.name, draggable: 'true', onDragStart: this.drag })
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
	    var aGroups = [];
	    this.props.model.data.forEach(function (groupModel) {
	      aGroups.push(React.createElement(Group, { key: (0, _uuid.generateUUID)(), title: groupModel.groupName, items: groupModel.items }));
	    });
	    return React.createElement(
	      'div',
	      { className: 'pallet' },
	      React.createElement(
	        'h3',
	        null,
	        '图元列表'
	      ),
	      React.createElement(
	        'div',
	        { className: 'pallet-content' },
	        aGroups
	      )
	    );
	  }
	});

	exports.Pallet = Pallet;

/***/ },
/* 19 */
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

	var _uuid = __webpack_require__(17);

	var _element = __webpack_require__(20);

	var Canvas = React.createClass({
	  displayName: "Canvas",

	  getInitialState: function getInitialState() {
	    return {
	      width: 1024,
	      height: 768,
	      gridSize: 10,
	      elements: [],
	      links: [],
	      selectedElement: null
	    };
	  },
	  dragOver: function dragOver(evt) {
	    evt.preventDefault();
	    evt.dataTransfer.dropEffect = "move";
	  },
	  drop: function drop(event) {
	    var elementType = event.dataTransfer.getData("text");

	    var elementImage = this.props.getElementImageById(elementType);
	    var elementSize = this.props.getElementSizeById(elementType);
	    var elementPosition = this.getPosition(event);

	    this.state.elements.push({
	      width: elementSize.width,
	      height: elementSize.height,
	      x: elementPosition.x,
	      y: elementPosition.y,
	      image: elementImage.image,
	      typeId: elementType,
	      key: (0, _uuid.generateUUID)()
	    });
	    this.setState({ "elements": this.state.elements });
	    event.dataTransfer.clearData();
	    event.preventDefault();
	  },
	  getPosition: function getPosition(evt) {
	    return {
	      x: 30,
	      y: 40
	    };
	  },
	  onElementUpdate: function onElementUpdate() {
	    console.log("on element update event triggered");
	  },
	  onElementSelectionChange: function onElementSelectionChange(element) {
	    this.setState({ selectedElement: element });
	  },
	  createElement: function createElement(element) {
	    return React.createElement(_element.Element, { config: element, key: element.key, update: "{this.onElementUpdate} onSelect={this.onSelect}" });
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
/* 20 */
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

	var _uuid = __webpack_require__(17);

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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Property = undefined;

	var _uuid = __webpack_require__(17);

	var Property = React.createClass({
	  displayName: 'Property',

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      'properties'
	    );
	  }
	});

	exports.Property = Property;

/***/ }
/******/ ]);