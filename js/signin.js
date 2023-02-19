// DOM
const signForm = document.querySelector(".signin_form");
const signInBtn = document.querySelector(".signin_btn");
const email = document.querySelector("#email");
const pw = document.querySelector("#password");

// 監聽singnBtn 點擊事件

signInBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let ctmEmail = email.value;
  let ctmPassword = password.value;
  console.log(ctmEmail, ctmPassword);
  // 信箱不得為空
  if (ctmEmail === "") {
    swal({
      title: "Error",
      text: "Please check your email!",
      icon: "error",
    });
    return;
  }
  // 信箱驗證
  if (!ValidateEmail(ctmEmail)) {
    swal({
      title: "Error",
      text: "Please check your email!",
      icon: "error",
    });
    return;
  }
  // 密碼不得為空
  if (ctmPassword === "") {
    swal({
      title: "Error",
      text: "Please check your password!",
      icon: "error",
    });
    return;
  }

  swal({
    title: "Good job!",
    text: "Sign In Success!",
    icon: "success",
  });
  signForm.reset();
});

// 信箱驗證
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}
