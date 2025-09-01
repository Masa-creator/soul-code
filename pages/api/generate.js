export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  try{
    const { tier, name, birth, tarotSpread, freeText } = req.body || {};
    if(!tier || !name || !birth) return res.status(400).json({ error: 'missing fields' });

    const apiKey = process.env.OPENAI_API_KEY;
    if(!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY not set' });

    const char = 'あなたはルナ・セラフィナ。優しく神秘的だが、実用的な行動提案を出す案内人。';
    const maxLen = tier === 'light' ? 1000 : tier === 'premium' ? 1500 : 2000;
    const tarotText = Array.isArray(tarotSpread) && tarotSpread.length ? tarotSpread.join(' / ') : 'お任せで展開';
    const userPrompt = `依頼者: ${name}\n生年月日: ${birth}\nプラン: ${tier}\nタロット: ${tarotText}\n要点: ${freeText}\n出力目安: 約${maxLen}字。`;
    const body = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: char },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.9,
      max_tokens: 2000
    };
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify(body)
    });
    const j = await r.json();
    if(!r.ok) return res.status(500).json({ error: 'AI error', detail: j });
    const text = j.choices?.[0]?.message?.content || '';
    res.status(200).json({ text });
  }catch(e){
    console.error(e);
    res.status(500).json({ error: String(e) });
  }
}
