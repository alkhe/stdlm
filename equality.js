const { slice } = Array.prototype
const nan = x => x !== x

const compare_basic = (a, b) => {
	if (a === b) return true
	if (nan(a)) return nan(b)
	if (a == null || b == null) return false
	return null
}

const compare_date = (a, b) => {
	const a_date = a instanceof Date
	const b_date = b instanceof Date
	if (a_date || b_date) return (a_date && b_date && a.getTime() === b.getTime())
	return null
}

const compare_rx = (a, b) => {
	const a_rx = a instanceof RegExp
	const b_rx = b instanceof RegExp
	if (a_rx || b_rx) return (a.source === b.source && a.flags === b.flags)
	return null
}

// like a monad!
const compare_similar = (a, b) => {
	const eq_basic = compare_basic(a, b)
	if (eq_basic !== null) return eq_basic

	const eq_date = compare_date(a, b)
	if (eq_date !== null) return eq_date

	const eq_rx = compare_rx(a, b)
	if (eq_rx !== null) return eq_rx

	return null
}

const eq = (a, b) => {
	const eq_similar = compare_similar(a, b)
	if (eq_similar !== null) return eq_similar

	if (a instanceof Object && b instanceof Object) return obj_eq(a, b)

	return false
}

const similar = (a, b) => {
	const eq_similar = compare_similar(a, b)
	return (eq_similar === null ? false : eq_similar)
}

const obj_eq = (a, b) => {
	const ak = Object.keys(a)
	const bk = Object.keys(b)

	if (ak.length !== bk.length) return false

	ak.sort()
	bk.sort()

	for (let i = 0; i < ak.length; i++) {
		if (ak[i] !== bk[i]) return false
	}

	for (let i = 0; i < ak.length; i++) {
		if (!eq(a[ak[i]], b[bk[i]])) return false
	}

	return true
}

module.exports = { eq, similar }
