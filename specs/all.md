
SetUp
=============================================
1. webpack - npm install webpack -g
2. install babel-loader npm install babel-loader babel-core babel-preset-es2015 -g
3. babel - babel transform js to commonjs module by default, browser does not support commonjs module

`npm install babel-preset-react` -- react component

`npm install babel-preset-es2015` -- all es2015 features

`npm install css-loader --save-dev` -- add css loader for webpack

`npm install style-loader --save-dev` -- add style loader for webpack

4. eslint
5. Redux[link](https://github.com/reactjs/redux)

   `npm install --save redux`

   `npm install --save react-redux`

   `npm install --save-dev redux-devtools`


pain point
----
1. test jsx, need react-dom - how
2. jsx/js to browser supported code.
3. use babel + webpack to transform


Babel
------------------------------------------------------------
### purpose - transfrom your javascript



webpack
-----------------------------------------------------------
### bundler for webmodules
* target: browser
* __transforming/bundling/packaging__ just about any resource or asset

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

DOM
---
* how to get the position of the element, relative to the document node?
getBoundingClientRect/getClientRects


webpack / browserfy
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
 意味着变量标示符的值只能赋值一次
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

# Flux
the view progates an action to a central diapatcher, to the various stores(holds variouse data and business logic) which update all of the views that are affected.
* Dispatcher - simple mechanism for distributing the action to the stores.
* Store - contain the application state and logic. registeters itselt with diapatcher and provide it witha a callback - action as prameter,update the state of the store based on action, the n>**broadcast** an event decaring the state changed, so the view will query the new state and update themslves.
* View -
* controller-view: top,  get the data from the storesand to pass this data down the chain of its desendants.
* actor - privides the dispatch with a new action

Dispatcher - central hub
Store - depend on Dispatcher/(Constants),register the callback to the dispatcher
View - depends on the Store - usually register the callback to Sotres EventEmmit Channel.
Action - depend on Dispatcher, provide interface to ui, the interface will call dispatch method

# Redux



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
11. / search, then <CR>, n/N - next/prev,

JS
============
1. Object.assign(target, ...sources)
2. Promise - new Promise(execute)/(function(success,fail){})
   Promise.all/race/resolve/reject
   Promise.prototype.then(success,fail)
   Promise.prototype.catch(callback)
   Promise.prototype.catch(fail)
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
6. js catch assert errors???
7. how to define custom errors/exceptions
8. js decorations?
9. js multi inheritance?
10. serialize/unserialize the object
11. set jest options - test
12. jsx/react/babel/jest/kamra - babel's logical
13. **extend react to support svg images**

SubTasks
--------------
1. pallet model to pallet.jsx


orthogonal/ manhattan/metro router

jest - slow, why?
karma - unit test + babel + webpack


OOP
---
* open/close priciple,开闭原则 - 对扩展开放，对修改关闭。information hidding(信息隐藏)。
利用抽象类，接口 + 继承实现
description 1: Meyer's open/closed principle
	对修改关闭-
		前提是模块是well-defined, statble description(the interface in the sense of information hiding); 有一个定义良好，描述清晰的接口.
		在这一原则下，当该模块被其他模块引用之后，该模块不该发生改动
	对扩展open - add fields/functions

description 2: Polymorphic open/close principle.接口/抽象类不会变， 实现可变
	user abstract class - define interface, and the infterface is closed.
	use inheritance from abstrat base classes as the open

* Liskov substitution principle,李氏替换原则 -
问题由来 - FunctionA is solved by Class A; Function(FunctionA & FunctionA') is the extsion of FunctionA which solved by Class  A', and A' is the extision of A, then A' may break Function
`Let q(x) be a property provable about objects x of type T. Then q(y) should be true for objects y of type S where S is a subtype of T.`
子类可以增加自己的方法，但是不可以覆盖父类的非抽象方法，如果重写的话，要保证输入参数（前置条件）比父类的宽松，输出参数（后置条件）比父类的严格
解决方式 - Design By Contract.
Precondation, function invocation, PostCondation
Invariant

针对type/subtype

contravariance - method arguments in the subtype 逆变
convariance - return type in the subtyp 协变
invariants - 不变

behavioral subtype c#中的泛型


面向对象，面向过程，
隔离复杂度的影响
结构化编程 -  从计算机的角度？？？

编程描述的对象是什么？
	真实世界
	需求世界

问题域的描述手段

建模
对象，关系，性质

IS-A, HAS-A, LIKE-A

特征，属性，类型
本质  <?> 所能接受的操作
SCIP
