// --------- Дэлгэцтэй ажиллах контроллер ---------
var uiController = (function () {
  var domStrings = {
    inputType: ".add__type",
    inputDesc: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(domStrings.inputType).value,
        description: document.querySelector(domStrings.inputDesc).value,
        value: document.querySelector(domStrings.inputValue).value,
      };
    },

    getDOMstrings: function () {
      return domStrings;
    },
  };
})();

// --------- Санхүүтэй ажиллах контроллер ---------
var financeController = (function () {
  var Income = function (id, desc, value) {
    this.id = id;
    this.desc = desc;
    this.value = value;
  };

  var Expense = function (id, desc, value) {
    this.id = id;
    this.desc = desc;
    this.value = value;
  };

  var data = {
    items: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
  };

  return {
    addItem: function (type, desc, value) {
      var item, id;

      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, desc, value);
      } else {
        item = new Expense(id, desc, value);
      }

      data.items[type].push(item);
    },

    seeData: function () {
      return data;
    },
  };
})();

// --------- Программын холбогч контроллер ---------
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //Оруулах өгөгдлийг дэлгэцээс олж авна.
    var input = uiController.getInput();

    financeController.addItem(input.type, input.description, input.value);
    //Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
    //Олж авсан өгөгдлүүдээ вэбэд тохирох хэсэгт нь гаргана.
    //Төсвийг тооцоолно.
    //Эцсийн үлдэгдэлийг дэлгэцэнд харуулна.
  };

  var setupEventListener = function () {
    var DOM = uiController.getDOMstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function () {
      console.log("Программ эхэллээ...");
      setupEventListener();
    },
  };
})(uiController, financeController);

appController.init();
