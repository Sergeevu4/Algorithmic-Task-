'use strict';

/*
TODO ЗАДАЧИ:
  * 1) Метод match у строк
  * 2) Метод exec у регулярных выражений (RegExp)
  * 3) Поиск времени в строке: Завтрак в 09:00
  * 4) Поиск времени: 09:00, 21-30.
  * 5) Ищет любые символы кроме, цифр, пробелов и букв
  * 6) Символы в математическом выражение
  * 7) Числа – одна или более цифр подряд
  * 8) «Десятичная дробь» (число с точкой внутри)
  * 9) Поиск многоточия: трёх или более точек подряд
  * 10) Поиск HTML-цвета, заданного как # ABCDEF
  * 11) Найти начало комментария <!--, затем всё до конца -->.
  * 12) Найти (открывающихся и закрывающихся) HTML-тегов вместе с атрибутами
  * 13) Цвет в формате # abc или # abcdef после которого идут 3 или 6 символа
  * 14) Разобрать Арифметическое выражение
  * 15) Удалить все дубликаты из строки и все знаки в этой строке, все пробелы в начале и в конце
  * 16) Найти в тексте строку в кавычках ("") и ('')
  * 17) Найдите пары тегов b, url, quote
  * 18) Найдите, все языки программирования которые находятся в строке
  * 19) Найдите тег style, кроме <styler>
  * 20) Удалить последнюю запятую в строке
*/

/*
  1) + Означает «один или более», то же что {1,}
  2) ? Означает «ноль или один», то же что и {0,1}.
      По сути, делает символ необязательным.
  3) * Означает «ноль или более», то же что {0,}.
      То есть, символ может повторяться много раз или вообще отсутствовать.
*/

(function () {
  // ? 1
  /*
  TODO Метод match у строк
    *1. Без флага g находит только первое совпадение
      1.1 Результат вызова – это массив, состоящий из этого совпадения, с дополнительными свойствами
      1.2 Если часть шаблона обозначена скобками, то она станет отдельным элементом массива
      [ '<h1>', 'h1' ]

    *2. При наличии флага g, вызов match возвращает обычный массив из всех совпадений.
      2.1 Никаких дополнительных свойств у массива в этом случае нет
      2.2 Cкобки дополнительных элементов не порождают.
      [ '<h1>', '</h1>' ]
      Такова особенность глобального поиска при помощи match – он просто возвращает все совпадения.


      * match – если регэксп без флага g – ищет совпадение с подрезультатами в скобках
      * match – если регэксп с флагом g – ищет все совпадения, но без скобочных групп.
  */

  const strHelloWord = '<h1>Привет, мир!</h1>';
  const strHelloWordReg = strHelloWord.match(/<(.*?)>/g); // [ '<h1>', 'h1', '</h1>', '/h1' ]
  console.log(strHelloWordReg);

  // ? 2
  /*
    TODO Метод exec у регулярных выражений (RegExp)
    * Для расширенного глобального поиска, который позволит получить все позиции и, при желании, скобки, нужно использовать метод RegExp#exec

    *1. Без флага g , то regexp.exec(str) ищет и возвращает первое совпадение, является полным аналогом вызова str.match(reg).
      [ '<h1>', 'h1' ]

    *2. При наличии флага g (в цикле), то вызов regexp.exec возвращает первое совпадение и запоминает его позицию в свойстве regexp.lastIndex. Последующий поиск он начнёт уже с этой позиции. Если совпадений не найдено, то сбрасывает regexp.lastIndex в ноль.
      [ '<h1>', 'h1', '</h1>', '/h1' ]

    * exec - позволяет искать и все совпадения и скобочные группы в них

    *3. Можно искать сразу с нужной позиции, если поставить lastIndex

  */

  const strHelloWord2 = '<h1>Привет, мир!</h1>';
  const regHelloWord = /<(.*?)>/g;

  let match;
  let result = [];

  while ((match = regHelloWord.exec(strHelloWord2)) !== null) {
    // сначала выведет первое совпадение: <h1>,h1
    // затем выведет второе совпадение: </h1>,/h1
    console.log('Найдено: ' + match[0] + ' на позиции:' + match.index);
    // Найдено: <h1> на позиции: 0 Найдено: </h1> на позиции: 16
    console.log('Найдено: ' + match[1] + ' на позиции:' + match.index);
    // Найдено: h1 на позиции: 0 Найдено: /h1 на позиции: 16

    console.log('Свойство lastIndex: ' + regHelloWord.lastIndex);
    //  Свойство lastIndex: 4 Свойство lastIndex: 21
    result.push(...match);
  }

  // result [ '<h1>', 'h1', '</h1>', '/h1' ]
  console.log(result);
})();

(function () {
  // ? 3 Напишите регулярное выражение для поиска времени в строке: Завтрак в 09:00.
  const breakfastClock = `Завтрак в 13:00`;
  const breakfastClockRegExp = breakfastClock.match(/\d\d:\d\d/gi); //  [ '13:00' ]
  // console.log(breakfastClockRegExp)

  // ? 4 Напишите регулярное выражение для поиска времени: 09:00, 21-30.
  const breakfastClocks = 'Завтрак в 09:00. Обед - в 21-30';
  const breakfastClocksRegExp = breakfastClocks.match(/\d\d[-:]\d\d/gi); //  [ '09:00', '21-30' ]
  // console.log(breakfastClocksRegExp);

  // ? 5 Ищет любые символы кроме, цифр, пробелов и букв
  const mailSymbols = 'alice15@gmail.com';
  const mailSymbolsRegExp = mailSymbols.match(/[^\d\sA-Z]/gi); //  [ '@', '.' ]
  // console.log(mailSymbolsRegExp)

  // ? 6 Символы в математическом выражение
  const mathSymbols = '(1 * 2) - 3 + 4 / 2';
  const mathSymbolsRegExp = mathSymbols.match(/[\-\(\)\.\^\*\+]/g); // [ '(', '*', ')', '-', '+' ]
  const mathSymbolsRegExp2 = mathSymbols.match(/[^\d\s\w]/g); // [ '(', '*', ')', '-', '+', '/']
  // console.log(mathSymbolsRegExp2);

  // ? 7 Нужны числа – одна или более цифр подряд (Количество повторений - {} ~ Квантификатор)
  const telNumbers = '+7(903)-123-45-67';
  const telNumbersRegExp = telNumbers.match(/\d{1,}/g); // 7,903,123,45,67
  const telNumbersRegExp2 = telNumbers.match(/\d+/g); // 7,903,123,45,67
  // console.log(telNumbersRegExp2);

  // ? 8 «десятичная дробь» (число с точкой внутри):
  const fractionNumbers = '0 1 12.345 7890';
  const fractionNumbersRegExp = fractionNumbers.match(/\d+\.\d+/g); //  [ '12.345' ]
  // console.log(fractionNumbersRegExp)

  // ? 9 Поиск многоточия: трёх или более точек подряд.
  const pointString = 'Привет!... Как дела?.....';
  const pointStringRegExp = pointString.match(/\.{3,}/gi); // [ '...', '.....' ]
  // console.log(pointStringRegExp)

  // ? 10 Поиск HTML-цвета, заданного как #ABCDEF, то есть # и содержит затем 6 шестнадцатеричных символов.
  const colorsHtml = 'color#12345678; background-color:#AA00ef bad-colors:f#fddee #fd2';
  // Решение НО находит цвет и в более длинных последовательностях:#12345678
  const colorsHtmlRegExp = colorsHtml.match(/#[a-f0-9]{6}/gi); //  [ '#123456', '#AA00ef' ]
  // Решение можно добавить в конец \b
  const colorsHtmlRegExp2 = colorsHtml.match(/#[a-f0-9]{6}\b/gi); // [ '#AA00ef' ]
  // console.log(colorsHtmlRegExp)  //
})();

(function () {
  // ? 11 Найти начало комментария <!--, затем всё до конца -->.

  /*
    С первого взгляда кажется, что это сделает регулярное выражение
    <!--.*?--> – квантификатор сделан ленивым, чтобы остановился, достигнув -->.

    Однако, точка в JavaScript – любой символ, кроме конца строки.
    Поэтому такой регэксп не найдёт многострочный комментарий.
    Всё получится, если вместо точки использовать полностю «всеядный» [\s\S].
  */

  const comments = '.. <!-- Мой -- комментарий \n тест --> ..  <!----> .. ';
  const commentsRegExp = comments.match(/<!--[\s\S]*?-->/g); // '<!-- Мой -- комментарий \n тест -->', '<!---->'
  // console.log(commentsRegExp);
})();

(function () {
  // ? 12 Найти (открывающихся и закрывающихся) HTML-тегов вместе с атрибутами
  /*
    Найти HTML-теги
    Создайте регулярное выражение для поиска всех (открывающихся и закрывающихся) HTML-тегов вместе с атрибутами.
    Пример использования:
    В этой задаче можно считать, что тег начинается с <, заканчивается >
    и может содержать внутри любые символы, кроме < и >.
    Но хотя бы один символ внутри тега должен быть: <> – не тег.

    .+? – это «любой символ (кроме \n),
    повторяющийся один и более раз до того, как оставшаяся часть шаблона совпадёт (ленивость)
  */

  const tags = '<> <a href="/"> <input type="radio" checked> <b>';
  const tagsRegExp = tags.match(/<[^>]+>/g); // '<a href="/">', '<input type="radio" checked>', '<b>'
  // console.log(tagsRegExp);
})();

(function () {
  // ? 13 Цвет в формате #abc или #abcdef после которого идут 3 или 6 символа
  /*
  Напишите регулярное выражение, которое находит цвет в формате #abc или #abcdef.
  То есть, символ #, после которого идут 3 или 6 шестнадцатиричных символа.

  Значения из любого другого количества букв, кроме 3 и 6, такие как #abcd, не должны подходить под регэксп.
 */

  const colorStr = 'color: #3f3; background-color: #AA00ef; and: #abcd';
  const colorStrRegExp = colorStr.match(/#([a-f0-9]{3}){1,2}\b/gi); // #3f3 #AA00ef
  // console.log(colorStrRegExp);
})();

(function () {
  // ? 14 Разобрать Арифметическое выражение

  /*
  Разобрать выражение
  Арифметическое выражение состоит из двух чисел и операции между ними, например:
    1 + 2
    1.2 * 3.4
    -3 / -6
    -2 - 2
  Список операций: "+", "-", "*" и "/".
  Также могут присутствовать пробелы вокруг оператора и чисел.
  Напишите функцию, которая будет получать выражение и возвращать массив из трёх аргументов:
  Первое число.
  Оператор.
  Второе число.
*/

  // Мое решение
  const mathExpress = express => {
    // return express.match(/\-?\d+\.?\d+\s[\+\-\*\/]\s\-?\d+\.?\d+/g).join().split(' ')
    return express
      .match(/\-?\d+\.?\d+\s[\+\-\*\/]\s\-?\d+\.?\d+/g)
      .join()
      .split(' ');
  };

  console.log(`Мое решение ${mathExpress('-32.31 / -622.00')}`);

  // Второе решение без g в методе match + скобки
  const mathExpress2 = express => {
    return express.match(/(-?\d+\.?\d+)\s*([-+*\/])\s*(-?\d+\.?\d+)/).slice(1);
  };

  console.log(mathExpress2('-32.31 / -622.00'));

  // Регулярное выражение для числа, возможно, дробного и отрицательного: -?\d+(\.\d+)?.

  // Оператор – это [-+*/]. Заметим, что дефис - идёт в списке первым, так как на любой позиции, кроме первой и последней, он имеет специальный смысл внутри [...], и его понадобилось бы экранировать.

  // Кроме того, когда мы оформим это в JavaScript-синтаксис /.../ – понадобится заэкранировать слэш /.

  // Нам нужно число, затем оператор, затем число, и необязательные пробелы между ними.

  // Полное регулярное выражение будет таким: -?\d+(\.\d+)?\s*[-+*/]\s*-?\d+(\.\d+)?.

  // Чтобы получить результат в виде массива, добавим скобки вокруг тех данных, которые нам интересны, то есть – вокруг чисел и оператора: (-?\d+(\.\d+)?)\s*([-+*/])\s*(-?\d+(\.\d+)?).

  // result[2] == ".2" (вторая скобка – дробная часть (\.\d+)?)
  // Уберём её из запоминания, добавив в начало скобки ?:, то есть: (?:\.\d+)?.

  function parse(expr) {
    let re = /(-?\d+(?:\.\d+)?)\s*([-+*\/])\s*(-?\d+(?:\.\d+)?)/;
    let result = expr.match(re);

    if (!result) return;
    result.shift();

    return result;
  }

  console.log(parse('-32.31 / -622.00'));

  // Решение через Метод exec
  const regex1 = /(-?\d+(?:\.\d+)?)\s*([-+*\/])\s*(-?\d+(?:\.\d+)?)/;
  const str22 = '-32.31 / -622.00';
  let m;
  let arrPush = [];

  if ((m = regex1.exec(str22)) !== null) {
    m.forEach((match, groupIndex) => {
      arrPush.push(match);
    });
  }
  console.log(arrPush);
})();

(function () {
  // ? 15 Удалить все дубликаты из строки и все знаки в этой строке, все пробелы в начале и в конце
  const s = ' Hello World, here we are ARE world! Hello World ';

  const words = s => [...new Set(s.toLowerCase().replace(/\W+/g, ' ').trim().split(/\s/))]; // [ 'hello', 'world', 'here', 'we', 'are' ]

  // console.log(words(s));
  // console.log(words(s + s));
})();

(function () {
  // ? 16 Найти в тексте строку в кавычках ("") и ('')
  /*
    Необходимо найти в тексте строку в кавычках.
    Причём кавычки могут быть одинарными '...' или двойными "..." –
    и то и другое должно искаться корректно.

    Движок регулярных выражений,
    найдя первое скобочное выражение – кавычку (['"]),
    запоминает его и далее \1 означает «найти то же самое,
    что в первой скобочной группе».
*/

  const quotes = 'He said: "She\'s the one!".'; //  He said: "She's the one!".
  const quotesRegExp = quotes.match(/(['"])(.*?)\1/g); // "She's the one!"
  // console.log(quotesRegExp); //

  /*
  1) Чтобы использовать скобочную группу в строке замены (replace)
    – нужно использовать ссылку вида $1, а в шаблоне match– обратный слэш: \1.
  2) Чтобы в принципе иметь возможность обратиться к скобочной группе
    – не важно откуда, она не должна быть исключена из запоминаемых при помощи ?:.
    Скобочные группы вида (?:...) не участвуют в нумерации.
*/
})();

(function () {
  // ? 18 Найдите, все языки программирования которые находятся в строке

  const languagesProgram = 'Java, JavaScript, PHP, C, C++';
  const languagesProgramRegExp = languagesProgram.match(/java(script)?|php|c(\+\+)?/gi);
  // [ 'Java', 'JavaScript', 'PHP', 'C', 'C++' ]
  // console.log(languagesProgramRegExp);
})();

(function () {
  // ? 19 Найдите тег style, кроме <styler>
  /*
		Напишите регулярное выражение, которое будет искать в тексте тег <style>.
		Подходят как обычный тег <style>, так и вариант с атрибутами <style type="...">.

		Но регулярное выражение не должно находить <styler>!

	*/

  const tegStyle = '<style>drrd <styler> <style test>';
  // Мое решение
  const tegStyleRegExp = tegStyle.match(/<style\b.*?>/g);
  // Второе решение
  // После <style должен быть либо пробел,
  // после которого может быть что-то ещё, либо закрытие тега.
  const tegStyleRegExp2 = tegStyle.match(/<style(>|\s.*?>)/g);
  // [ '<style>', '<style test>' ]
  console.log(tegStyleRegExp2);
})();

(function () {
  // ? 20 Удалить последнюю запятую в строке
  // Для функции может не подойди

  let str = 'Саурон пригласил на вечеринку: Радагаст, Сарумян, Баба Яга, Пендальф, ';
  let strRegExp = str.replace(/,\s*$/, '');
})();
