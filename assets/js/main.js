const USERS = [
    { name: "admin", secret: "1357" },
  ];
  
  let submit = document.getElementById("submit");
  let loginPopup = document.getElementById("loginPopup");
  let usernameInput = document.getElementById("name");
  let passwordInput = document.getElementById("password");
  let loginForm = document.getElementById("form");
  let loginMessage = document.querySelector(".message");
  let logout = document.getElementById("logout");
  let welcome = document.getElementById("welcome");
  let blurElement = document.getElementById("loginForm");
  
  
  const setCookie = (cname, cvalue, exdays) => {
    let d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };
  
  const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  
  
  let keepLogin = () => {
    const loggedIn = getCookie("logged_in");
    if (loggedIn === "true") {
      let userID = getCookie("username");
      usernameInput.value = userID;
      welcome.innerHTML = `>welcome, ${usernameInput.value}`;
      loginPopup.style.display = "none";
      blurElement.classList.remove("blur");
    }
  };
  
  keepLogin();
  
  
  let checkInput = () => {
    submit.addEventListener("click", (e) => {
      e.preventDefault();
      let username = usernameInput.value.toLowerCase();
      let password = passwordInput.value;
      fetch("https:///", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          secret: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            loginMessage.innerHTML = " ";
            welcome.innerHTML = `>welcome, ${username}`;
            setCookie("username", username, 1);
            setCookie("logged_in", "true", 1);
            blurElement.classList.remove("blur");
            loginPopup.style.display = "none";
          } else {
            loginMessage.innerHTML = data.message;
          }
  
          if (data.message === "wrong password") {
            asterisk.classList.add("wrongPw");
            passwordInput.classList.add("red");
          }
  
          if (data.message === "user not found") {
            usernameInput.classList.add("red");
            asterisk.classList.add("wrongId");
          }
        });
    });
  };
  
  checkInput();
  
  
  let removeCookie = () => {
    logout.addEventListener("click", (e) => {
      loginForm.reset();
      location.reload();
      setCookie("username", " ", -1);
      setCookie("logged_in", " ", -1);
    });
  };
  
  removeCookie();
  