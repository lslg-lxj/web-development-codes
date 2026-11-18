var name = 'window';

// JS中,{}可能是对象字面量,也可能是代码块
// 代码块中不能直接写函数声明,否则会报错
// 代码块中可以写函数表达式,不会报错
// 代码块中可以写箭头函数,不会报错

var person1 = {
  name: 'person1',
  // 普通函数
  foo1: function () {
    console.log(this.name);
  },
  // 箭头函数
  foo2: () => console.log(this.name),

  // 返回普通函数的函数
  foo3: function () {
    return function () {
      console.log(this.name);
    };
  },
  // 返回箭头函数的函数
  foo4: function () {
    return () => {
      console.log(this.name);
    };
  }
};

var person2 = { name: 'person2' };

// foo1由person1发起调用
// this->person1
// this.name = person1
person1.foo1();
// 显式绑定的优先级高于隐式绑定
// this->person2
// this.name = person2
person1.foo1.call(person2);

// foo2是箭头函数,作用域内不含this标识符
// 当运行到this.name时,向上层作用域查找
// 找到this->window
// this.name = window
person1.foo2();
// call对箭头函数不生效
// this->window
// this.name = window
person1.foo2.call(person2);

// foo3由person1发起调用,foo3的作用域中this->person1
// person1.foo3()调用返回一个普通函数
// person1.foo3()()普通函数独立调用
// this->window
// this.name = window
person1.foo3()();

// this->window
// this.name = window
person1.foo3.call(person2)();

// person1.foo3()调用返回一个普通函数
// person1.foo3().call(person2)给该普通函数显式绑定一个this指向
// this->person2
// this.name = person2
person1.foo3().call(person2);

// foo4由person1发起调用,foo4的作用域中this->person1
// person1.foo4()调用返回一个箭头函数
// person1.foo4()()箭头函数调用
// 箭头函数中没有this,向上层查找
// this->person1
// this.name = person1
person1.foo4()();

// foo4显式绑定this->person2
// 箭头函数依赖与foo4作用域中的this
// this->person2
// this.name = person2
person1.foo4.call(person2)();

// 显式绑定对箭头函数不生效
// 查找上层作用域中的this
// this->person1
// this.name = person1
person1.foo4().call(person2);
