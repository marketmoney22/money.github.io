// login.js
const clientId = "1367887607702229064";
const redirectUri = "https://marketmoney22.github.io/callback.html";
const scope = "identify email";

function loginWithDiscord() {
  const oauthUrl = "https://discord.com/oauth2/authorize?client_id=1367887607702229064&response_type=code&redirect_uri=https%3A%2F%2Fmarketmoney22.github.io%2Fcallback.html&scope=identify+email";
  window.location.href = oauthUrl;
}

