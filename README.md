# safe-proxy

Safe, exception-free access to object properties in Javascript.

## how

A specialized Javascript [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object is used to override all property access (`get`) on the "safe" object. If the safe object encounters a property access for which it has no value, instead of returning `undefined`, it instead returns an empty Proxy object, allowing chained property access to safely continue.

## usage

```
const safe = require('safe-proxy');

const obj = safe({
	family: {
		wife: 'whitney',
		kids: [ 'june', 'charlie' ]
	}
});

// normal access
console.log(obj.family.wife);    // prints "whitney"
console.log(obj.family.kids);    // prints "[ 'june', 'charlie' ]"
console.log(obj.family.kids[0]); // prints "june"

// unsafe access made safe
console.log(obj.what.is.going.on.here);                           // print "{}"
console.log(obj.can[3].even[123][432].handle.arrays[9]);          // print "{}"
console.log(obj.family.kids[2].my.parents.want.another.grandkid); // print "{}"

```

## big thanks

[Gidi Meir Morris's article](https://medium.com/@chekofif/using-es6-s-proxy-for-safe-object-property-access-f42fa4380b2c) on this topic is where I found this pattern. Big thanks to him for taking the time to share and break it down.