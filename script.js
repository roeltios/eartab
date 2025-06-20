const playControl = document.getElementById("playControl");
const nextControl = document.getElementById("nextControl");
const intervalLabel = document.getElementById("intervalLabel");
const options = document.querySelectorAll(".option");
const feedback = document.getElementById("feedback");

const intervals = [
  { name: "Minor Second", semitones: 1 },
  { name: "Major Second", semitones: 2 },
  { name: "Minor Third", semitones: 3 },
  { name: "Major Third", semitones: 4 },
  { name: "Perfect Fourth", semitones: 5 },
  { name: "Perfect Fifth", semitones: 7 }
];

let currentInterval = null;

function playInterval(semitones) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const baseFreq = 440; // A4
  const secondFreq = baseFreq * Math.pow(2, semitones / 12);
  const now = audioCtx.currentTime;

  const attack = 0.01;
  const duration = 0.5;
  const gap = 0.2;

  const osc1 = audioCtx.createOscillator();
  const gain1 = audioCtx.createGain();
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(baseFreq, now);
  gain1.gain.setValueAtTime(0, now);
  gain1.gain.linearRampToValueAtTime(0.6, now + attack);
  osc1.connect(gain1).connect(audioCtx.destination);
  osc1.start(now);
  osc1.stop(now + duration);

  const osc2 = audioCtx.createOscillator();
  const gain2 = audioCtx.createGain();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(secondFreq, now + duration + gap);
  gain2.gain.setValueAtTime(0, now + duration + gap);
  gain2.gain.linearRampToValueAtTime(0.6, now + duration + gap + attack);
  osc2.connect(gain2).connect(audioCtx.destination);
  osc2.start(now + duration + gap);
  osc2.stop(now + duration * 2 + gap);
}

playControl.addEventListener("click", () => {
  if (!currentInterval) {
    feedback.textContent = "Click 'Next' to start.";
    feedback.style.color = "gray";
    return;
  }

  playInterval(currentInterval.semitones);
});

nextControl.addEventListener("click", () => {
  feedback.textContent = "";
  currentInterval = intervals[Math.floor(Math.random() * intervals.length)];
  intervalLabel.textContent = "—";
});

options.forEach(option => {
  option.addEventListener("click", () => {
    if (!currentInterval) return;
    const correct = option.textContent === currentInterval.name;
    feedback.textContent = correct
      ? "Correct."
      : `Incorrect. It was: ${currentInterval.name}`;
    feedback.style.color = correct ? "green" : "red";
    intervalLabel.textContent = currentInterval.name;
  });
});
