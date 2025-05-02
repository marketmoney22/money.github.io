// login.js
const clientId = "1367887607702229064";
const redirectUri = "https://marketmoney22.github.io/callback.html";
const scope = "identify email";

function loginWithDiscord() {
  const oauthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope.replace(" ", "+")}`;
  window.location.href = oauthUrl;
}
