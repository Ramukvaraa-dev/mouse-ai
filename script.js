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
    <p style="text-align:right; color:#2563eb;">
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

    const reply =
      data.choices?.[0]?.message?.content ||
      data.reply ||
      "No response";

    chat.innerHTML += `
      <p style="color:#111827;">
        <b>Mouse AI:</b> ${reply}
      </p>
    `;

    chat.scrollTop = chat.scrollHeight;

  } catch (error) {
    chat.innerHTML += `
      <p style="color:red;">
        <b>Error:</b> Could not connect to AI backend.
      </p>
    `;
  }
}
