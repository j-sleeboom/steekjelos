// ============================================
//  Brei Hulp – Garndichtheid calculator
// ============================================

function calculateGauge() {
  const stitchesPer10 = parseFloat(document.getElementById('stitchesPer10').value);
  const rowsPer10     = parseFloat(document.getElementById('rowsPer10').value);
  const targetW       = parseFloat(document.getElementById('targetWidth').value);
  const targetH       = parseFloat(document.getElementById('targetHeight').value);
  const err           = document.getElementById('gaugeErr');
  const result        = document.getElementById('gaugeResult');

  err.classList.remove('visible');
  result.classList.remove('visible');

  if (!stitchesPer10 || !rowsPer10) {
    showError('⚠️ Vul het proeflapje in (steken én rijen per 10 cm).'); return;
  }
  if (!targetW && !targetH) {
    showError('⚠️ Vul minimaal één doelmaat in (breedte of hoogte).'); return;
  }

  const stitchesPerCm = stitchesPer10 / 10;
  const rowsPerCm     = rowsPer10 / 10;

  const resultStitches = targetW ? Math.round(targetW * stitchesPerCm) : null;
  const resultRows     = targetH ? Math.round(targetH * rowsPerCm)     : null;

  // Toon resultaat
  document.getElementById('resStitches').textContent = resultStitches !== null ? resultStitches : '–';
  document.getElementById('resRows').textContent     = resultRows     !== null ? resultRows     : '–';
  document.getElementById('resWidth').textContent    = targetW ? targetW + ' cm' : '–';
  document.getElementById('resHeight').textContent   = targetH ? targetH + ' cm' : '–';

  // Dichtheid samenvatting
  document.getElementById('densityStitches').textContent = stitchesPerCm.toFixed(2);
  document.getElementById('densityRows').textContent     = rowsPerCm.toFixed(2);

  result.classList.add('visible');
  result.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Vul de calculator-velden alvast in als de gebruiker wil doorgaan
  document.getElementById('prefillNotice').style.display = resultStitches ? 'flex' : 'none';
  document.getElementById('prefillStitches').textContent = resultStitches;
  document.getElementById('prefillRows').textContent     = resultRows !== null ? resultRows : '?';

  function showError(msg) {
    err.textContent = msg;
    err.classList.add('visible');
  }
}

function goToCalculator() {
  const stitches = document.getElementById('resStitches').textContent;
  const rows     = document.getElementById('resRows').textContent;
  // Sla op in sessionStorage zodat de calculator-pagina het kan inlezen
  if (stitches !== '–') sessionStorage.setItem('prefill_start', stitches);
  if (rows     !== '–') sessionStorage.setItem('prefill_rows',  rows);
  window.location.href = '/steekjelos/calculator/';
}

// Enter-toets
document.addEventListener('keydown', e => { if (e.key === 'Enter') calculateGauge(); });
