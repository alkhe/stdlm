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

### add : `Number a => a -> a -> a` adds two Numbers  
### sub : `Number a => a -> a -> a` subtracts two Numbers  
### mul : `Number a => a -> a -> a` multiplies two Numbers  
### div : `Number a => a -> a -> a` divides two Numbers  

## List

### map : `(a -> b) -> [a] -> [b]` maps a function over an array  
### foldl : `(a -> b) -> a -> [b] -> [a]` reduce from the left with a function and an initial value over an array  
### foldr : `(a -> b) -> a -> [b] -> [a]` reduce from the right with a function and an initial value over an array  
### foldl1 : `(a -> b) -> [a] -> [a]` reduce from the left with a function over an array, starting with the leftmost value  
### foldr1 : `(a -> a) -> [a] -> [a]` reduce from the right with a function over an array, starting with the rightmost value  
### sum : `(Appendable a) => [a] -> a` takes the sum of all Appendables in the array  
### product : `Number a => [a] -> a` takes the product of all Numbers in the array  

## I/O

### log : `{ IO } a -> a` prints the argument and returns it  

## Combinator

### id : `a => a` I-combinator. returns the argument  
### call : `(a -> b) -> a -> b` A-combinator. calls the first argument with the second  
### compose : `(b -> c) -> (a -> b) -> (a -> c)` B-combinator. composes two functions  
### constant : `a -> b -> a` K-combinator. thunkifies the first argument  
### flip : `(b -> a -> c) -> (a -> b -> c)` C-combinator. swaps the first two arguments  
### seq : `(a -> b -> c) -> (a -> b) -> a -> c` S-combinator. creates an applicative sequence  
### join : `(a -> a -> b) -> a -> b` W-combinator. calls the first argument with the second argument twice  
### on : `(b -> b -> c) -> (a -> b) -> a -> c` Psi-combinator. composes the first function over the second function for two arguments  

## Currying

### curry2 : `((a, b) -> c) -> a -> b -> c` curries a function for two arguments  
...  
### curry5 : `((a, b, c, d, e) -> f) -> a -> b -> c -> d -> e -> f` curries a function for five arguments  

### uncurry2 : `(a -> b -> c) -> (a, b) -> c` uncurries a function for two arguments  
...  
### uncurry5 : `(a -> b -> c -> d -> e -> f) -> (a, b, c, d, e) -> f` curries a function for five arguments  

## Other

### create : `Constructor a c => a -> [b] -> c` instantiates the first argument with the second argument as the parameters
