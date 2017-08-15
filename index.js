// Thanks to Gidi Meir Morris for the foundational idea:
// https://medium.com/@chekofif/using-es6-s-proxy-for-safe-object-property-access-f42fa4380b2c
const isObject = o => o && typeof o === 'object';

const SafeProxy = new Proxy(function() { return SafeProxy; }, {
	get: function(target, property) {
		// Thank you Tom Van Cutsem for this one:
		// https://github.com/tvcutsem/harmony-reflect/issues/38#issuecomment-49702834
		if (property === 'toJSON') {
			return function() { return {}; };
		}

		return SafeProxy;
	},
	apply: (target, thisArg, args) => {
		return SafeProxy;
	}
});

module.exports = function safe(obj) {
	return new Proxy(obj, {
		get: function(target, name){
			return target.hasOwnProperty(name) ?
				(isObject(target[name]) ? safe(target[name]) : target[name]) : SafeProxy;
		}
	});
};
