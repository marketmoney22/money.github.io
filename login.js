
function loginWithDiscord() {
  window.location.href = "https://discord.com/oauth2/authorize?client_id=1367887607702229064&response_type=code&redirect_uri=https://marketmoney22.github.io/callback.html&scope=identify+email";
}

const saved = localStorage.getItem("discord_user");
if (saved) {
  const user = JSON.parse(saved);
  document.getElementById("user-info").innerHTML = `<span>\${user.username}#\${user.discriminator}</span>`;
}
