export const theoryDb: any = [
  {
    id: "ad13c892-6f39-4de0-bdff-45c5939c6978",
    t__title: "1. Как создать объект?",
    t__content: [
      {
        id: "text-0-1",
        t__content_type: "text",
        t__content_text:
          "Существует несколько способов это сделать. Вот некоторые из них:",
      },
      {
        id: "text-0-2",
        t__content_type: "text",
        t__content_text: "Литерал объекта:",
      },
      {
        id: "code-0-1",
        t__content_type: "code",
        t__content_text: "const object = {}",
      },
      {
        id: "text-0-3",
        t__content_type: "text",
        t__content_text: "Конструктор объекта (использовать не рекомендуется):",
      },
      {
        id: "code-0-2",
        t__content_type: "code",
        t__content_text: "const object = new Object()",
      },
      {
        id: "text-0-4",
        t__content_type: "text",
        t__content_text: "Метод Object.create()",
      },
      {
        id: "text-0-5",
        t__content_type: "text",
        t__content_text:
          // eslint-disable-next-line max-len
          "При использовании данного метода ему в качестве аргумента передается объект, который станет прототипом нового объекта.",
      },
      {
        id: "code-0-3",
        t__content_type: "code",
        t__content_text:
          "// создаем объект без прототипа - пустой объект\nconst object = Object.create(null)",
      },
      {
        id: "text-0-6",
        t__content_type: "text",
        t__content_text: "Функция-конструктор",
      },
      {
        id: "text-0-7",
        t__content_type: "text",
        t__content_text:
          "Создаем функцию-конструктор и применяем оператор 'new' для создания экземпляра этой функции - объекта:",
      },
      {
        id: "code-0-4",
        t__content_type: "code",
        t__content_text:
          // eslint-disable-next-line max-len
          "function Person (name) {\n    const object = {}\n    object.name = name\n    object.age = 30\n    return object\n}\nconst user = new Person('Ванька')",
      },
      {
        id: "text-0-8",
        t__content_type: "text",
        t__content_text: "Класс:",
      },
      {
        id: "code-0-5",
        t__content_type: "code",
        t__content_text:
          // eslint-disable-next-line max-len
          "class Person {\n    constructor(name) {\n        this.name = name\n    }\n}\n\nconst user = new Person('Ванька')",
      },
    ],
    t__content_nav: [
      {
        id: "subnav-1-0",
        t__nav_name: "jsr",
        t__nav_url: "https://learn.javascript.ru/object",
        t__nav_description: "",
      },
      {
        id: "subnav-1-1",
        t__nav_name: "mdn",
        t__nav_url:
          "https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object",
        t__nav_description: "",
      },
    ],
    tags: [],
  },
  {
    id: "91b01091-9266-4759-b257-c39b7bcceec5",
    t__title: "2. Что такое прототипы?",
    t__content: [
      {
        id: "text-1-1",
        t__content_type: "text",
        t__content_text:
          // eslint-disable-next-line max-len
          "Прототипы используется для создания новых объектов на основе существующих. Такая техника называется прототипным наследованием. Прототип экземпляра объекта доступен через Object.getProtocontentTypeOf(object) или свойство __proto__ (внутреннее скрытое свойство [[ProtocontentType]]).",
      },
    ],
    tags: [],
  },
];
