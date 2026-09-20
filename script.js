const questions = [
  {
    emoji: "🥟",
    q: "It's raining outside. What's your first thought?",
    a: [
      ["Momo time! Obviously.", 4],
      ["Maybe chai first?", 2],
      ["I'll stay under my blanket.", 1],
      ["Rain? I didn't notice.", 0]
    ]
  },
  {
    emoji: "🌶️",
    q: "How much red chutney can you handle?",
    a: [
      ["A tiny dip.", 1],
      ["A respectable amount.", 2],
      ["Extra spicy, please.", 3],
      ["Pour it. I fear nothing.", 4]
    ]
  },
  {
    emoji: "🔥",
    q: "Steamed or fried?",
    a: [
      ["Steamed forever.", 3],
      ["Fried = happiness.", 4],
      ["Tandoori, please!", 3],
      ["I'll take all three.", 4]
    ]
  },
  {
    emoji: "😋",
    q: "Your friend says, 'Let's get just 6 momos.' You...",
    a: [
      ["Agree. 6 is enough.", 1],
      ["Order 8, just in case.", 3],
      ["Ask for a full plate.", 4],
      ["Look at them like they're joking.", 4]
    ]
  },
  {
    emoji: "🫶",
    q: "Someone steals the last momo from your plate.",
    a: [
      ["I share. I'm kind.", 1],
      ["I forgive them... eventually.", 2],
      ["That friendship is over.", 4],
      ["I had already ordered another plate.", 3]
    ]
  },
  {
    emoji: "🥢",
    q: "What is the perfect momo combination?",
    a: [
      ["Momos + red chutney", 4],
      ["Momos + soup", 3],
      ["Momos + cold drink", 2],
      ["Anything as long as there are momos.", 4]
    ]
  },
  {
    emoji: "📱",
    q: "You see a reel saying 'Best momos in town.'",
    a: [
      ["Scroll past.", 0],
      ["Save it for later.", 2],
      ["Send it to my momo partner.", 3],
      ["I'm already planning the visit.", 4]
    ]
  },
  {
    emoji: "❤️",
    q: "Pick your ideal momo date:",
    a: [
      ["Cozy café + momos", 4],
      ["Street stall + chai", 4],
      ["Home + movie + momos", 3],
      ["Anywhere. Just bring momos.", 4]
    ]
  },
  {
    emoji: "🤫",
    q: "Be honest: how many plates is 'just a snack'?",
    a: [
      ["Half a plate.", 1],
      ["One plate.", 2],
      ["Two plates.", 4],
      ["We don't discuss numbers.", 4]
    ]
  },
  {
    emoji: "👑",
    q: "Final question: Would you choose momos over your favourite food?",
    a: [
      ["No way.", 0],
      ["Depends on the day.", 2],
      ["Probably.", 3],
      ["Momos ARE my favourite food.", 4]
    ]
  }
];

let current = 0;
let score = 0;
let selected = null;

const screens = {
  home: document.getElementById("home"),
  quiz: document.getElementById("quiz"),
  result: document.getElementById("result")
};

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startQuiz() {
  current = 0;
  score = 0;
  selected = null;
  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const q = questions[current];

  selected = null;

  document.getElementById("questionNumber").textContent =
    `${String(current + 1).padStart(2, "0")} / ${questions.length}`;

  document.getElementById("progressBar").style.width =
    `${((current + 1) / questions.length) * 100}%`;

  document.getElementById("questionEmoji").textContent = q.emoji;
  document.getElementById("question").textContent = q.q;

  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.a.forEach(([text, points]) => {
    const btn = document.createElement("button");

    btn.className = "answer";
    btn.textContent = text;

    btn.onclick = () => chooseAnswer(btn, points);

    answers.appendChild(btn);
  });

  const next = document.getElementById("nextBtn");

  next.disabled = true;

  next.innerHTML =
    current === questions.length - 1
      ? 'GET MY RESULT <span>🥟</span>'
      : 'NEXT <span>→</span>';
}

function chooseAnswer(button, points) {
  document.querySelectorAll(".answer")
    .forEach(b => b.classList.remove("selected"));

  button.classList.add("selected");

  selected = points;

  document.getElementById("nextBtn").disabled = false;
}

function nextQuestion() {
  if (selected === null) return;

  score += selected;

  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const max = questions.length * 4;
  const pct = Math.round((score / max) * 100);

  let title;
  let description;

  if (pct >= 90) {
    title = "Momo Royalty 👑";
    description =
      "Your momo commitment is extraordinary. Chutney fears you. The momo universe recognizes you.";
  } else if (pct >= 72) {
    title = "Certified Momo Lover 🥟";
    description =
      "You don't just eat momos. You understand momos. Your certification is absolutely deserved.";
  } else if (pct >= 50) {
    title = "Momo Enthusiast 😋";
    description =
      "You've got serious momo energy. A few more plates and you'll be ready for the next level.";
  } else {
    title = "Momo Beginner 🌱";
    description =
      "Your momo journey has only just begun. There are many delicious plates ahead of you.";
  }

  document.getElementById("resultTitle").textContent = title;

  document.getElementById("resultDescription").textContent =
    description;

  document.getElementById("certificateTitle").textContent =
    title.replace(/[👑🥟😋🌱]/g, "").trim().toUpperCase();

  document.getElementById("certificateStats").textContent =
    `Momo personality score: ${pct}% • Chutney courage: ${
      score >= 30 ? "LEGENDARY" : "RISING"
    }`;

  document.getElementById("certDate").textContent =
    new Date().toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

  showScreen("result");
}

function restart() {
  startQuiz();
}

async function shareResult() {
  const name =
    document.getElementById("nameInput").value.trim() ||
    "A Certified Momo Lover";

  const title =
    document.getElementById("resultTitle").textContent;

  const text =
    `🥟 ${name} is officially a ${title}! Take the Certified Momo Lover test too!`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Certified Momo Lover 🥟",
        text,
        url: location.href
      });
      return;
    } catch (e) {}
  }

  try {
    await navigator.clipboard.writeText(
      `${text} ${location.href}`
    );

    document.getElementById("shareStatus").textContent =
      "✨ Result copied! Send it to your momo partner.";
  } catch (e) {
    document.getElementById("shareStatus").textContent = text;
  }
}

function downloadCertificate() {
  const name =
    document.getElementById("nameInput").value.trim() ||
    "Certified Momo Lover";

  const title =
    document.getElementById("resultTitle").textContent
      .replace(/[👑🥟😋🌱]/g, "")
      .trim();

  const pct =
    Math.round((score / (questions.length * 4)) * 100);

  const date =
    new Date().toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

  const canvas = document.createElement("canvas");

  canvas.width = 1400;
  canvas.height = 900;

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#fff8ed";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#c9a15d";
  ctx.lineWidth = 18;
  ctx.strokeRect(35, 35, 1330, 830);

  ctx.strokeStyle = "#d4b26d";
  ctx.lineWidth = 3;
  ctx.strokeRect(55, 55, 1290, 790);

  ctx.textAlign = "center";

  ctx.fillStyle = "#c9483f";
  ctx.font = "bold 70px Georgia";
  ctx.fillText("🥟", 700, 150);

  ctx.fillStyle = "#806f66";
  ctx.font = "bold 22px Arial";
  ctx.fillText("THIS CERTIFIES THAT", 700, 220);

  ctx.fillStyle = "#281c18";
  ctx.font = "bold 58px Georgia";
  ctx.fillText(name, 700, 310);

  ctx.strokeStyle = "#d4b26d";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(330, 335);
  ctx.lineTo(1070, 335);
  ctx.stroke();

  ctx.fillStyle = "#c9483f";
  ctx.font = "bold 42px Georgia";
  ctx.fillText(title.toUpperCase(), 700, 415);

  ctx.fillStyle = "#806f66";
  ctx.font = "22px Arial";
  ctx.fillText(
    `Momo personality score: ${pct}%`,
    700,
    480
  );

  ctx.fillText(
    "Officially recognized by the highly scientific Momo Council.",
    700,
    525
  );

  ctx.font = "22px Arial";
  ctx.fillText(date, 700, 690);

  ctx.font = "46px Arial";
  ctx.fillText("🌶️       🥟       🌶️", 700, 760);

  const link = document.createElement("a");

  link.download = "momo-lover-certificate.png";

  link.href = canvas.toDataURL("image/png");

  link.click();
}
