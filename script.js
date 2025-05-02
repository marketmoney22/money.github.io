function sendToDiscord() {
  const username = document.getElementById("username").value;
  const item = document.getElementById("item").value;
  const review = document.getElementById("review").value;

  const webhookURL = "https://discord.com/api/webhooks/1362050083058880583/BvftuxY3UprHSBPvhqGacp2s1nSZW5e-LX_fcAILIE2DOX_zuiXJIukejwyFcqlxhx4H"; // 여기에 웹훅 URL 넣어줘

  const data = {
    embeds: [
      {
        title: "🛒 구매 로그",
        color: 3447003,
        fields: [
          { name: "닉네임", value: username || "없음" },
          { name: "구매 상품", value: item || "없음" },
          { name: "구매 후기", value: review || "없음" }
        ],
        timestamp: new Date()
      }
    ]
  };

  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(() => alert("구매 정보가 디스코드로 전송되었습니다!"))
    .catch(err => alert("전송 실패: " + err));
}
