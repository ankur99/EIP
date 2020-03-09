function setCookie(name, value, expires) {
  document.cookie =
    name +
    "=" +
    value +
    (expires == null ? "" : ";expires=" + expires.toGMTString());
}

function getCookie(name) {
  var cookieName = name + "=";
  var docCookie = document.cookie;
  var cookieStart;
  var end;

  if (docCookie.length > 0) {
    cookieStart = docCookie.indexOf(cookieName);
    if (cookieStart != -1) {
      cookieStart = cookieStart + cookieName.length;
      end = docCookie.indexOf(";", cookieStart);
      if (end == -1) {
        end = docCookie.length;
      }
      return unescape(docCookie.substring(cookieStart, end));
    }
  }
  return false;
}

$(document).ready(function() {
  // Desktop trigger
  $("body").mouseleave(function() {
    if (!getCookie("newsletter")) {
      $("#exit-alert").css("display", "block");
    }
  });

  // Mobile Trigger
  setTimeout(function() {
    if ($(window).width() <= 1024) {
      if (!getCookie("newsletter")) {
        $("#exit-alert").css("display", "block");
      }
    }
  }, 5000);

  $(".close-modal").click(function() {
    $("#exit-alert").hide();
    var value_array = " ";
    var json_str = JSON.stringify(value_array);
    var expirydate = new Date();
    expirydate.setTime(expirydate.getTime() + 100 * 60 * 60 * 24 * 100);
    setCookie("newsletter", json_str, expirydate);
  });

  // Read Data on button click
  $("#exit-alert .submit-button").click(function() {
    var name = $("#username").val();
    var email = $("#email").val();
    var newsletter = $("#newsletter_check").prop("checked");
    if (!email.trim() || newsletter == false) {
      $(".error").show("slow");
    } else {
      var value_array = [email, newsletter, name];
      var json_str = JSON.stringify(value_array);
      var expirydate = new Date();
      expirydate.setTime(expirydate.getTime() + 100 * 60 * 60 * 24 * 100);
      setCookie("newsletter", json_str, expirydate);
      $("#exit-alert").css("display", "none");
    }
  });
});
