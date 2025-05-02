// 장바구니에 상품을 추가하고, 구매가 완료되면 Discord 웹훅 알림을 보내는 코드
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        const productName = button.parentElement.querySelector('h2').textContent;
        alert(`${productName}이(가) 장바구니에 추가되었습니다.`);

        // 디스코드 웹훅 알림
        sendDiscordWebhook(`${productName}님이 ${productName}을 구매하셨습니다.`);

        // 구매 후 후기 작성 폼 보이기
        document.getElementById('review-form').style.display = 'block';
    });
});

// 디스코드 웹훅 전송 함수
function sendDiscordWebhook(message) {
    const webhookURL = 'https://discord.com/api/webhooks/your-webhook-url';
    const payload = {
        content: message
    };

    fetch(webhookURL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
      .then(data => console.log('웹훅 전송 성공!', data))
      .catch(error => console.error('웹훅 전송 실패:', error));
}

// 구매 후기를 작성하고 제출하면 웹훅으로 전송하는 코드
document.getElementById('submit-review').addEventListener('click', () => {
    const reviewText = document.getElementById('review-text').value;
    if (reviewText) {
        // 후기를 웹훅으로 전송
        sendReviewWebhook(`구매 후기가 작성되었습니다: "${reviewText}"`);
        alert('후기가 제출되었습니다!');

        // 폼을 숨기기
        document.getElementById('review-form').style.display = 'none';
    } else {
        alert('후기를 작성해주세요!');
    }
});

// 후기를 디스코드 웹훅으로 전송하는 함수
function sendReviewWebhook(reviewMessage) {
    const webhookURL = 'https://discord.com/api/webhooks/your-review-webhook-url';
    const payload = {
        content: reviewMessage
    };

    fetch(webhookURL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
      .then(data => console.log('후기 웹훅 전송 성공!', data))
      .catch(error => console.error('후기 웹훅 전송 실패:', error));
}
