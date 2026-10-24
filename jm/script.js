const form = document.querySelector("#decryptForm");
const apiUrl = document.querySelector("#apiUrl");
const resultBox = document.querySelector("#resultBox");
const decryptButton = document.querySelector("#decryptButton");
const copyButton = document.querySelector("#copyButton");
const clearButton = document.querySelector("#clearButton");
const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1800);
}

async function copyResult() {
  if (!resultBox.value.trim()) {
    showToast("没有可复制的内容");
    return;
  }

  try {
    await navigator.clipboard.writeText(resultBox.value);
    showToast("已复制结果");
  } catch {
    resultBox.focus();
    resultBox.select();
    document.execCommand("copy");
    showToast("已复制结果");
  }
}

function formatResult(value) {
  if (typeof value !== "string") {
    return JSON.stringify(value, null, 2);
  }

  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch {
    return value;
  }
}

function clearForm() {
  apiUrl.value = "";
  resultBox.value = "";
  apiUrl.focus();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const url = apiUrl.value.trim();
  if (!url) return;

  decryptButton.disabled = true;
  decryptButton.textContent = "解密中";
  resultBox.value = "解密中";

  try {
    const response = await fetch("../api/decode.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });
    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.message || "解密失败");
    }

    resultBox.value = formatResult(data.data);
    showToast("解密完成");
  } catch (error) {
    resultBox.value = error.message || "解密失败";
    showToast("解密失败");
  } finally {
    decryptButton.disabled = false;
    decryptButton.textContent = "解密";
  }
});

copyButton.addEventListener("click", copyResult);
clearButton.addEventListener("click", clearForm);
