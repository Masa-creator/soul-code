// ===== ルナ・セラフィナ完全演出版（無料でも“有料級”） =====

// ——— 設定：制作者・紹介者だけフル解放 ———
const ACCESS_KEYS = ['LUNA-ACCESS-2025']; // 共有したい場合は追加
const REF_WHITELIST = ['masatoshi', 'seraphina']; // ?ref= で指定可

function hasFullAccess() {
  const q = new URL(location.href).searchParams;
  const full = q.get('full') === '1';
  const key = q.get('key');
  const ref = q.get('ref');
  if (!full) return false;
  if (key && ACCESS_KEYS.includes(key)) return true;
  if (ref && REF_WHITELIST.includes(ref.toLowerCase())) return true;
  return false;
}

// ——— 数秘計算（マスター & カルマ対応） ———
function digitSum(n) { return n.toString().split('').reduce((a,b)=>a+Number(b),0); }

function calcNumbers(isoDate){ // yyyy-mm-dd
  const raw = isoDate.replace(/-/g, '');
  const first = digitSum(raw); // 最初の合計（カルマ判定に使う）
  // マスター判定：11,22,33 は残す
  let lp;
  if ([11,22,33].includes(first)) {
    lp = first;
  } else {
    let tmp = first;
    while (tmp > 9) {
      tmp = digitSum(tmp);
      if ([11,22,33].includes(tmp)) break;
    }
    lp = tmp;
  }
  const karma = [13,14,16,19].includes(first) ? first : null;
  return { lifePath: lp, firstSum: first, karma };
}

// ——— ルナの語り：ライフパス／マスター／カルマ ———
const meanings = {
  1: "私は見ました、あなたの中心に燃える“起動の火”。今月は、小さくても『最初の一歩』を置くことで大波が生まれます。遠慮を一枚脱いで。",
  2: "あなたの周波数は“調和”に寄り添います。優しさは力。対話と共創が扉を開く。ペースを合わせた先に本質の出会い。",
  3: "喜びは拡声器。表現が運を呼ぶとき。アイデアを声に、色に、形に。楽しむ姿勢が磁石となって良縁を惹き寄せます。",
  4: "整える者。習慣と基盤があなたの魔法。小さな積み重ねが塔を築く。『今日の3分』で世界は変わる。",
  5: "変化を風として乗りこなす魂。旅・学び・新関係。大胆な舵切りが生命力を呼び覚ます。",
  6: "愛は仕組み。ケアを設計しよう。家と仲間に投資すると、循環の水脈が太くなる。",
  7: "静寂に光る観測者。情報の海から真実の一点を掬い取る力。デジタル断食が感性を研ぐ。",
  8: "価値に値札を。成果に見合う対価を受け取る準備を。評価・交渉・仕組み化で豊かさは現実に縫い止められる。",
  9: "完了と奉仕。手放しは新生の儀式。感謝の循環があなたの世界を拡張する。",
  11: "“直感のアンテナ”。微細なサインを拾い、まだ形のない未来を言葉にする導管。光を言語化すると奇跡が追従。",
  22: "“現実化の建築家”。非現実を現実に落とし込む才。大きな設計図を恐れず、段取りへ翻訳を。",
  33: "“慈愛の共鳴器”。温度で世界を包むリーダーシップ。関わる人の可能性を祈りで開く。"
};

const karmaNotes = {
  13: "13（カルマ）：『継続と再誕』。コツコツの先で質的転換が起きる。途中の停滞は“殻が割れる合図”。",
  14: "14（カルマ）：『節度と自由の調律』。行きすぎと不足の振れ幅を整えるほど、運は安定して伸びる。",
  16: "16（カルマ）：『価値観の刷新』。古い自我が崩れて光が差す。痛みの後に見える新景色を信じて。",
  19: "19（カルマ）：『自己超越』。自己中心から公への貢献へ。太陽的な成功は“誰かと分かち合う”ほど持続する。"
};

// ——— 有料級プレビュー：行動リスト & 今月の羅針盤 ———
function monthlyCompass(n){
  const table = {
    1: ["初動を1つ決める","肩書きを1行で書く","目標を“週1”で見直す"],
    2: ["対話の場を1つ増やす","ありがとうを3回届ける","相手の成功を手伝う"],
    3: ["1日1アウトプット","遊びの予定を入れる","色/香りを新調"],
    4: ["朝の3分ルーティン","作業環境を整頓","週次で進捗レビュー"],
    5: ["新路線の下見","未体験を1つ","固定観念を紙に書き換え"],
    6: ["家/仲間に投資","健康メンテを予約","思いやりを言語化"],
    7: ["1時間の集中帯","情報断食を試す","問いを3つ磨く"],
    8: ["数字で可視化","価格の見直し","交渉の準備"],
    9: ["何かを卒業","寄付/奉仕の小さな一歩","感謝ログをつける"],
    11:["微細サインの記録","インスピレーションの護送","映像/詩で表現"],
    22:["大構想を図に","工程表を週次化","仲間に役割を渡す"],
    33:["ケアの仕組み化","祈りの時間を日課に","関わる人の成功を祝福"]
  };
  return table[n] || table[9];
}

function renderDeepPreview(name, numbers){
  const { lifePath, firstSum, karma } = numbers;
  const lpLine = meanings[lifePath] || "あなたは独自の転換点にいます。心の奥の声を丁寧に拾って。";
  const karmaLine = karma ? karmaNotes[karma] : null;
  const compass = monthlyCompass(lifePath);
  const today = compass[0], three = compass[1], seven = compass[2];

  return `
    <div class="preview">
      <h3>【${name}さんのライフパス：${lifePath}${[11,22,33].includes(lifePath)?'（マスター）':''}】</h3>
      <p class="seraphina">${lpLine}</p>
      ${karmaLine ? `<p class="mini"><strong>カルマ示唆</strong>：${karmaLine}</p>` : ""}
      <div class="subpanel">
        <h4>今の潮流（ルナ所感）</h4>
        <p>私は感じます——あなたの周波数は今、<strong>${lifePath}</strong>のテーマに呼応しています。選ぶ言葉と小さな習慣が、次の扉の蝶番（ちょうつがい）。</p>
      </div>
      <div class="subpanel">
        <h4>行動リスト（無料版プレビュー）</h4>
        <ul class="todo">
          <li><strong>今日：</strong>${today}</li>
          <li><strong>3日以内：</strong>${three}</li>
          <li><strong>7日以内：</strong>${seven}</li>
        </ul>
      </div>
      <div class="subpanel">
        <h4>今月の羅針盤（3ポイント）</h4>
        <ol class="todo">
          ${monthlyCompass(lifePath).map(t=>`<li>${t}</li>`).join('')}
        </ol>
      </div>
    </div>
    <div class="upgrade">
      <p class="seraphina">
        「ここから先は、あなた専用の“時期と手順”まで具体化します。<br/>
        金運・恋愛・仕事・相性・3か月運勢・週次の行動設計……<br/>
        無料でこれほど響くなら、有料では“現実が動く設計図”を受け取ってください。」
      </p>
      <a class="btn primary" href="./plans.html">有料プランを見る</a>
    </div>
  `;
}

// ——— Xシェア Intent ———
function makeTweetUrl(text, url=''){ return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`; }

// ——— 画像生成（1200x630） ———
function drawShareImage({name, code, line}){
  const c = document.getElementById('shareCanvas');
  const ctx = c.getContext('2d');
  // 背景
  const g = ctx.createLinearGradient(0,0,0,c.height);
  g.addColorStop(0, '#090e25'); g.addColorStop(1, '#1a2048');
  ctx.fillStyle = g; ctx.fillRect(0,0,c.width,c.height);
  // 星
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  for(let i=0;i<260;i++){ ctx.fillRect(Math.random()*c.width, Math.random()*c.height, 1, 1); }
  // タイトル
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 54px Helvetica, Arial';
  ctx.fillText('SOUL CODE', 50, 110);
  ctx.font = '24px Helvetica, Arial';
  ctx.fillText('— ルナ・セラフィナの魂航路診断 —', 50, 150);
  // 結果
  ctx.font = 'bold 42px Helvetica, Arial';
  ctx.fillText(`${name} さんのライフパス：${code}`, 50, 240);
  ctx.font = '28px Helvetica, Arial';
  wrapText(ctx, line, 50, 290, 1100, 36);
  // フッター
  ctx.font = '22px Helvetica, Arial';
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.fillText('無料診断 → soulcode.example', 50, 600);
  return c.toDataURL('image/png');
}
function wrapText(ctx, text, x, y, maxWidth, lineHeight){
  const words = text.split(/(?<=。|、|！|？|\s)/);
  let line = '';
  for(let i=0;i<words.length;i++){
    const test = line + words[i];
    if(ctx.measureText(test).width > maxWidth){
      ctx.fillText(line, x, y); y += lineHeight; line = words[i];
    } else { line = test; }
  }
  ctx.fillText(line, x, y);
}

// ——— 初期化 ———
window.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const resultEl = document.getElementById('result');
  const shareBtn = document.getElementById('shareX');
  const dlBtn = document.getElementById('dlShare');
  const fullHint = document.getElementById('fullHint');

  if (hasFullAccess()) {
    fullHint.textContent = "フル解放モード：あなた（制作者/紹介者）は全範囲をプレビューできます。";
  }

  startBtn?.addEventListener('click', () => {
    const name = (document.getElementById('name').value || 'あなた').trim();
    const birth = document.getElementById('birth').value;
    if(!birth){ alert('生年月日を入力してください'); return; }

    const numbers = calcNumbers(birth);
    const html = renderDeepPreview(name, numbers);
    resultEl.innerHTML = html;

    // X intent リンク
    const lp = numbers.lifePath;
    const tweet = `#SOULCODE 無料診断\n${name} さんのライフパスは ${lp} でした。`;
    shareBtn.href = makeTweetUrl(tweet, location.origin);

    // 画像生成（DLボタン）
    const dataUrl = drawShareImage({ name, code: lp, line: meanings[lp] });
    dlBtn.onclick = () => {
      const a = document.createElement('a');
      a.href = dataUrl; a.download = `SOULCODE_${name}_${lp}.png`; a.click();
    };
  });
});
