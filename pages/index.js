import { useState } from 'react';

const PLANS = {
  light: { label: 'Light (¥1,480)', amount: 1480, tarot: 2, len: 1000 },
  premium: { label: 'Premium (¥2,980)', amount: 2980, tarot: 3, len: 1500 },
  platinum: { label: 'Platinum (¥4,980)', amount: 4980, tarot: 5, len: 2000 }
};

export default function Home(){
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [freeText, setFreeText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const freePreview = () => {
    if(!name || !birth) return '名前と生年月日を入力してください。';
    return `—— ルナ・セラフィナより —\n${name}さん、あなたの無料プレビューです。ここでは序章だけをお届けします（約500字相当）。有料版はタロット複数展開＋数秘の深掘り＋風水の具体処方を含みます。`;
  };

  async function purchaseAndGenerate(tier){
    try{
      setLoading(true);
      setResult('処理中...');

      // 1) create PayPal order
      const create = await fetch('/api/paypal', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ amount: PLANS[tier].amount, description: `SOUL CODE ${tier}` })
      });
      const createJson = await create.json();
      if(!createJson.id) throw new Error('注文作成に失敗しました。');

      // 2) capture order (server-side capture simplified for demo)
      const cap = await fetch('/api/paypal', {
        method:'PUT', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ orderId: createJson.id })
      });
      const capJson = await cap.json();
      if(!capJson.capture) throw new Error('決済キャプチャに失敗しました。');

      // 3) call generate
      const gen = await fetch('/api/generate', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ tier, name, birth, tarotSpread: [], freeText })
      });
      const genJson = await gen.json();
      if(genJson.error) throw new Error(genJson.error);
      setResult(genJson.text || '生成された結果が空です。');
    }catch(e){
      setResult('エラー: ' + (e.message || e));
    }finally{
      setLoading(false);
    }
  }

  return (
    <div style={{padding:20, fontFamily:'Arial, sans-serif', color:'#fff', background:'#071027', minHeight:'100vh'}}>
      <header style={{textAlign:'center', padding:30}}>
        <h1 style={{fontFamily:'Cinzel Decorative, serif', fontSize:44, margin:0}}>SOUL CODE</h1>
        <p style={{margin:6}}>数秘術 × タロット × 風水で導く 魂の本質診断</p>
      </header>

      <main style={{maxWidth:900, margin:'0 auto'}}>
        <section style={{background:'rgba(255,255,255,0.03)', padding:20, borderRadius:12}}>
          <h2>無料プレビュー</h2>
          <label>名前（例: Hanako Sato）</label>
          <input value={name} onChange={e=>setName(e.target.value)} style={{width:'100%', padding:10, borderRadius:8}} placeholder="Hanako Sato" />
          <label>生年月日</label>
          <input type="date" value={birth} onChange={e=>setBirth(e.target.value)} style={{width:'100%', padding:10, borderRadius:8}} />
          <label>気になること（任意）</label>
          <input value={freeText} onChange={e=>setFreeText(e.target.value)} style={{width:'100%', padding:10, borderRadius:8}} placeholder="仕事・恋愛・運勢など" />
          <div style={{marginTop:12}}>
            <button onClick={()=>setResult(freePreview())} style={{padding:12, borderRadius:8, background:'#c8a86a', border:'none'}}>無料プレビュー</button>
          </div>
        </section>

        <section style={{marginTop:18, background:'rgba(255,255,255,0.03)', padding:20, borderRadius:12}}>
          <h2>有料プラン（AI生成）</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:12}}>
            {Object.entries(PLANS).map(([k,p])=> (
              <div key={k} style={{background:'#071833', padding:14, borderRadius:10}}>
                <strong style={{display:'block'}}>{p.label}</strong>
                <ul>
                  <li>タロット {p.tarot}枚展開</li>
                  <li>数秘（ライフパス ＋ マスター/カルマ）</li>
                  <li>{p.len}字程度の鑑定</li>
                </ul>
                <button disabled={loading || !name || !birth} onClick={()=>purchaseAndGenerate(k)} style={{padding:10, borderRadius:8, background:'#ffd77a', border:'none'}}>購入して生成</button>
              </div>
            ))}
          </div>
        </section>

        <section style={{marginTop:18, background:'rgba(255,255,255,0.03)', padding:20, borderRadius:12}}>
          <h2>鑑定結果</h2>
          <pre style={{whiteSpace:'pre-wrap', fontFamily:'inherit'}}>{result}</pre>
        </section>
      </main>

      <footer style={{textAlign:'center', padding:30, color:'#9aa0a6'}}>© SOUL CODE</footer>
    </div>
  );
}
