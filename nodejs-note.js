// const assert = require('assert');

// const tracker = new assert.CallTracker();

// function func() {}

// // callfunc() ������ tracker.verify() ֮ǰǡ�ñ����� 1 �Ρ�
// const callsfunc = tracker.calls(func, 1);

// callsfunc();

// // ���� tracker.verify() ����֤�Ƿ����� tracker.calls() �������ѱ�׼ȷ���á�
// process.on('exit', () => {
//   tracker.verify();
// });


// const assert = require('assert').strict;

// const err = new TypeError('Wrong value');
// err.code = 404;
// err.foo = 'bar';
// err.info = {
//   nested: true,
//   baz: 'text'
// };
// err.reg = /abc/i;

// assert.throws(
//   () => {
//     throw err;
//   },
//   {
//     name: 'TypeError',
//     message: 'Wrong value',
//     info: {
//       nested: true,
//       baz: 'text'
//     }
//     // 只会测试验证对象上的属性。
//     // 使用嵌套对象需要存在所有属性。
//     // 否则验证将失败。
//   }
// );

// // 使用正则表达式验证错误属性：
// throws(
//   () => {
//     throw err;
//   },
//   {
//     // `name` 和 `message` 属性是字符串，在这些属性上使用正则表达式将匹配字符串。
//     // 如果失败，则会抛出错误。
//     name: /^TypeError$/,
//     message: /Wrong/,
//     foo: 'bar',
//     info: {
//       nested: true,
//       // 不能对嵌套属性使用正则表达式！
//       baz: 'text'
//     },
//     // `reg` 属性包含正则表达式，只有当验证对象包含相同的正则表达式时，它才会通过。
//     reg: /abc/i
//   }
// );

// // 由于不同的 `message` 和 `name` 属性而失败：
// throws(
//   () => {
//     const otherErr = new Error('Not found');
//     // 将所有可枚举属性从 `err` 复制到 `otherErr`。
//     for (const [key, value] of Object.entries(err)) {
//       otherErr[key] = value;
//     }
//     throw otherErr;
//   },
//   // 当使用错误作为验证对象时，错误的 `message` 和 `name` 属性也将被检查。
//   err
// );







// const assert = require('assert');

// const tracker = new assert.CallTracker();

// console.log(tracker.calls);
// function func() { }

// // callfunc() 必须在 tracker.verify() 之前恰好被调用 1 次。
// const callsfunc = tracker.calls(func, 1);

// callsfunc();
// callsfunc();
// callsfunc();

// tracker.report();
// // // 调用 tracker.verify() 并验证是否所有 tracker.calls() 函数都已被准确调用。
// // process.on('exit', () => {
// //   tracker.verify();
// // });





// const assert = require('assert');

// // 创建调用跟踪器。
// const tracker = new assert.CallTracker();

// function func() { }

// function foo() { }

// func();
// func();
// func();

// // 返回封装 func() 的函数，其必须在 tracker.verify() 之前调用准确次数。
// const callsfunc = tracker.calls(func, 2);
// callsfunc();


// // 返回包含 callfunc() 信息的数组()
// console.log(tracker.report());

// // [
// //  {
// //    message: 'Expected the func function to be executed 2 time(s) but was
// //    executed 0 time(s).',
// //    actual: 0,
// //    expected: 2,
// //    operator: 'func',
// //    stack: stack trace
// //  }
// // ]




// const assert = require('assert').strict;

// // 这失败了，因为 1 !== '1'。
// assert.deepStrictEqual({ a: 1 }, { a: '1' });
// // AssertionError: Expected inputs to be strictly deep-equal:
// // + actual - expected
// //
// //   {
// // +   a: 1
// // -   a: '1'
// //   }

// // 以下对象没有自有的属性
// const date = new Date();
// const object = {};
// const fakeDate = {};
// Object.setPrototypeOf(fakeDate, Date.prototype);

// // 不同的原型：
// assert.deepStrictEqual(object, fakeDate);
// // AssertionError: Expected inputs to be strictly deep-equal:
// // + actual - expected
// //
// // + {}
// // - Date {}

// // 不同的类型标签：
// assert.deepStrictEqual(date, fakeDate);
// // AssertionError: Expected inputs to be strictly deep-equal:
// // + actual - expected
// //
// // + 2018-04-26T00:49:08.604Z
// // - Date {}

// assert.deepStrictEqual(NaN, NaN);
// // OK，因为 SameValue 比较

// // 不同的解封装数字：
// assert.deepStrictEqual(new Number(1), new Number(2));
// // AssertionError: Expected inputs to be strictly deep-equal:
// // + actual - expected
// //
// // + [Number: 1]
// // - [Number: 2]

// assert.deepStrictEqual(new String('foo'), Object('foo'));
// // OK，因为对象和字符串在解封装时是相同的。

// assert.deepStrictEqual(-0, -0);
// // OK

// // 使用 SameValue 比较的不同零：
// assert.deepStrictEqual(0, -0);
// // AssertionError: Expected inputs to be strictly deep-equal:
// // + actual - expected
// //
// // + 0
// // - -0

// const symbol1 = Symbol();
// const symbol2 = Symbol();
// assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol1]: 1 });
// // OK，因为它是两个对象上的相同符号。

// assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol2]: 1 });
// // AssertionError [ERR_ASSERTION]: Inputs identical but not reference equal:
// //
// // {
// //   [Symbol()]: 1
// // }

// const weakMap1 = new WeakMap();
// const weakMap2 = new WeakMap([[{}, {}]]);
// const weakMap3 = new WeakMap();
// weakMap3.unequal = true;

// assert.deepStrictEqual(weakMap1, weakMap2);
// // OK，因为无法比较条目

// // 失败，因为 weakMap3 有一个 weakMap1 不包含的属性：
// assert.deepStrictEqual(weakMap1, weakMap3);
// // AssertionError: Expected inputs to be strictly deep-equal:
// // + actual - expected
// //
// //   WeakMap {
// // +   [items unknown]
// // -   [items unknown],
// // -   unequal: true
// //   }




// const assert = require('assert');

// const weakMap1 = new WeakMap();
// const weakMap2 = new WeakMap([[{}, {}]]);
// const weakMap3 = new WeakMap();
// weakMap3.unequal = true;

// assert.deepStrictEqual(weakMap1, weakMap2);




const assert = require('assert').strict;

// assert.doesNotMatch('I will fail', /fail/);
// AssertionError [ERR_ASSERTION]: The input was expected to not match the ...

// assert.doesNotMatch(123, /pass/);
// AssertionError [ERR_ASSERTION]: The "string" argument must be of type string.

// assert.doesNotMatch('I will pass', /different/);
// OK
assert.fail(1);