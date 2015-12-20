import {DiagramItemModel} from '../../app/js/DiagramModel';

describe("DiagramItemModel Test",()=>{
  var typeId = "typeId";
  var statusId= "statusId";
  var xPosition = 10;
  var yPosition = 10;
  var width = 100;
  var height = 50;
  it("constructor test", ()=>{
    var model = new DiagramItemModel(typeId,statusId,xPosition,yPosition,width,height);
    console.assert(false, model);
    expect(model.typeId).toBe(typeId);
    expect(model.statusId).toBe(statusId);
    expect(model.xPositione).toBe(xPosition);
    expect(model.yPosition).toBe(yPosition);
    expect(model.width).toBe(width);
    expect(model.height).toBe(height);
  });
  it("static method: getInstanceFromObject",()=>{
    var obj = {
      typeId:typeId,
      statusId:statusId,
      xPosition: xPosition,
      yPosition: yPosition,
      width: width,
      height: height
    };
    var model = DiagramItemModel.getInstanceFromObject(obj);
    expect(model.typeId).toBe(typeId);
    expect(model.statusId).toBe(statusId);
    expect(model.xPositione).toBe(xPosition);
    expect(model.yPosition).toBe(yPosition);
    expect(model.width).toBe(width);
    expect(model.height).toBe(height);
  });
});
