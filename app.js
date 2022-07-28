//Дэлгэцтэй ажиллах контроллер
var uiController = (function () {})();

//Санхүүтэй ажиллах контроллер
var financeController = (function () {})();

//Программын холбогч контроллер
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    //Оруулах өгөгдлийг дэлгэцээс олж авна.
    console.log("asdasd");
    //Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
    //Олж авсан өгөгдлүүдээ вэбэд тохирох хэсэгт нь гаргана.
    //Төсвийг тооцоолно.
    //Эцсийн үлдэгдэлийг дэлгэцэнд харуулна.
  };

  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);
