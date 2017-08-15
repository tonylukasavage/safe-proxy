# safeproxy

Safe, exception-free access to object properties in Javascript using [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) objects.

## usage

```
const safe = require('safeproxy');

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
console.log(obj.what.is.going.on.here);                           // prints "{}"
console.log(obj.can[3].even[123][432].handle.arrays[9]);          // prints "{}"
console.log(obj.family.kids[2].my.parents.want.another.grandkid); // prints "{}"

// even works with functions
console.log(obj.i.cant().believe[1][2][3].this.doesnt().throw);   // prints "{}"

```

## how

A specialized Javascript [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object is used to override all property access (`get`) on the "safe" object. If the safe object encounters a property access for which it has no value, instead of returning `undefined`, it instead returns an empty Proxy object, allowing chained property access to safely continue. It works for object and array access, and even works for function calls.

Be aware that "safe" objects will make use of these property access trap handlers throughout their entire structure. There is [minimal overhead](https://www.youtube.com/watch?v=sClk6aB_CPk&t=2673) imposed on objects utilizing these traps, so take that into account when using them.

## why

Safe object access, particularly in testing, can be really useful and save a lot of ugly validation code.

```
let obj = JSON.parse(someMassiveStringOrNetworkResponse()),
	data;

// without safe access
data = obj && obj.foo && obj.foo.bar && obj.foo.bar.quux && obj.foo.bar.quux.lukasavage;

// or you could try
try {
	data = obj.foo.bar.quux.lukasavage;
} catch (e) {
	// handle exception
}

// or keep it clean with safe access
const safe = require('safeproxy');
data = safe(obj).foo.bar.quux.lukasavage;
```

And why did I write a module when others exist? I wanted safe access with the ability to have safe access on objects, arrays, and functions but NOT have:

* `?` existential operators (like [Coffeescript](http://coffeescript.org/))
* underscore dependency (like [safe-obj](https://www.npmjs.com/package/safe-obj))
* object wrapped in a string (like [safe-object](https://www.npmjs.com/package/safe-object), [safe-get](https://www.npmjs.com/package/safe-get), [deep-access](https://www.npmjs.com/package/deep-access), or [undefsafe](https://www.npmjs.com/package/undefsafe))
* weird `__value` unwrapper (like [safeproxy](https://www.npmjs.com/package/safe-obj))
* pattern-matching semantics (like [safe-object-proxy](https://github.com/ktsn/safe-object-proxy))

## requirements

* For node.js usage, version 6.0 or higher is required.
* For browser usage, check [Can I Use?](https://caniuse.com/#search=proxy) for Proxy support. As of the writing of these docs, all major browsers are supporting it (minus IE11).

## big thanks

* [Gidi Meir Morris's article](https://medium.com/@chekofif/using-es6-s-proxy-for-safe-object-property-access-f42fa4380b2c) on this topic is where I found this pattern. Big thanks to him for taking the time to share and break it down.
* [Tom Van Cutsem's post](https://github.com/tvcutsem/harmony-reflect/issues/38#issuecomment-49702834) that explained how to stringify Proxy objects.
