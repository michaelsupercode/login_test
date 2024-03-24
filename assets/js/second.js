let container = document.getElementById("random");
let btn = document.getElementById("button");

btn.addEventListener("click", (e) => {
  fetch("http://")
    .then((response) => response.json())
    .then((data) => {
      container.innerHTML = data.value.joke;
      btn.innerHTML = "..hey..!";
    });
});