/* =========================================================
   DATA — Rules (9 sections)
========================================================= */
const RULES = [
  {
    id: "fundamentals",
    en_title: "1. Fundamentals of Narration",
    bn_title: "১. উক্তির মূল ধারণা",
    html_en: `
  <div class="rule-card">
    <h3>Direct vs Indirect Speech</h3>
    <p><b>Direct Speech</b> quotes the exact words spoken, enclosed in quotation marks.</p>
    <div class="example"><span class="d">Ram says, "Anil will come."</span></div>
    <p><b>Indirect (Reported) Speech</b> reports the substance of what was said, without the exact words.</p>
    <div class="example"><span class="i">Ram says that Anil will come.</span></div>
    <ul>
      <li><b>Reported Speech</b> — the part inside quotation marks (e.g. "Anil will come").</li>
      <li><b>Reporting Verb</b> — the verb introducing the report (e.g. <i>says</i>, <i>told</i>, <i>asked</i>).</li>
    </ul>
  </div>
  <div class="rule-card">
    <h3>What changes when we convert?</h3>
    <ul>
      <li>Quotation marks are removed.</li>
      <li>A conjunction (<b>that / if / whether / to</b>) is often added.</li>
      <li>Pronouns change according to the speaker and listener.</li>
      <li>Tense often shifts back one step when the reporting verb is past.</li>
      <li>Time and place words may change (today → that day, here → there).</li>
    </ul>
  </div>`,
    html_bn: `
  <div class="rule-card">
    <h3 class="bn">প্রত্যক্ষ বনাম পরোক্ষ উক্তি</h3>
    <p class="bn"><b>প্রত্যক্ষ উক্তি</b> হুবহু কথা উদ্ধৃতি চিহ্নে রাখে। <b>পরোক্ষ উক্তি</b> শুধু অর্থ প্রকাশ করে।</p>
    <div class="example"><span class="d">Ram says, "Anil will come."</span></div>
    <div class="example"><span class="i">Ram says that Anil will come.</span></div>
  </div>`
  },
  {
    id: "assertive",
    en_title: "2. Assertive Sentences",
    bn_title: "২. বিবৃতিমূলক বাক্য",
    html_en: `
  <div class="rule-card">
    <h3>Basic rule</h3>
    <p>Use <b>that</b>. If the reporting verb is present/future, tense usually does not change. If past, backshift tense one step.</p>
    <table class="rule-table">
      <tr><th>Direct</th><th>Indirect</th></tr>
      <tr><td>Simple Present</td><td>Simple Past</td></tr>
      <tr><td>Present Continuous</td><td>Past Continuous</td></tr>
      <tr><td>Present Perfect</td><td>Past Perfect</td></tr>
      <tr><td>will / shall</td><td>would / should</td></tr>
      <tr><td>can / may</td><td>could / might</td></tr>
    </table>
    <p>Exceptions: universal truths and habitual facts often keep present tense.</p>
  </div>`,
    html_bn: `
  <div class="rule-card">
    <h3 class="bn">মূল নিয়ম</h3>
    <p class="bn"><b>that</b> ব্যবহার করো। reporting verb past হলে tense এক ধাপ পেছোয়। সার্বজনীন সত্যে present রাখা যায়।</p>
  </div>`
  },
  {
    id: "interrogative",
    en_title: "3. Interrogative Sentences",
    bn_title: "৩. প্রশ্নবাচক বাক্য",
    html_en: `
  <div class="rule-card">
    <h3>Yes/No and Wh- questions</h3>
    <p>Yes/No → <b>if / whether</b>. Wh- → keep who/what/where/when/why/how. Use statement word order. Reporting verb is usually <b>asked</b>.</p>
    <div class="example"><span class="d">He said, "Are you ready?"</span><span class="arrow">→</span><span class="i">He asked if I was ready.</span></div>
    <div class="example"><span class="d">She said, "Where do you live?"</span><span class="arrow">→</span><span class="i">She asked where I lived.</span></div>
  </div>`,
    html_bn: `
  <div class="rule-card">
    <h3 class="bn">হ্যাঁ/না ও Wh- প্রশ্ন</h3>
    <p class="bn">হ্যাঁ/না → if/whether। Wh- শব্দ রাখো। word order বিবৃতির মতো। asked ব্যবহার করো।</p>
  </div>`
  },
  {
    id: "tags",
    en_title: "4. Question Tags",
    bn_title: "৪. প্রশ্ন-ট্যাগ",
    html_en: `
  <div class="rule-card">
    <h3>Question tags</h3>
    <p>Report as a yes/no question with if/whether, or as a statement seeking confirmation.</p>
    <div class="example"><span class="d">You are coming, aren't you?</span><span class="arrow">→</span><span class="i">He asked if I was coming.</span></div>
  </div>`,
    html_bn: `
  <div class="rule-card">
    <h3 class="bn">প্রশ্ন-ট্যাগ</h3>
    <p class="bn">if/whether দিয়ে রিপোর্ট করো অথবা নিশ্চিতকরণমূলক বিবৃতি হিসেবে।</p>
  </div>`
  },
  {
    id: "imperative",
    en_title: "5. Imperatives & Let",
    bn_title: "৫. অনুজ্ঞাসূচক ও লেট",
    html_en: `
  <div class="rule-card">
    <h3>Commands and requests</h3>
    <p>Use <b>to + verb</b>. Common verbs: ordered, requested, advised, told, forbade. Negative: <b>not to</b> or forbade.</p>
    <div class="example"><span class="d">He said, "Sit down."</span><span class="arrow">→</span><span class="i">He ordered me to sit down.</span></div>
    <p>Let us → suggested that we should…</p>
  </div>`,
    html_bn: `
  <div class="rule-card">
    <h3 class="bn">অনুজ্ঞা ও অনুরোধ</h3>
    <p class="bn">to + verb। ordered/requested/advised/told/forbade। নেতিবাচক: not to।</p>
  </div>`
  },
  {
    id: "modals",
    en_title: "6. Modal Verbs",
    bn_title: "৬. মোডাল ক্রিয়া",
    html_en: `
  <div class="rule-card">
    <h3>Modal changes</h3>
    <p>can→could, may→might, will/shall→would/should, must→had to (or keep must). could/would/might/should often remain unchanged.</p>
  </div>`,
    html_bn: `
  <div class="rule-card">
    <h3 class="bn">মোডাল পরিবর্তন</h3>
    <p class="bn">can→could, may→might, will→would, must→had to।</p>
  </div>`
  },
  {
    id: "optative",
    en_title: "7. Optative & Exclamatory",
    bn_title: "৭. ইচ্ছা ও উল্লাসসূচক",
    html_en: `
  <div class="rule-card">
    <h3>Wish and exclamation</h3>
    <p>wished/prayed + might. exclaimed with joy/sorrow/wonder → convert to statement.</p>
    <div class="example"><span class="d">He said, "May you succeed."</span><span class="arrow">→</span><span class="i">He wished that I might succeed.</span></div>
  </div>`,
    html_bn: `
  <div class="rule-card">
    <h3 class="bn">ইচ্ছা ও উল্লাস</h3>
    <p class="bn">wished/prayed + might। exclaimed with joy/sorrow ব্যবহার করো।</p>
  </div>`
  },
  {
    id: "timeplace",
    en_title: "8. Time & Place Words",
    bn_title: "৮. কাল ও স্থানশব্দ",
    html_en: `
  <div class="rule-card">
    <h3>Common changes</h3>
    <table class="rule-table">
      <tr><th>Direct</th><th>Indirect</th></tr>
      <tr><td>now</td><td>then</td></tr>
      <tr><td>today</td><td>that day</td></tr>
      <tr><td>yesterday</td><td>the previous day / the day before</td></tr>
      <tr><td>tomorrow</td><td>the next day / the following day</td></tr>
      <tr><td>here</td><td>there</td></tr>
      <tr><td>this / these</td><td>that / those</td></tr>
    </table>
  </div>`,
    html_bn: `
  <div class="rule-card">
    <h3 class="bn">কাল ও স্থান</h3>
    <p class="bn">now→then, today→that day, yesterday→the previous day, tomorrow→the next day, here→there, this→that।</p>
  </div>`
  },
  {
    id: "misc",
    en_title: "9. Dialogues & Summaries",
    bn_title: "৯. কথোপকথন ও সারসংক্ষেপ",
    html_en: `
  <div class="rule-card">
    <h3>Dialogue and summary</h3>
    <p>Report each speaker’s turn with said/asked/replied. A summary captures the main ideas while applying the usual tense and pronoun rules.</p>
  </div>`,
    html_bn: `
  <div class="rule-card">
    <h3 class="bn">কথোপকথন ও সারসংক্ষেপ</h3>
    <p class="bn">প্রতিটি বক্তার কথা উপযুক্ত verb দিয়ে রিপোর্ট করো। সারসংক্ষেপে মূল ভাব ও নিয়ম প্রয়োগ করো।</p>
  </div>`
  }
];
