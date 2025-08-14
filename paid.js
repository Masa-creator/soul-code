// 有料ページ雛形 + フル解放スイッチ
const ACCESS_KEYS = ['LUNA-ACCESS-2025'];
const REF_WHITELIST = ['masatoshi', 'seraphina'];
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
function qs(name){ return new URL(location.href).searchParams.get(name); }
const plan = (qs('plan')||'light').toLowerCase();

const blocks = {
  light: {
    title: 'Light 鑑定',
    body: `
      ● ライフパス＋マスター/カルマ概説
      ● 今月の羅針盤（3ポイント）
      ● 行動リスト（3〜5項目）
      ——
      ここに購入者固有のテキストを表示/配信します。`},
  premium: {
    title: 'Premium 鑑定',
    body: `
      ● Light全内容
      ● 3か月運勢カレンダー（週別）
      ● 金運・恋愛運・仕事運の個別分析
      ● 相性診断（1名分）
      ● 行動設計（7/21/45日プラン）`},
  platinum: {
    title: 'Platinum 鑑定',
    body: `
      ● Premium全内容
      ● 週次のチューニング（4週間）
      ● 願望成就ワーク
      ● 相性診断（無制限）
      ● メール鑑定1回`}
};

const el = document.getElementById('paidContent');
const isFull = hasFullAccess();
el.innerHTML = `
  <h2>${blocks[plan]?.title||'鑑定'}</h2>
  <pre class="paid-pre">${blocks[plan]?.body||''}</pre>
  ${isFull ? `<p class="mini">※フル解放モード：制作者/紹介者向けに全範囲が開示されています。</p>` : ''}
  <div class="cta-stack center">
    <a class="btn ghost" href="./plans.html">他のプランを見る</a>
  </div>
`;
