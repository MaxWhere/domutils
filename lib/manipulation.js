const traversal = require("./traversal.js");
const getChildren = traversal.getChildren;
const getParent = traversal.getParent;
const getSiblings = traversal.getSiblings;

exports.removeElement = function(elem){
	//order of children makes no sense in 3d, but maybe in the
	//future we can make use of that
	//if(elem.prev) elem.prev.next = elem.next;
	//if(elem.next) elem.next.prev = elem.prev;

	var siblings = getSiblings(elem);
	if(siblings){
		siblings.splice(siblings.lastIndexOf(elem), 1);
	}
};

exports.replaceElement = function(elem, replacement){
	/*var prev = replacement.prev = elem.prev;
	if(prev){
		prev.next = replacement;
	}

	var next = replacement.next = elem.next;
	if(next){
		next.prev = replacement;
	}*/

	replacement.parent = getParent(elem);
	var siblings = getSiblings(elem);
	if(siblings){
		siblings[siblings.lastIndexOf(elem)] = replacement;
	}
};

exports.appendChild = function(elem, child){
	child.parent = elem;

	var children = getChildren(elem);
	children.push(child);

	/*if(children.length !== 1){
		var sibling = children[children.length - 2];
		sibling.next = child;
		child.prev = sibling;
		child.next = null;
	}*/
};

exports.append = function(elem, next){
	var parent = getParent(elem);

	/*var	currNext = elem.next;
	next.next = currNext;
	next.prev = elem;
	elem.next = next;*/

	next.parent = parent;
	getChildren(parent).push(next);

	/*if(currNext){
		currNext.prev = next;
		if(parent){
			var childs = getChildren(parent);
			childs.splice(childs.lastIndexOf(currNext), 0, next);
		}
	} else if(parent){
		getChildren(parent).push(next);
	}*/
};

exports.prepend = function(elem, prev){
	var parent = getParent(elem);
	if(parent){
		var childs = getChildren(parent);
		childs.splice(childs.lastIndexOf(elem), 0, prev);
	}

	/*if(elem.prev){
		elem.prev.next = prev;
	}

	prev.parent = parent;
	prev.prev = elem.prev;
	prev.next = elem;
	elem.prev = prev;*/
};
