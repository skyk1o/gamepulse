const API = "";
let token = localStorage.getItem("token") || "";

function setMsg(id, msg) {
  document.getElementById(id).innerText = msg;
}

// ---------- AUTH ----------
async function login() {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });
    const data = await res.json();
    token = data.token;
    localStorage.setItem("token", token);
    setMsg("authMsg", "✅ Logged in");
  } catch {
    setMsg("authMsg", "❌ Login error");
  }
}

async function register() {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "player",
        email: email.value,
        password: password.value
      })
    });
    const data = await res.json();
    token = data.token;
    localStorage.setItem("token", token);
    setMsg("authMsg", "✅ Registered");
  } catch {
    setMsg("authMsg", "❌ Register error");
  }
}

// ---------- NEWS ----------
async function loadNews() {
  const res = await fetch("/api/news", {
    headers: { Authorization: "Bearer " + token }
  });
  const data = await res.json();
  const box = document.getElementById("news");
  box.innerHTML = "";
  data.articles.forEach(a => {
    box.innerHTML += `
      <div class="item">
        <b>${a.title}</b>
        <p>${a.description || ""}</p>
        <small>${a.source}</small>
      </div>
    `;
  });
}

// ---------- REVIEWS ----------
async function createReview() {
  await fetch("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      gameTitle: gameTitle.value,
      rating: rating.value,
      content: content.value
    })
  });
  loadReviews();
}

async function loadReviews() {
  const res = await fetch("/api/reviews", {
    headers: { Authorization: "Bearer " + token }
  });
  const list = await res.json();
  const box = document.getElementById("reviews");
  box.innerHTML = "";
  list.forEach(r => {
    box.innerHTML += `
      <div class="item">
        <b>${r.gameTitle}</b> — ⭐ ${r.rating}/10
        <p>${r.content}</p>
      </div>
    `;
  });
}
