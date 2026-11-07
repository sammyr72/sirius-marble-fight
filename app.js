// Sirius Marble Fight site. Two jobs: scatter the marbles, and give each one a name when you hover it.

// Set this to the store page when the game is live; every "Coming to Quest" button becomes a link to it.
const STORE_URL = '';

(function () {
  // ── store buttons ──
  const links = document.querySelectorAll('[data-store-link]');
  const line = document.getElementById('storeLine');
  if (STORE_URL) {
    links.forEach(a => { a.href = STORE_URL; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = a.classList.contains('stamp') ? 'Get it on Quest' : 'Get it on Meta Quest'; });
    if (line) line.innerHTML = '<a href="' + STORE_URL + '" target="_blank" rel="noopener noreferrer">Meta Horizon Store</a>';
  }

  // ── a seeded random, so the table looks the same every visit ──
  let seed = 20261106;
  const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const pick = a => a[Math.floor(rnd() * a.length)];

  // Names in the game's pattern, given name + adjective and noun run together. These are examples, not the game's real marbles.
  const ADJ = ['SLEEPY','FUNNY','PEACEFUL','CRUNCHY','ABLE','BASHFUL','DUSTY','GIDDY','HOLLOW','LUCKY','MELLOW','NERVOUS','PLUCKY','QUIET','RUSTY','SMUG','TIDY','WOBBLY','YAWNING','ZESTY'];
  const NAME = ['ANATOLY','YAMAH','TAHIRA','OTTAVIO','BRONWEN','DESMOND','ELOWEN','FINBAR','GRETA','HUGO','INES','JASPER','KALINDA','LEOPOLD','MIRABEL','NOOR','ORSON','PRIYA','QUENTIN','ROSALIND'];
  const NOUN = ['ZEBU','HELMET','WHIRLWIND','BAMBOO','TEAPOT','LANTERN','PEBBLE','ACORN','KETTLE','BISCUIT','COMPASS','THIMBLE','WALRUS','MITTEN','ANVIL','TURNIP','SPARROW','BUCKET','FIDDLE','PRETZEL'];
  const nameFor = () => pick(NAME) + ' ' + pick(ADJ) + pick(NOUN);

  const FILES = Array.from({ length: 64 }, (_, i) => 'img/marbles/m' + String(i).padStart(2, '0') + '.webp');

  function marble(container, x, y, size, i) {
    const m = document.createElement('span');
    m.className = 'm';
    m.style.cssText = 'left:' + x + '%;top:' + y + '%;width:' + size + 'px;height:' + size + 'px;--rot:' + Math.round(rnd() * 40 - 20) + 'deg;';
    m.dataset.name = nameFor();
    const img = document.createElement('img');
    img.src = FILES[i % FILES.length]; img.alt = ''; img.loading = 'lazy'; img.width = 160; img.height = 160;
    m.appendChild(img);
    container.appendChild(m);
  }

  // marbles spilling out from under the hero picture
  const spill = document.getElementById('spillTop');
  if (spill) {
    const n = 15;
    for (let i = 0; i < n; i++) {
      const x = 3 + (94 / n) * i + rnd() * 3;
      marble(spill, x, rnd() * 38, 46 + rnd() * 50, i * 3 + 1);
    }
  }

  // the dark section's wall of marbles, thinned out where the words are
  const wall = document.getElementById('wall');
  if (wall) {
    wall.classList.add('wall');
    const cols = 10, rows = 7;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c + (r % 2 ? .5 : 0) + rnd() * .35) / cols * 100;
        const y = (r + rnd() * .3) / rows * 100;
        marble(wall, x, y, 54 + rnd() * 70, r * cols + c + 7);
        // keep the words readable: marbles behind the text sit back until you hover them
        if (x > 6 && x < 76 && y > 4 && y < 88) wall.lastChild.classList.add('dim');
      }
    }
  }
})();

// Ringer: thirteen marbles in a cross and a shooter waiting at the edge
(function () {
  const ring = document.getElementById('ringDemo');
  if (!ring) return;
  const files = [5, 12, 19, 23, 28, 31, 36, 40, 44, 49, 53, 58, 61].map(n => 'img/marbles/m' + String(n).padStart(2, '0') + '.webp');
  const pts = [[0, 0]];
  for (let k = 1; k <= 3; k++) pts.push([k, 0], [-k, 0], [0, k], [0, -k]);
  pts.forEach((p, i) => {
    const m = document.createElement('span'); m.className = 'rm';
    m.style.left = (50 + p[0] * 8.6) + '%'; m.style.top = (50 + p[1] * 8.6) + '%';
    const im = document.createElement('img'); im.src = files[i % files.length]; im.alt = ''; im.loading = 'lazy'; m.appendChild(im); ring.appendChild(m);
  });
  const s = document.createElement('span'); s.className = 'rm shooter'; s.style.left = '78%'; s.style.top = '80%';
  const si = document.createElement('img'); si.src = 'img/marbles/m33.webp'; si.alt = ''; s.appendChild(si); ring.appendChild(s);
  const l = document.createElement('span'); l.className = 'rlabel'; l.textContent = 'the shooter (you want theirs)'; ring.appendChild(l);
})();
