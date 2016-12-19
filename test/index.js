const {
	add, sub, mul, div,
	not, or, and, bnot, bor, band, mod, lsh, rsh,
	is, eq, similar, xor,
	map, foldl, foldr, foldl1, foldr1,
	sum, product,
	id, call, compose, constant, flip, apply, join, on,
	curry2, curry3, curry4, curry5,
	uncurry2, uncurry3, uncurry4, uncurry5,
	create
} = require('..')
const { expect } = require('chai')

describe('numeric', () => {
	it('add', () => {
		expect(add(1)(2)).to.equal(3)
	})

	it('subtract', () => {
		expect(sub(5)(1)).to.equal(4)
	})

	it('multiply', () => {
		expect(mul(-5)(4)).to.equal(-20)
	})

	it('divide', () => {
		expect(div(5)(4)).to.equal(1.25)
	})
})

describe('logic', () => {
	it('not', () => {
		expect(not(true)).to.equal(false)
	})

	it('or', () => {
		expect(or(true)(false)).to.equal(true)
	})

	it('and', () => {
		expect(and(true)(false)).to.equal(false)
	})

	it('bnot', () => {
		expect(bnot(0)).to.equal(-1)
	})

	it('bor', () => {
		expect(bor(0b10100)(0b11001)).to.equal(0b11101)
	})

	it('band', () => {
		expect(band(0b10100)(0b11001)).to.equal(0b10000)
	})

	it('mod', () => {
		expect(mod(13)(8)).to.equal(5)
	})

	it('lsh', () => {
		expect(lsh(2)(2)).to.equal(8)
	})

	it('rsh', () => {
		expect(rsh(27)(1)).to.equal(13)
	})
})

describe('equality', () => {
	it('is', () => {
		expect(is(1)(1)).to.be.true
		expect(is(1)(2)).to.be.false
		expect(is(new Date)(new Date)).to.be.false
		expect(is([1])([1])).to.be.false
		expect(is(/asd/g)(/asd/)).to.be.false
		expect(is(/asd/gi)(/asd/ig)).to.be.false
	})

	it('eq', () => {
		expect(eq(1)(1)).to.be.true
		expect(eq(1)(2)).to.be.false
		expect(eq(new Date)(new Date)).to.be.true
		expect(eq([1])([1])).to.be.true
		expect(eq([1])([2])).to.be.false
		expect(eq(/asd/g)(/asd/)).to.be.false
		expect(eq(/asd/gi)(/asd/ig)).to.be.true
		expect(similar(null)(null)).to.be.true
		expect(similar(undefined)(undefined)).to.be.true
		expect(similar(null)(undefined)).to.be.false
		expect(eq({
			a: 5,
			b: {
				c: /asd/
			},
			d: [1, 2, 3]
		})({
			a: 5,
			b: {
				c: /asd/
			},
			d: [1, 2, 3]
		})).to.be.true
		expect(eq({
			a: 5,
			b: {
				c: /asd/
			},
			d: [1, 2, 4]
		})({
			a: 5,
			b: {
				c: /asd/
			},
			d: [1, 2, 3]
		})).to.be.false
	})

	it('similar', () => {
		expect(similar(1)(1)).to.be.true
		expect(similar(1)(2)).to.be.false
		expect(similar(new Date)(new Date)).to.be.true
		expect(similar([1])([1])).to.be.false
		expect(similar(/asd/g)(/asd/)).to.be.false
		expect(similar(/asd/gi)(/asd/ig)).to.be.true
		expect(similar(null)(null)).to.be.true
		expect(similar(undefined)(undefined)).to.be.true
		expect(similar(null)(undefined)).to.be.false
	})

	it('xor', () => {
		expect(xor(true)(false)).to.equal(1)
		expect(xor(true)(true)).to.equal(0)
	})
})

describe('list', () => {
	it('map', () => {
		const mapping = add(1)
		const traversable = [1, 2, 3, 4, 5]
		const expected = [2, 3, 4, 5, 6]
		expect(
			map(mapping)(traversable)
		).to.deep.equal(expected)
	})

	it('foldl', () => {
		const reducer = add
		const initial = '0'
		const traversable = [1, 2, 3, 4, 5]
		const expected = '012345'
		expect(
			foldl(reducer)(initial)(traversable)
		).to.equal(expected)
	})

	it('foldr', () => {
		const reducer = add
		const initial = ''
		const traversable = [1, 2, 3, 4, 5]
		const expected = '54321'
		expect(
			foldr(reducer)(initial)(traversable)
		).to.equal(expected)
	})

	it('foldl1', () => {
		const reducer = add
		const traversable = ['0', 1, 2, 3, 4, 5]
		const expected = '012345'
		expect(
			foldl1(reducer)(traversable)
		).to.equal(expected)
	})

	it('foldr1', () => {
		const reducer = add
		const traversable = [1, 2, 3, 4, '5']
		const expected = '54321'
		expect(
			foldr1(reducer)(traversable)
		).to.equal(expected)
	})

	it('sum', () => {
		expect(sum([1, 2, 3, 4, 5])).to.equal(15)
	})

	it('product', () => {
		expect(product([1, 2, 3, 4, 5])).to.equal(120)
	})
})

describe('combinator', () => {
	it('id', () => {
		expect(id(3)).to.equal(3)
	})

	it('call', () => {
		expect(call(constant(3))(5)).to.equal(3)
	})

	it('compose', () => {
		expect(compose(add(1))(mul(2))(3)).to.equal(7)
	})

	it('constant', () => {
		expect(constant(2)(3)).to.equal(2)
	})

	it('flip', () => {
		expect(flip(constant)(2)(3)).to.equal(3)
	})

	it('apply', () => {
		expect(apply(constant)(constant)(3)).to.equal(3)
		expect(apply(constant)(id)(3)).to.equal(3)
		expect(apply
			(compose(add)(add('<')))
			(flip(add)('>'))
			('X')
		).to.equal('<XX>')
	})

	it('join', () => {
		expect(join(mul)(3)).to.equal(9)
	})

	it('on', () => {
		expect(on(add)(add(1))(1)).to.equal(4)
	})
})

describe('curry', () => {
	it('2', () => {
		expect(curry2((a, b) => a + b)('a')('b')).to.equal('ab')
	})

	it('3', () => {
		expect(curry3((a, b, c) => a + b + c)('a')('b')('c')).to.equal('abc')
	})

	it('4', () => {
		expect(curry4((a, b, c, d) => a + b + c + d)('a')('b')('c')('d')).to.equal('abcd')
	})

	it('5', () => {
		expect(curry5((a, b, c, d, e) => a + b + c + d + e)('a')('b')('c')('d')('e')).to.equal('abcde')
	})
})

describe('uncurry', () => {
	it('2', () => {
		expect(uncurry2(a => b => a + b)('a', 'b')).to.equal('ab')
	})

	it('3', () => {
		expect(uncurry3(a => b => c => a + b + c)('a', 'b', 'c')).to.equal('abc')
	})

	it('4', () => {
		expect(uncurry4(a => b => c => d => a + b + c + d)('a', 'b', 'c', 'd')).to.equal('abcd')
	})

	it('5', () => {
		expect(uncurry5(a => b => c => d => e => a + b + c + d + e)('a', 'b', 'c', 'd', 'e')).to.equal('abcde')
	})
})

describe('other', () => {
	it('create', () => {
		const now = Date.now()
		expect(create(Date)([now]).getTime()).to.equal(now)
	})
})
