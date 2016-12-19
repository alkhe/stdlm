"use strict";

var slice = Array.prototype.slice;

var nan = function nan(x) {
	return x !== x;
};

var compare_basic = function compare_basic(a, b) {
	if (a === b) return true;
	if (nan(a)) return nan(b);
	if (a == null || b == null) return false;
	return null;
};

var compare_date = function compare_date(a, b) {
	var a_date = a instanceof Date;
	var b_date = b instanceof Date;
	if (a_date || b_date) return a_date && b_date && a.getTime() === b.getTime();
	return null;
};

var compare_rx = function compare_rx(a, b) {
	var a_rx = a instanceof RegExp;
	var b_rx = b instanceof RegExp;
	if (a_rx || b_rx) return a.source === b.source && a.flags === b.flags;
	return null;
};

// like a monad!
var compare_similar = function compare_similar(a, b) {
	var eq_basic = compare_basic(a, b);
	if (eq_basic !== null) return eq_basic;

	var eq_date = compare_date(a, b);
	if (eq_date !== null) return eq_date;

	var eq_rx = compare_rx(a, b);
	if (eq_rx !== null) return eq_rx;

	return null;
};

var eq = function eq(a, b) {
	var eq_similar = compare_similar(a, b);
	if (eq_similar !== null) return eq_similar;

	if (a instanceof Object && b instanceof Object) return obj_eq(a, b);

	return false;
};

var similar = function similar(a, b) {
	var eq_similar = compare_similar(a, b);
	return eq_similar === null ? false : eq_similar;
};

var obj_eq = function obj_eq(a, b) {
	var ak = Object.keys(a);
	var bk = Object.keys(b);

	if (ak.length !== bk.length) return false;

	ak.sort();
	bk.sort();

	for (var i = 0; i < ak.length; i++) {
		if (ak[i] !== bk[i]) return false;
	}

	for (var _i = 0; _i < ak.length; _i++) {
		if (!eq(a[ak[_i]], b[bk[_i]])) return false;
	}

	return true;
};

module.exports = { eq: eq, similar: similar };