'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('./equality'),
    plain_eq = _require.eq,
    plain_similar = _require.similar;

var add = function add(a) {
	return function (b) {
		return a + b;
	};
};
var sub = function sub(a) {
	return function (b) {
		return a - b;
	};
};
var mul = function mul(a) {
	return function (b) {
		return a * b;
	};
};
var div = function div(a) {
	return function (b) {
		return a / b;
	};
};

var not = function not(x) {
	return !x;
};
var or = function or(a) {
	return function (b) {
		return a || b;
	};
};
var and = function and(a) {
	return function (b) {
		return a && b;
	};
};
var bnot = function bnot(x) {
	return ~x;
};
var bor = function bor(a) {
	return function (b) {
		return a | b;
	};
};
var band = function band(a) {
	return function (b) {
		return a & b;
	};
};
var mod = function mod(a) {
	return function (b) {
		return a % b;
	};
};
var lsh = function lsh(a) {
	return function (b) {
		return a << b;
	};
};
var rsh = function rsh(a) {
	return function (b) {
		return a >> b;
	};
};

var is = function is(a) {
	return function (b) {
		return a === b;
	};
};
var eq = function eq(a) {
	return function (b) {
		return plain_eq(a, b);
	};
};
var similar = function similar(a) {
	return function (b) {
		return plain_similar(a, b);
	};
};
var xor = function xor(a) {
	return function (b) {
		return a ^ b;
	};
};

var map = function map(f) {
	return function (t) {
		return t.map(f);
	};
};
var filter = function filter(p) {
	return function (t) {
		return t.filter(p);
	};
};

var foldl = function foldl(f) {
	return function (a) {
		return function (t) {
			return t.reduce(uncurry2(f), a);
		};
	};
};
var foldr = function foldr(f) {
	return function (a) {
		return function (t) {
			return t.reduceRight(uncurry2(f), a);
		};
	};
};

var foldl1 = function foldl1(f) {
	return function (t) {
		return t.reduce(uncurry2(f));
	};
};
var foldr1 = function foldr1(f) {
	return function (t) {
		return t.reduceRight(uncurry2(f));
	};
};

var sum = foldl1(add);
var product = foldl1(mul);

var log = function log(x) {
	return console.log(x), x;
};

var id = function id(x) {
	return x;
}; // I-combinator
var call = function call(f) {
	return function (x) {
		return f(x);
	};
}; // A-combinator
var compose = function compose(f) {
	return function (g) {
		return function (x) {
			return f(g(x));
		};
	};
}; // B-combinator
var constant = function constant(x) {
	return function () {
		return x;
	};
}; // K-combinator
var flip = function flip(f) {
	return function (x) {
		return function (y) {
			return f(y)(x);
		};
	};
}; // C-combinator
var apply = function apply(f) {
	return function (g) {
		return function (x) {
			return f(x)(g(x));
		};
	};
}; // S-combinator
var join = function join(f) {
	return function (x) {
		return f(x)(x);
	};
}; // W-combinator
var on = function on(f) {
	return function (g) {
		return function (x) {
			return join(f)(g(x));
		};
	};
}; // Psi-combinator

var curry2 = function curry2(f) {
	return function (a) {
		return function (b) {
			return f(a, b);
		};
	};
};
var curry3 = function curry3(f) {
	return function (a) {
		return function (b) {
			return function (c) {
				return f(a, b, c);
			};
		};
	};
};
var curry4 = function curry4(f) {
	return function (a) {
		return function (b) {
			return function (c) {
				return function (d) {
					return f(a, b, c, d);
				};
			};
		};
	};
};
var curry5 = function curry5(f) {
	return function (a) {
		return function (b) {
			return function (c) {
				return function (d) {
					return function (e) {
						return f(a, b, c, d, e);
					};
				};
			};
		};
	};
};

var uncurry2 = function uncurry2(f) {
	return function (a, b) {
		return f(a)(b);
	};
};
var uncurry3 = function uncurry3(f) {
	return function (a, b, c) {
		return f(a)(b)(c);
	};
};
var uncurry4 = function uncurry4(f) {
	return function (a, b, c, d) {
		return f(a)(b)(c)(d);
	};
};
var uncurry5 = function uncurry5(f) {
	return function (a, b, c, d, e) {
		return f(a)(b)(c)(d)(e);
	};
};

var create = function create(c) {
	return function (args) {
		return new (Function.prototype.bind.apply(c, [null].concat(_toConsumableArray(args))))();
	};
};

module.exports = {
	add: add, sub: sub, mul: mul, div: div,
	not: not, or: or, and: and, bnot: bnot, bor: bor, band: band, mod: mod, lsh: lsh, rsh: rsh,
	is: is, eq: eq, similar: similar, xor: xor,
	map: map, filter: filter, foldl: foldl, foldr: foldr, foldl1: foldl1, foldr1: foldr1,
	sum: sum, product: product,
	log: log,
	id: id, call: call, compose: compose, constant: constant, flip: flip, apply: apply, join: join, on: on,
	curry2: curry2, curry3: curry3, curry4: curry4, curry5: curry5,
	uncurry2: uncurry2, uncurry3: uncurry3, uncurry4: uncurry4, uncurry5: uncurry5,
	create: create
};