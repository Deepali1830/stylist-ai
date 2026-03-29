/* ═══════════════════════════════════════════
   APP.JS — Stylist AI v2.0
   Backend-Powered Dataset Recommendation
   ═══════════════════════════════════════════ */

// ── DOM refs ──
const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const previewWrapper = document.getElementById('preview-wrapper');
const previewImg = document.getElementById('preview-img');
const previewRemove = document.getElementById('preview-remove');
const generateBtn = document.getElementById('generate-btn');
const occasionSel = document.getElementById('occasion-select');
const genderSel = document.getElementById('gender-select');
const ageSel = document.getElementById('age-select');
const styleSel = document.getElementById('style-select');
const seasonSel = document.getElementById('season-select');
const weatherSel = document.getElementById('weather-select');
const budgetSel = document.getElementById('budget-select');
const loadingOverlay = document.getElementById('loading-overlay');
const loadingText = document.getElementById('loading-text');
const loadingBar = document.getElementById('loading-bar');
const resultsSection = document.getElementById('results-section');
const savedSection = document.getElementById('saved-section');
const visionGrid = document.getElementById('vision-grid');
const recommendationCard = document.getElementById('recommendation-card');
const recommendationContainer = document.getElementById('recommendation-container');
const promptText = document.getElementById('prompt-text');
const copyPromptBtn = document.getElementById('copy-prompt-btn');
const fbLike = document.getElementById('fb-like');
const fbDislike = document.getElementById('fb-dislike');


// ── Chatbot DOM Refs ──
const chatFab = document.getElementById('chat-fab');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

let uploadedFile = null;
let uploadedBase64 = null;
let lastUserJSON = null;
let visionProfileCache = null; // Cache for performance

/* ═══════════════════════════════════════════
   1. IMAGE UPLOAD
   ═══════════════════════════════════════════ */

dropArea.addEventListener('click', () => fileInput.click());

dropArea.addEventListener('dragover', e => {
  e.preventDefault();
  dropArea.classList.add('drag-over');
});

dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('drag-over');
});

dropArea.addEventListener('drop', e => {
  e.preventDefault();
  dropArea.classList.remove('drag-over');
  if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
});

fileInput.addEventListener('change', () => {
  if (fileInput.files.length) handleFile(fileInput.files[0]);
});

previewRemove.addEventListener('click', () => {
  uploadedFile = null;
  uploadedBase64 = null;
  visionProfileCache = null;
  previewWrapper.classList.remove('visible');
  dropArea.style.display = '';
  generateBtn.disabled = true;
  fileInput.value = '';
});

function handleFile(file) {
  if (!file.type.startsWith('image/')) return;
  uploadedFile = file;
  const reader = new FileReader();
  reader.onload = e => {
    uploadedBase64 = e.target.result;
    previewImg.src = uploadedBase64;
    previewWrapper.classList.add('visible');
    dropArea.style.display = 'none';
    generateBtn.disabled = false;
  };
  reader.readAsDataURL(file);
}

/* ═══════════════════════════════════════════
   2. VISION ANALYSIS (Image-based heuristics)
   ═══════════════════════════════════════════ */

function visionAnalysis(base64) {
  if (visionProfileCache) return Promise.resolve(visionProfileCache);

  return new Promise(resolve => {
    if (!base64) return resolve({ body_type: 'average', height: 'medium', skin_tone: 'wheatish' });
    const img = new Image();
    img.onload = () => {
      try {
        const ratio = img.height / img.width;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 50; // Smaller canvas for speed
        canvas.height = 50 * ratio;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const sampleX = Math.floor(canvas.width * 0.5), sampleY = Math.floor(canvas.height * 0.25);
        const p = ctx.getImageData(sampleX, sampleY, 1, 1).data;
        const bright = (p[0] + p[1] + p[2]) / 3;
        const skin_tone = bright > 180 ? 'fair' : (bright > 120 ? 'wheatish' : 'dark');
        const body_type = ratio > 2.2 ? 'athletic' : (ratio > 1.4 ? 'average' : 'heavy');
        const height = ratio > 2.0 ? 'tall' : (ratio > 1.3 ? 'medium' : 'short');
        visionProfileCache = { body_type, height, skin_tone };
        resolve(visionProfileCache);
      } catch (e) { resolve({ body_type: 'average', height: 'medium', skin_tone: 'wheatish' }); }
    };
    img.onerror = () => resolve({ body_type: 'average', height: 'medium', skin_tone: 'wheatish' });
    img.src = base64;
  });
}

/* ═══════════════════════════════════════════
   3. JSON CLEANER
   ═══════════════════════════════════════════ */

function cleanJSON(data) {
  if (!data.body_type) data.body_type = 'average';
  if (!data.height) data.height = 'medium';
  if (!data.skin_tone) data.skin_tone = 'wheatish';
  if (!data.gender) data.gender = 'male';
  return data;
}

/* ═══════════════════════════════════════════
   4. RULES ENGINE (Mini RAG)
   ═══════════════════════════════════════════ */

/* RULES moved to database.js */

/* ═══════════════════════════════════════════
   5. AI STYLIST ENGINE — KNOWLEDGE BASE
   ═══════════════════════════════════════════ */

/* OUTFITS moved to database.js */

/* ═══════════════════════════════════════════
   6. STYLIST FUNCTIONS
   ═══════════════════════════════════════════ */

function getTraditionalOutfit(userJSON, occasion, style, personality) {
  const genderData = OUTFITS.traditional[userJSON.gender] || OUTFITS.traditional.male;
  const occasionData = genderData[occasion] || genderData.Casual;
  let data = occasionData[personality] || occasionData.Elegant;

  // If data is an array, pick a random entry for variety
  if (Array.isArray(data)) {
    data = data[Math.floor(Math.random() * data.length)];
  }

  const bodyRule = RULES.body_type[userJSON.body_type];
  const skinRule = RULES.skin_tone[userJSON.skin_tone];
  const heightRule = RULES.height[userJSON.height];

  let response = `OUTFIT:\n${data.outfit}\n\nCOLORS:\n${data.colors}\n\nFOOTWEAR:\n${data.footwear}\n\nACCESSORIES:\n${data.accessories}\n\nWHY IT WORKS:\nThis traditional ${style.toLowerCase()} look is precisely tailored for a ${userJSON.body_type}-build, ${userJSON.height}-height individual with ${userJSON.skin_tone} skin. ${skinRule.best} like ${skinRule.palette.slice(0, 3).join(', ')} complement the skin beautifully. The ${bodyRule.fit} silhouette works because: ${bodyRule.favor}. ${heightRule} The ${personality.toLowerCase()} personality shines through every detail — from fabric choice to accessory curation. This isn't just an outfit; it's a complete look engineered for the ${occasion.toLowerCase()} context.`;

  return variateLook(response);
}

function getModernOutfit(userJSON, occasion, personality) {
  const genderData = OUTFITS.modern[userJSON.gender] || OUTFITS.modern.male;
  const occasionData = genderData[occasion] || genderData.Casual;
  let data = occasionData[personality] || occasionData.Elegant;
  if (Array.isArray(data)) data = data[Math.floor(Math.random() * data.length)];

  const bodyRule = RULES.body_type[userJSON.body_type];
  const skinRule = RULES.skin_tone[userJSON.skin_tone];
  const heightRule = RULES.height[userJSON.height];
  const occasionRule = RULES.occasion[occasion];

  let response = `OUTFIT:\n${data.outfit}\n\nCOLORS:\n${data.colors}\n\nFOOTWEAR:\n${data.footwear}\n\nACCESSORIES:\n${data.accessories}\n\nWHY IT WORKS:\nThis modern look follows current fashion-week trends while being perfectly calibrated for a ${userJSON.body_type} build with ${userJSON.skin_tone} skin. ${skinRule.best} — specifically ${skinRule.palette.slice(0, 3).join(', ')} — create a stunning visual harmony with the chosen palette. The ${bodyRule.fit} fit is ideal: ${bodyRule.favor}. ${heightRule} The ${personality.toLowerCase()} personality is channelled through every element. The ${occasionRule.vibe} vibe of ${occasion.toLowerCase()} dressing is achieved using ${occasionRule.fabric}. Every piece is intentional and wearable.`;
  return variateLook(response);
}

function getIndoWesternOutfit(userJSON, occasion, personality) {
  const styleBase = OUTFITS.indo_western || OUTFITS.modern;
  const genderData = styleBase[userJSON.gender] || styleBase.male;
  const occasionData = genderData[occasion] || genderData.Casual;
  let data = occasionData[personality] || (occasionData.Elegant || Object.values(occasionData)[0]);
  if (Array.isArray(data)) data = data[Math.floor(Math.random() * data.length)];

  const bodyRule = RULES.body_type[userJSON.body_type];
  const skinRule = RULES.skin_tone[userJSON.skin_tone];

  let response = `OUTFIT:\n${data.outfit}\n\nCOLORS:\n${data.colors}\n\nFOOTWEAR:\n${data.footwear}\n\nACCESSORIES:\n${data.accessories}\n\nWHY IT WORKS:\nIndo-Western fusion is all about the balance of traditional heritage and modern silhouettes. For your ${userJSON.body_type} frame, this look uses structural tailoring to highlight your best features. The color palette of ${data.colors} is paired with ${skinRule.best} to ensure you glow in any lighting. It's a high-fashion choice for ${occasion.toLowerCase()}.`;
  return variateLook(response);
}

function getBohemianOutfit(userJSON, occasion, personality) {
  const styleBase = OUTFITS.bohemian || OUTFITS.modern;
  const genderData = styleBase[userJSON.gender] || styleBase.male;
  const occasionData = genderData[occasion] || genderData.Casual;
  let data = occasionData[personality] || (occasionData.Elegant || Object.values(occasionData)[0]);
  if (Array.isArray(data)) data = data[Math.floor(Math.random() * data.length)];

  const skinRule = RULES.skin_tone[userJSON.skin_tone];

  let response = `OUTFIT:\n${data.outfit}\n\nCOLORS:\n${data.colors}\n\nFOOTWEAR:\n${data.footwear}\n\nACCESSORIES:\n${data.accessories}\n\nWHY IT WORKS:\nBohemian style thrives on textures, layers, and earthy expression. This ${occasion.toLowerCase()} look uses soft drapes suitable for a ${userJSON.body_type} build. The palette ${data.colors} harmonizes with your ${userJSON.skin_tone} skin perfectly. It's relaxed yet remarkably sophisticated.`;
  return variateLook(response);
}

function getAthleisureOutfit(userJSON, occasion, personality) {
  const styleBase = OUTFITS.athleisure || OUTFITS.modern;
  const genderData = styleBase[userJSON.gender] || styleBase.male;
  const occasionData = genderData[occasion] || genderData.Casual;
  let data = occasionData[personality] || (occasionData.Minimalist || Object.values(occasionData)[0]);
  if (Array.isArray(data)) data = data[Math.floor(Math.random() * data.length)];

  let response = `OUTFIT:\n${data.outfit}\n\nCOLORS:\n${data.colors}\n\nFOOTWEAR:\n${data.footwear}\n\nACCESSORIES:\n${data.accessories}\n\nWHY IT WORKS:\nAthleisure is the intersection of high-performance tech-wear and minimalist street fashion. The technical ${occasion === 'Office' ? 'ponte' : 'knit'} fabrics provide a clean ${RULES.body_type[userJSON.body_type].fit} silhouette. Perfect for a busy day that requires both comfort and style.`;
  return variateLook(response);
}

function getBudgetOutfit(userJSON, occasion, style = 'Budget Friendly') {
  const genderData = OUTFITS.budget[userJSON.gender] || OUTFITS.budget.male;
  let data = genderData[occasion] || genderData.Casual;
  if (Array.isArray(data)) data = data[Math.floor(Math.random() * data.length)];

  const bodyRule = RULES.body_type[userJSON.body_type];
  const skinRule = RULES.skin_tone[userJSON.skin_tone];

  let response = `OUTFIT:\n${data.outfit}\n\nCOLORS:\n${data.colors}\n\nFOOTWEAR:\n${data.footwear}\n\nACCESSORIES:\n${data.accessories}\n\nWHY IT WORKS:\nBudget styling doesn't mean compromising on style. For a ${userJSON.body_type} build, we prioritize fit over brand — ${bodyRule.favor}. This ${style.toLowerCase()} look punches 3x above its price point while respecting your budget constraints.`;
  return variateLook(response);
}

/**
 * Variation Engine — Swaps secondary details randomly to prevent repetition
 */
function variateLook(text) {
  const variations = {
    "silk": ["satin", "textured silk", "fine raw silk"],
    "gold": ["silver", "antique gold", "rose gold", "platinum-finish"],
    "navy": ["midnight blue", "dark slate", "charcoal"],
    "black": ["onyx", "midnight black", "deep charcoal"],
    "leather": ["suede", "matte leather", "polished leather"],
    "modern": ["contemporary", "trend-forward", "avant-garde"],
    "traditional": ["classic", "heritage", "ethnic"],
    "Elegant": ["Sophisticated", "Refined", "Polished"],
    "Minimalist": ["Clean", "Uncluttered", "Pure"],
    "Bold": ["Daring", "Striking", "Fearless"],
    "Streetwear": ["Urban", "Edgy", "Hype-driven"]
  };

  let newText = text;
  Object.keys(variations).forEach(key => {
    if (Math.random() > 0.5) { // 50% chance to swap
      const options = variations[key];
      const replacement = options[Math.floor(Math.random() * options.length)];
      const regex = new RegExp(key, 'gi');
      newText = newText.replace(regex, replacement);
    }
  });

  return newText;
}

/* ═══════════════════════════════════════════
   7. AGGREGATION
   ═══════════════════════════════════════════ */

function aggregate(traditional, modern, budget) {
  const options = [
    { name: 'traditional', text: traditional },
    { name: 'modern', text: modern },
    { name: 'budget', text: budget }
  ];
  const scored = options.map(o => ({
    ...o,
    score: o.text.includes('WHY IT WORKS') ? o.text.length : 0
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0];
}

/* ═══════════════════════════════════════════
   8. IMAGE GENERATION PROMPT
   ═══════════════════════════════════════════ */

/**
 * MASTER PROMPT ENGINE
 * Generates technical, high-quality prompts for professional AI Art Generation.
 */
function buildImagePrompt(userJSON, outfitText) {
  const extractSection = (tag) => {
    const regex = new RegExp(`${tag}:\\s+([\\s\\S]*?)(?=(?:OUTFIT|COLORS|FOOTWEAR|ACCESSORIES|WHY IT WORKS):|$)`);
    const match = outfitText.match(regex);
    return match ? match[1].trim() : '';
  };

  const outfit = extractSection('OUTFIT') || "High-end fashion garment";
  const colors = extractSection('COLORS') || "Sophisticated neutrals";
  const footwear = extractSection('FOOTWEAR') || "Designer footwear";
  const accessories = extractSection('ACCESSORIES') || "Minimalist jewelry";

  const subject = userJSON.gender === 'female' ? 'a stunning female fashion model' : 'a sophisticated male fashion model';
  const lighting = Math.random() > 0.5 ? 'Cinematic Rembrandt lighting, high contrast' : 'Soft-box studio lighting, clean background, rim lighting';

  // Professional Grade Multi-Layered Prompt
  const prompt = `FASHION EDITORIAL PHOTOGRAPHY: ${subject} standing in a high-end minimalist studio. 
WEARING: ${outfit}. 
COLOR PALETTE: ${colors}. 
DETAILS: Intricate fabric textures, ${footwear}, and ${accessories}. 
TECHNICAL: 85mm f/1.8 lens, sharp focus on eyes, shallow depth of field, 8k resolution, hyper-detailed textures, Vogue luxury aesthetic, ${lighting}.`.replace(/[^a-zA-Z0-9.,:;() ]/g, '');

  return prompt;
}



/* ═══════════════════════════════════════════
   9. LOADING ANIMATION
   ═══════════════════════════════════════════ */

const LOADING_MESSAGES = [
  'Analyzing your style…',
  'Understanding your body type…',
  'Consulting the traditional stylist…',
  'Consulting the modern stylist…',
  'Finding budget-friendly alternatives…',
  'Aggregating recommendations…',
  'Generating premium outfit ideas…',
  'Finalizing your perfect look…'
];

let loadingInterval = null;

function showLoading() {
  loadingOverlay.classList.add('active');
  loadingBar.style.width = '0%';
  loadingText.textContent = 'Fashion Engines Starting...';

  // Reset pipeline UI
  document.querySelectorAll('.pipeline-step').forEach(step => {
    if (step.dataset.step !== 'upload') step.classList.remove('done');
  });
}

function hideLoading() {
  loadingBar.style.width = '100%';
  loadingOverlay.classList.remove('active');
}

function updatePipeline(stepName) {
  const step = document.querySelector(`.pipeline-step[data-step="${stepName}"]`);
  if (step) {
    step.classList.add('done');
    // Smooth scroll to results on first real step
    if (stepName === 'vision') {
      resultsSection.classList.add('visible');
      if (savedSection) savedSection.classList.add('visible');
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

/* ═══════════════════════════════════════════
   10. RENDER RESULTS
   ═══════════════════════════════════════════ */

function renderVision(userJSON) {
  const stats = [
    { emoji: '🏋️', label: 'Body Type', value: userJSON.body_type },
    { emoji: '📏', label: 'Height', value: userJSON.height },
    { emoji: '🎨', label: 'Skin Tone', value: userJSON.skin_tone },
    { emoji: '👤', label: 'Gender', value: userJSON.gender }
  ];
  visionGrid.innerHTML = stats.map(s => `
    <div class="vision-stat">
      <span class="stat-emoji">${s.emoji}</span>
      <div class="stat-label">${s.label}</div>
      <div class="stat-value">${s.value}</div>
    </div>
  `).join('');
}

function parseOutfitSections(text) {
  const sections = ['OUTFIT', 'COLORS', 'FOOTWEAR', 'ACCESSORIES', 'WHY IT WORKS'];
  const icons = ['👔', '🎨', '👟', '💎', '✅'];
  const result = [];
  for (let i = 0; i < sections.length; i++) {
    const regex = new RegExp(`${sections[i]}:\\s*\\n([\\s\\S]*?)(?=\\n\\n(?:COLORS|FOOTWEAR|ACCESSORIES|WHY IT WORKS):|$)`);
    const match = text.match(regex);
    if (match) {
      result.push({ title: sections[i], icon: icons[i], body: match[1].trim() });
    }
  }
  if (result.length === 0) {
    result.push({ title: 'RECOMMENDATION', icon: '👔', body: text.trim() });
  }
  return result;
}

function renderRecommendation(text) {
  const sections = parseOutfitSections(text);
  recommendationContainer.innerHTML = `
    <div class="outfit-card glass-card">
      ${sections.map(s => `
        <div class="outfit-section">
          <div class="outfit-section-title">${s.icon} ${s.title}</div>
          <div class="outfit-section-body">${s.body}</div>
        </div>
      `).join('')}
    </div>
  `;
}

/* ═══════════════════════════════════════════
   12. COPY PROMPT
   ═══════════════════════════════════════════ */

/* ═══════════════════════════════════════════
   12. COPY PROMPT
   ═══════════════════════════════════════════ */

copyPromptBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(promptText.textContent).then(() => {
    copyPromptBtn.textContent = '✅ Copied!';
    setTimeout(() => { copyPromptBtn.textContent = '📋 Copy Prompt'; }, 2000);
  });
});

/* ═══════════════════════════════════════════
   13. FEEDBACK
   ═══════════════════════════════════════════ */

let feedbackStore = [];

function handleFeedback(type) {
  fbLike.classList.remove('liked');
  fbDislike.classList.remove('disliked');
  if (type === 'like') fbLike.classList.add('liked');
  if (type === 'dislike') fbDislike.classList.add('disliked');

  feedbackStore.push({
    outfit: promptText.textContent,
    liked: type === 'like',
    timestamp: new Date().toISOString()
  });
  console.log('Feedback stored:', feedbackStore[feedbackStore.length - 1]);
}

fbLike.addEventListener('click', () => handleFeedback('like'));
fbDislike.addEventListener('click', () => handleFeedback('dislike'));

/* ═══════════════════════════════════════════
   14. MAIN PIPELINE
   ═══════════════════════════════════════════ */

generateBtn.addEventListener('click', async () => {
  if (!uploadedFile) return;
  showLoading();

  try {
    // ── Step 1: Vision Analysis ──────────────────────
    const visionRaw = await visionAnalysis(uploadedBase64);
    const visionData = cleanJSON(visionRaw);
    lastUserJSON = visionData;
    updatePipeline('vision');

    // ── Step 2: Build filter payload from new controls ─
    updatePipeline('rules');
    const filters = {
      gender: genderSel.value,
      age_group: ageSel.value,
      occasion: occasionSel.value,
      style: styleSel.value,
      season: seasonSel.value,
      weather: weatherSel.value,
      budget: budgetSel.value,
      body_type: visionData.body_type,
      skin_tone: visionData.skin_tone
    };

    // ── Step 3: Call backend /recommend ──────────────
    updatePipeline('stylists');
    let outfit = null;

    try {
      const res = await fetch('https://stylist-ai-1.onrender.com /recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)
      });

      if (res.ok) {
        const data = await res.json();
        outfit = data.results?.[0] || null;
        console.log('[Recommend] Got outfit:', outfit?.style, '| score match from', data.total_matched, 'entries');
      } else {
        console.warn('[Recommend] Backend returned', res.status, '— falling back to local engine');
      }
    } catch (fetchErr) {
      console.warn('[Recommend] Backend unreachable — falling back to local engine:', fetchErr.message);
    }

    updatePipeline('aggregate');

    // ── Step 4: Render recommendation ────────────────
    updatePipeline('image');

    let imgPrompt;
    if (outfit) {
      // Dataset-based render
      renderVision({ ...visionData, style: outfit.style, season: outfit.season });
      renderDatasetOutfit(outfit, filters);
      imgPrompt = buildPromptFromDataset(outfit, visionData);
    } else {
      // Fallback: legacy local engine
      const legacyText = getModernOutfit(visionData, filters.occasion, 'Elegant');
      renderVision(visionData);
      renderRecommendation(legacyText);
      imgPrompt = buildImagePrompt(visionData, legacyText);
    }

    promptText.textContent = imgPrompt;


  } catch (err) {
    console.error('Pipeline Error:', err);
  } finally {
    hideLoading();
  }
});

/* ─────────────────────────────────────────────
   RENDER: Dataset Outfit Card
   ───────────────────────────────────────────── */
function renderDatasetOutfit(outfit, filters) {
  const o = outfit.outfit;
  const colorBadges = (outfit.colors || []).map(c =>
    `<span class="color-badge" style="--c:${c}">${c}</span>`
  ).join('');
  const tagBadges = (outfit.tags || []).map(t =>
    `<span class="outfit-tag">${t}</span>`
  ).join('');
  const accessories = Array.isArray(o.accessories)
    ? o.accessories.join(' · ')
    : o.accessories;

  const budgetLabel = { low: 'Under ₹1,500', medium: '₹1,500–₹5,000', high: '₹5,000+' };

  recommendationContainer.innerHTML = `
    <div class="outfit-card glass-card dataset-card">
      <div class="dataset-meta">
        <span class="meta-chip">✨ ${outfit.style?.replace(/_/g, ' ')}</span>
        <span class="meta-chip">📅 ${outfit.occasion}</span>
        <span class="meta-chip">🌤️ ${outfit.season} · ${outfit.weather}</span>
        <span class="meta-chip">💸 ${budgetLabel[outfit.budget] || outfit.budget}</span>
      </div>

      <div class="outfit-section">
        <div class="outfit-section-title">👔 Complete Outfit</div>
        <div class="outfit-section-body dataset-outfit-grid">
          ${o.top ? `<div class="outfit-item"><span class="item-label">Top</span><span class="item-value">${o.top}</span></div>` : ''}
          ${o.bottom ? `<div class="outfit-item"><span class="item-label">Bottom</span><span class="item-value">${o.bottom}</span></div>` : ''}
          ${o.layer ? `<div class="outfit-item"><span class="item-label">Layer</span><span class="item-value">${o.layer}</span></div>` : ''}
          ${o.footwear ? `<div class="outfit-item"><span class="item-label">Footwear</span><span class="item-value">${o.footwear}</span></div>` : ''}
          ${accessories ? `<div class="outfit-item" style="grid-column:1/-1"><span class="item-label">Accessories</span><span class="item-value">${accessories}</span></div>` : ''}
        </div>
      </div>

      <div class="outfit-section">
        <div class="outfit-section-title">🎨 Color Palette</div>
        <div class="outfit-section-body color-palette-row">${colorBadges}</div>
      </div>

      <div class="outfit-section">
        <div class="outfit-section-title">🏷️ Vibe Tags</div>
        <div class="outfit-section-body tag-row">${tagBadges}</div>
      </div>

      <div class="outfit-section">
        <div class="outfit-section-title">✅ Why It Works</div>
        <div class="outfit-section-body">
          This <strong>${outfit.style?.replace(/_/g, ' ')}</strong> look is curated for a
          <strong>${outfit.body_type}</strong> build with <strong>${outfit.skin_tone}</strong> skin —
          the ${(outfit.colors || []).slice(0, 2).join(' &amp; ')} palette naturally complements your tone.
          Perfect for <strong>${outfit.occasion}</strong> in <strong>${outfit.season}</strong>
          ${outfit.weather} weather. Every piece is intentional, wearable, and within your
          <strong>${budgetLabel[outfit.budget] || outfit.budget}</strong> budget.
        </div>
      </div>
    </div>
  `;
}

/* ─────────────────────────────────────────────
   BUILD PROMPT: from dataset outfit object
   ───────────────────────────────────────────── */
function buildPromptFromDataset(outfit, vision) {
  const o = outfit.outfit;
  const subject = vision.gender === 'female'
    ? 'a stunning female fashion model'
    : 'a sophisticated male fashion model';
  const colors = (outfit.colors || []).join(', ');
  const accList = Array.isArray(o.accessories) ? o.accessories.join(', ') : o.accessories;
  const lighting = Math.random() > 0.5
    ? 'cinematic Rembrandt lighting, high contrast'
    : 'softbox studio lighting, clean background, rim light';

  return `FASHION EDITORIAL: ${subject} in a minimalist studio. ` +
    `WEARING: ${o.top}, ${o.bottom}${o.layer ? ', ' + o.layer : ''}. ` +
    `FOOTWEAR: ${o.footwear}. ACCESSORIES: ${accList}. ` +
    `COLOR PALETTE: ${colors}. ` +
    `STYLE: ${outfit.style?.replace(/_/g, ' ')} aesthetic, ${outfit.season} season. ` +
    `TECHNICAL: 85mm lens, 8k resolution, hyper-detailed textures, Vogue editorial, ${lighting}.`;
}

/* ═══════════════════════════════════════════
   15. SAVE LOOK FEATURE
   ═══════════════════════════════════════════ */

const saveLookBtn = document.getElementById('save-look-btn');
const savedGrid = document.getElementById('saved-grid');
const savedCount = document.getElementById('saved-count');

function initSavedLooks() {
  const saved = JSON.parse(localStorage.getItem('stylist_saved_looks') || '[]');
  renderSavedGrid(saved);
}

function saveCurrentLook() {
  if (!lastUserJSON) return;

  const look = {
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    gender: lastUserJSON.gender,
    occasion: occasionSel.value,
    style: styleSel.value,
    prompt: promptText.textContent
  };

  const saved = JSON.parse(localStorage.getItem('stylist_saved_looks') || '[]');
  saved.unshift(look);
  localStorage.setItem('stylist_saved_looks', JSON.stringify(saved));

  renderSavedGrid(saved);

  saveLookBtn.textContent = '✅ Saved to Journal';
  saveLookBtn.classList.add('saved');
  setTimeout(() => {
    saveLookBtn.textContent = '⭐ Save Look';
    saveLookBtn.classList.remove('saved');
  }, 2000);
}

function deleteLook(id) {
  let saved = JSON.parse(localStorage.getItem('stylist_saved_looks') || '[]');
  saved = saved.filter(l => l.id !== id);
  localStorage.setItem('stylist_saved_looks', JSON.stringify(saved));
  renderSavedGrid(saved);
}

function renderSavedGrid(looks) {
  if (!savedGrid) return;

  savedCount.textContent = `${looks.length} look${looks.length === 1 ? '' : 's'} saved`;

  if (looks.length === 0) {
    savedGrid.innerHTML = `
      <div class="empty-gallery">
        <p>Your style journey starts here. Save your favorite looks!</p>
      </div>
    `;
    return;
  }

  savedGrid.innerHTML = looks.map(look => `
    <div class="glass-card saved-look-card">
      <div class="saved-info" style="padding-top: 15px;">
        <div class="saved-tag">${look.occasion} • ${look.gender}</div>
        <p class="saved-date">Saved on ${look.date}</p>
        <p class="saved-style" style="margin: 10px 0; color: #aaa; font-size: 0.9em; text-transform: capitalize;">Style: ${look.style}</p>
        <div class="saved-actions">
           <button onclick="copyPrompt('${look.id}')" class="saved-action-btn">📋 Prompt</button>
           <button onclick="deleteLook(${look.id})" class="saved-action-btn delete">🗑️ Delete</button>
        </div>
        <div id="prompt-${look.id}" style="display:none">${look.prompt}</div>
      </div>
    </div>
  `).join('');
}

// Global helpers for inline onclicks
window.deleteLook = deleteLook;
window.copyPrompt = (id) => {
  const text = document.getElementById(`prompt-${id}`).textContent;
  navigator.clipboard.writeText(text);
  alert("Prompt copied to clipboard!");
};

saveLookBtn.addEventListener('click', saveCurrentLook);
initSavedLooks();

/* ═══════════════════════════════════════════
   15. CHATBOT ENGINE (Zero-API Heuristics)
   ═══════════════════════════════════════════ */

// Toggle Chat Visibility
function toggleChat(forceClose = false) {
  if (forceClose) {
    chatWindow.classList.remove('visible');
    chatFab.classList.remove('active');
  } else {
    const isVisible = chatWindow.classList.contains('visible');
    chatWindow.classList.toggle('visible', !isVisible);
    chatFab.classList.toggle('active', !isVisible);
    if (!isVisible) chatInput.focus();
  }
}

chatFab.addEventListener('click', () => toggleChat());
chatClose.addEventListener('click', () => toggleChat(true));

// Send Message Logic
function addMessage(text, side = 'bot') {
  const msgDiv = document.createElement('div');
  msgDiv.className = `msg ${side}`;

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  msgDiv.innerHTML = `
    <div class="msg-bubble">${text}</div>
    <div class="msg-time">${time}</div>
  `;

  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function handleChatSubmit() {
  const text = chatInput.value.trim();
  if (!text) return;

  chatInput.value = '';
  addMessage(text, 'user');

  // Removed "thinking" delay for maximum speed
  const response = getBotResponse(text);
  addMessage(response, 'bot');
}

chatSend.addEventListener('click', handleChatSubmit);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleChatSubmit();
});

// Heuristic Logic - The "Brain"
function getBotResponse(input) {
  const msg = input.toLowerCase();

  // 1. Basic Greetings
  if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
    return "Hi there! I'm your Stylist Assistant. Need help refining your look or have a question about colors and fit?";
  }

  // 2. Color Advice
  if (msg.includes('color') || msg.includes('skin') || msg.includes('suit')) {
    if (lastUserJSON) {
      const rule = RULES.skin_tone[lastUserJSON.skin_tone];
      return `Since you have a **${lastUserJSON.skin_tone}** skin tone, ${rule.best} work wonders for you. I'd specifically recommend **${rule.palette.slice(0, 3).join(', ')}**.`;
    }
    return "The best colors usually depend on your skin tone. Generally, jewel tones like Navy and Emerald look great on most people. Try uploading a photo so I can be more specific!";
  }

  // 3. Body Type / Fit
  if (msg.includes('body') || msg.includes('type') || msg.includes('fit') || msg.includes('shape')) {
    if (lastUserJSON) {
      const rule = RULES.body_type[lastUserJSON.body_type];
      return `For your **${lastUserJSON.body_type}** build, I recommend a **${rule.fit}** fit. You should generally favor **${rule.favor}**, and try to avoid **${rule.avoid}**.`;
    }
    return "Fit is everything! For athletic builds, go fitted. For heavier frames, go for structured but relaxed drapes. Vertical lines always help with height!";
  }

  // 4. Specific Requests (Green, Red, Professional, etc.)
  if (msg.includes('green')) return "Green is a fantastic choice! Emerald green is very 'in' for traditional weddings, while Sage green works beautifully for casual outings.";
  if (msg.includes('black')) return "Black is timeless. It adds instant authority and elegance. Pair it with gold for a luxury look, or white for a sharp modern vibe.";
  if (msg.includes('professional') || msg.includes('job') || msg.includes('interview')) {
    return "For professional settings, stick to structured blazers, neutral tones (Grey/Navy), and minimal accessories. Clean lines show confidence.";
  }

  // 5. Shoes/Accessories
  if (msg.includes('shoe') || msg.includes('footwear') || msg.includes('watch') || msg.includes('accessory')) {
    return "Always match your leathers (belt and shoes). For traditional looks, Mojaris are king. For modern office looks, go for Loafers or Oxfords.";
  }

  // 6. Recommendation Feedback
  if (msg.includes('like') || msg.includes('good') || msg.includes('nice')) {
    return "I'm so glad to hear that! Would you like to know how to accessorize this specific look further?";
  }

  if (msg.includes('bad') || msg.includes('no') || msg.includes('wrong')) {
    return "I understand! Style is personal. Try changing your 'Personality' setting (like moving from Minimalist to Bold) and hitting Generate again!";
  }

  // Default Fallback
  return "That's an interesting point! As your stylist, I'd suggest focusing on how the fabric feels and the confidence it gives you. Do you have more specific questions about colors, shoes, or fit?";
}

/* ── Utility ── */
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
