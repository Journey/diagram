import {PalletModel} from "./PalletModel";
import {CanvasModel} from "./CanvasModel";
import {PropertyModel} from "./PropertyModel";
import {AtomModel} from "./AtomModel";
import {GroupModel} from "./GroupModel";
import {GroupModel} from "./GroupModel";
import {Pallet} from "./pallet.jsx";
import {Canvas} from "./canvas.jsx";
import {Property} from "./property.jsx";

export default class Component{
  constructor(atomData,groupData){
    this.groupModel = new GroupModel( this.trnansformRawDataToGroupModelData(groupData)  );
    this.atomModel = new AtomModel( this.transformRawDataToAtomModelData(atomData) );
    this.palletModel = new PalletModel( this.getPalletDataModel(this.groupModel, this.atomModel) );
    this.canvasModel = new CanvasModel();
    this.propertyModel = new PropertyModel();
  };
  trnansformRawDataToGroupModelData(data){
    console.assert(data, "Component.transformRawDataToGroupModelData need an object as the parameter");
    //todo:: replace the logic with the real logic
    var oMap = new Map();
    oMap.set("group_id_1",{groupName: "光热"});
    oMap.set("group_id_2",{groupName:"微网"});
    return oMap;
  };
  transformRawDataToAtomModelData(data){
    console.assert(data, "Component.transformRawDataToAtomModelData need an object as it's parameter");
    //todo:: replace the logic with the real transformation
    var oMap = new Map();
    oMap.set("atom_1",{name:"Atom 1",width:50,height: 50,groupId:"group_id_1",statusList:[{
      id:1,name:"yun xing",image:"css/1.jpg",isDefault: true
    },{
      id: 2,name:"ting ji",image:"css/1.jpg",isDefault: false
    }]});

    oMap.set("atom_2",{name:"Atom 2",width:50,height: 50,groupId:"group_id_1",statusList:[{
      id:1,name:"yun xing",image:"css/2.jpg",isDefault: true
    },{
      id: 2,name:"ting ji",image:"css/2.jpg",isDefault: false
    }]});

    
    oMap.set("atom_3",{name:"Atom 3",width:50,height: 50,groupId:"group_id_2",statusList:[{
      id:1,name:"yun xing",image:"css/3.jpg",isDefault: true
    },{
      id: 2,name:"ting ji",image:"css/3.jpg",isDefault: false
    }]});
    
    oMap.set("atom_4",{name:"Atom 4",width:50,height: 50,groupId:"group_id_2",statusList:[{
      id:1,name:"yun xing",image:"css/4.jpg",isDefault: true
    },{
      id: 2,name:"ting ji",image:"css/4.jpg",isDefault: false
    }]});
    return oMap;
  };
  getPalletDataModel(groupModel,atomModel){
    var oMap = new Map();
    groupModel.keys().forEach((key,item)=>{
      oMap.set(key,{
	groupName:item.groupName,
	items:[]
      });
    });
    atomModel.keys().forEach((key)=>{
      var itemId = key;
      var groupId = atomModel.getGroupIdByItemId(key);
      var image = atomModel.getDefaultImageById(key);
      var name = atomModel.getItemNameById(id);
      console.assert(groupModel.has(groupId),`Component.getPalletDataModel- groupId -${groupId} does not exist`);
      oMap.get(groupId).items.push({id:itemId,name:name,image:image});
    });
    return oMap;
  };
  render(domId){
    console.assert(domId,"Component.render needs an domId as the parameter");
    /*
       ReactDOM.render(
       <div>
       <Pallet title="Toolbox" items={aGroups}></Pallet>
       <Canvas></Canvas>
       </div>,
       document.getElementById(domId));
     */
  };
}

