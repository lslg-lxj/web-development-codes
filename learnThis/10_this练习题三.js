var name = 'window';
// Person构造函数/类
/*
  1.创建空对象
  2.将this指向新建的对象
  3.执行构造函数中的代码
  4.返回新建的对象
*/
function Person(name) {
  // this->新建的对象
  this.name = name;

  // prettier-ignore
  this.foo1 = function () {console.log(this.name);},
  this.foo2 = () => console.log(this.name),
  this.foo3 = function () {
    return function () {
      console.log(this.name);
    };
  },
  this.foo4 = function () {
    return () => {
      console.log(this.name);
    };
  };
}

// 创建两个实例
var person1 = new Person('person1');
var person2 = new Person('person2');

// person1中有一个foo1函数(普通函数)
// this->person1
// this.name = person1
person1.foo1();
// this->person2
// this.name = person2
person1.foo1.call(person2);

// person1中有一个foo2函数(箭头函数)
// 箭头函数不绑定this,查找上层作用域(Person构造函数)的this->person1
// this->person1
// this.name = person1
person1.foo2();
// call对this不生效
// this->person1
// this.name = person1
person1.foo2.call(person2);

// foo3是一个返回普通函数的函数
// foo3由person1调用
// person1.foo3()调用foo3,返回一个函数
// 调用返回的函数
// 独立函数调用
// this->window
// this.name = window
person1.foo3()();
// foo3作用域中this->person2
// 返回的普通函数
// 独立函数调用
// this->window
// this.name = window
person1.foo3.call(person2)();

// 显式绑定
// this->person2
// this.name = person2
person1.foo3().call(person2);

// foo4是一个返回箭头函数的函数
// person1.foo4()由person1调用foo4
// 箭头函数调用,没有this,向上层查找
// this->person1
// this.name = person1
person1.foo4()();
// 上层作用域this显式绑定person2
// this->person2
// this.name=person2
person1.foo4.call(person2)();
// 显式绑定对this不生效
// this->person1
// this.name = person1
person1.foo4().call(person2);
