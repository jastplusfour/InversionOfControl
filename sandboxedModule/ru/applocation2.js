// Файл содержит маленький кусочек основного модуля демонстрационного
// прикладного приложения, загружаемого в песочницу демонстрационным
// кусочком фреймворка. Читайте README.md в нем задания.

// Вывод из глобального контекста модуля
console.log('From application 2');

module.exports = function() {
  // Вывод из контекста экспортируемой функции
  console.log('From application exported function');
};


setTimeout(function() {
    console.log('Hi, Dude') 
}, 3000);


setInterval(function() {
    console.log("Hi, again")
}, 3000);

util.log();