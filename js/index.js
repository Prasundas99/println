//cheaking weather the form is filled or not
$(document).ready(function (event) {
  fillProgressBar();
  $("#login-button").click(function () {
    event.preventDefault();
  });
});

function ValidateForm() {
  var formInvalid = false;
  $("form input").each(function () {
    if ($(this).val() == "") {
      formInvalid = true;
    }
  });

  if (formInvalid) {
    alert("One or Two fields are empty. Please fill up all fields");
    return false;
  }
  return true;
}

//Hiding Thank you
$(".Thanks").hide();
$(".println-ds").hide();
$(".println").hide();

$("#login-button").click(function sub(event) {
  ValidateForm();
  if (ValidateForm()) {
    event.preventDefault();
    $("form").fadeOut(500);
    $(".progress").fadeOut(500);
    $(".wrapper").addClass("form-success");
    $(".Thanks").show();
    $(".println-ds").show();
    $(".println").show();
    //Adding data to firebase
    writeUserData();
  }
});

var incMessage = 0;

//Condition for able to write in form and progress bar
function check() {
  var count = document.querySelectorAll('input[type="checkbox"]:checked').length;
console.log(count);
  // able to write in input field
  if (count == 3) {
    $("#name").prop("disabled", false);
    $("#email").prop("disabled", false);
    $("#state").prop("disabled", false);
    $("#login-button").prop("disabled", false);
  }

  // for sharing link to 3 wp-grp
  $(".checkbox-message").click(function(e){
    if (incMessage == 2) {
      $('#item-2').prop('checked', true); // Checks it
      $(this).unbind(e);
    } else {
      $('.checkbox-message').removeAttr('checked')
      e.preventDefault();
      incMessage++;
    }
  })
}

//Connecting firebase
function writeUserData() {
  var Name = document.getElementById("name").value;
  var Email = document.getElementById("email").value;
  var Country = document.getElementById("state").value;

  database.ref("scam/").push().set({
    name: Name,
    email: Email,
    Country: Country
  });
}

//Preventing checkbox to uncheck
$("input[type=checkbox]").click(function (e) {
  var checkbox = $(this);
  if (checkbox.is(":checked")) {
    //check it
  } else {
    // prevent from being unchecked
    this.checked = !this.checked;
  }
});

// Logic with checkbox

function fillProgressBar() {
  var count = 0;
  var checked = 0;
  function countBoxes() {
    count = $("input[type='checkbox']").length+2;
    console.log(count);
  }

  countBoxes();
  $(":checkbox").click(countBoxes);

  // count checks
  function countChecked() {
    checked = $("input:checked").length;
    console.log(checked);

    var percentage = parseInt((checked / count) * 100, 10);
    console.log(percentage);
    $(".progress-bar").progressbar({
      value: percentage,
    });
  }

  countChecked();
  $(":checkbox").click(countChecked);
}



var incMessage = 0;

function checkMessage() {

  var groupno = 3 - (incMessage+1)

  document.getElementById("group").innerHTML = `Share this message into ${groupno} Groups`;

  $(".checkbox-message").click(function(e){
    if (incMessage == 2) {
      $('#item-2').prop('checked', true); // Checks it
      console.log("ji");
      $(this).unbind(e);
    } else {
      $('.checkbox-message').removeAttr('checked')
      e.preventDefault();
      incMessage++;
    }
  })
    
}
