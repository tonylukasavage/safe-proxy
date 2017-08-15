const assert = require('assert'),
	safe = require('./index');

const base = {
	whitney: 123,
	func: function() { return 'angry'; },
	foo: {
		june: 'charlie'
	}
}

const test = (actual, value) => {
	assert.equal(JSON.stringify(actual), JSON.stringify(value));
};

let obj = safe(base);

// real access
test(obj.whitney, 123);
test(obj.foo.june, 'charlie');
test(obj.func(), 'angry');

// "safe" access
test(obj.badprop, {});
test(obj[0][1][123].taco, {});
test(obj.blarg.func().foo, {});
test(obj.foo.taco.borgia().pope.taco().borgia.pope(obj.whatwhat()), {});

console.log('tests passed.');