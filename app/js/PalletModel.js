import {DataModel} from "./DataModel";
import {AtomModel} from "./AtomModel";

class PalletItemModel{
    constructor(id,sName,image){
	this.id = id;
	this.sName = sName;
	this.image = image;
	this.width = 50;
	this.height = 50;
    }
};

class PalletModel extends DataModel{
  constructor(mData){
      console.assert(mData instanceof Map,`${PalletModel.name}: need a Map instance as the constructor parameters`);
      super(mData);
  };
  _processData(mData){
    var oMap = new Map();
    mData.keys().forEach((key, group)=>{
      var aItems = [];
      group.items.forEach((item)=>{
	aItems.push( new PalletItemModel(item.id,item.name,item.image) );
      });
      oMap.set(key,{
	groupName: group.groupName,
	items: aItems
      });
    });
    return oMap;
  };
}

export {PalletModel};
