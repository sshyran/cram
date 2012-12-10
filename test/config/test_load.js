(function (define) {
define(function (require) {
var buster, assert, refute, fail, load;

buster = require('buster');
assert = buster.assert;
refute = buster.refute;
fail = buster.assertions.fail;

load = require('../../lib/config/load');

buster.testCase('cram/lib/config/load', {

	'mergeConfigs': {
		'should return a function with helper functions': function () {
			assert.equals(typeof load, 'function');
			assert.equals(load && typeof load.mergeObjects, 'function');
			assert.equals(load && typeof load.mergeArrays, 'function');
			assert.equals(load && typeof load.isType, 'function');
		},
		'should create an object': function () {
			assert.isObject(load.mergeObjects({}, {}));
		},
		'should add new properties in second object to those in first object': function () {
			var obj1, obj2;
			obj1 = { id: 1 };
			obj2 = { foo: 2 };
			assert.equals(load.mergeObjects(obj1, obj2), { id: 1, foo: 2 });
		},
		'should prefer properties from second object over those in first object': function () {
			var obj1, obj2;
			obj1 = { id: 1 };
			obj2 = { id: 2 };
			assert.equals(load.mergeObjects(obj1, obj2), { id: 2 });
		},
		'should merge nested objects': function () {
			var obj1, obj2;
			obj1 = { foo: { bar: 42 } };
			obj2 = { foo: { baz: 27 } };
			assert.equals(load.mergeObjects(obj1, obj2), { foo: { bar: 42, baz: 27 } });
		},
		'should merge nested arrays': function () {
			var obj1, obj2;
			obj1 = { foo: [ 1, 2, 3 ] };
			obj2 = { foo: [ 4, 5 ] };
			assert.equals(load.mergeObjects(obj1, obj2), { foo: [ 1, 2, 3, 4, 5 ] });
		}
	},
	'isType': {
		'should match first argument\'s constructor name to second argument': function () {
			assert(load.isType('', 'String'));
			assert(load.isType(-5, 'Number'));
			assert(load.isType(false, 'Boolean'));
			assert(load.isType(new String(''), 'String'));
			assert(load.isType(new Number(-5), 'Number'));
			assert(load.isType(new Boolean(false), 'Boolean'));
			assert(load.isType(new Date(), 'Date'));
			assert(load.isType([], 'Array'));
			assert(load.isType({}, 'Object'));
			assert(load.isType(null, 'Null'));
			assert(load.isType(void 0, 'Undefined'));
		}
	},
	'mergeArrays': {
		'should create an array from two arrays': function () {
			assert.isArray(load.mergeArrays([], []));
		},
		'should add new values in second array to those in first array': function () {
			var obj1, obj2, obj3, arr1, arr2, merged;
			obj1 = { id: 1 };
			obj2 = { id: 2 };
			obj3 = { id: 3 };
			arr1 = [obj1, obj2];
			arr2 = [obj3];
			merged = load.mergeArrays(arr1, arr2);
			assert.equals(merged, [obj1, obj2, obj3]);
		},
		'should not duplicate values that are in both arrays': function () {
			var obj1, obj2, obj3, arr1, arr2, merged;
			obj1 = { id: 1 };
			obj2 = { id: 2 };
			obj3 = { id: 3 };
			arr1 = [obj1, obj2];
			arr2 = [obj1, obj3];
			merged = load.mergeArrays(arr1, arr2);
			assert.equals(merged, [obj1, obj2, obj3]);
		},
		'should work with array items that are primitives': function () {
			var arr1, arr2, merged;
			arr1 = [1, 2];
			arr2 = [2, 3];
			merged = load.mergeArrays(arr1, arr2);
			assert.equals(merged, [1, 2,3]);
		},
		'// some tests for user-defined identity functions': function () {

		}
	}

});

});
})(
	typeof define == 'function' && define.amd
		? define
		: function (factory) { module.exports = factory(require); }
);
