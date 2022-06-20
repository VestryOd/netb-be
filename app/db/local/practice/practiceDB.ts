import { IPractice } from "@/common/interfaces";

export const practiceDB: IPractice[] = [
  {
    id: "b5dccc43-f414-48e7-99ff-f753af1a9c83",
    // eslint-disable-next-line max-len
    p__code:
      // eslint-disable-next-line max-len
      "function sayHi() {\n    console.log(name);\n    console.log(age);\n    var name = 'Lydia';\n    let age = 21;\n}\n\nsayHi();",
    p__answers: [
      "Lydia и undefined",
      "Lydia и ReferenceError",
      "ReferenceError и 21",
      "undefined и ReferenceError",
    ],
    p__right_answer: 3,
    // eslint-disable-next-line max-len
    p__details:
      // eslint-disable-next-line max-len
      "В функции мы сначала определяем переменную name с помощью ключевого слова var. Это означает, что name поднимется в начало функции. Name будет иметь значение undefined до тех пор, пока выполнение кода не дойдет до строки, где ей присваивается значение Lydia. Мы не определили значение name, когда пытаемся вывести ее в консоль, поэтому будет выведено undefined. Переменные, определенные с помощью ключевого слова let (и const), также поднимаются, но в отличие от var, не инициализируются. Доступ к ним до инициализации невозможен. Это называется 'временной мертвой зоной'. Когда мы пытаемся обратиться к переменным до их определения, JavaScript выбрасывает исключение ReferenceError.",
  },
  {
    id: "3dd2a48a-863d-4193-8911-43f3be3c800e",
    // eslint-disable-next-line max-len
    p__code:
      // eslint-disable-next-line max-len
      "for (var i = 0; i < 3; i++) {\n    setTimeout(() => console.log(i), 1);\n}\n\nfor (let i = 0; i < 3; i++) {\n    setTimeout(() => console.log(i), 1);\n}",
    p__answers: [
      "0 1 2 и 0 1 2",
      "0 1 2 и 3 3 3",
      "3 3 3 и 0 1 2",
      "3 3 3 и 3 3 3",
    ],
    p__right_answer: 2,
    // eslint-disable-next-line max-len
    p__details:
      // eslint-disable-next-line max-len
      "Из-за очереди событий в JavaScript функция setTimeout вызывается после завершения цикла. Так как переменная i в первом цикле определяется с помощью ключевого слова var, она является глобальной. В цикле мы каждый раз увеличиваем значение i на 1, используя оператор ++. К моменту выполнения setTimeout в первом примере значение i равняется 3. Во втором цикле i определяется с помощью let. Такие переменные (а также переменные, объявленные с помощью const) имеют блочную область видимости (блок - это код внутри {}). На каждой итерации i будет иметь новое значение, и это значение будет замкнуто в области видимости внутри цикла.",
  },
];
