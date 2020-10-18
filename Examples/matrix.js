var mathlib = require('../lib/cpmath.js');
var a =[[1,2],[2,4]];
var b =[[1,3],[2,3]];
console.log(mathlib.mat_add(a,b));
console.log(mathlib.mat_multiply(a,b));
console.log(mathlib.mat_power(a,3));
