/* ═══════════════════════════════════════════
   SERVER.JS — Stylist AI Backend v2.0
   • POST /recommend  — Smart outfit matching from dataset
   • GET  /api/health — Health check
   ═══════════════════════════════════════════ */

const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));   // serve frontend

// ── Load Dataset ─────────────────────────────────────────────────────────────

let fashionData = [];
const datasetPath = path.join(__dirname, 'fashion_dataset.json');

if (fs.existsSync(datasetPath)) {
  fashionData = JSON.parse(fs.readFileSync(datasetPath));
  console.log(`📦 Loaded ${fashionData.length} outfits from fashion_dataset.json`);
} else {
  console.log('⚙️  Dataset not found — generating now (first-run setup)...');
  require('./generate_dataset.js');
  fashionData = JSON.parse(fs.readFileSync(datasetPath));
  console.log(`📦 Generated & loaded ${fashionData.length} outfits`);
}

/* ═══════════════════════════════════════════
   SMART SCORING ENGINE
   Scores each outfit entry against user filters
   ═══════════════════════════════════════════ */

function scoreOutfit(item, filters) {
  let score = 0;

  // High-weight exact matches
  if (filters.gender    && item.gender    === filters.gender)    score += 5;
  if (filters.style     && item.style     === filters.style)     score += 4;
  if (filters.occasion  && item.occasion  === filters.occasion)  score += 4;
  if (filters.season    && item.season    === filters.season)    score += 3;
  if (filters.weather   && item.weather   === filters.weather)   score += 2;
  if (filters.budget    && item.budget    === filters.budget)    score += 3;

  // Body + skin — helpful but not required
  if (filters.body_type && item.body_type === filters.body_type) score += 2;
  if (filters.skin_tone && item.skin_tone === filters.skin_tone) score += 2;
  if (filters.age_group && item.age_group === filters.age_group) score += 1;

  return score;
}

/* ═══════════════════════════════════════════
   POST /recommend
   Body: { gender, style, occasion, season, weather,
           budget, body_type, skin_tone, age_group }
   Returns: top 5 matching outfits
   ═══════════════════════════════════════════ */

app.post('/recommend', (req, res) => {
  try {
    if (fashionData.length === 0) {
      return res.status(503).json({
        error: 'Dataset not loaded. Run: node generate_dataset.js first.'
      });
    }

    const filters = req.body;
    console.log(`[Recommend] Filters:`, JSON.stringify(filters));

    // Score all entries
    const scored = fashionData.map(item => ({
      ...item,
      _score: scoreOutfit(item, filters)
    }));

    // Sort by score descending; shuffle ties for variety
    scored.sort((a, b) => {
      if (b._score !== a._score) return b._score - a._score;
      return Math.random() - 0.5; // randomise ties
    });

    // Return top 5, strip internal score
    const results = scored.slice(0, 5).map(({ _score, ...item }) => item);

    console.log(`[Recommend] Returning ${results.length} results (top score: ${scored[0]._score})`);
    res.json({ results, total_matched: scored.filter(s => s._score > 0).length });

  } catch (err) {
    console.error('[Recommend] Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ═══════════════════════════════════════════
   GET /api/health
   ═══════════════════════════════════════════ */

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Stylist AI Backend',
    version: '2.0.0',
    dataset_size: fashionData.length
  });
});

/* ═══════════════════════════════════════════
   SPA fallback
   ═══════════════════════════════════════════ */

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

/* ── Start ────────────────────────────────────────────────────────────────── */

app.listen(PORT, () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════════╗');
  console.log('  ║    Stylist AI — Backend v2.0 Ready       ║');
  console.log(`  ║    http://localhost:${PORT}                ║`);
  console.log('  ╚══════════════════════════════════════════╝');
  console.log('');
  console.log(`  🎯 Recommend:      POST /recommend`);
  console.log(`  💚 Health:         GET  /api/health`);
  console.log(`  📦 Dataset size:   ${fashionData.length} outfits`);
  console.log('');
});
