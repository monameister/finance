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
    allItems: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
  };
})();

// --------- Программын холбогч контроллер ---------
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //Оруулах өгөгдлийг дэлгэцээс олж авна.
    console.log(uiController.getInput());
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
