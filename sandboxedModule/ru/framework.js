// Файл, демонстрирующий то, как фреймворк создает среду (песочницу) для
// исполнения приложения, загружает приложение, передает ему песочницу в
// качестве глобального контекста и получает ссылу на экспортируемый
// приложением интерфейс. Читайте README.md в нем задания.

// Фреймворк может явно зависеть от библиотек через dependency lookup
var fs   = require('fs'),
    vm   = require('vm'),
    util = require('util');

// Чоздаем контекст-песочницу, которая станет глобальным контекстом приложения
var context = { 
    
    module: {},
    console: console,
    
    setTimeout: setTimeout,
    setInterval: setInterval,
    
    util: util
    
 };
 
 
context.global = context;
var sandbox = vm.createContext(context);

var cmdArguments = process.argv;
var wraperConsoleFunc = console.log;
var file = process.argv[3];

var date = new Date();


console.log = function (message) {     
    
    var inputText;
    inputText += cmdArguments[0] + '\0';
    inputText += date            + '\0';
    inputText += message;
    
    fs.writeFile(file, inputText);
} 

// console.log = function (message) {     
    
//     wraperConsoleFunc(cmdArguments[0]);
//     wraperConsoleFunc(date);
//     wraperConsoleFunc(message);
//}


var logFile = 'logFile.txt';
var requireWithLogging = function (moduleName) {
    
    fs.appendFile(
        logFile, 
        
        util.format(
            '%s %s \n',
             new Date().toTimeString(), 
             moduleName)
     );  
 
    return require(moduleName); 
}




for (var i = 0; i < cmdArguments.length; i++) {    
// Читаем исходный код приложения из файла
//var fileName = './application.js';
var fileName = './' + cmdArguments[i] + '.js';
fs.readFile(fileName, function(err, src) {
  // Тут нужно обработать ошибки
  
  // Запускаем код приложения в песочнице
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
  
  // Забираем ссылку из sandbox.module.exports, можем ее исполнить,
  // сохранить в кеш, вывести на экран исходный код приложения и т.д.
});

}

