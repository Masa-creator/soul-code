function qs(k){return new URLSearchParams(location.search).get(k)}const unlocked=qs("unlock")==="1"||localStorage.getItem("SOULCODE_UNLOCK")==="1";const plan=(qs("plan")||"light").toLowerCase();function block(t){return t.trim()}
const TEXT={light:block(`— ルナ・セラフィナより —
あなたの歩幅に合わせて、今日からすぐに動かせる指針を私が手渡します。無料版の続きとして、金運・恋愛・仕事の「いま最優先すべき一点」を300字ほどで。
心理トリガー（確証バイアスの反転・コミットメント・スモールステップ）を組み込み、迷いをやさしく一つ解いていきます。`),
premium:block(`— ルナ・セラフィナより —
扉の音がします。ここからは800字前後で、あなたの強みと盲点を立体的に描き、行動が自然と起こる順序に並べ替えます。
数秘（ライフパス＋ハート＋気質バランス）、タロットの象徴、住空間の整え（風水の最小手数）を一本の糸に束ね、
「この一週間で何をするか」まで具体化。読み終える頃には、あなた自身が“もう動き出していた”と気づくはず。`),
platinum:block(`— ルナ・セラフィナより —
【三部構成：過去→現在→未来／約1500字】
第一章〈過去〉：あなたの歩みの中で何が成熟し、何が殻になったのか。繰り返すパターンにそっと灯りを当て、労りとともに手放しの儀式を。
第二章〈現在〉：強み・資源・人脈・時流を重ね、レバレッジの効く一点にフォーカス。行動計画は週次・日次に翻訳。
第三章〈未来〉：望む景色を現実へ。約束の言葉とともに、あなたに相応しい道がひらけます。`)};
function render(plan){const paid=document.getElementById("paidContent");const title=plan==="light"?"Light 鑑定":plan==="premium"?"Premium 鑑定":"Platinum 鑑定";let guard="";if(!unlocked){guard="\n\n※ このページはデモ表示です。紹介コード（SOULCODE.creator など）でアンロックすると全文を閲覧できます。"}paid.textContent=`【${title}】\n`+TEXT[plan]+guard}
render(plan);
