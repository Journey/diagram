const PREFIX_REPOSITION = "REPOSITION::";
var Utility = {
    prefixReposition: function(sText){
	return `${PREFIX_REPOSITION}${sText}`;
    },
    isReposition: function(sText){
	return sText.startsWith(PREFIX_REPOSITION);
    },
    getKeyFromReposition: function(sText){
	return sText.substr(PREFIX_REPOSITION.length);
    }
};
function assertNumber(value,key){

};
function assertNull(){
  
};
function assertUndefined(){
  
};

function toJSON(){
  
}
function prefixReposition(sText){
    
}
function isRepositon(sText){
    if(sText.startsWith(PREFIX_REPOSITION)){
	return true;
    }
    return false;
}
export {Utility};

