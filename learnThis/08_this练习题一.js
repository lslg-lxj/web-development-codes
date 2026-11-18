// 全局的name变量
var name = 'window';

// 定义了一个对象变量
var person = {
  name: 'person',
  sayName: function () {
    console.log(this.name);
  }
};

// 定义了一个全局函数
function sayName() {
  // sss是person.sayName的引用
  var sss = person.sayName;
  // 独立函数调用
  sss(); // this->window

  // sayName由person发起调用
  // this->person
  person.sayName();

  // 先拿到person的sayName属性,再调用
  // this->person
  // this.name = person
  // 和 person.sayName()一样,.的优先级很高

  // prettier-ignore
  (person.sayName)();

  // 把person.sayName赋值给b
  // LHS查询
  // 但是当前作用域中并没有变量b的声明,所以向全局查找
  // 全局也没有,因此非严格模式下会在全局创建一个b
  // b是person.sayName的引用
  // 独立函数调用
  // this->window
  // this.name = window
  // 间接函数引用
  (b = person.sayName)();
}

// 独立函数调用
sayName();
