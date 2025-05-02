const webhookURL = "https://discord.com/api/webhooks/1361973900434739312/tqXzDOdhU7p0Xo1AXXgTARqkWYVINAOBiYymdLbZCtP-dro6aylBg1BHoEFrivcsZbyL";

let user = {
  nickname: null,
  balance: 0,
};

function updateUI() {
  const balanceEl = document.getElementById("balance");
  const userInfo = document.getElementById("user-info");

  if (balanceEl) balanceEl.innerText = user.balance;
  if (user.nickname && userInfo) {
    userInfo.innerHTML = `<span>${user.nickname}</span>`;
  }
}

// 로그인 사용자 정보 불러오기
const discordUser = localStorage.getItem("discord_user");
if (discordUser) {
  const discordData = JSON.parse(discordUser);
  user.nickname = discordData.username + "#" + discordData.discriminator;
  updateUI();
}

// 로그인 시작
function loginWithDiscord() {
  const clientId = "1367887607702229064";
  const redirectUri = "https://marketmoney22.github.io/callback.html";
  const scope = "identify";
  const oauthUrl =
    `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
  window.location.href = oauthUrl;
}

// 디스코드 로그인 처리 (callback.html에서만 실행)
async function handleDiscordCallback() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const currentPage = window.location.pathname;

  if (!code || !currentPage.includes("callback.html")) return;

  const clientId = "1367887607702229064";
  const clientSecret = "YOUR_CLIENT_SECRET"; // ⚠️ 실제 서버 필요
  const redirectUri = "https://marketmoney22.github.io/callback.html";

  try {
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);
    params.append("scope", "identify");

    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });
    const tokenData = await tokenRes.json();

    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });
    const userData = await userRes.json();

    const discordUser = {
      id: userData.id,
      username: userData.username,
      discriminator: userData.discriminator,
      avatar: userData.avatar
    };

    localStorage.setItem("discord_user", JSON.stringify(discordUser));

    // 로그인 Webhook 전송
    await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `🔐 로그인: ${discordUser.username}#${discordUser.discriminator} (${discordUser.id})`
      })
    });

    window.location.href = "index.html";
  } catch (error) {
    alert("Discord 로그인 실패");
    console.error(error);
  }
}

// 호출
handleDiscordCallback();

function purchase(itemName) {
  if (!user.nickname) return alert("로그인이 필요합니다.");
  if (user.balance < 1000) return alert("잔액이 부족합니다. 충전해주세요.");

  user.balance -= 1000;
  updateUI();

  const payload = {
    content: `🛒 ${user.nickname}님이 ${itemName}를 구매했습니다.`,
  };

  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  alert(`${itemName} 구매 완료!`);
}

function openRecharge() {
  document.getElementById("rechargeModal").style.display = "flex";
}

function selectRecharge(type) {
  if (type === "bank") {
    document.getElementById("bankForm").style.display = "block";
  } else {
    alert("문상 충전은 추후 추가될 예정입니다.");
  }
}

function showAccount() {
  const name = document.getElementById("depositor").value;
  const amount = parseInt(document.getElementById("amount").value, 10);
  if (!name || !amount) return alert("입금자명과 금액을 입력해주세요.");

  document.getElementById("accountInfo").innerText =
    `우리은행 123-456-789012 예금주: 홍길동\n입금자명: ${name}, 금액: ${amount}원`;

  // 충전 시뮬레이션
  user.balance += amount;
  updateUI();
}
