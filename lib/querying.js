const traversal = require("./traversal.js");
const getChildren = traversal.getChildren;

module.exports = {
	filter: filter,
	find: find,
	findOneChild: findOneChild,
	findOne: findOne,
	existsOne: existsOne,
	findAll: findAll
};

function filter(test, element, recurse, limit){
	if(!Array.isArray(element)) element = [element];

	if(typeof limit !== "number" || !isFinite(limit)){
		limit = Infinity;
	}
	return find(test, element, recurse !== false, limit);
}

function find(test, elems, recurse, limit){
	var result = [], childs;

	for(var i = 0, j = elems.length; i < j; i++){
		if(test(elems[i])){
			result.push(elems[i]);
			if(--limit <= 0) break;
		}

		childs = getChildren(elems[i]);
		if(recurse && childs && childs.length > 0){
			childs = find(test, childs, recurse, limit);
			result = result.concat(childs);
			limit -= childs.length;
			if(limit <= 0) break;
		}
	}

	return result;
}

function findOneChild(test, elems){
	for(var i = 0, l = elems.length; i < l; i++){
		if(test(elems[i])) return elems[i];
	}

	return null;
}

//womified
function findOne(test, elems){
	var elem = null;

	for(var i = 0, l = elems.length; i < l && !elem; i++){
		if(test(elems[i])){
			elem = elems[i];
		} else if(getChildren(elems[i]).length > 0){
			elem = findOne(test, getChildren(elems[i]));
		}
	}

	return elem;
}

//womified
function existsOne(test, elems){
	for(var i = 0, l = elems.length; i < l; i++){
		if(
				test(elems[i]) || (
					getChildren(elems[i]).length > 0 &&
					existsOne(test, getChildren(elems[i]))
				)
		){
			return true;
		}
	}

	return false;
}

//womified
function findAll(test, elems){
	var result = [];
	for(var i = 0, j = elems.length; i < j; i++){
		if(test(elems[i])) result.push(elems[i]);

		if(getChildren(elems[i]).length > 0){
			result = result.concat(findAll(test, getChildren(elems[i])));
		}
	}
	return result;
}
