"use strict";
jest.dontMock('../../app/js/AtomItemStatusModel');
jest.dontMock('../../app/js/AtomItemModel');
var aim = require('../../app/js/AtomItemModel');

describe("AtomItemModel Test",()=>{
  let [id,name,width,height,groupId] = ["id-1","name-1",50,40,1];
  var aStatusModels = [
    {id:"status-id1",name:"status-name1",image:"image1.jpg",isDefault:false},
    {id:"status-id2",name:"status-name2",image:"image2.jpg",isDefault:true}
  ];
  var ins = new aim.AtomItemModel(id,name,width,height,groupId,aStatusModels);
  
  it("test consturctor", ()=>{
    expect(ins.id).toBe(id);
    expect(ins.name).toBe(name);
    expect(ins.width).toBe(width);
    expect(ins.height).toBe(height);
    expect(ins.groupId).toBe(groupId);
  });

  it("default status",()=>{
    expect(ins.defaultStatus).toBeDefined();
  });
  it("default status image",()=>{
    expect(ins.defaultStatusImage).toBe("image2.jpg");
  });
  it("getStatusImage by status id",()=>{
    expect(ins.getStatusImage("status-id1")).toBe("image1.jpg");
  });
  it("getStatusName by status id",()=>{
    expect(ins.getStatusName("status-id1")).toBe("status-name1");
  });
  
  it("isDefaultStatus",()=>{
    expect(ins.isDefaultStatus("status-id2")).toBe(true);
    expect(ins.isDefaultStatus("status-id1")).toBe(false);
  });
});
