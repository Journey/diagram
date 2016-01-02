export default class CanvasModel{
    constructor(width,height,elements,lines){
	this.width = width;
	this.height = height;
	this.elements = elements;
	this.lines = lines;
    };
    set width(width){
	this._width = width;
    };
    get width(){
	return this._width;
    };
    set height(height){
	
    };
    get height(){
	return this._height;
    };
    set elements(elements){
	return this._elements = elements;
    };
    get elements(){
	return this._elements;
    };
    set lines(lines){
	this._lines = lines;
    };
    get lines(){
	return this._lines;
    };
    addElement(element){
	
    };
    removeElements(element){
	
    };
    addLine(line){
	
    };
    removeLine(line){
	
    };
}
