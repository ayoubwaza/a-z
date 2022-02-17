const datgdb = "https://script.google.com/macros/s/AKfycbyJcLr9u4c2f0dycR6rquRXu-rOoAeKjdloEw9Ho18yfDd_CbHESWnEH6gtIaZZi573/exec";
var request;
$("#ordering").on("submit", function (e) {
  e.preventDefault();
  if (request) {
    request.abort();
  }
  var $form = $(this);
  var $inputs = $form.find("input, select, button, textarea");
  if (
    !$("#Phone").val() ||
    $("#Phone").val().length < 10 ||
    $("#Phone").val().charAt("0") !== "0"
  ) {
    alert("رقم الهاتف الذي تم إدخاله غير صحيح");
  } else {
    var serializedData = $form.serialize();
    $inputs.prop("disabled", false);
    e.preventDefault();
    var request = $.ajax({
      url: datgdb,
      method: "POST",
      dataType: "jsonp",
      data: serializedData,
      success: function () {
        console.log("it worked");
      },
    });
    request.done(function (response, textStatus, jqXHR) {
      console.log("Hooray, it worked!");
      console.log(response);
    });
    request.fail(function (jqXHR, textStatus, errorThrown) {
      console.error("The following error occurred: " + textStatus, errorThrown);
    });
    request.always(function (e) {
      $inputs.prop("disabled", false);
      console.log("It's running");
      setTimeout(function () {
        window.location.href = "success.html";
      }, 300);
    });
  }
});
