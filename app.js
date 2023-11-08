const popup = document.querySelector(".popup"),
  iconWifi = popup.querySelector(".icon i"),
  title = popup.querySelector(".details .title"),
  desc = popup.querySelector(".details .description"),
  btnRefresh = popup.querySelector(".details .refresh");

let isOnline = true,
  timer = 10,
  interval = null;

const checkInternet = async () => {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    isOnline = res.status >= 200 && res.status < 300;
  } catch (error) {
    isOnline = false;
  }

  // console.log(isOnline);
  timer = 10;
  clearInterval(interval);
  handlePopup(isOnline);
};

const handlePopup = (status) => {
  if (status) {
    iconWifi.className = "fa-solid fa-wifi";
    title.innerText = "Connection Internet retabli";
    desc.innerHTML = "Votre connection Internet Est Retabli!";
    btnRefresh.innerText = "Connect Now";
    // popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), 2000);
  } else {
    iconWifi.className = "fa-solid fa-globe";
    title.innerText = "Lost Connection";
    desc.innerHTML = `Your Network is unavailable. We will attemp to reconnect you in <span class="time">10</span> seconds.`;
    btnRefresh.innerText = "Refresh Now";
    popup.className = "popup show";
  }

  interval = setInterval(() => {
    timer--;
    if (timer === 0) checkInternet();
    desc.innerHTML = `Your Network is unavailable. We will attemp to reconnect you in <span class="time">${timer}</span> seconds.`;
  }, 1000);
};

setInterval(() => isOnline && checkInternet(), 3000);
btnRefresh.addEventListener("click", checkInternet);
