var getChildren = exports.getChildren = function(elem){
	var children = elem.children;
	if(!children)
		return []
	var nativerenders = [];
	children.forEach((el) => {
		if('nativeRender' in el)
			nativerenders.push(el.nativeRender);
	});
	return children.concat(nativerenders);
};

var getParent = exports.getParent = function(elem){
	return elem.parent;
};

exports.getSiblings = function(elem){
	var parent = getParent(elem);
	return parent ? getChildren(parent) : [elem];
};

exports.getAttributeValue = function(elem, name){
	return elem[name];
};

exports.hasAttrib = function(elem, name){
	return !!elem.props && hasOwnProperty.call(elem.props, name);
};

exports.getName = function(elem){
	if('componentName' in elem)
		return elem.componentName;
	return elem.nodeName;
};
