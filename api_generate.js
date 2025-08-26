// api/generate - Edge function (Vercel style)
export const config = { runtime: 'edge' };

function tarotSeed(name){
  const cards = ["愚者","魔術師","女教皇","女帝","皇帝","法王","恋人","戦車","力","隠者","運命の輪","正義","吊るされた男","死神","節制","悪魔","塔","星","月","太陽","審判","世界"];
  const i = Math.abs([...name].reduce((a,c)=>a+c.charCodeAt(0),0)) % cards.length;
  return cards[i];
}
function reduceToOneDigit(n){ while(n>9 && n!==11 && n!==22 && n!==33){ n = String(n).split('').map(Number).reduce((a,b)=>a+b,0) } return n }
function lifePath(iso){ if(!iso) return null; const s=iso.replace(/-/g,'').split('').map(Number).reduce((a,b)=>a+b,0); return reduceToOneDigit(s); }

export default async function handler(req){
  const { name='あなた', birth='', plan='premium', length=1500, persona='ルナ・セラフィナ（案内人）', sections=null, freeAccess=false } = await req.json();
  const lp = lifePath(birth);
  const seedTarot = tarotSeed(name);
  const system = `${persona}として、タロット先行→数秘→風水で構成。没入感と心理誘導を意識し、具体的な行動提案で締める。`;
  const user = `対象: ${name}\n生年月日: ${birth} (LP:${lp})\nプラン:${plan}\n種カード:${seedTarot}\n構成:${sections?sections.join(' / '):'単一'}\n長さ目安:${length}字`;

  const hasKey = !!process.env.OPENAI_API_KEY;
  if(!hasKey){
    const base = `${persona}です。${name}、あなたの物語をタロット「${seedTarot}」から紡ぎます。生年月日から導かれるライフパスは${lp}。`;
    const sectionText = sections ? sections.map(s=>`【${s}】\n${s}の章では、小さな習慣の変化が大きなうねりを生みます。具体的には一日5分の実践を継続してください。`).join("\n\n") : "今は焦らず、呼吸を整えて一歩ずつ。";
    const actions = "— 風水アドバイス —\n玄関を明るく、東に植物を置く、今日の色は金×白を一点。";
    let text = `${base}\n\n${sectionText}\n\n${actions}\n\n最後に：あなたは既に十分です。私は灯りを掲げる案内人に過ぎません。`;
    if(text.length < length) text = text + "\\n（続きはAI生成でさらに深掘りされます）";
    return new Response(JSON.stringify({ text }), { headers:{'Content-Type':'application/json'} });
  }

  try{
    const prompt = [
      {role:"system", content: system},
      {role:"user", content: user}
    ];
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method:"POST",
      headers:{ "Content-Type":"application/json", "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({ model:"gpt-4o-mini", messages: prompt, temperature:0.85, max_tokens: Math.min(6000, Math.ceil(length*3)) })
    });
    const j = await resp.json();
    const text = j?.choices?.[0]?.message?.content || "(生成に失敗しました)";
    return new Response(JSON.stringify({ text }), { headers:{'Content-Type':'application/json'} });
  }catch(e){
    const text = `（生成に失敗しました）\\n${persona}より：今は静けさの中で、整えを。`;
    return new Response(JSON.stringify({ text }), { headers:{'Content-Type':'application/json'} });
  }
}
