
const webhookURL = "https://discord.com/api/webhooks/1361973900434739312/tqXzDOdhU7p0Xo1AXXgTARqkWYVINAOBiYymdLbZCtP-dro6aylBg1BHoEFrivcsZbyL"; // 실제 주소로 교체

let user = {
  nickname: null,
  balance: 0,
};

function updateUI() {
  document.getElementById("balance").innerText = user.balance;
  const userInfo = document.getElementById("user-info");
  if (user.nickname) {
    userInfo.innerHTML = `<span>${user.nickname}</span>`;
  }
}

// Discord 로그인 정보가 저장되어 있다면 불러오기
const discordUser = localStorage.getItem("discord_user");
if (discordUser) {
  const discordData = JSON.parse(discordUser);
  user.nickname = discordData.username + "#" + discordData.discriminator;
  updateUI();
}

function loginWithDiscord() {
  const clientId = "1367887607702229064";
  const redirectUri = "https://marketmoney22.github.io/callback.html";
  const scope = "identify email";
  const oauthUrl = \`https://discord.com/oauth2/authorize?client_id=\${clientId}&response_type=code&redirect_uri=\${redirectUri}&scope=\${scope.replace(" ", "+")}\`;
  window.location.href = oauthUrl;
}

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
