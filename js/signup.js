// DOM
const signupForm = document.querySelector(".signup_form");
const signUpBtn = document.querySelector(".signin_btn");
console.log(signUpBtn);
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const phone = document.querySelector("#Phone");
const pw = document.querySelector("#password");
const check_pw = document.querySelector("#check_password");

signUpBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // 輸入資訊不得為空
  if (
    firstName.value == "" ||
    lastName.value == "" ||
    email.value == "" ||
    phone.value == "" ||
    pw.value == "" ||
    check_pw.value == ""
  ) {
    swal({
      title: "Error",
      text: "Please check your information!",
      icon: "error",
    });
    return;
  }

  // 信箱驗證
  if (!ValidateEmail(email.value)) {
    swal({
      title: "Error",
      text: "Please check your email!",
      icon: "error",
    });
    return;
  }
  // 確認密碼
  if (pw.value !== check_pw.value) {
    swal({
      title: "Error",
      text: "Please check your password",
      icon: "error",
    });
    return;
  }
  swal({
    title: "Good job!",
    text: "Registration Success!",
    icon: "success",
  });
  signupForm.reset();
});

// 信箱驗證
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}
