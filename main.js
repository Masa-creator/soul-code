
document.getElementById('diagnosis-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const birthdate = document.getElementById('birthdate').value;
  const tarot = document.getElementById('tarot').value;

  let resultText = `—— ルナ・セラフィナより ——\n`;
  resultText += `${name}さん、あなたのためにタロットを一枚引きました。\n`;
  resultText += `結果は「太陽（逆位置）」です。過信を控え、基盤を整える時期です。\n`;
  resultText += `生年月日から導かれるライフパスは「11」。霊感と直観の象徴です。\n`;
  resultText += `カルマには課題もありますが、風水的には南に光を取り入れると良いでしょう。\n\n`;
  resultText += `—— ここまでは無料診断です。続きは有料版でさらに詳細に、\nタロット複数展開・数秘の深層・風水の運気改善までお伝えします ——`;

  document.getElementById('result').innerText = resultText;
});

document.getElementById('paid-btn').addEventListener('click', function() {
  alert("有料版では1000/1500/2000字の詳細レポートを体験できます。");
});
