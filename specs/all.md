SetUp
=============================================
1. webpack - npm install webpack -g
2. install babel-loader npm install babel-loader babel-core babel-preset-es2015 -g
3. babel - babel transform js to commonjs module by default, browser does not support commonjs module

`npm install babel-preset-react` -- react component

`npm install babel-preset-es2015` -- all es2015 features

`npm install css-loader --save-dev` -- add css loader for webpack
`npm install style-loader --save-dev` -- add style loader for webpack
3. eslint


pain point


Babel
------------------------------------------------------------
### purpose - transfrom your javascript



webpack
-----------------------------------------------------------
### bundler for webmodules
Html5
=============================================================
svg
---------------------------------------------
1. g element has dbclick event? have

Drag & Drop
-----------------------------------------------------
* ?can the data transfer be object or text

Data Attribute
---------------------------------------------------
* can the data attribute is object?

how jsx work with requiresjs - need plugins

the expected dev mode -
* module depend easy manage


webpack / broserfy
---------------------------------------------------
webpack + babel + es6 + react

Javasccript
---------------------------------------------------
uuid-
'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = crypto.getRandomValues(new Uint8Array(1))[0]%16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
	});


css
--------------------------------------------------------
## position related concept

1. screenX/y
2. pageX/Y
3. clientX/Y


React
Babel
JSX
Test
* Jest
* jsdom

ES5
--------------------------------------------------
* func.bind(this, arg1,arg2...) - create a new function.
 
ES6
----------------------------------------------------
# template string
`this is ${this.test}`
 
# const
const a = 5;



object.assign
rest and spread properties: var {x,y,...z} = {x;1,y:2,a:3,b:4} => var x = 1, y = 2, z = {a:3,b:4};

destructuring assignment: [a,b] = [1,2]

class constructor/get/set/static

Symbol - a kind of js data types like Bool

Set/[] and Map/{} - 

React
--------------------------------------------------
does not support svg

? the data binding - how to implement two-way binding?
? state/property
state - should contain minimal amount data.

common pattern: create several stateless component that just render data; have a statefule component above them in the hierachy that pass its state to its children via props

what should go in state? - operated by event handler , to trigger a ui update.

`this.setState` - merge data with the current one

`this.replaceState` - replace the current state with the provided one.
`this.refs` - access / invoke methods which return from render; can be callback(excuted immediately after the component is mounted, the reference component will be passed in as a parameter);

# comunication between components
* parent-child communication : pass props
* child-parent communication: this.fun.bind(this,arg1,arg2);
* components comunication without pa-child relationship:

	1. global event system
  	2. subscribe on componentDidMount(), call setState when receive an event.
	3. unsubscribe on componentWillUnmount()

# multiple components
this.props.children

shouldComponentUpdate(): return false;

owner/ownee/owned

# react native
TBD

# react dom
TBD

# ReactLink addon
two way binding related


# principles
easy read: one way data binding, more code/explicit code -- `code is read far more than it was written`
+ ui component hirachy list: single responsibility
+ build a static ui version: with no interaction
+ build data models: props & state -- `dry: do not repeat yourself`
  * props  
    passed from parent by props  
    not muatable  

  * state - mutable
+ which component belongs state?  
the common compoent in the top level
* steps
1. identify every component will use the state
2. find the common owner component
3. if not exist, create a new component which satified step 2

+ add inverse data flow  
so the state change event will be passed from the common component in the top level too.



# searchable product data table using react
## Components
1. search component
2. group : list items


Unit Test
---------------------------------------
1. es6 test - can test data models - 是否可以不用babel 来转换测试
2. react jsx unit test
3. data model 与 ui component 的对应关系


Vimperator
========================================
1. j/k scroll down/up one line
2. h/l scroll left/right
3. <spc>/c-b: down/up one page
4. c-d/c-u: down/up 1/2 page
5. c-o/c-i: back/forward in current window/tab's history
6. :open www.baidu.com
7. :tabopen www.baidu.com
8. f/F highlight links
9. d: close tab
10. O/o: alter / open url

UML
==========================================================
## specification






Goal
=================================
Design is illustrated with UML


Questions
================================
1. js - constructor: this is not allowed before super??
2. node debugger
3. jest - require auto mock the functions? how?
4. Map.keys() return an MapIterator not an array
5. unit test spy and mock and stub??
