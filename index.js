const isObject = o => o && typeof o === 'object';

const SafeProxy = new Proxy(() => SafeProxy, {
	get: (target, property) => property === 'toJSON' ? () => ({}) : SafeProxy,
	apply: () => SafeProxy
});

module.exports = function safe(obj) {
	return new Proxy(obj, {
		get: (target, name) => {
			if (target.hasOwnProperty(name)) {
				return isObject(target[name]) ? safe(target[name]) : target[name];
			} else {
				return SafeProxy;
			}
		}
	});
};
