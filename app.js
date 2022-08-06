// --------- Дэлгэцтэй ажиллах контроллер ---------
var uiController = (function () {
  var domStrings = {
    inputType: ".add__type",
    inputDesc: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(domStrings.inputType).value,
        description: document.querySelector(domStrings.inputDesc).value,
        value: parseInt(document.querySelector(domStrings.inputValue).value),
      };
    },

    getDOMstrings: function () {
      return domStrings;
    },

    clearFields: function () {
      var fields = document.querySelectorAll(
        domStrings.inputValue + "," + domStrings.inputDesc
      );

      //Convert list to array
      var fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function (el, index, array) {
        el.value = "";
      });

      fieldsArr[0].focus();
    },

    addListItem: function (item, type) {
      // Орлого зарлагын элементийг агуулсан HTML-ийг бэлтгэнэ.
      var html, list;

      if (type === "inc") {
        list = domStrings.incomeList;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">$DESC$</div><div class="right clearfix"><class="item__value">+ $VALUE$</class=><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = domStrings.expenseList;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">$DESC$</div><div class="right clearfix"><div class="item__value">- $VALUE$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Тэр дортоо орлого зарлагын утгуудыг replace ашиглаж бичиж өгнө.
      html = html.replace("%id%", item.item.id);
      html = html.replace("$DESC$", item.item.desc);
      html = html.replace("$VALUE$", item.item.value);

      // Бэлтгэсэн HTML-ээ DOM-руу хийж өгнө.
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
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

  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });

    data.totals[type] = sum;
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

    tusuv: 0,

    huvi: 0,
  };

  return {
    calculateTusuv: function () {
      //нийт орлогын нийлбэрийг тооцоолно
      calculateTotal("inc");

      //нийт зарлагын нийлбэрийг тооцоолно
      calculateTotal("exp");

      //Төсвийг шинээр тооцоолно
      data.tusuv = data.totals.inc - data.totals.exp;

      //Орлогын зарлагын хувийг тооцоолно.
      data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
    },

    tusviigAvah: function () {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },

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

      return {
        item,
      };
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

    if (input.description !== "" && input.value !== "") {
      //Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );

      //Олж авсан өгөгдлүүдээ вэбэд тохирох хэсэгт нь гаргана.
      uiController.addListItem(item, input.type);
      uiController.clearFields();
      //Төсвийг тооцоолно.
      financeController.calculateTusuv();
      //Эцсийн үлдэгдэл
      var tusuv = financeController.tusviigAvah();
      //Төсвийг дэлгэцэнд харуулна.
      console.log(tusuv);
    }
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
