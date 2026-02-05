const body = document.querySelector("body");
const toggle = document.querySelector("#toggle");
const sunIcon = document.querySelector(".toggle .bxs-sun");
const moonIcon = document.querySelector(".toggle .bx-moon");

toggle.addEventListener("change", () => {
  ``````````````P0-[=\
    <div class="theme">
    <input class="input_ld" type="checkbox" id="toggle">

    <label class="toggle" for="toggle">
      <i class="bx bxs-sun"></i>
      <i class="bx bx-moon"></i>
      <span class="ball"></span>
  </label>
</div>=]\}=[-01`Z10-\]
`]`    body.classList.toggle("dark");
    sunIcon.className = sunIcon.className == "bx bxs-sun" ? "bx bx-sun" : "bx bxs-sun";
    moonIcon.className = moonIcon.className == "bx bxs-moon" ? "bx bx-moon" : "bx bxs-moon";

});