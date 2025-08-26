// main.js - free fixed text logic + UI
function reduceToOneDigit(n){ while(n>9 && n!==11 && n!==22 && n!==33){ n = n.toString().split('').reduce((a,b)=>a+Number(b),0); } return n; }
function lifePath(date){ if(!date) return null; const s = date.replace(/-/g,'').split('').map(Number).reduce((a,b)=>a+b,0); return reduceToOneDigit(s); }

function randomChoice(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
const TAROT = [
  {name:"愚者",upright:"新たな旅立ちと可能性。自由さが追い風です。",reversed:"不用意な飛躍。基盤を整えてから動くと良い。"},
  {name:"魔術師",upright:"意思と創造の力。現実化の兆し。",reversed:"エネルギーの散漫。焦点を一つに。"},
  {name:"女教皇",upright:"直感と静けさ。内なる声が導く。",reversed:"過度の迷い。短い瞑想で整える。"},
  {name:"星",upright:"希望と癒し。再起の光が見える。",reversed:"期待の空回り。小さな確かさを積む時。"},
  {name:"太陽",upright:"成功と祝福。明るさを信じて進む。",reversed:"過信に注意。基礎を見直すと調和。"}
];

const LP_LABEL = {1:"起点/独立/創造",2:"調和/受容/共鳴",3:"表現/喜び/拡張",4:"基盤/秩序/継続",5:"変化/自由/旅",6:"愛/奉仕/育み",7:"探求/洞察/静けさ",8:"成功/報酬/現実化",9:"完成/手放し/奉仕",11:"霊感/ビジョン",22:"現実創造の巨匠",33:"無条件の奉仕"};

function fengShuiTip(lp){ const tips = {
  1:"東に朝日を取り入れ、赤系を一点。開始エネルギーを増幅。",
  2:"西南を整え、クリーム色と丸い器。縁を温める。",
  3:"東南に観葉植物と音。表現力が育つ。",
  4:"北東を清め、木目調で習慣を固める。",
  5:"西に旅の写真と黄色アクセント。変化を後押し。",
  6:"北西を丁寧に整え、支援運を呼ぶ白×金の小物。",
  7:"北の水辺を整え、静かな青で洞察を深める。",
  8:"南西に土色を配し重厚感を。成果が結実。",
  9:"南に灯りを置き、紫を一点。締めくくりの整え。"
}; return tips[lp] || tips[reduceToOneDigit(lp||0)] || "南に灯りを。今日の主役はあなた。"; }

function drawShareImage({name,headline,line}){
  const c = document.getElementById('shareCanvas'); const ctx = c.getContext('2d'); const W=c.width,H=c.height;
  const g = ctx.createLinearGradient(0,0,0,H); g.addColorStop(0,'#0a0f2a'); g.addColorStop(1,'#1a1f3f'); ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  ctx.fillStyle='rgba(255,255,255,.9)'; for(let i=0;i<180;i++) ctx.fillRect(Math.random()*W,Math.random()*H,1,1);
  ctx.fillStyle='#fff'; ctx.font='bold 48px "Cinzel Decorative", serif'; ctx.fillText('SOUL CODE',50,90);
  ctx.font='22px Inter, Arial'; ctx.fillText(headline,50,140); ctx.font='28px Inter, Arial'; wrapText(ctx,line,50,190,1100,34);
  ctx.font='18px Inter, Arial'; ctx.fillText('無料診断 → soulcode.site',50,580);
  return c.toDataURL('image/png');
}
function wrapText(ctx,text,x,y,maxWidth,lineHeight){ const words=text.split(/\\s|、|。/).filter(Boolean); let line=''; for(let i=0;i<words.length;i++){ const test=line+words[i]+' '; if(ctx.measureText(test).width>maxWidth){ ctx.fillText(line,x,y); y+=lineHeight; line=words[i]+' '; } else { line=test; } } if(line) ctx.fillText(line,x,y); }

function composeFreeMessage({name,birth,mode}){
  const lp = lifePath(birth); const tarot = (()=>{ const c=randomChoice(TAROT); const rev = (mode==='reversed') || (mode==='auto' && Math.random()<0.4); return {name:c.name,pos:rev?'逆位置':'正位置',msg:rev?c.reversed:c.upright}; })();
  const lpLabel = LP_LABEL[lp]||'可能性'; const tip = fengShuiTip(lp);
  const lines = [
    `—— ルナ・セラフィナより。${name}、私はあなたのために一枚引きました。結果は「${tarot.name}（${tarot.pos}）」。${tarot.msg}`,
    `生年月日から導かれるライフパスは【${lp}】。キーワードは〈${lpLabel}〉。この周期はあなたの根幹を照らし、素直に資質を活かすほど恩恵が深まります。`,
    `カルマの傾向は、いくつかの課題が影に潜むかもしれません。しかし小さな意識の切替で道は拓けます。`,
    `日常への落とし込みとして、風水の一手を。${tip}`,
    `ここまで無料の導きとして受け取ってください。有料版ではタロットを複数枚展開し、数秘はマスター/周期まで深掘り、あなた専用の30/90日行動計画を言葉にしてお渡しします。`
  ];
  return lines.join("\\n\\n");
}

const REF_OK = ['SOULCODE.creator'];

function makeTweetUrl(text,url=''){ const t=encodeURIComponent(text); const u=encodeURIComponent(url); return `https://twitter.com/intent/tweet?text=${t}&url=${u}`; }

window.addEventListener('DOMContentLoaded',()=>{
  const startBtn=document.getElementById('startBtn'); const res=document.getElementById('result'); const ctas=document.getElementById('afterCta'); const shareBtn=document.getElementById('shareX'); const dlBtn=document.getElementById('dlShare'); const paidBtn=document.getElementById('paidBtn');
  startBtn?.addEventListener('click',()=>{
    const name=(document.getElementById('name').value||'あなた').trim(); const birth=document.getElementById('birth').value; const mode=document.getElementById('tarotMode').value; const ref=(document.getElementById('ref').value||'').trim();
    if(!birth){ alert('生年月日を入力してください'); return; }
    const txt = composeFreeMessage({name,birth,mode});
    res.textContent = txt; ctas.style.display = '';
    if(REF_OK.includes(ref)){ paidBtn.textContent='（紹介）有料を閲覧'; paidBtn.href = `./paid.html?plan=premium&token=freepass&name=${encodeURIComponent(name)}&birth=${encodeURIComponent(birth)}`; }
    const lp = lifePath(birth);
    const headline = `タロット×数秘：ライフパス${lp}`;
    const dataUrl = drawShareImage({name,headline,line:'今日の導きを受け取りました。 #SOULCODE'});
    dlBtn.onclick = ()=>{ const a=document.createElement('a'); a.href=dataUrl; a.download = `SOULCODE_${name}.png`; a.click(); };
    const tweet = `#SOULCODE 無料診断\\n${name}のライフパスは ${lp}。タロットの導きが響いた…`;
    shareBtn.href = makeTweetUrl(tweet, location.origin);
  });
});
