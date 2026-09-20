const RULES = [
  {id:"fundamentals", en_title:"1. Fundamentals of Narration", bn_title:"১. উক্তির মূল ধারণা",
   html_en:`<div class="rule-card"><h3>Direct vs Indirect Speech</h3>
<p><b>Direct Speech</b> quotes exact words in quotation marks.</p>
<div class="example"><span class="d">Ram says, "Anil will come."</span></div>
<p><b>Indirect Speech</b> reports the meaning without exact words.</p>
<div class="example"><span class="i">Ram says that Anil will come.</span></div>
<ul><li>Remove quotation marks</li><li>Add that/if/whether/to</li><li>Change pronouns, tense (if reporting verb is past), time/place words</li></ul></div>`,
   html_bn:`<div class="rule-card"><h3 class="bn">প্রত্যক্ষ বনাম পরোক্ষ উক্তি</h3>
<p class="bn"><b>প্রত্যক্ষ</b>-এ হুবহু কথা উদ্ধৃতি চিহ্নে। <b>পরোক্ষ</b>-এ শুধু অর্থ।</p></div>`},
  {id:"assertive", en_title:"2. Assertive Sentences", bn_title:"২. বিবৃতিমূলক বাক্য",
   html_en:`<div class="rule-card"><h3>Basic rule</h3>
<p>Use <b>that</b>. Present/future reporting verb → no tense change. Past reporting verb → backshift tense.</p>
<table class="rule-table"><tr><th>Direct</th><th>Indirect</th></tr>
<tr><td>Simple Present</td><td>Simple Past</td></tr><tr><td>Present Continuous</td><td>Past Continuous</td></tr>
<tr><td>Present Perfect</td><td>Past Perfect</td></tr><tr><td>will/shall</td><td>would/should</td></tr>
<tr><td>can/may</td><td>could/might</td></tr></table>
<p>Exceptions: universal truths, habits keep present tense.</p></div>`,
   html_bn:`<div class="rule-card"><h3 class="bn">মূল নিয়ম</h3><p class="bn">that ব্যবহার করো। reporting verb past হলে tense এক ধাপ পেছোয়।</p></div>`},
  {id:"interrogative", en_title:"3. Interrogative Sentences", bn_title:"৩. প্রশ্নবাচক বাক্য",
   html_en:`<div class="rule-card"><h3>Yes/No & Wh- questions</h3>
<p>Yes/No → <b>if/whether</b>. Wh- → keep who/what/where. Use statement word order. Reporting verb: asked.</p>
<div class="example"><span class="d">He said, "Are you ready?"</span><span class="arrow">→</span><span class="i">He asked if I was ready.</span></div></div>`,
   html_bn:`<div class="rule-card"><h3 class="bn">প্রশ্ন</h3><p class="bn">হ্যাঁ/না → if/whether। Wh- → শব্দ রাখো। asked ব্যবহার করো।</p></div>`},
  {id:"tags", en_title:"4. Question Tags", bn_title:"৪. প্রশ্ন-ট্যাগ",
   html_en:`<div class="rule-card"><h3>Question tags</h3><p>Report as yes/no with if/whether, or as a statement seeking confirmation.</p></div>`,
   html_bn:`<div class="rule-card"><h3 class="bn">প্রশ্ন-ট্যাগ</h3><p class="bn">if/whether দিয়ে রিপোর্ট করো।</p></div>`},
  {id:"imperative", en_title:"5. Imperatives & Let", bn_title:"৫. অনুজ্ঞাসূচক ও লেট",
   html_en:`<div class="rule-card"><h3>Commands & requests</h3>
<p>Use <b>to + verb</b>. ordered/requested/advised/told/forbade. Negative: not to / forbade.</p>
<div class="example"><span class="d">He said, "Sit down."</span><span class="arrow">→</span><span class="i">He ordered me to sit down.</span></div>
<p>Let us → suggested that we should…</p></div>`,
   html_bn:`<div class="rule-card"><h3 class="bn">অনুজ্ঞা</h3><p class="bn">to + verb। ordered/requested ইত্যাদি।</p></div>`},
  {id:"modals", en_title:"6. Modal Verbs", bn_title:"৬. মোডাল ক্রিয়া",
   html_en:`<div class="rule-card"><h3>Modal changes</h3>
<p>can→could, may→might, will/shall→would/should, must→had to/must. could/would/might/should often unchanged.</p></div>`,
   html_bn:`<div class="rule-card"><h3 class="bn">মোডাল</h3><p class="bn">can→could, may→might, will→would।</p></div>`},
  {id:"optative", en_title:"7. Optative & Exclamatory", bn_title:"৭. ইচ্ছা ও উল্লাসসূচক",
   html_en:`<div class="rule-card"><h3>Wish & exclamation</h3>
<p>wished/prayed + might. exclaimed with joy/sorrow/wonder → statement.</p>
<div class="example"><span class="d">He said, "May you succeed."</span><span class="arrow">→</span><span class="i">He wished that I might succeed.</span></div></div>`,
   html_bn:`<div class="rule-card"><h3 class="bn">ইচ্ছা/উল্লাস</h3><p class="bn">wished/exclaimed ব্যবহার করো।</p></div>`},
  {id:"timeplace", en_title:"8. Time & Place Words", bn_title:"৮. কাল ও স্থানশব্দ",
   html_en:`<div class="rule-card"><h3>Common changes</h3>
<table class="rule-table"><tr><th>Direct</th><th>Indirect</th></tr>
<tr><td>now</td><td>then</td></tr><tr><td>today</td><td>that day</td></tr>
<tr><td>yesterday</td><td>the previous day</td></tr><tr><td>tomorrow</td><td>the next day</td></tr>
<tr><td>here</td><td>there</td></tr><tr><td>this/these</td><td>that/those</td></tr></table></div>`,
   html_bn:`<div class="rule-card"><h3 class="bn">কাল ও স্থান</h3><p class="bn">now→then, today→that day, yesterday→the previous day, here→there।</p></div>`},
  {id:"misc", en_title:"9. Dialogues & Summaries", bn_title:"৯. কথোপকথন ও সারসংক্ষেপ",
   html_en:`<div class="rule-card"><h3>Dialogue & summary</h3><p>Report each turn with said/asked/replied. Summary captures main ideas with tense/pronoun rules.</p></div>`,
   html_bn:`<div class="rule-card"><h3 class="bn">কথোপকথন</h3><p class="bn">প্রতিটি বক্তার কথা উপযুক্ত verb দিয়ে রিপোর্ট করো।</p></div>`}
];
