const {
	add, sub, mul, div,
	map, foldl, foldr, foldl1, foldr1,
	sum, product,
	id, call, compose, constant, flip, apply, join, on,
	curry2, curry3, curry4, curry5,
	uncurry2, uncurry3, uncurry4, uncurry5
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
