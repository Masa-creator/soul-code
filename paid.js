// paid.js - calls /api/generate to get AI-generated long report
function qs(name){ return new URL(location.href).searchParams.get(name); }
const plan = (qs('plan')||'premium').toLowerCase();
const token = qs('token')||'';
const uname = qs('name')||'あなた';
const birth = qs('birth')||'';
const lengths = { light:1000, premium:1500, platinum:2000 };
const pickLen = lengths[plan] || 1500;

async function loadReport(){
  const el = document.getElementById('paidContent');
  el.textContent = 'レポートを編集中…（数十秒かかる場合があります）';
  try{
    const r = await fetch('/api/generate', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ name: uname, birth, plan, length: pickLen, tarotFirst:true, persona:'ルナ・セラフィナ（案内人）', sections: plan==='platinum'? ['過去','現在','未来']: null, freeAccess: token==='freepass' })
    });
    const data = await r.json();
    if(data?.text){ el.textContent = data.text; } else { throw new Error('生成失敗'); }
  }catch(e){
    el.textContent = '（生成に失敗しました）\\n—— ルナ・セラフィナより ——\\n今は静けさの中で、少し整えてからもう一度。';
  }
}

window.addEventListener('DOMContentLoaded', loadReport);
