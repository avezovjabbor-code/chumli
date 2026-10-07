// Ilova holati (State)
const state = {
  questions: questionsData,
  currentIndex: 0,
  userAnswers: new Array(questionsData.length).fill(null),
  flagged: new Set(),
  totalTime: 20 * 60, // 20 daqiqa (soniyalarda)
  timeRemaining: 20 * 60,
  timerInterval: null,
  isFinished: false,
  soundEnabled: true,
  theme: localStorage.getItem('theme') || 'dark'
};

// Web Audio API yordamida engil audio effektlar
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx && AudioContextClass) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSound(type) {
  if (!state.soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'select') {
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(720, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'navigate') {
      osc.frequency.setValueAtTime(420, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'finish') {
      // Fanfare chord
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const noteOsc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        noteOsc.connect(noteGain);
        noteGain.connect(ctx.destination);
        noteOsc.frequency.setValueAtTime(freq, now + i * 0.1);
        noteGain.gain.setValueAtTime(0.12, now + i * 0.1);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.4);
        noteOsc.start(now + i * 0.1);
        noteOsc.stop(now + i * 0.1 + 0.4);
      });
    }
  } catch (e) {
    // Brauzer ovoz cheklovlari yuz berganda xatolikni sezdirmay o'tkazish
  }
}

// DOM Elementlari
const elements = {
  themeToggle: document.getElementById('themeToggle'),
  soundToggle: document.getElementById('soundToggle'),
  timerDisplay: document.getElementById('timerDisplay'),
  timerContainer: document.getElementById('timerContainer'),
  questionBadge: document.getElementById('questionBadge'),
  flagBtn: document.getElementById('flagBtn'),
  questionTitle: document.getElementById('questionTitle'),
  optionsList: document.getElementById('optionsList'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  progressFill: document.getElementById('progressFill'),
  progressCount: document.getElementById('progressCount'),
  progressPercent: document.getElementById('progressPercent'),
  paletteGrid: document.getElementById('paletteGrid'),
  
  // Modallar
  confirmModal: document.getElementById('confirmModal'),
  modalAnsweredCount: document.getElementById('modalAnsweredCount'),
  modalRemainingCount: document.getElementById('modalRemainingCount'),
  cancelModalBtn: document.getElementById('cancelModalBtn'),
  confirmFinishBtn: document.getElementById('confirmFinishBtn'),

  // Ekranlar
  quizScreen: document.getElementById('quizScreen'),
  resultScreen: document.getElementById('resultScreen'),

  // Natijalar
  resultTitle: document.getElementById('resultTitle'),
  resultSubtitle: document.getElementById('resultSubtitle'),
  resultScoreBadge: document.getElementById('resultScoreBadge'),
  scoreCircleProgress: document.getElementById('scoreCircleProgress'),
  scorePercentageText: document.getElementById('scorePercentageText'),
  scoreFractionText: document.getElementById('scoreFractionText'),
  statCorrect: document.getElementById('statCorrect'),
  statIncorrect: document.getElementById('statIncorrect'),
  statUnanswered: document.getElementById('statUnanswered'),
  statTimeTaken: document.getElementById('statTimeTaken'),
  reviewList: document.getElementById('reviewList'),
  restartBtn: document.getElementById('restartBtn')
};

// Dasturni ishga tushirish
function initApp() {
  applyTheme(state.theme);
  setupEventListeners();
  renderPalette();
  startTimer();
  loadQuestion(0);
}

// Mavzu (Dark/Light) o'rnatish
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (elements.themeToggle) {
    elements.themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }
}

// Hodisalarni bog'lash (Event Listeners)
function setupEventListeners() {
  elements.themeToggle.addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    playSound('navigate');
  });

  elements.soundToggle.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    elements.soundToggle.innerHTML = state.soundEnabled ? '🔊' : '🔇';
    playSound('select');
  });

  elements.prevBtn.addEventListener('click', () => {
    if (state.currentIndex > 0) {
      loadQuestion(state.currentIndex - 1);
      playSound('navigate');
    }
  });

  elements.nextBtn.addEventListener('click', () => {
    if (state.currentIndex < state.questions.length - 1) {
      loadQuestion(state.currentIndex + 1);
      playSound('navigate');
    } else {
      openConfirmModal();
    }
  });

  elements.flagBtn.addEventListener('click', () => {
    toggleFlag(state.currentIndex);
  });

  elements.cancelModalBtn.addEventListener('click', closeConfirmModal);
  elements.confirmFinishBtn.addEventListener('click', () => {
    closeConfirmModal();
    finishQuiz();
  });

  elements.restartBtn.addEventListener('click', restartQuiz);
}

// Savollar palitrasini chizish (1-20 grid)
function renderPalette() {
  elements.paletteGrid.innerHTML = '';
  state.questions.forEach((q, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'palette-btn';
    btn.textContent = index + 1;
    btn.setAttribute('aria-label', `${index + 1}-savol`);

    btn.addEventListener('click', () => {
      loadQuestion(index);
      playSound('navigate');
    });

    elements.paletteGrid.appendChild(btn);
  });
  updatePaletteState();
}

// Palitra holatini yangilash
function updatePaletteState() {
  const buttons = elements.paletteGrid.querySelectorAll('.palette-btn');
  buttons.forEach((btn, index) => {
    btn.classList.toggle('current', index === state.currentIndex);
    btn.classList.toggle('answered', state.userAnswers[index] !== null);
    btn.classList.toggle('flagged', state.flagged.has(index));
  });
}

// Progress barni yangilash
function updateProgress() {
  const answeredCount = state.userAnswers.filter(a => a !== null).length;
  const total = state.questions.length;
  const percentage = Math.round((answeredCount / total) * 100);

  elements.progressCount.textContent = `${answeredCount} / ${total} ta`;
  elements.progressPercent.textContent = `${percentage}%`;
  elements.progressFill.style.width = `${percentage}%`;
}

// Savolni yuklash
function loadQuestion(index) {
  state.currentIndex = index;
  const question = state.questions[index];

  elements.questionBadge.textContent = `${index + 1} / ${state.questions.length}-savol`;
  elements.questionTitle.textContent = question.question;

  // Flag tugmasi holati
  if (state.flagged.has(index)) {
    elements.flagBtn.classList.add('flagged');
    elements.flagBtn.innerHTML = '★ Belgilangan';
  } else {
    elements.flagBtn.classList.remove('flagged');
    elements.flagBtn.innerHTML = '☆ Belgilab qo\'yish';
  }

  // Variantlarni chizish
  const letters = ['A', 'B', 'C', 'D'];
  elements.optionsList.innerHTML = '';

  question.options.forEach((optText, optIndex) => {
    const li = document.createElement('li');
    li.className = 'option-item';
    if (state.userAnswers[index] === optIndex) {
      li.classList.add('selected');
    }

    li.innerHTML = `
      <div class="option-letter">${letters[optIndex]}</div>
      <div class="option-text">${optText}</div>
    `;

    li.addEventListener('click', () => {
      selectAnswer(index, optIndex);
      playSound('select');
    });

    elements.optionsList.appendChild(li);
  });

  // Navigatsiya tugmalari holati
  elements.prevBtn.disabled = index === 0;

  if (index === state.questions.length - 1) {
    elements.nextBtn.className = 'btn btn-success';
    elements.nextBtn.innerHTML = 'Testni yakunlash ✓';
  } else {
    elements.nextBtn.className = 'btn btn-primary';
    elements.nextBtn.innerHTML = 'Keyingisi ➔';
  }

  updatePaletteState();
  updateProgress();
}

// Javob tanlash
function selectAnswer(questionIndex, optionIndex) {
  state.userAnswers[questionIndex] = optionIndex;
  
  // UI ni tezkor yangilash
  const options = elements.optionsList.querySelectorAll('.option-item');
  options.forEach((opt, idx) => {
    opt.classList.toggle('selected', idx === optionIndex);
  });

  updatePaletteState();
  updateProgress();
}

// Savolni belgilash (Flag)
function toggleFlag(questionIndex) {
  if (state.flagged.has(questionIndex)) {
    state.flagged.delete(questionIndex);
    elements.flagBtn.classList.remove('flagged');
    elements.flagBtn.innerHTML = '☆ Belgilab qo\'yish';
  } else {
    state.flagged.add(questionIndex);
    elements.flagBtn.classList.add('flagged');
    elements.flagBtn.innerHTML = '★ Belgilangan';
  }
  updatePaletteState();
  playSound('navigate');
}

// Taymer
function startTimer() {
  clearInterval(state.timerInterval);
  updateTimerDisplay();

  state.timerInterval = setInterval(() => {
    if (state.timeRemaining > 0) {
      state.timeRemaining--;
      updateTimerDisplay();
    } else {
      clearInterval(state.timerInterval);
      finishQuiz();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(state.timeRemaining / 60);
  const seconds = state.timeRemaining % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  elements.timerDisplay.textContent = formatted;

  // Oxirgi 2 daqiqada ogohlantirish qizil rang
  if (state.timeRemaining <= 120) {
    elements.timerContainer.classList.add('warning');
  } else {
    elements.timerContainer.classList.remove('warning');
  }
}

// Modal oynalar
function openConfirmModal() {
  const answeredCount = state.userAnswers.filter(a => a !== null).length;
  const remainingCount = state.questions.length - answeredCount;

  elements.modalAnsweredCount.textContent = answeredCount;
  elements.modalRemainingCount.textContent = remainingCount;
  elements.confirmModal.classList.add('active');
}

function closeConfirmModal() {
  elements.confirmModal.classList.remove('active');
}

// Testni yakunlash
function finishQuiz() {
  if (state.isFinished) return;
  state.isFinished = true;
  clearInterval(state.timerInterval);

  playSound('finish');

  // Natijalarni hisoblash
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  state.questions.forEach((q, index) => {
    const userAns = state.userAnswers[index];
    if (userAns === null) {
      unansweredCount++;
    } else if (userAns === q.correctAnswer) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const total = state.questions.length;
  const percentage = Math.round((correctCount / total) * 100);
  const timeSpentSeconds = state.totalTime - state.timeRemaining;
  const spentMinutes = Math.floor(timeSpentSeconds / 60);
  const spentSec = timeSpentSeconds % 60;

  // Baho va tabrik matni
  let titleText = "";
  let subtitleText = "";
  let badgeText = "";
  let badgeColor = "";

  if (percentage >= 85) {
    titleText = "Ajoyib Natija! 🎉";
    subtitleText = "Siz dasturlash va IT sohasida yuqori bilimga ega ekanligingizni isbotladingiz!";
    badgeText = "A'lo (Top daraja)";
    badgeColor = "var(--success)";
  } else if (percentage >= 65) {
    titleText = "Yaxshi Natija! 👍";
    subtitleText = "Ko'rsatkichingiz yaxshi, biroz ko'proq amaliyot bilan mukammal natijaga erishasiz.";
    badgeText = "Yaxshi";
    badgeColor = "var(--accent-primary)";
  } else if (percentage >= 40) {
    titleText = "Qoniqarli Natija 💡";
    subtitleText = "Asosiy tushunchalarni bilasiz, ammo xatolaringiz ustida ishlab, qaytadan urinib ko'ring.";
    badgeText = "Qoniqarli";
    badgeColor = "var(--warning)";
  } else {
    titleText = "Ko'proq O'rganish Kerak 📚";
    subtitleText = "Xafa bo'lmang! Quyidagi tahlillarni o'rganib chiqib, bilimingizni mustahkamlang.";
    badgeText = "Boshlang'ich";
    badgeColor = "var(--danger)";
  }

  // Natijalar ekranini to'ldirish
  elements.resultTitle.textContent = titleText;
  elements.resultSubtitle.textContent = subtitleText;
  elements.resultScoreBadge.textContent = badgeText;
  elements.resultScoreBadge.style.background = `${badgeColor}25`;
  elements.resultScoreBadge.style.color = badgeColor;

  elements.scorePercentageText.textContent = `${percentage}%`;
  elements.scoreFractionText.textContent = `${correctCount} / ${total} to'g'ri`;

  elements.statCorrect.textContent = correctCount;
  elements.statIncorrect.textContent = incorrectCount;
  elements.statUnanswered.textContent = unansweredCount;
  elements.statTimeTaken.textContent = `${spentMinutes}m ${spentSec}s`;

  // Doira animatsiyasi (stroke-dashoffset: 440 aylananing perimetri)
  const offset = 440 - (440 * percentage) / 100;
  setTimeout(() => {
    elements.scoreCircleProgress.style.strokeDashoffset = offset;
  }, 200);

  // Savollar tahlilini chizish
  renderReviewList();

  // Ekranlarni almashtirish
  elements.quizScreen.style.display = 'none';
  elements.resultScreen.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Savollar tahlilini (Review) chiqarish
function renderReviewList() {
  elements.reviewList.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  state.questions.forEach((q, index) => {
    const userAns = state.userAnswers[index];
    const isCorrect = userAns === q.correctAnswer;
    const isUnanswered = userAns === null;

    const card = document.createElement('div');
    card.className = `review-card ${isUnanswered ? 'unanswered' : (isCorrect ? 'correct' : 'incorrect')}`;

    let statusLabel = "";
    if (isUnanswered) statusLabel = "⚠️ Javob berilmadi";
    else if (isCorrect) statusLabel = "✅ To'g'ri javob";
    else statusLabel = "❌ Noto'g'ri javob";

    let optionsHtml = '';
    q.options.forEach((opt, optIndex) => {
      let optClass = 'review-opt';
      let optIcon = '';

      if (optIndex === q.correctAnswer) {
        optClass += ' correct-answer';
        optIcon = ' ✓';
      } else if (optIndex === userAns && !isCorrect) {
        optClass += ' user-wrong';
        optIcon = ' ✗ (Sizning javobingiz)';
      }

      optionsHtml += `
        <div class="${optClass}">
          <strong>${letters[optIndex]}:</strong> ${opt} ${optIcon}
        </div>
      `;
    });

    card.innerHTML = `
      <div class="review-q-header">
        <span>${index + 1}-savol</span>
        <span>${statusLabel}</span>
      </div>
      <div class="review-q-title">${q.question}</div>
      <div class="review-options">
        ${optionsHtml}
      </div>
      <div class="review-explanation">
        <strong>💡 Tushuntirish:</strong> ${q.explanation}
      </div>
    `;

    elements.reviewList.appendChild(card);
  });
}

// Testni qaytadan boshlash
function restartQuiz() {
  state.currentIndex = 0;
  state.userAnswers = new Array(state.questions.length).fill(null);
  state.flagged.clear();
  state.timeRemaining = state.totalTime;
  state.isFinished = false;

  elements.scoreCircleProgress.style.strokeDashoffset = 440;
  elements.resultScreen.classList.remove('active');
  elements.quizScreen.style.display = 'grid';

  renderPalette();
  startTimer();
  loadQuestion(0);
  playSound('navigate');
}

// Boshlang'ich yuklash
document.addEventListener('DOMContentLoaded', initApp);
