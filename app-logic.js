const TOPIC_LABELS = {
  assertive: { en: "Assertive", bn: "বিবৃতিমূলক" },
  interrogative: { en: "Questions", bn: "প্রশ্নবাচক" },
  tags: { en: "Question Tags", bn: "প্রশ্ন-ট্যাগ" },
  imperative: { en: "Imperatives", bn: "অনুজ্ঞা" },
  modals: { en: "Modals", bn: "মোডাল" },
  optative: { en: "Optative / Exclamatory", bn: "ইচ্ছা / উল্লাস" },
  timeplace: { en: "Time & Place", bn: "কাল ও স্থান" },
  misc: { en: "Dialogues", bn: "কথোপকথন" }
};
let currentView = "home";
let bankFilter = "all";
let examState = null;

function $(sel, root = document) { return root.querySelector(sel); }
function $$(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }
function isBn() { return document.body.classList.contains("lang-bn"); }

function showView(view, jumpId) {
  currentView = view;
  $$(".view").forEach(v => v.classList.remove("active"));
  const el = document.getElementById("view-" + view);
  if (el) el.classList.add("active");
  $$(".navitem").forEach(n => {
    const match = n.dataset.view === view && (!n.dataset.jump || !jumpId || n.dataset.jump === jumpId);
    n.classList.toggle("active", match);
  });
  document.body.classList.remove("sidebar-open");
  document.getElementById("sidebar")?.classList.remove("open");
  if (view === "rules") renderRules(jumpId);
  if (view === "bank") { setupBankFilters(); renderBank(); }
  if (view === "exam") setupExamPanel();
  if (view === "home") { updateStats(); buildCourseMap(); }
  const titles = {
    home: { en: "Direct & Indirect Narration", bn: "প্রত্যক্ষ ও পরোক্ষ উক্তি" },
    rules: { en: "Rules & Concepts", bn: "নিয়মাবলী" },
    bank: { en: "Question Bank", bn: "প্রশ্ন ব্যাংক" },
    exam: { en: "Exam Mode", bn: "পরীক্ষা মোড" }
  };
  const t = titles[view] || titles.home;
  const tt = $("#topbarTitle");
  if (tt) tt.innerHTML = `<span class="en">${t.en}</span><span class="bn">${t.bn}</span>`;
  if (jumpId && view === "rules") {
    setTimeout(() => {
      const target = document.getElementById("rule-" + jumpId);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }
}
window.__narrShowView = showView;

function renderRules(jumpId) {
  const host = $("#rulesContainer");
  if (!host || typeof RULES === "undefined") return;
  const lang = isBn() ? "bn" : "en";
  host.innerHTML = RULES.map(r => {
    const body = lang === "bn" ? (r.html_bn || "") : (r.html_en || "");
    const title = lang === "bn" ? r.bn_title : r.en_title;
    return `<div class="rule-section" id="rule-${r.id}"><h2 class="section-title">${title}</h2>${body}</div>`;
  }).join("");
}

function updateStats() {
  const sr = $("#statRules");
  const sq = $("#statQ") || $("#statBank");
  if (sr && typeof RULES !== "undefined") sr.textContent = String(RULES.length);
  if (sq && typeof BANK !== "undefined") sq.textContent = String(BANK.length);
}

function setupBankFilters() {
  const host = $("#bankFilters");
  if (!host || typeof BANK === "undefined") return;
  const topics = ["all", ...new Set(BANK.map(x => x.topic))];
  host.innerHTML = topics.map(t => {
    const label = t === "all" ? (isBn() ? "সব" : "All") : (TOPIC_LABELS[t] ? (isBn() ? TOPIC_LABELS[t].bn : TOPIC_LABELS[t].en) : t);
    return `<button type="button" class="chip${t === bankFilter ? " on" : ""}" data-filter="${t}">${label}</button>`;
  }).join("");
  host.querySelectorAll(".chip").forEach(btn => {
    btn.addEventListener("click", () => {
      bankFilter = btn.dataset.filter;
      setupBankFilters();
      renderBank();
    });
  });
}

function renderBank() {
  const host = $("#bankContainer");
  const countEl = $("#bankCount");
  if (!host || typeof BANK === "undefined") return;
  let items = BANK;
  if (bankFilter && bankFilter !== "all") items = BANK.filter(x => x.topic === bankFilter);
  if (countEl) countEl.textContent = items.length + (isBn() ? "টি প্রশ্ন" : " questions");
  host.innerHTML = items.map(item => {
    const tag = TOPIC_LABELS[item.topic] ? (isBn() ? TOPIC_LABELS[item.topic].bn : TOPIC_LABELS[item.topic].en) : item.topic;
    return `<div class="flashcard" data-id="${item.id}">
      <div class="fc-top"><span class="fc-tag">${tag}</span><span class="fc-num">#${item.id}</span></div>
      <div class="fc-q">${item.direct}</div>
      <div class="fc-hint"><span class="en">Tap to reveal answer</span><span class="bn">উত্তর দেখতে ট্যাপ করো</span></div>
      <div class="fc-a"><div class="fc-answer">${item.indirect}</div>${item.note ? `<div class="fc-note">${item.note}</div>` : ""}</div>
    </div>`;
  }).join("");
  host.querySelectorAll(".flashcard").forEach(card => {
    card.addEventListener("click", () => card.classList.toggle("revealed"));
  });
}

function setupSearch() {
  const input = $("#searchInput");
  const results = $("#searchResults");
  if (!input || !results) return;
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { results.style.display = "none"; return; }
    const hits = [];
    if (typeof RULES !== "undefined") {
      RULES.forEach(r => {
        const blob = ((r.en_title||"") + (r.bn_title||"") + (r.html_en||"") + (r.html_bn||"")).toLowerCase();
        if (blob.includes(q)) hits.push({ type: "rule", id: r.id, title: isBn() ? r.bn_title : r.en_title });
      });
    }
    if (typeof BANK !== "undefined") {
      BANK.forEach(x => {
        if ((x.direct + x.indirect + (x.note || "")).toLowerCase().includes(q))
          hits.push({ type: "bank", id: x.id, title: x.direct.slice(0, 60) + "…" });
      });
    }
    results.innerHTML = hits.slice(0, 12).map(h =>
      `<button type="button" class="search-hit" data-type="${h.type}" data-id="${h.id}">${h.title}</button>`
    ).join("") || `<div class="search-hit">No results</div>`;
    results.style.display = "block";
    results.querySelectorAll(".search-hit").forEach(btn => {
      btn.addEventListener("click", () => {
        results.style.display = "none";
        input.value = "";
        if (btn.dataset.type === "rule") showView("rules", btn.dataset.id);
        else showView("bank");
      });
    });
  });
  document.addEventListener("click", e => {
    if (!results.contains(e.target) && e.target !== input) results.style.display = "none";
  });
}

function buildCourseMap() {
  const host = $("#courseMap");
  if (!host || typeof RULES === "undefined") return;
  host.innerHTML = RULES.map((r, i) =>
    `<button type="button" class="map-item" data-view="rules" data-jump="${r.id}"><span class="map-num">${i + 1}</span><span>${isBn() ? r.bn_title : r.en_title}</span></button>`
  ).join("");
  host.querySelectorAll(".map-item").forEach(btn => {
    btn.addEventListener("click", () => showView(btn.dataset.view, btn.dataset.jump));
  });
}

function setupExamPanel() {
  const setup = $("#examSetup");
  const running = $("#examRunning");
  const summary = $("#examSummary");
  if (setup) setup.style.display = "block";
  if (running) running.style.display = "none";
  if (summary) summary.style.display = "none";
  const sel = $("#examTopic");
  if (sel && typeof BANK !== "undefined" && !sel.dataset.filled) {
    const topics = ["all", ...new Set(BANK.map(x => x.topic))];
    sel.innerHTML = topics.map(t => {
      const label = t === "all" ? (isBn() ? "সব" : "All topics") : (TOPIC_LABELS[t] ? (isBn() ? TOPIC_LABELS[t].bn : TOPIC_LABELS[t].en) : t);
      return `<option value="${t}">${label}</option>`;
    }).join("");
    sel.dataset.filled = "1";
  }
  const startBtn = $("#startExamBtn");
  if (startBtn && !startBtn.dataset.bound) {
    startBtn.dataset.bound = "1";
    startBtn.addEventListener("click", startExam);
  }
  const showBtn = $("#examShowAnswerBtn");
  if (showBtn && !showBtn.dataset.bound) {
    showBtn.dataset.bound = "1";
    showBtn.addEventListener("click", () => {
      $("#examCardA").style.display = "block";
      $("#examActionsReveal").style.display = "none";
      $("#examActionsGrade").style.display = "flex";
    });
  }
  const correctBtn = $("#examCorrectBtn");
  if (correctBtn && !correctBtn.dataset.bound) {
    correctBtn.dataset.bound = "1";
    correctBtn.addEventListener("click", () => gradeExam(true));
  }
  const wrongBtn = $("#examWrongBtn");
  if (wrongBtn && !wrongBtn.dataset.bound) {
    wrongBtn.dataset.bound = "1";
    wrongBtn.addEventListener("click", () => gradeExam(false));
  }
  const retryBtn = $("#examRetryBtn");
  if (retryBtn && !retryBtn.dataset.bound) {
    retryBtn.dataset.bound = "1";
    retryBtn.addEventListener("click", startExam);
  }
  const backBtn = $("#examBackBtn");
  if (backBtn && !backBtn.dataset.bound) {
    backBtn.dataset.bound = "1";
    backBtn.addEventListener("click", setupExamPanel);
  }
  const quitBtn = $("#examQuitBtn");
  if (quitBtn && !quitBtn.dataset.bound) {
    quitBtn.dataset.bound = "1";
    quitBtn.addEventListener("click", finishExam);
  }
}

function startExam() {
  if (typeof BANK === "undefined") return;
  const n = Math.min(parseInt($("#examCount")?.value || "10", 10) || 10, BANK.length);
  const topic = $("#examTopic")?.value || "all";
  let pool = topic === "all" ? [...BANK] : BANK.filter(x => x.topic === topic);
  if (!pool.length) pool = [...BANK];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  examState = { items: pool.slice(0, n), idx: 0, correct: 0 };
  $("#examSetup").style.display = "none";
  $("#examSummary").style.display = "none";
  $("#examRunning").style.display = "block";
  showExamCard();
}

function showExamCard() {
  const st = examState;
  if (!st || st.idx >= st.items.length) { finishExam(); return; }
  const item = st.items[st.idx];
  const tag = TOPIC_LABELS[item.topic] ? (isBn() ? TOPIC_LABELS[item.topic].bn : TOPIC_LABELS[item.topic].en) : item.topic;
  const prog = $("#examProgressLabel");
  if (prog) prog.textContent = `${st.idx + 1} / ${st.items.length}`;
  const fill = $("#examProgressFill");
  if (fill) fill.style.width = ((st.idx / st.items.length) * 100) + "%";
  $("#examCardTag").textContent = tag;
  $("#examCardQ").textContent = item.direct;
  $("#examCardA").textContent = item.indirect + (item.note ? "\n" + item.note : "");
  $("#examCardA").style.display = "none";
  $("#examActionsReveal").style.display = "flex";
  $("#examActionsGrade").style.display = "none";
}

function gradeExam(ok) {
  if (!examState) return;
  if (ok) examState.correct++;
  examState.idx++;
  showExamCard();
}

function finishExam() {
  const st = examState;
  if (!st) return;
  $("#examRunning").style.display = "none";
  $("#examSummary").style.display = "block";
  const pct = st.items.length ? Math.round((st.correct / st.items.length) * 100) : 0;
  const scoreEl = $("#examSummaryScore");
  if (scoreEl) scoreEl.textContent = pct + "%";
  const msg = $("#examSummaryMsg");
  if (msg) msg.textContent = `${st.correct} / ${st.items.length} correct`;
}

function bindNav() {
  $$("[data-view]").forEach(el => {
    if (el.dataset.logicBound) return;
    el.dataset.logicBound = "1";
    el.addEventListener("click", () => showView(el.dataset.view, el.dataset.jump));
  });
}

function refreshLangDependent() {
  if (currentView === "rules") renderRules();
  if (currentView === "bank") { setupBankFilters(); renderBank(); }
  if (currentView === "exam") setupExamPanel();
  buildCourseMap();
  updateStats();
}

document.addEventListener("DOMContentLoaded", () => {
  updateStats();
  buildCourseMap();
  setupBankFilters();
  setupSearch();
  bindNav();
  showView("home");
  ["btnEn", "btnBn"].forEach(id => {
    document.getElementById(id)?.addEventListener("click", () => {
      setTimeout(refreshLangDependent, 0);
    });
  });
});
