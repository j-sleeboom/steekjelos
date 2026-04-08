// ============================================
//  Brei Hulp – Steken minderen calculator
// ============================================

function calculate() {
  const start    = parseInt(document.getElementById('startSt').value);
  const end      = parseInt(document.getElementById('endSt').value);
  const rows     = parseInt(document.getElementById('totalRows').value);
  const decAmt   = parseInt(document.getElementById('decreaseAmt').value);
  const err      = document.getElementById('errMsg');
  const result   = document.getElementById('result');

  err.classList.remove('visible');
  result.classList.remove('visible');

  // Validatie
  if (!start || !end || !rows || !decAmt) {
    showError('⚠️ Vul alle velden in.'); return;
  }
  if (end >= start) {
    showError('⚠️ Het eindaantal steken moet kleiner zijn dan het beginaantal.'); return;
  }
  if (decAmt < 1) {
    showError('⚠️ Je moet minstens 1 steek per keer minderen.'); return;
  }

  const totalToDecrease = start - end;

  if (totalToDecrease % decAmt !== 0) {
    const possible = Math.floor(totalToDecrease / decAmt);
    showError(`⚠️ Je kunt ${totalToDecrease} steken niet precies delen door ${decAmt}. Pas je begin- of eindaantal aan. (Optie: ${possible * decAmt} steken minderen → eindstand ${start - possible * decAmt})`);
    return;
  }

  const numDecreaseRows = totalToDecrease / decAmt;

  if (numDecreaseRows > rows) {
    showError(`⚠️ Je hebt ${numDecreaseRows} minderrijen nodig, maar slechts ${rows} rijen. Vergroot het totaal aantal rijen of verklein het aantal te minderen steken.`);
    return;
  }

  // Verdeel minderrijen zo gelijkmatig mogelijk
  const interval = rows / numDecreaseRows;
  const decreaseAt = new Set();
  for (let i = 0; i < numDecreaseRows; i++) {
    const rowNum = Math.round((i + 0.5) * interval);
    decreaseAt.add(Math.min(rowNum, rows));
  }
  // Vul aan bij afrondingsconflicten
  let ri = 1;
  while (decreaseAt.size < numDecreaseRows) {
    if (!decreaseAt.has(ri)) decreaseAt.add(ri);
    ri++;
  }
  const decRows = Array.from(decreaseAt).sort((a, b) => a - b);

  // Bouw schema
  const schedule = document.getElementById('schedule');
  schedule.innerHTML = '';
  let current = start;

  for (let r = 1; r <= rows; r++) {
    const isDecrease = decRows.includes(r);
    if (isDecrease) current -= decAmt;

    const div = document.createElement('div');
    div.className = 'row-item ' + (isDecrease ? 'decrease' : 'plain');
    div.innerHTML = `
      <span class="row-num">Rij ${r}</span>
      <span class="row-desc">${isDecrease
        ? `Minder ${decAmt} steken (${decAmt / 2} aan elke kant)`
        : 'Gewone rij breien'}</span>
      <span class="row-stitches">${current} st.</span>
      <span class="row-badge ${isDecrease ? '' : 'plain'}">${isDecrease ? '−' + decAmt : '✓'}</span>
    `;
    schedule.appendChild(div);
  }

  // Samenvatting
  document.getElementById('sumTotal').textContent    = rows;
  document.getElementById('sumDecrease').textContent = numDecreaseRows;
  document.getElementById('sumPlain').textContent    = rows - numDecreaseRows;
  document.getElementById('sumLost').textContent     = totalToDecrease;

  // Tip
  const avgInterval = (rows / numDecreaseRows).toFixed(1);
  document.getElementById('tipText').textContent = rows - numDecreaseRows === 0
    ? 'Je mindert elke rij. Dit is vrij steil – controleer of dit klopt met je patroon.'
    : `Gemiddeld minder je elke ${avgInterval} rijen. De oranje rijen zijn je minderrijen; op de witte rijen brei je gewoon door.`;

  result.classList.add('visible');
  result.scrollIntoView({ behavior: 'smooth', block: 'start' });

  function showError(msg) {
    err.textContent = msg;
    err.classList.add('visible');
  }
}

// Enter-toets ondersteuning
document.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });

// Prefill vanuit garndichtheid-pagina
window.addEventListener('DOMContentLoaded', () => {
  const start = sessionStorage.getItem('prefill_start');
  const rows  = sessionStorage.getItem('prefill_rows');
  if (start) {
    document.getElementById('startSt').value = start;
    sessionStorage.removeItem('prefill_start');
  }
  if (rows) {
    document.getElementById('totalRows').value = rows;
    sessionStorage.removeItem('prefill_rows');
  }
  if (start || rows) {
    const banner = document.getElementById('prefillBanner');
    if (banner) banner.style.display = 'flex';
  }
});
