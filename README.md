# stdlm
Lambdant standard library.

# Get

```sh
$ yarn add stdlm
```

# Using

```js
@std = require 'stdlm';
```

# Test

```sh
$ yarn test
```

# Library

## Numeric

### add
`Number -> Number -> Number`
adds two Numbers  
### sub
`Number -> Number -> Number`
subtracts two Numbers  
### mul
`Number -> Number -> Number`
multiplies two Numbers  
### div
`Number -> Number -> Number`
divides two Numbers  

## Logic

### not
`Boolean -> Boolean`
computes logical NOT
### or
`Boolean -> Boolean -> Boolean`
computes logical OR
### and
`Boolean -> Boolean -> Boolean`
computes logical AND
### bnot
`Number -> Number`
computes bitwise NOT
### bor
`Number -> Number`
computes bitwise OR
### band
`Number -> Number`
computes bitwise AND
### mod
`Number -> Number -> Number`
computes modulus
### lsh
`Number -> Number -> Number`
computes left shift
### rsh
`Number -> Number -> Number`
computes right shift

## Equality

### is
`a -> b -> Boolean`
determines reference or strict primitive equality (basic, least expensive)
### similar
`a -> b -> Boolean`
determines basic or Date/NaN/RegExp equality (similar)
### eq
`a -> b -> Boolean`
determines similar or recursive Object/Array equality (deep, most expensive)
### xor
`a -> b -> Number`
computes bitwise XOR

## List

### map
`(a -> b) -> [a] -> [b]`
maps a function over an array  
### filter
`(a -> Boolean) -> [a] -> [a]`
filters an array by predicate
### foldl
`(a -> b) -> a -> [b] -> [a]`
reduce from the left with a function and an initial value over an array  
### foldr
`(a -> b) -> a -> [b] -> [a]`
reduce from the right with a function and an initial value over an array  
### foldl1
`(a -> a) -> [a] -> [a]`
reduce from the left with a function over an array, starting with the leftmost value  
### foldr1
`(a -> a) -> [a] -> [a]`
reduce from the right with a function over an array, starting with the rightmost value  
### sum
`(Appendable a) => [a] -> a`
takes the sum of all Appendables in the array  
### product
`Number a => [a] -> a`
takes the product of all Numbers in the array  

## I/O

### log
`{ IO } a -> a`
prints the argument and returns it  

## Combinator

### id
`a => a`
I-combinator. returns the argument  
### call
`(a -> b) -> a -> b`
A-combinator. calls the first argument with the second  
### compose
`(b -> c) -> (a -> b) -> (a -> c)`
B-combinator. composes two functions  
### constant
`a -> b -> a`
K-combinator. thunkifies the first argument  
### flip
`(b -> a -> c) -> (a -> b -> c)`
C-combinator. swaps the first two arguments  
### seq
`(a -> b -> c) -> (a -> b) -> a -> c`
S-combinator. creates an applicative sequence  
### join
`(a -> a -> b) -> a -> b`
W-combinator. calls the first argument with the second argument twice  
### on
`(b -> b -> c) -> (a -> b) -> a -> c`
Psi-combinator. composes the first function over the second function for two arguments  

## Currying

### curry2
`((a, b) -> c) -> a -> b -> c`
curries a function for two arguments  
...  
### curry5
`((a, b, c, d, e) -> f) -> a -> b -> c -> d -> e -> f`
curries a function for five arguments  

### uncurry2
`(a -> b -> c) -> (a, b) -> c`
uncurries a function for two arguments  
...  
### uncurry5
`(a -> b -> c -> d -> e -> f) -> (a, b, c, d, e) -> f`
curries a function for five arguments  

## Other

### create
`(Constructor From a To c) => a -> [b] -> c`
instantiates the first argument with the second argument as the parameters
