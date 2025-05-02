const webhookURL = "https://discord.com/api/webhooks/웹훅주소"; // 여기에 본인의 웹훅 주소 입력

function purchase(product) {
  const payload = {
    content: `🛒 구매 요청: ${product}\n결제 방법: 계좌 이체 or 문상 or 코인`
  };

  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  alert(`${product} 구매 요청이 전송되었습니다.`);
}

function submitReview() {
  const review = document.getElementById("reviewText").value;
  if (!review.trim()) return alert("후기를 작성해주세요!");

  const payload = {
    content: `📝 구매 후기:\n${review}`
  };

  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  alert("후기가 제출되었습니다.");
  document.getElementById("reviewText").value = "";
}
