function toggleChat() {
  const box = document.getElementById("chat-box");

  if (box.style.display === "flex") {
    box.style.display = "none";
  } else {
    box.style.display = "flex";
  }
}

async function sendMessage() {
  const input = document.getElementById("msg");
  const message = input.value.trim();

  if (!message) return;

  const chat = document.getElementById("chat");

  chat.innerHTML += `
    <p style="text-align:right; color:#2563eb; margin:8px;">
      <b>You:</b> ${message}
    </p>
  `;

  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  try {
    const response = await fetch("https://mouse-ai-backend.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: message })
    });

    const data = await response.json();

    const reply = data.reply || "No response from Mouse AI.";

    chat.innerHTML += `
      <p style="color:#111827; margin:8px;">
        <b>Mouse AI:</b> ${reply}
      </p>
    `;

    chat.scrollTop = chat.scrollHeight;

  } catch (error) {
    chat.innerHTML += `
      <p style="color:red; margin:8px;">
        <b>Error:</b> Could not connect to backend.
      </p>
    `;
  }
}
