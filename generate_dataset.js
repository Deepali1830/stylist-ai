/**
 * FASHION DATASET GENERATOR
 * Run: node generate_dataset.js
 * Generates 1200+ outfit entries across all style dimensions
 */

const fs = require('fs');

// ── Dimensions ──────────────────────────────────────────────────────────────

const GENDERS = ['male', 'female'];
const AGE_GROUPS = ['teen', 'young_adult', 'adult'];
const BODY_TYPES = ['slim', 'athletic', 'heavy', 'plus_size'];
const SKIN_TONES = ['fair', 'wheatish', 'dark'];
const OCCASIONS = ['casual', 'office', 'wedding', 'party', 'travel', 'gym', 'date'];
const SEASONS = ['summer', 'winter', 'monsoon', 'autumn'];
const WEATHERS = ['hot', 'cold', 'humid', 'rainy'];
const BUDGETS = ['low', 'medium', 'high'];
const STYLES = [
  'minimal', 'streetwear', 'old_money', 'y2k', 'korean',
  'formal', 'business_casual', 'vintage', 'luxury', 'sporty',
  'grunge', 'soft_girl', 'dark_academia', 'light_academia',
  'techwear', 'cottagecore', 'ethnic_fusion', 'traditional', 'bohemian', 'athleisure'
];

// ── Outfit Component Libraries ───────────────────────────────────────────────

const OUTFITS = {
  male: {
    streetwear: {
      top: ['oversized graphic tee', 'boxy hoodie', 'longline tee', 'polo shirt'],
      bottom: ['cargo pants', 'baggy jeans', 'jogger pants', 'track pants'],
      layer: ['open flannel', 'zip-up hoodie', 'varsity jacket', 'windbreaker'],
      footwear: ['chunky sneakers', 'Air Force 1s', 'Jordan 1s', 'high-top canvas'],
      accessories: [['cap', 'crossbody bag'], ['beanie', 'chain necklace'], ['sunglasses', 'tote bag']]
    },
    old_money: {
      top: ['cashmere turtleneck', 'Oxford button-down', 'merino wool sweater', 'linen shirt'],
      bottom: ['tailored wool trousers', 'chino pants', 'slim-fit slacks', 'pleated trousers'],
      layer: ['long overcoat', 'blazer', 'quilted vest', 'trench coat'],
      footwear: ['brown leather loafers', 'Oxford shoes', 'suede Chelsea boots', 'leather derbies'],
      accessories: [['classic watch', 'leather briefcase'], ['signet ring', 'pocket square'], ['tie bar', 'cufflinks']]
    },
    minimal: {
      top: ['white crew-neck tee', 'black mock-neck', 'grey linen shirt', 'fitted cotton shirt'],
      bottom: ['slim black jeans', 'straight white trousers', 'pleated grey slacks'],
      layer: ['minimalist blazer', 'unstructured jacket', 'merino cardigan'],
      footwear: ['white leather sneakers', 'black leather derbies', 'suede loafers'],
      accessories: [['minimalist watch'], ['leather card holder'], ['thin chain']]
    },
    formal: {
      top: ['white dress shirt', 'light blue dress shirt', 'poplin shirt'],
      bottom: ['black suit trousers', 'charcoal dress pants', 'navy trousers'],
      layer: ['tailored suit jacket', 'double-breasted blazer', 'three-piece vest'],
      footwear: ['black Oxford shoes', 'patent leather shoes', 'cap-toe Oxfords'],
      accessories: [['silk tie', 'pocket square', 'cufflinks'], ['bow tie', 'dress watch']]
    },
    traditional: {
      top: ['silk kurta', 'embroidered sherwani', 'Nehru jacket', 'bandhgala kurta'],
      bottom: ['churidar', 'straight-cut pajama', 'dhoti pants', 'slim-fit salwar'],
      layer: ['dupatta', 'angrakha jacket', 'bundi jacket'],
      footwear: ['mojris', 'kolhapuri sandals', 'nagra shoes', 'leather jutis'],
      accessories: [['turban', 'pearl necklace'], ['pocket watch', 'brocade stole'], ['kada bracelet']]
    },
    korean: {
      top: ['oversized knit sweater', 'pastel button-up', 'cable-knit vest', 'ribbed turtleneck'],
      bottom: ['wide-leg trousers', 'slim straight jeans', 'pleated shorts'],
      layer: ['longline cardigan', 'puffer vest', 'light trench'],
      footwear: ['chunky dad sneakers', 'suede loafers', 'white canvas'],
      accessories: [['mini bag', 'silver ring'], ['bucket hat'], ['beret', 'tote']]
    },
    y2k: {
      top: ['graphic band tee', 'mesh shirt', 'printed button-up', 'velvet tee'],
      bottom: ['low-rise baggy jeans', 'track pants', 'cargo shorts'],
      layer: ['zip-up track jacket', 'velour hoodie', 'nylon jacket'],
      footwear: ['platform sneakers', 'chunky boots', 'skate shoes'],
      accessories: [['chain wallet', 'necklace'], ['bucket hat', 'rings'], ['visor']]
    },
    techwear: {
      top: ['moisture-wicking tee', 'base layer top', 'tactical shirt'],
      bottom: ['cargo joggers', 'techwear pants', 'utility pants'],
      layer: ['technical shell jacket', 'modular vest', 'rain jacket'],
      footwear: ['trail runners', 'tactical boots', 'tech sneakers'],
      accessories: [['crossbody sling', 'watch'], ['carabiner clips', 'utility belt']]
    },
    dark_academia: {
      top: ['collared shirt', 'turtleneck knit', 'linen button-down'],
      bottom: ['plaid trousers', 'corduroy pants', 'wool slacks'],
      layer: ['tweed blazer', 'camel coat', 'cable cardigan'],
      footwear: ['leather loafers', 'Oxford brogues', 'lace-up boots'],
      accessories: [['satchel bag', 'spectacles'], ['vintage watch', 'scarf']]
    },
    business_casual: {
      top: ['Oxford shirt', 'polo shirt', 'fitted knit'],
      bottom: ['chino trousers', 'smart jeans', 'dress pants'],
      layer: ['unstructured blazer', 'merino sweater', 'sport coat'],
      footwear: ['leather loafers', 'suede chukka boots', 'clean sneakers'],
      accessories: [['leather belt', 'watch'], ['laptop bag']]
    },
    sporty: {
      top: ['performance tee', 'sleeveless muscle tee', 'compression shirt'],
      bottom: ['athletic shorts', 'gym joggers', 'training pants'],
      layer: ['zip-up sweatshirt', 'lightweight jacket'],
      footwear: ['running sneakers', 'training shoes', 'basketball shoes'],
      accessories: [['sports watch', 'gym bag'], ['cap', 'water bottle']]
    },
    ethnic_fusion: {
      top: ['printed kurta', 'mandarin collar shirt', 'bandhani shirt'],
      bottom: ['slim-fit churidar', 'drawstring pants', 'dhoti-style pants'],
      layer: ['embroidered Nehru jacket', 'block-printed shawl'],
      footwear: ['leather sandals', 'kolhapuri', 'embellished mojris'],
      accessories: [['thread bracelet', 'antique brooch']]
    }
  },
  female: {
    streetwear: {
      top: ['oversized graphic tee', 'crop hoodie', 'off-shoulder top', 'longline tank'],
      bottom: ['high-waist cargo pants', 'baggy jeans', 'biker shorts', 'mini skirt'],
      layer: ['open flannel shirt', 'oversized bomber', 'puffer jacket'],
      footwear: ['chunky sneakers', 'platform shoes', 'high-top canvas'],
      accessories: [['crossbody bag', 'chain necklace', 'cap'], ['beanie', 'hoop earrings'], ['sling bag', 'statement belt']]
    },
    soft_girl: {
      top: ['pastel puff-sleeve blouse', 'butterfly crochet top', 'heart-print tee', 'lace-trimmed cami'],
      bottom: ['pleated mini skirt', 'high-waist wide-leg pants', 'floral midi skirt'],
      layer: ['oversized cardigan', 'sheer chiffon shirt', 'fitted knit'],
      footwear: ['Mary Janes', 'platform sandals', 'kitten heels'],
      accessories: [['scrunchies', 'pearl earrings', 'small handbag'], ['hair clips', 'dainty necklace']]
    },
    cottagecore: {
      top: ['white lace blouse', 'smocked cotton top', 'floral peasant blouse', 'puff-sleeve dress'],
      bottom: ['floral midi skirt', 'tiered ruffle skirt', 'linen wide-leg pants'],
      layer: ['cream cardigan', 'embroidered jacket', 'sheer floral overlay'],
      footwear: ['strappy flats', 'brown ankle boots', 'Mary Janes'],
      accessories: [['floral headband', 'wicker basket bag'], ['pearl necklace', 'dainty rings'], ['straw hat']]
    },
    old_money: {
      top: ['cashmere turtleneck', 'silk blouse', 'fitted polo', 'linen button-down'],
      bottom: ['tailored wide-leg trousers', 'pleated midi skirt', 'straight-cut dress pants'],
      layer: ['long wool coat', 'structured blazer', 'cashmere cardigan'],
      footwear: ['leather loafers', 'block-heel pumps', 'suede Chelsea boots'],
      accessories: [['pearl earrings', 'structured tote', 'classic watch'], ['silk scarf', 'gold bracelet']]
    },
    korean: {
      top: ['oversized sweater', 'pastel puff-sleeve blouse', 'ribbed cardigan', 'knit vest'],
      bottom: ['wide-leg trousers', 'A-line mini skirt', 'plaid pleated skirt'],
      layer: ['longline knit cardigan', 'puffer vest', 'crochet jacket'],
      footwear: ['platform loafers', 'Mary Janes', 'chunky dad sneakers'],
      accessories: [['mini bucket bag', 'bow accessories'], ['hair clips', 'layered necklaces']]
    },
    minimal: {
      top: ['white fitted tee', 'ribbed tank top', 'clean-line blouse'],
      bottom: ['straight black pants', 'wide-leg beige trousers', 'midi slip skirt'],
      layer: ['oversized linen blazer', 'minimalist trench', 'fitted cardigan'],
      footwear: ['white sneakers', 'pointed-toe flats', 'leather mules'],
      accessories: [['minimal dainty necklace', 'small leather bag'], ['stud earrings']]
    },
    y2k: {
      top: ['rhinestone crop top', 'mesh top', 'butterfly graphic tee', 'velvet halter'],
      bottom: ['low-rise flare jeans', 'metallic mini skirt', 'plaid micro skirt', 'cargo pants'],
      layer: ['velour tracksuit top', 'nylon zip jacket', 'fuzzy cardigan'],
      footwear: ['platform boots', 'chunky heels', 'jelly shoes', 'butterfly clips'],
      accessories: [['tinted sunglasses', 'choker', 'shoulder bag'], ['belly chain', 'hair clips']]
    },
    formal: {
      top: ['tailored dress shirt', 'silk blouse', 'fitted blazer-top'],
      bottom: ['pencil skirt', 'wide-leg formal trousers', 'A-line midi skirt'],
      layer: ['structured blazer', 'double-breasted jacket', 'longline blazer'],
      footwear: ['block-heel pumps', 'pointed-toe heels', 'leather mules'],
      accessories: [['pearl earrings', 'structured bag', 'classic watch'], ['silk scarf']]
    },
    traditional: {
      top: ['embroidered kurta', 'silk saree blouse', 'anarkali suit', 'lehenga choli'],
      bottom: ['palazzo pants', 'churidar', 'sharara', 'salwar'],
      layer: ['dupatta', 'shrug', 'embroidered cape'],
      footwear: ['embellished jutis', 'flat kolhapuris', 'embroidered heels', 'mojris'],
      accessories: [['jhumkas', 'bangles', 'maang tikka'], ['kundan necklace', 'chandbalis']]
    },
    dark_academia: {
      top: ['collared shirt', 'lace blouse', 'turtleneck knit'],
      bottom: ['plaid midi skirt', 'corduroy wide-leg pants', 'A-line wool skirt'],
      layer: ['tweed blazer', 'longline camel coat', 'oversized cardigan'],
      footwear: ['leather loafers', 'leather boots', 'Oxford shoes'],
      accessories: [['vintage satchel', 'wire-frame glasses', 'hair pins'], ['pearl necklace', 'watch']]
    },
    light_academia: {
      top: ['cream puff blouse', 'linen shirt', 'lace-collar knit'],
      bottom: ['pleated midi skirt', 'wide-leg linen pants', 'corduroy skirt'],
      layer: ['beige cardigan', 'cream trench', 'knit vest'],
      footwear: ['ballet flats', 'white loafers', 'strappy sandals'],
      accessories: [['pearl studs', 'dainty rings', 'small tote'], ['headband', 'thin necklace']]
    },
    luxury: {
      top: ['silk slip top', 'fitted structured top', 'sequin blouse'],
      bottom: ['tailored wide-leg trousers', 'pleated satin skirt', 'leather pants'],
      layer: ['designer structured blazer', 'fur-trim coat', 'longline evening coat'],
      footwear: ['stiletto heels', 'embellished sandals', 'leather knee boots'],
      accessories: [['designer bag', 'statement earrings', 'bracelet'], ['chain necklace', 'diamond studs']]
    },
    sporty: {
      top: ['sports bra + cropped hoodie', 'fitted tank', 'performance tee'],
      bottom: ['biker shorts', 'high-waist leggings', 'athletic shorts'],
      layer: ['zip-up jacket', 'cropped sweatshirt'],
      footwear: ['running sneakers', 'training shoes'],
      accessories: [['sports bag', 'cap', 'fitness watch'], ['headband', 'water bottle']]
    },
    ethnic_fusion: {
      top: ['printed peplum top', 'embroidered blouse', 'mirror-work crop top'],
      bottom: ['wide palazzo', 'asymmetric skirt', 'flared printed pants'],
      layer: ['sheer embroidered dupatta', 'beaded cape'],
      footwear: ['block heels', 'embellished flats', 'kolhapuris'],
      accessories: [['oxidised earrings', 'stack bangles'], ['tribal necklace', 'anklet']]
    },
    grunge: {
      top: ['band tee', 'ripped tank', 'cropped flannel'],
      bottom: ['distressed jeans', 'plaid skirt', 'vinyl skirt'],
      layer: ['oversized leather jacket', 'plaid overshirt', 'ripped denim jacket'],
      footwear: ['chunky combat boots', 'platform boots', 'creepers'],
      accessories: [['studded belt', 'choker', 'chain bag'], ['fishnet stockings', 'rings']]
    },
    bohemian: {
      top: ['lace peasant blouse', 'crochet top', 'embroidered wrap top'],
      bottom: ['flowy maxi skirt', 'tiered boho skirt', 'wide-leg printed pants'],
      layer: ['fringe vest', 'kimono wrap', 'embroidered jacket'],
      footwear: ['strappy sandals', 'wedge espadrilles', 'suede ankle boots'],
      accessories: [['layered necklaces', 'stack bracelets', 'feather earrings'], ['woven bag', 'headband']]
    },
    business_casual: {
      top: ['tailored blouse', 'fitted knit top', 'French-tuck shirt'],
      bottom: ['slim trousers', 'A-line midi skirt', 'tailored culottes'],
      layer: ['blazer', 'structured cardigan', 'belted coat'],
      footwear: ['block heels', 'pointed flats', 'loafers'],
      accessories: [['structured bag', 'minimal jewelry'], ['watch', 'silk scarf']]
    },
    cottagecore: {
      top: ['floral smocked dress', 'puff-sleeve blouse', 'eyelet cotton top'],
      bottom: ['tiered floral skirt', 'linen midi skirt'],
      layer: ['knit cardigan', 'sheer floral dress layer'],
      footwear: ['Mary Janes', 'ankle boots', 'ballet flats'],
      accessories: [['floral crown', 'wicker bag', 'pearl earrings']]
    },
    athleisure: {
      top: ['crop sports bra', 'fitted long-sleeve', 'oversized athletic tee'],
      bottom: ['high-waist seamless leggings', 'flare gym pants', 'bike shorts'],
      layer: ['pullover hoodie', 'open-front cardigan'],
      footwear: ['training sneakers', 'platform sneakers'],
      accessories: [['mini backpack', 'cap'], ['sports socks', 'fitness tracker']]
    }
  }
};

// ── Color Palettes ──────────────────────────────────────────────────────────

const COLOR_MAP = {
  fair: {
    summer: ['soft coral', 'powder blue', 'mint green', 'lavender', 'peach'],
    winter: ['burgundy', 'forest green', 'deep plum', 'cobalt blue', 'ruby red'],
    monsoon: ['teal', 'mustard yellow', 'terracotta', 'olive green'],
    autumn: ['camel', 'burnt orange', 'rust brown', 'warm beige', 'deep gold']
  },
  wheatish: {
    summer: ['white', 'off-white', 'turquoise', 'poppy red', 'lemon yellow'],
    winter: ['navy blue', 'deep emerald', 'maroon', 'mustard', 'chocolate brown'],
    monsoon: ['electric blue', 'orange', 'hot pink', 'lime green'],
    autumn: ['copper', 'rust', 'olive', 'warm cream', 'cognac']
  },
  dark: {
    summer: ['bright white', 'neon yellow', 'gold', 'fuchsia', 'electric orange'],
    winter: ['ivory', 'rich purple', 'royal blue', 'bright red', 'hot pink'],
    monsoon: ['cobalt', 'lime', 'hot pink', 'bright orange'],
    autumn: ['cognac', 'deep gold', 'burnt sienna', 'bold rust']
  }
};

// ── Tags Engine ─────────────────────────────────────────────────────────────

const TAG_MAP = {
  streetwear: ['genz', 'urban', 'hype', 'cool', 'trendy'],
  old_money: ['elegant', 'luxury', 'classic', 'refined', 'wealthy'],
  minimal: ['clean', 'modern', 'sleek', 'timeless'],
  formal: ['professional', 'power', 'authoritative'],
  traditional: ['ethnic', 'desi', 'cultural', 'festive'],
  korean: ['kpop', 'aesthetic', 'cute', 'soft'],
  y2k: ['retro', 'nostalgic', 'bold', 'genz'],
  dark_academia: ['moody', 'intellectual', 'vintage', 'literary'],
  light_academia: ['whimsical', 'dreamy', 'soft', 'studious'],
  cottagecore: ['nature', 'romantic', 'vintage', 'dreamy'],
  techwear: ['futuristic', 'utility', 'modern'],
  grunge: ['edgy', 'rock', 'rebellious', 'dark'],
  soft_girl: ['pastel', 'cute', 'feminine', 'kawaii'],
  luxury: ['high-end', 'glamorous', 'opulent'],
  sporty: ['active', 'athletic', 'energetic'],
  bohemian: ['free-spirited', 'artsy', 'earthy'],
  ethnic_fusion: ['fusion', 'modern-desi', 'contemporary'],
  business_casual: ['smart', 'professional', 'versatile'],
  vintage: ['retro', 'timeless', 'classic'],
  athleisure: ['comfortable', 'chic-sporty', 'functional']
};

// ── Generator Helpers ────────────────────────────────────────────────────────

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

let idCounter = 1;

function generateEntry(gender, style, occasion, season, weather, bodyType, skinTone, budget, ageGroup) {
  const genderOutfits = OUTFITS[gender] || OUTFITS.male;
  const styleData = genderOutfits[style] || genderOutfits.minimal;

  const colors = COLOR_MAP[skinTone]?.[season] || ['white', 'navy', 'beige'];
  const tags = TAG_MAP[style] || ['fashion', 'style'];
  const accessories = pick(styleData.accessories || [['minimal accessories']]);

  return {
    id: idCounter++,
    gender,
    age_group: ageGroup,
    body_type: bodyType,
    skin_tone: skinTone,
    occasion,
    season,
    weather,
    style,
    budget,
    outfit: {
      top: pick(styleData.top),
      bottom: pick(styleData.bottom),
      layer: pick(styleData.layer),
      footwear: pick(styleData.footwear),
      accessories
    },
    colors: pickN(colors, 3),
    tags: pickN(tags, 3),
    image_url: null,
    embedding_text: `${style} ${occasion} outfit for ${skinTone} skin ${bodyType} ${gender} ${ageGroup} in ${season} ${weather} weather ${budget} budget`
  };
}

// ── Build Dataset ────────────────────────────────────────────────────────────

function generateDataset(targetCount = 1200) {
  const dataset = [];

  // Ensure full coverage of important combinations first
  for (const gender of GENDERS) {
    for (const style of STYLES) {
      for (const occasion of OCCASIONS) {
        for (const season of SEASONS.slice(0, 2)) { // summer + winter
          const skinTone = pick(SKIN_TONES);
          const bodyType = pick(BODY_TYPES);
          const budget = pick(BUDGETS);
          const ageGroup = pick(AGE_GROUPS);
          const weather = pick(WEATHERS);
          dataset.push(generateEntry(gender, style, occasion, season, weather, bodyType, skinTone, budget, ageGroup));
        }
      }
    }
  }

  // Fill remaining with full random combinations
  while (dataset.length < targetCount) {
    dataset.push(generateEntry(
      pick(GENDERS),
      pick(STYLES),
      pick(OCCASIONS),
      pick(SEASONS),
      pick(WEATHERS),
      pick(BODY_TYPES),
      pick(SKIN_TONES),
      pick(BUDGETS),
      pick(AGE_GROUPS)
    ));
  }

  return dataset;
}

// ── Run ──────────────────────────────────────────────────────────────────────

const dataset = generateDataset(1200);
fs.writeFileSync('./fashion_dataset.json', JSON.stringify(dataset, null, 2));

console.log(`✅ Generated ${dataset.length} outfit entries → fashion_dataset.json`);
console.log(`   Styles covered: ${[...new Set(dataset.map(d => d.style))].length}`);
console.log(`   Occasions covered: ${[...new Set(dataset.map(d => d.occasion))].length}`);
console.log(`   Genders: ${[...new Set(dataset.map(d => d.gender))].join(', ')}`);
