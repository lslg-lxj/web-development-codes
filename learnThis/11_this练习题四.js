var name = 'window';
function Person(name) {
  // this->新建的对象
  this.name = name;
  this.obj = {
    name: 'obj',
    foo1: function () {
      return function () {
        console.log(this.name);
      };
    },
    foo2: function () {
      return () => {
        console.log(this.name);
      };
    }
  };
}
var person1 = new Person('person1');
var person2 = new Person('person2');

// foo1是一个返回普通函数的函数
// foo1由obj调用,foo1作用域中this->obj
// person1.obj.foo1()调用foo1,返回一个普通函数
// 调用返回的普通函数
// 独立函数调用
// this->window
// this.name = window
person1.obj.foo1()();
// 给foo1显式绑定this->person2
// 但返回的函数仍然是独立函数调用
// this->window
// this.name = window
person1.obj.foo1.call(person2)();
// this->person2
// this.name = person2
person1.obj.foo1().call(person2);

// foo2是一个返回箭头函数的函数
// foo2由obj调用,foo2作用域中的this->obj
// person1.obj.foo2()调用foo2,返回箭头函数
// 箭头函数中没有This标识符,向上层查找
// this->obj
// this.name = obj
person1.obj.foo2()();
// 给foo2显式绑定this->person2
// this->person2
// this.name = person2
person1.obj.foo2.call(person2)();
// call对箭头函数不生效
// this->obj
// this.name = obj
person1.obj.foo2().call(person2);
