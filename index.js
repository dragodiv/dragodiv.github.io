let theme = document.getElementById("theme");
theme.addEventListener("click", () => {
  let toggle = document.getElementById("theme-toggle"),
    themebtn = document.getElementById("theme-btn"),
    themeData = document.getElementById("theme-data");
  toggle.classList.toggle("dark");
  themebtn.classList.toggle("fa-moon");
  if (themebtn.classList.contains("fa-moon")) {
    themeData.innerText = "Dark";
  } else {
    themeData.innerText = "Light";
  }
});
let menuBtn = document.getElementById("menu-btn"),
  icon = document.getElementById("menu"),
  menuBar = document.getElementById("nav-links");
menuBtn.addEventListener("click", () => {
  icon.classList.toggle("fa-xmark");
  menuBar.classList.toggle("active");
});

let links = [
  { link: "/DivPlays-Music-Player-Glassmorph/" },
  { link: "/card-ui-glassmorph/" },
  { link: "/Image-Resize-and-Compressor/" },
  { link: "/calculator-glassmorph/" },
];

function CopyLink(n) {
  navigator.clipboard.writeText(window.location.origin + links[n - 1].link);
  alert("Link Copied!!");
}

let year = document.getElementById("year");
year.innerText = new Date().getFullYear();

async function fetchEnv() {
  const url = "https://divanshu-soni-env.dragodiv.workers.dev/";
  const options = {
    method: "GET",
    headers: {
      Origin: `${window.location.origin}/`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      SendEmail(data);
    } else if (response.status === 403) {
      console.error("Access forbidden: Invalid origin.");
    } else {
      console.error(
        "Failed to fetch from worker:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error fetching from worker:", error);
  }
}

// console.log(window.matchMedia("(prefers-color-scheme : dark)").matches);
// email sending function
function SendEmail(data) {
  Email.send({
    SecureToken: data.SecureToken,
    To: data.ToEmail,
    From: data.FromEmail,
    FromName: document.getElementById("name").value,
    ReplyAddress: document.getElementById("email").value,
    Subject:
      document.getElementById("name").value + " contacted you from portfolio",
    Body:
      document.getElementById("email").value +
      "<br>" +
      document.getElementById("message").value,
  }).then((message) => alert(message));
}
