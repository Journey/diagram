"use strict";
jest.dontMock('../../app/js/AtomItemStatusModel');
var aism = require('../../app/js/AtomItemStatusModel');

describe("AtomItemStatusModel Test",()=>{
  it("AtomItemStatusModel:test consturctor", ()=>{
    var [id,name,image,isDefault] = ["id-value","name-value","image-value",1];
    var ins = new aism.AtomItemStatusModel(id,name,image,isDefault);
    expect(ins.id).toBe(id);
    expect(ins.name).toBe(name);
    expect(ins.image).toBe(image);
    expect(ins.isDefault).toBe(true);
  });
});
