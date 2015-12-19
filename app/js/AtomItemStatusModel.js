export default class AtomItemStatusModel{
    constructor(id,name,image,isDefault){
	this.id = id;
	this.name = name;
	this.image = image;
	this.isDefault = isDefault;
    };
    isDefault(){
	return !!this.isDefault;
    };
};
