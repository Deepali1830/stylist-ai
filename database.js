/* ═══════════════════════════════════════════
   DATABASE.JS — Multi-AI Stylist Knowledge Base
   Contains all styling rules and outfit data.
   ═══════════════════════════════════════════ */

const RULES = {
  body_type: {
    athletic: { fit: 'fitted', avoid: 'baggy oversized pieces', favor: 'slim-fit shirts, tapered trousers, structured blazers that highlight a lean frame' },
    average: { fit: 'structured', avoid: 'shapeless silhouettes', favor: 'well-fitting shirts, straight-leg trousers, layered jackets with clean lines' },
    heavy: { fit: 'relaxed drape', avoid: 'tight fits and horizontal stripes', favor: 'vertical lines, dark tones, A-line cuts, relaxed silhouettes that drape well' }
  },
  skin_tone: {
    fair: { best: 'pastel and bright colors', palette: ['lavender', 'soft pink', 'sky blue', 'coral', 'mint green', 'powder blue'] },
    wheatish: { best: 'jewel tones', palette: ['navy', 'maroon', 'emerald', 'deep teal', 'burgundy', 'royal purple'] },
    dark: { best: 'warm and bold colors', palette: ['burnt orange', 'gold', 'red', 'royal blue', 'ivory', 'bright yellow'] }
  },
  height: {
    short: 'Monochrome looks and vertical lines to elongate. Avoid long layers and oversized pieces.',
    medium: 'Balanced proportions — most silhouettes work beautifully. Freedom to experiment.',
    tall: 'Layered outfits, wide-leg trousers, and long coats look exceptional on tall frames.'
  },
  occasion: {
    Wedding: { fabric: 'silk, brocade, embroidered textures, velvet', vibe: 'opulent and regal' },
    Casual: { fabric: 'cotton, linen, light knits, chambray', vibe: 'comfortable and effortless' },
    Office: { fabric: 'crisp cotton, fine wool, structured blends', vibe: 'clean, minimal, and polished' },
    Party: { fabric: 'sequins, velvet, satin, bold synthetics', vibe: 'energetic and striking' },
    Date: { fabric: 'soft silk, lace, fine wool, cashmere', vibe: 'romantic and intimate' },
    Travel: { fabric: 'merino wool, technical knits, denim, jersey', vibe: 'practical and stylish' },
    Gym: { fabric: 'moisture-wicking mesh, spandex, compression knits', vibe: 'functional and athletic' }
  }
};

const OUTFITS = {
  traditional: {
    male: {
      Wedding: {
        Elegant: [
          {
            outfit: 'A midnight-blue raw silk sherwani with intricate gold threadwork across the front panel and collar, paired with off-white silk churidar. A matching dupatta draped over one shoulder adds regal flair. Subtle gold buttons and a concealed button placket give it a clean, modern-traditional finish.',
            colors: 'Midnight blue & gold, off-white & champagne accents',
            footwear: 'Hand-embroidered gold mojaris with pointed toe and cushioned insole',
            accessories: 'Gold kundan brooch, silk pocket square in ivory, statement cufflinks with sapphire stones, and a classic gold-dial watch'
          },
          {
            outfit: 'A charcoal grey bandhgala suit with silver piping and silk finish, paired with tailored black trousers. This minimalist yet royal look features a high collar and structured shoulders for a powerful presence.',
            colors: 'Charcoal grey & silver, onyx black accents',
            footwear: 'Black velvet loafers with silver crest embroidery',
            accessories: 'Silver lapel pin, platinum-finish watch, silk pocket square in slate grey'
          }
        ],
        Bold: {
          outfit: 'A deep crimson velvet sherwani with all-over gold zardozi embroidery, featuring a mandarin collar and structured shoulders. Paired with black silk churidar and a gold tissue dupatta. A showstopper piece that commands attention.',
          colors: 'Deep crimson & gold, black & antique gold',
          footwear: 'Black patent leather nagra shoes with gold embroidery',
          accessories: 'Ornate gold safa (turban) with brooch, multiple layered gold chains, emerald-studded buttons, and a black velvet clutch'
        },
        Minimalist: {
          outfit: 'An ivory raw silk achkan with self-tone embroidery and pearl buttons, featuring a Nehru collar and knee-length silhouette. Paired with matching slim-fit trousers. Understated luxury at its finest.',
          colors: 'Ivory & pearl, soft gold accents',
          footwear: 'Cream leather juttis with minimal gold thread work',
          accessories: 'Single pearl brooch, thin gold wristwatch, subtle gold cufflinks, pocket square in eggshell white'
        },
        Streetwear: {
          outfit: 'A cropped black bandhgala jacket with geometric gold prints over a high-neck white kurta, paired with tapered jogger-style churidars. Fusion streetwear meets traditional — edgy and unconventional.',
          colors: 'Black & geometric gold, white base layer',
          footwear: 'Black leather high-top sneakers with gold detailing',
          accessories: 'Chunky gold chain, black leather cuff bracelet, aviator sunglasses, streetwear-inspired sling bag'
        }
      },
      Casual: {
        Elegant: {
          outfit: 'A soft cotton short kurta in sage green with subtle hand-block fern prints, paired with tailored beige linen trousers. Rolled sleeves and a relaxed fit strike the perfect balance between polished and casual.',
          colors: 'Sage green & beige, earthy natural tones',
          footwear: 'Tan leather kolhapuri sandals with braided detailing',
          accessories: 'Leather-strap analog watch in brown, woven cotton sling bag, thin silver bracelet'
        },
        Bold: {
          outfit: 'A cobalt blue printed kurta with mirror-work accents and a Mandarin collar, paired with white linen pants. A statement piece that brings festival vibes to everyday wear.',
          colors: 'Cobalt blue & white, mirror-work silver accents',
          footwear: 'White canvas sneakers with ethnic embroidered patches',
          accessories: 'Stacked silver bangles, beaded necklace, round vintage sunglasses'
        },
        Minimalist: {
          outfit: 'A plain olive green short kurta in handloom cotton with a mandarin collar, paired with slim-fit off-white chinos. Clean, unfussy, and effortlessly cool.',
          colors: 'Olive green & off-white, muted earth tones',
          footwear: 'Minimalist tan leather slip-on loafers',
          accessories: 'Simple analog watch, thin leather wrist band'
        },
        Streetwear: {
          outfit: 'An oversized black kurta shirt with asymmetric hem, layered over ripped straight-fit light-wash jeans. A modern streetwear reinterpretation of the classic kurta.',
          colors: 'Black & light wash denim, monochrome base',
          footwear: 'Chunky white sneakers or black combat boots',
          accessories: 'Silver chain necklace, crossbody messenger bag, bucket hat'
        }
      },
      Office: {
        Elegant: {
          outfit: 'A fine-check charcoal Nehru jacket over a crisp white mandarin-collar kurta, paired with tailored slate-grey trousers. Traditional gravitas meeting modern boardroom authority.',
          colors: 'Charcoal & white, slate grey & silver accents',
          footwear: 'Polished brown leather oxford shoes',
          accessories: 'Slim leather belt in brown, classic silver watch, silk pocket square in maroon, subtle cufflinks'
        },
        Bold: {
          outfit: 'A deep wine-colored structured Nehru jacket with subtle paisley brocade over a black button-down kurta, paired with black slim trousers. A power move in the boardroom.',
          colors: 'Deep wine & black, paisley gold undertones',
          footwear: 'Black patent leather monk-strap shoes',
          accessories: 'Gold-framed glasses, wine-colored pocket square, leather portfolio bag'
        },
        Minimalist: {
          outfit: 'A navy blue cotton Nehru jacket with minimal stitching details over a white kurta, paired with beige chinos. Clean and professional without being overdressed.',
          colors: 'Navy & white, beige & minimal tones',
          footwear: 'Brown suede desert boots',
          accessories: 'Leather-strap watch, slim belt, no visible accessories — let the outfit speak'
        },
        Streetwear: {
          outfit: 'A cropped denim Nehru jacket over a graphic-print white kurta, paired with black jogger trousers. Startup-culture meets traditional — tech office approved.',
          colors: 'Denim blue, white & black, casual tones',
          footwear: 'White minimalist sneakers',
          accessories: 'Smart watch, canvas laptop tote, noise-cancelling headphones around neck'
        }
      }
    },
    female: {
      Wedding: {
        Elegant: {
          outfit: 'A handwoven Banarasi silk saree in deep maroon with an elaborate gold zari border and pallu, paired with a matching embroidered blouse with elbow-length sleeves. A sheer organza dupatta adds an ethereal layer for regal draping.',
          colors: 'Deep maroon & gold, ivory & plum accents',
          footwear: 'Gold embroidered juttis or embellished 3-inch block heels in champagne',
          accessories: 'Gold kundan choker with matching chandelier earrings, maang tikka, stack of gold bangles, embroidered potli clutch in maroon'
        },
        Bold: {
          outfit: 'A striking emerald green raw silk lehenga with heavy zardozi embroidery, paired with a deep-cut velvet blouse in the same shade. A contrasting magenta dupatta with gold kamdani work adds drama.',
          colors: 'Emerald green, magenta & gold, rich jewel tones',
          footwear: 'Gold strappy stilettos with rhinestone detailing',
          accessories: 'Statement polki necklace with emerald drops, oversized jhumkas, armband, crystal-encrusted clutch'
        },
        Minimalist: {
          outfit: 'A pastel pink organza saree with delicate scalloped borders and subtle embroidery, paired with a pearl-white silk blouse. Minimalist bridal elegance — less is truly more.',
          colors: 'Pastel pink & pearl white, soft gold thread',
          footwear: 'Nude pointed-toe kitten heels',
          accessories: 'Single-strand pearl necklace, pearl drop earrings, thin gold bangle, white satin clutch'
        },
        Streetwear: {
          outfit: 'A pre-draped saree gown in champagne gold with structured shoulders and a thigh-high slit, featuring modern geometric embroidery. A fusion showstopper that breaks traditional boundaries.',
          colors: 'Champagne gold, black geometric accents',
          footwear: 'Black strappy platform heels',
          accessories: 'Geometric gold ear cuffs, statement cocktail ring, metallic box clutch, slicked-back hair with gold pins'
        }
      },
      Casual: {
        Elegant: [
          {
            outfit: 'A soft mustard hand-block-printed cotton kurta with delicate mirror work around the neckline, paired with flowing ivory palazzos and a matching dupatta. Effortlessly graceful for a brunch or temple visit.',
            colors: 'Mustard & ivory, terracotta & off-white',
            footwear: 'Kolhapuri chappals in natural tan leather',
            accessories: 'Oxidized silver jhumkas, thin silver bangles, woven jute sling bag, small bindi'
          },
          {
            outfit: 'A powder-blue A-line kurta in Lucknowi Chikankari work, paired with white cigarette pants and a sheer chiffon dupatta. A breathable, elegant look that exudes summer freshness.',
            colors: 'Powder blue & white, silver threadwork',
            footwear: 'White pointed-toe juttis with floral embroidery',
            accessories: 'Pearl-drop earrings, stack of white glass bangles, silver clutch bag'
          }
        ],
        Bold: {
          outfit: 'A vibrant orange and teal printed Anarkali kurta with flared silhouette and gota-patti detailing, paired with contrasting teal churidar. Makes every street your runway.',
          colors: 'Vibrant orange & teal, gold gota-patti accents',
          footwear: 'Embroidered mojaris in teal',
          accessories: 'Chunky oxidized silver necklace, colorful lac bangles, mirror-work sling bag, statement nose ring'
        },
        Minimalist: {
          outfit: 'A plain white cotton kurta with pin-tuck detailing and a V-neck, paired with indigo blue palazzo pants. The kind of outfit that looks expensive because of how perfectly simple it is.',
          colors: 'White & indigo, clean two-tone',
          footwear: 'White canvas sneakers or flat sandals',
          accessories: 'Small gold studs, single thin gold chain, cotton tote bag'
        },
        Streetwear: {
          outfit: 'A cropped denim jacket layered over a tie-dye kurta dress that hits above the knee, paired with white chunky sneakers. Indo-western street style that turns heads.',
          colors: 'Denim blue, tie-dye multi, white base',
          footwear: 'White chunky platform sneakers',
          accessories: 'Layered choker necklaces, round sunglasses, canvas backpack, hair scrunchie in matching tie-dye'
        }
      },
      Office: {
        Elegant: {
          outfit: 'A structured cotton-silk kurta in navy with subtle gold piping along the neckline and sleeves, paired with tailored straight-cut cream trousers. Boardroom-ready ethnic authority.',
          colors: 'Navy & cream, gold piping accents',
          footwear: 'Pointed nude 2-inch block heels or ballet flats',
          accessories: 'Gold stud earrings, thin gold bangle, structured tan leather tote, thin leather belt'
        },
        Bold: {
          outfit: 'A jewel-toned ruby red silk kurta with statement sleeves and black thread embroidery, paired with black tailored trousers. Commands the room while honoring tradition.',
          colors: 'Ruby red & black, power tones',
          footwear: 'Black pointed stilettos',
          accessories: 'Gold cuff bracelet, ruby stud earrings, black structured handbag, red lip to match'
        },
        Minimalist: {
          outfit: 'A light grey handloom cotton kurta with a boat neck and three-quarter sleeves, paired with off-white straight pants. Uncluttered, professional, and perfectly serene.',
          colors: 'Light grey & off-white, muted neutrals',
          footwear: 'Flat pointed-toe mules in grey',
          accessories: 'Minimal silver watch, small silver studs, canvas laptop bag in grey'
        },
        Streetwear: {
          outfit: 'A short printed kurta in geometric patterns over black skinny jeans, with a structured crossbody bag. Modern office-casual with an ethnic edge.',
          colors: 'Geometric print in teal & black, monochrome base',
          footwear: 'White minimalist sneakers or black ankle boots',
          accessories: 'Smart watch, geometric silver earrings, crossbody bag, hair in messy bun with pins'
        }
      }
    }
  },

  modern: {
    male: {
      Wedding: {
        Elegant: {
          outfit: 'A slim-fit tuxedo in midnight navy with black satin peak lapels, paired with a crisp white wing-collar shirt, black silk bow tie, and matching cummerbund. Patent leather detailing on the shoes completes the James Bond moment.',
          colors: 'Midnight navy & black, white & satin sheen',
          footwear: 'Patent leather Oxford shoes in black',
          accessories: 'Silver cufflinks, slim gold watch, white pocket square folded in a presidential style, black leather card holder'
        },
        Bold: {
          outfit: 'A double-breasted velvet blazer in deep burgundy over a black silk turtleneck, paired with tailored black trousers and a chain belt. Red-carpet energy for the reception.',
          colors: 'Deep burgundy & black, gold chain accents',
          footwear: 'Black suede Chelsea boots with gold zipper detail',
          accessories: 'Gold signet ring, layered gold chains, dark-tinted aviators, black clutch bag'
        },
        Minimalist: {
          outfit: 'A perfectly tailored charcoal suit in Italian wool, paired with a light grey mock-neck sweater instead of a shirt. No tie, no fuss — modern Swedish minimalism meets wedding dress code.',
          colors: 'Charcoal & light grey, monochrome elegance',
          footwear: 'Matte black leather derby shoes',
          accessories: 'Slim titanium watch, no visible jewelry, grey wool overcoat if needed'
        },
        Streetwear: {
          outfit: 'A cropped black bomber jacket over an oversized white dress shirt, paired with wide-leg pleated trousers and chunky sneakers. Virgil Abloh-meets-wedding vibes.',
          colors: 'Black & white, chunky white accents',
          footwear: 'Off-White or designer chunky sneakers in white',
          accessories: 'Crossbody mini bag, statement watch, small hoop earring, slicked-back hair'
        }
      },
      Casual: {
        Elegant: {
          outfit: 'A relaxed-fit camp collar shirt in washed sage linen, half-tucked into pleated wide-leg chinos in cream. Minimal styling with maximum sophistication — like a Napa Valley wine tasting look.',
          colors: 'Sage green & cream, warm earthy neutrals',
          footwear: 'White leather sneakers or tan suede loafers',
          accessories: 'Gold-frame sunglasses, minimal gold chain, canvas tote bag, leather-strap watch'
        },
        Bold: {
          outfit: 'An oversized Hawaiian shirt in a bold tropical print over a fitted black tank, paired with straight-leg black linen shorts and slides. Main-character energy for a beach day or rooftop brunch.',
          colors: 'Bold tropical print — teal, coral & yellow on black',
          footwear: 'Black leather slides',
          accessories: 'Gold Cuban chain, beaded bracelet stack, retro sunglasses, straw crossbody bag'
        },
        Minimalist: {
          outfit: 'A fitted plain white crew-neck tee in premium Pima cotton, paired with perfectly-tailored navy chinos and clean white sneakers. The art of looking great by doing almost nothing.',
          colors: 'White & navy, clean duo-tone',
          footwear: 'White minimalist leather sneakers (Common Projects style)',
          accessories: 'Simple leather-strap watch, nothing else — intentionally bare'
        },
        Streetwear: {
          outfit: 'An oversized vintage band tee tucked into carpenter jeans, layered with a trucker jacket and finished with high-top sneakers. The weekend uniform of every hypebeast.',
          colors: 'Washed black, faded denim, vintage tones',
          footwear: 'Jordan 1 Retro High or Converse Chuck 70',
          accessories: 'Snapback cap, crossbody bag, layered silver chains, AirPods visible'
        }
      },
      Office: {
        Elegant: {
          outfit: 'A slim-fit charcoal suit with a subtle windowpane check, paired with a crisp light-blue Oxford shirt (no tie) and brown suede desert boots. Sharp, approachable, and boardroom-approved without being stuffy.',
          colors: 'Charcoal & light blue, brown leather accents',
          footwear: 'Brown suede desert boots or cognac leather loafers',
          accessories: 'Slim leather belt in brown, rose-gold watch, no-show socks, leather laptop sleeve'
        },
        Bold: {
          outfit: 'A deep emerald green blazer over a black mock-neck, paired with charcoal slim trousers. The kind of office look that gets you promoted because you look like you already were.',
          colors: 'Emerald green & black, charcoal base',
          footwear: 'Black leather monk-strap shoes',
          accessories: 'Gold tie bar (even without a tie), pocket square in emerald, leather portfolio'
        },
        Minimalist: {
          outfit: 'A stone-grey Italian-knit polo shirt tucked into high-waist tailored navy trousers, finished with a narrow leather belt. Quietly expensive — Scandinavian work style at its best.',
          colors: 'Stone grey & navy, muted sophisticated tones',
          footwear: 'Black minimal leather sneakers',
          accessories: 'Slim titanium watch, leather card case, nothing else'
        },
        Streetwear: {
          outfit: 'An unstructured cotton blazer in khaki over a white logo tee, paired with tapered tech pants and clean white sneakers. Silicon Valley startup meets fashion week.',
          colors: 'Khaki & white, tech-casual neutrals',
          footwear: 'White leather sneakers',
          accessories: 'Smart watch, AirPods Max, canvas tote with laptop pocket'
        }
      }
    },
    female: {
      Wedding: {
        Elegant: {
          outfit: 'A sculptural one-shoulder cape gown in champagne with subtle sequin detailing along the bodice, a cinched waist, and a flowing A-line skirt with a chapel train. Modern glamour with a couture edge.',
          colors: 'Champagne & gold, blush undertones',
          footwear: 'Strappy metallic gold heels or embellished pointed pumps',
          accessories: 'Delicate layered gold chains, teardrop diamond earrings, crystal clutch, hair swept into a low textured bun'
        },
        Bold: {
          outfit: 'A fitted red satin column dress with a dramatic thigh-high slit, structured shoulders, and a plunging V-neckline. Paired with a matching red lip and sheer opera gloves for maximum impact.',
          colors: 'Classic red & gold, old Hollywood glamour',
          footwear: 'Gold strappy stiletto sandals',
          accessories: 'Chunky gold choker, statement cocktail ring, red box clutch, hair in a sleek ponytail'
        },
        Minimalist: {
          outfit: 'A slip dress in ivory silk charmeuse with delicate spaghetti straps and a cowl neck, skimming the body with a bias cut. Paired with a cropped cashmere cardigan for the ceremony. The Row meets wedding season.',
          colors: 'Ivory & nude, whisper-quiet elegance',
          footwear: 'Nude pointed-toe kitten heels',
          accessories: 'Single diamond pendant, pearl studs, small satin clutch in blush, natural makeup'
        },
        Streetwear: {
          outfit: 'An oversized blazer dress in metallic champagne with padded shoulders, worn as a mini dress. Paired with thigh-high leather boots and a belt bag. Untraditional wedding guest energy that owns the room.',
          colors: 'Metallic champagne & black, edgy contrasts',
          footwear: 'Black leather thigh-high boots',
          accessories: 'Layered chain necklaces, multiple ear piercings, metallic belt bag, slicked-back hair'
        }
      },
      Casual: {
        Elegant: {
          outfit: 'An oversized oat-colored linen blazer over a ribbed white tank top, paired with high-waist wide-leg jeans in vintage wash. Effortless Parisian-chic that works from coffee shop to rooftop dinner.',
          colors: 'Oat, white & vintage denim — soft neutral palette',
          footwear: 'Tan leather flat sandals or white canvas espadrilles',
          accessories: 'Thin gold hoops, woven straw tote, layered delicate bracelets, tortoiseshell sunglasses'
        },
        Bold: {
          outfit: 'A printed silk midi wrap dress in a bold leopard-and-floral clash print, with puff sleeves and a cinched waist. Makes the farmer\'s market feel like fashion week.',
          colors: 'Leopard print with floral pops — amber, black & pink',
          footwear: 'Red strappy block-heel sandals',
          accessories: 'Chunky resin earrings, red leather crossbody bag, stacked wooden bangles, cat-eye sunglasses'
        },
        Minimalist: {
          outfit: 'A perfectly fitted black ribbed midi dress with a crew neck and cap sleeves. That\'s it. The kind of dress that works harder than your entire wardrobe combined.',
          colors: 'All black — monochrome power',
          footwear: 'White minimalist sneakers for day, black mules for evening',
          accessories: 'Single thin gold necklace, small black crossbody, clear-frame glasses'
        },
        Streetwear: {
          outfit: 'A cropped graphic hoodie in washed-out pastel, paired with high-waist wide-leg cargo pants in khaki. An oversized flannel shirt tied around the waist adds a grunge layer.',
          colors: 'Washed pastel, khaki & grunge earth tones',
          footwear: 'Nike Air Force 1 or New Balance 550',
          accessories: 'Bucket hat, layered chains, crossbody fanny pack, AirPods'
        }
      },
      Office: {
        Elegant: {
          outfit: 'A tailored double-breasted blazer in camel over a black silk camisole, paired with high-waist straight trousers in matching camel. Power dressing that whispers authority rather than shouting it.',
          colors: 'Camel & black, ivory accents',
          footwear: 'Pointed-toe black mules at 2.5-inch heel or nude pumps',
          accessories: 'Structured leather bag in black, thin gold cuff bracelet, small gold studs, leather portfolio'
        },
        Bold: {
          outfit: 'A cobalt blue power suit — cropped blazer with gold buttons over a black silk shell, paired with matching wide-leg trousers. The CEO-in-waiting look.',
          colors: 'Cobalt blue & black, gold button accents',
          footwear: 'Black patent stiletto pumps',
          accessories: 'Gold link necklace, structured cobalt clutch, gold watch, bold lip in red'
        },
        Minimalist: {
          outfit: 'A cream cashmere crewneck tucked into high-waist charcoal wide-leg trousers, topped with a long tailored coat in matching charcoal. Quiet luxury — old money office energy.',
          colors: 'Cream & charcoal, greyscale sophistication',
          footwear: 'Grey suede pointed-toe flats',
          accessories: 'Slim silver watch, small pearl studs, grey leather bag, hair in a low bun'
        },
        Streetwear: {
          outfit: 'An oversized boyfriend blazer in oat over a black crop top, paired with high-waist pleated trousers and chunky-sole loafers. Fashion-forward office attire for the creative industries.',
          colors: 'Oat & black, neutral creative tones',
          footwear: 'Black chunky-sole platform loafers',
          accessories: 'Oversized structured tote, layered gold chains, geometric earrings, clear-lens statement glasses'
        }
      }
    }
  },

  indo_western: {
    male: {
      Wedding: {
        Elegant: {
          outfit: 'A draped wine-red silk kurta with a long-line asymmetrical charcoal jacket featuring antique silver buttons. Paired with white dhoti-pants and a metallic silken sash. The ultimate fusion of imperial elegance and contemporary cutting-edge tailoring.',
          colors: 'Wine red, charcoal grey & antique silver',
          footwear: 'Black leather monk-strap shoes or metallic-finish mojari-sneakers',
          accessories: 'Silver tiered necklace, single oversized onyx ring, leather-strap vintage watch'
        },
        Bold: {
          outfit: 'A neon-piped black sherwani jacket worn over a graphic-print long tunic and distressed black slim trousers. High-octane fusion for the modern groom who breaks rules.',
          colors: 'Black & neon accents, monochromatic base',
          footwear: 'Patent black combat boots with silver buckles',
          accessories: 'Cyber-tech glasses, metallic belt bag, layered industrial chains'
        }
      },
      Casual: {
        Elegant: {
          outfit: 'A short linen kurta in pearl white with a mandarin collar, paired with navy blue slim-fit trousers and a casual unlined slate-grey blazer. Effortlessly sharp, perfectly balanced between East and West.',
          colors: 'Pearl white & navy, slate grey accents',
          footwear: 'Tan suede loafers or minimalist white leather sneakers',
          accessories: 'Woven leather belt, thin silver bracelet, classic aviators'
        }
      }
    },
    female: {
      Wedding: {
        Elegant: {
          outfit: 'A structured silk corset top inspired by Victorian bodices, paired with a heavily embroidered emerald green lehenga skirt featuring floral motifs. A sheer silk organza jacket replaces the traditional dupatta for a regal, high-fashion silhouette.',
          colors: 'Emerald green & gold, cream ivory base',
          footwear: 'Embellished stiletto heels in gold',
          accessories: 'Kundan choker, modern geometric earrings, metallic box clutch'
        }
      },
      Casual: {
        Elegant: {
          outfit: 'A long cotton tunic with high side-slits in indigo block-print, paired with distressed white boyfriend jeans and an oversized tan leather tote. Global-boho elegance meets urban practicality.',
          colors: 'Indigo blue & white, tan accents',
          footwear: 'Tan leather gladiators or platform espadrilles',
          accessories: 'Oxidized silver nose ring, layered beaded necklaces, round sunglasses'
        }
      }
    }
  },

  bohemian: {
    male: {
      Casual: {
        Elegant: {
          outfit: 'A loose-fit printed viscose shirt in floral-geometric patterns, worn open over a white tank, paired with wide-leg linen trousers in sand. A layered aesthetic that feels free, artistic, and expensive.',
          colors: 'Earth tones — sand, terracotta, and olive',
          footwear: 'Braided leather sandals or lived-in suede boots',
          accessories: 'Felt fedora, turquoise stone rings, layered hemp and leather bracelets'
        }
      }
    },
    female: {
      Casual: {
        Elegant: {
          outfit: 'A tiered maxi dress in crushed silk with paisley prints and bell sleeves. Layered with a fringed suede vest and finished with an oversized waist-belt. The epitome of free-spirited luxury.',
          colors: 'Rust orange, turquoise & cream',
          footwear: 'Suede ankle boots or beaded flat sandals',
          accessories: 'Large round-frame sunglasses, feather earrings, stacks of silver bangles'
        }
      }
    }
  },

  athleisure: {
    male: {
      Casual: {
        Minimalist: {
          outfit: 'A heavyweight technical cotton tee in charcoal, paired with tapered tech-ponte joggers and a sleek windbreaker jacket. Clean lines, performance fabrics, and a futuristic silhouette.',
          colors: 'Cool charcoal, matte black, and bright white',
          footwear: 'Reflective knit sneakers in silver and black',
          accessories: 'Smart watch with metallic band, technical nylon backpack, high-fidelity noise-cancelling headphones'
        }
      }
    },
    female: {
      Casual: {
        Minimalist: {
          outfit: 'A high-neck ribbed seamless top paired with wide-leg technical yoga-pants and a cropped oversized puffer vest. A monochromatic look that balances comfort with a high-fashion architectural shape.',
          colors: 'Sage green, moss, and off-white',
          footwear: 'Chunky-sole designer sneakers in white',
          accessories: 'Matte-finish reusable bottle, tech-fabric crossbody bag, minimalist hair-claws'
        }
      }
    }
  },

  budget: {
    male: {
      Wedding: {
        outfit: 'A well-fitted navy blazer from Zara or H&M (₹2,500) layered over a crisp white mandarin-collar shirt (₹700) and slim-fit beige chinos (₹900). Add a printed pocket square from Amazon (₹200). Looks ₹15,000 — costs under ₹4,500.',
        colors: 'Navy, white & beige — the timeless affordable trio',
        footwear: 'Brown formal derbies from local brand (₹1,200)',
        accessories: 'Slim leather belt (₹400), basic analog watch (₹800), pocket square (₹200)'
      },
      Casual: {
        outfit: 'A plain olive crew-neck tee in good cotton (₹400) with dark-wash straight-leg jeans (₹800) and clean white sneakers (₹700). The golden rule of budget dressing: fit beats brand, always.',
        colors: 'Olive & dark indigo — earthy and versatile',
        footwear: 'White canvas sneakers (₹700) or slip-ons (₹500)',
        accessories: 'Leather-strap analog watch (₹600), woven cotton bracelet (₹100)'
      },
      Office: {
        outfit: 'Navy chinos (₹900) with a well-ironed light-blue button-down (₹600) and brown loafers from a local brand (₹1,000). Professional and sharp — total under ₹2,500.',
        colors: 'Navy & light blue, warm brown accents',
        footwear: 'Brown faux-leather loafers (₹1,000)',
        accessories: 'Slim leather belt (₹400), simple analog watch (₹600), no-frills leather wallet'
      }
    },
    female: {
      Wedding: {
        outfit: 'A ready-to-wear georgette saree in wine red with pre-stitched pleats (₹1,500) from Meesho or Myntra, paired with a contrast gold blouse (₹600). Add a rented statement necklace (₹300) for instant glam — total under ₹2,500.',
        colors: 'Wine red & gold — affordable luxury',
        footwear: 'Gold block heels from local store (₹800)',
        accessories: 'Rented kundan necklace set (₹300), small clutch from Meesho (₹400), gold bangles you already own'
      },
      Casual: {
        outfit: 'High-waist mom jeans from Zara/H&M sale (₹800), a basic white crew-neck tee (₹300), and a thrifted denim jacket (₹500). The outfit costs ₹1,600 but looks like a fashion influencer shot.',
        colors: 'White, denim blue & neutral basics',
        footwear: 'White canvas sneakers (₹600) or flat sandals (₹400)',
        accessories: 'Gold hoop earrings (₹200), canvas tote (₹300), hair scrunchie'
      },
      Office: {
        outfit: 'Black straight-fit trousers from Max (₹700), a tucked-in pastel blouse from Westside (₹500), and a structured tote bag from Amazon (₹800). Polished office look for under ₹2,000.',
        colors: 'Black & pastel — clean professional contrast',
        footwear: 'Black pointed ballet flats (₹600) or block heels (₹900)',
        accessories: 'Thin belt (₹300), small stud earrings (₹150), structured tote (₹800)'
      }
    }
  }
};
