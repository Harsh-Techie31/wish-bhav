export type Product = {
  id: string;
  name: string;
  shortName: string;
  category: "veg" | "nonveg";
  description: string;
  keyIngredients: string[];
  heroImage: string | null;
  rawImage: string | null;
  pdpImage: string | null;
  iterations: { src: string; label: string; rejected: boolean; reason?: string }[];
  prompt: string;
  negativePrompt: string;
  aiTool: string;
  creativeDirection: {
    angle: string;
    lighting: string;
    surface: string;
    props: string;
    garnish: string;
    cropFill: string;
  };
  hasProductionData: boolean;
  price: string | null;
};

export const products: Product[] = [
  {
    id: "veg-pad-thai",
    name: "Veg Pad Thai Noodles",
    shortName: "Veg Pad Thai",
    category: "veg",
    description: "Silky flat rice noodles wok-tossed with golden tofu, crisp broccoli, sweet carrot ribbons and roasted peanuts in a tamarind-kissed Pad Thai sauce.",
    keyIngredients: ["Flat rice noodles", "Tofu", "Broccoli", "Roasted peanuts", "Carrot", "Red peppers", "Bean sprouts"],
    heroImage: "/images/products/veg-pad-thai.webp",
    rawImage: "/images/raw/veg-pad-thai-raw.webp",
    pdpImage: "/images/products/veg-pad-thai.webp",
    iterations: [
      { src: "/images/iterations/veg-pad-thai-iter1.webp", label: "Iteration 1", rejected: true, reason: "Dark green backdrop — wide frame, fork & glass visible, lacks product focus" },
      { src: "/images/iterations/veg-pad-thai-iter2.webp", label: "Iteration 2", rejected: true, reason: "Dark green — tofu scattered across bowl, no dominant hero placement" },
      { src: "/images/iterations/veg-pad-thai-iter3.webp", label: "Iteration 3", rejected: true, reason: "Wrong surface — warm beige with wooden board, tofu lift action but off-brief background" },
      { src: "/images/iterations/veg-pad-thai-iter4.webp", label: "Iteration 4", rejected: true, reason: "Wrong surface — warm beige with wooden board, off-brief" },
      { src: "/images/iterations/veg-pad-thai-iter5.webp", label: "Iteration 5", rejected: true, reason: "Wrong background — sage green linen, noodle-lift action but style mismatch" },
      { src: "/images/iterations/veg-pad-thai-iter6.webp", label: "Iteration 6", rejected: true, reason: "Wrong background — sage green, over-scattered garnish arrangement" },
    ],
    prompt: `45-degree overhead food photography of Veg Pad Thai Noodles in a wide white ceramic bowl, bowl occupies approximately 55-60% of the square frame and is centered slightly above the midpoint, flat rice noodles tossed with prominently visible golden pan-seared tofu cubes (at least 6-8 large rectangular pieces with clearly visible crispy golden-brown crust on edges, placed intentionally on top of the noodles as the hero protein), scrambled egg ribbons woven through the noodles, crunchy bean sprouts, julienned carrot, thin red bell pepper strips, sliced baby corn rounds, a few pieces of broccoli floret, spring onion rings garnished on top, single lime wedge resting on the bowl rim at 10 o'clock position.

The tofu must be the visual anchor — large, golden, crispy-edged cubes sitting proudly on top, catching the light with a slight sheen, clearly distinguishable as tofu and not chicken. They should have a firm, pan-fried texture with visible browning and slight char marks on flat surfaces, not soft or pale or crumbly.

Surface and background: deep dark forest-green textured linen or fabric surface, rich and moody, with subtle woven texture visible but not distracting, no wood grain, no marble, no sage or pastel tones.

Underneath the bowl: no napkin, keep it clean — just the dark green surface visible around the bowl.

Props placement — minimal, only 3 props total, placed at the edges of the frame and partially cropped:
- A gold-toned metal fork placed diagonally at the bottom-left of the frame, partially cropped at the edge
- 5-6 loose roasted peanuts and 3-4 sliced red chilli rings scattered casually together on the surface at the top-left area, loose on the surface as styling props
- A ribbed clear glass with water and a thin lime wheel floating in it, placed at the top-right corner, partially cropped

No pinch bowls, no small containers, no extra vessels.

Bottom-right quadrant: completely clear, only the dark green surface visible.

Lighting: warm directional light from the upper-left side, creating gentle shadows falling toward the lower-right, warm golden highlights catching the crispy tofu edges and noodle gloss.

Color palette: warm golden-amber noodles and deep golden tofu cubes against the dark forest-green surface, pops of red from chilli rings and bell pepper, bright green from spring onion and broccoli, creamy white bowl providing contrast.

Key visual differences from Chicken Pad Thai:
- Dark forest-green background instead of warm cream
- Golden crispy tofu cubes prominently on top instead of seared chicken pieces
- Additional vegetables visible (baby corn, broccoli)
- Moody, darker overall tone
- Gold fork instead of wooden chopsticks
- Glass with lime water instead of ceramic pinch bowl

Format: 2000x2000px, square, high-resolution food photography.`,
    negativePrompt: "No pinch bowls, no small containers, no extra vessels for condiments. No fake steam, no artificial mist. No text, no logos, no watermarks. Nothing plastic, waxy, or over-saturated. Must be immediately distinguishable from Chicken Pad Thai at thumbnail size on the app grid. Bottom-right quadrant completely clear.",
    aiTool: "Flora, Higgsfield — Models: ChatGPT Sunburst 2.5, Gemini Nano Banana Pro",
    creativeDirection: {
      angle: "45° overhead; bowl slightly above centre; no chopsticks on surface",
      lighting: "Warm directional from upper-left; golden highlights on tofu edges and noodle gloss; soft falloff toward right",
      surface: "Deep dark forest-green textured linen — moody, rich; intentionally darker than Chicken Pad Thai for app grid differentiation",
      props: "Gold fork (bottom-left, partial); peanuts + red chilli rings scattered together (top-left); ribbed glass with lime wheel (top-right, partial) — 3 props total, bottom-right clear",
      garnish: "Golden crispy tofu cubes as hero on top; spring onion rings; scrambled egg ribbons; lime wedge on bowl rim at 10 o'clock",
      cropFill: "55–60% bowl fill, square frame",
    },
    hasProductionData: true,
    price: null,
  },
  {
    id: "chicken-pad-thai",
    name: "Chicken Pad Thai Noodles",
    shortName: "Chicken Pad Thai",
    category: "nonveg",
    description: "Glossy flat rice noodles with seared chicken, crisp sprouts, scrambled egg, roasted peanuts and a tangle of carrot and peppers in authentic Pad Thai sauce.",
    keyIngredients: ["Flat rice noodles", "Chicken", "Roasted peanuts", "Carrot", "Red peppers", "Bean sprouts", "Scrambled egg"],
    heroImage: "/images/products/chicken-pad-thai.webp",
    rawImage: "/images/raw/chicken-pad-thai-raw.webp",
    pdpImage: "/images/products/chicken-pad-thai.webp",
    iterations: [
      { src: "/images/iterations/chicken-pad-thai-iter1.webp", label: "Iteration 1", rejected: true, reason: "Wrong surface — warm beige, no wooden board, composition too plain" },
      { src: "/images/iterations/chicken-pad-thai-iter2.webp", label: "Iteration 2", rejected: true, reason: "Wrong background — sage green linen, style mismatch with brief" },
      { src: "/images/iterations/chicken-pad-thai-iter3.webp", label: "Iteration 3", rejected: true, reason: "Wrong surface — warm beige with wooden board, water glass in frame" },
    ],
    prompt: `45-degree overhead food photography of Chicken Pad Thai in a wide white ceramic bowl, bowl occupies approximately 50-55% of the square frame and is centered slightly left of center, flat rice noodles with visible seared boneless chicken pieces, scrambled egg ribbons, bean sprouts, roasted crushed peanuts, julienned carrot and red bell pepper strips, spring onion rings garnished on top, single lime wedge resting on the bowl rim at 10 o'clock position, chopsticks lifting a tangle of noodles from the bowl showing separation and gloss — chopsticks are held in the lift action only, no loose chopsticks placed on the surface anywhere.

Surface and base: the white ceramic bowl sits on a round dark walnut wooden serving board with a natural live edge and visible wood grain, the board is circular with an organic slightly irregular edge (not a perfect circle, not rectangular), approximately 20% larger in diameter than the bowl so a ring of the dark wood is visible around the bowl, giving it a premium plated-on-wood gourmet presentation. The board sits on a warm off-white/soft cream matte surface matching the light neutral tones seen in the Swish SKU reference images — think warm parchment-white, not stark white, not grey, with a subtle plaster-like texture.

Props placement — minimal, intentional, and realistic. All props placed in the top half and left side of the frame. Bottom-right quadrant kept completely empty and clean:
- A small round ceramic ramekin (speckled stoneware, earthy tone) with a dark tamarind-brown Pad Thai dipping sauce or extra crushed peanuts, placed at the top-right of the frame, partially cropped at the edge
- One halved lime and one lime wedge placed casually on the cream surface at the top-center, slightly behind the wooden board, not touching the board
- 3-4 sliced red chilli rings scattered loosely on the cream surface to the top-left of the board
- A small cluster of 2-3 fresh Thai basil leaves and a tiny sprig of coriander placed on the surface at the left side, just outside the wooden board edge
- 5-6 loose roasted peanuts scattered naturally on the cream surface near the top-left area
- A tall ribbed glass of water with a lemon slice, placed at the top-right corner, partially cropped

Lighting: soft warm directional light from the top-left, gentle shadow cast to the bottom-right, warm highlights on the noodle gloss and chicken sear marks, the dark walnut board catches a subtle sheen.

Color palette: warm golden-amber noodles contrasting against the dark walnut board, sitting on the warm cream surface. Pops of red from chilli and peppers, bright green from herbs, golden-brown seared chicken, creamy white bowl.

Format: 2000x2000px, square, high-resolution food photography.`,
    negativePrompt: "No green cloth, no napkin, no parchment paper, no loose chopsticks on the surface, no rectangular boards, no fake steam, no artificial mist, no text, no logos, no watermarks, no extra ingredients not listed in the dish, nothing plastic, waxy, or over-saturated. Bottom-right quadrant completely clear.",
    aiTool: "Flora, Higgsfield — Models: ChatGPT Sunburst 2.5, Gemini Nano Banana Pro",
    creativeDirection: {
      angle: "45° overhead; bowl slightly left of centre; chopsticks in noodle-lift action only — none lying on surface",
      lighting: "Warm directional from upper-left; highlights catch noodle gloss and chicken sear marks; shadow falls bottom-right; warm natural, not moody",
      surface: "Warm cream/off-white matte plaster + round dark walnut live-edge wooden board under bowl (board ~20% larger than bowl diameter)",
      props: "Speckled ramekin (top-right, partial); halved lime + wedge (top-centre, behind board); red chilli rings (top-left); Thai basil + coriander sprig (left); peanuts (top-left); ribbed glass with lemon (top-right, partial) — bottom-right completely clear",
      garnish: "Golden seared boneless chicken pieces on top (must be unmistakably chicken, not pale); spring onion rings; scrambled egg ribbons; peanuts; lime wedge on bowl rim",
      cropFill: "50–55% bowl fill, square frame",
    },
    hasProductionData: true,
    price: null,
  },
  {
    id: "veg-green-thai-curry",
    name: "Veg Green Thai Curry with Jasmine Rice",
    shortName: "Veg Green Thai Curry",
    category: "veg",
    description: "Rich coconut green curry with broccoli, pumpkin, baby corn and tofu, served with aromatic jasmine rice and finished with fresh Thai basil.",
    keyIngredients: ["Green coconut curry", "Broccoli", "Baby corn", "Pumpkin", "Tofu", "Jasmine rice", "Thai basil"],
    heroImage: "/images/products/veg-green-thai-curry.webp",
    rawImage: "/images/raw/veg-green-thai-curry-raw.webp",
    pdpImage: "/images/products/veg-green-thai-curry.webp",
    iterations: [
      { src: "/images/iterations/veg-green-thai-curry-iter1.webp", label: "Iteration 1", rejected: true, reason: "Round wooden board — peanuts as props, off-brief garnish direction" },
      { src: "/images/iterations/veg-green-thai-curry-iter2.webp", label: "Iteration 2", rejected: true, reason: "Round wooden board — over-garnished with herbs, wider shot loses focus" },
      { src: "/images/iterations/veg-green-thai-curry-iter3.webp", label: "Iteration 3", rejected: true, reason: "Rectangular board — green chilies as props, wrong surface shape" },
      { src: "/images/iterations/veg-green-thai-curry-iter4.webp", label: "Iteration 4", rejected: true, reason: "Rectangular board — different angle, still wrong surface and prop direction" },
      { src: "/images/iterations/veg-green-thai-curry-iter5.webp", label: "Iteration 5", rejected: true, reason: "Wrong background — sage green, no wooden board, steam effect overdone" },
      { src: "/images/iterations/veg-green-thai-curry-iter6.webp", label: "Iteration 6", rejected: true, reason: "Wrong background — sage green, rice component cut from frame" },
    ],
    prompt: `Professional food photography of a Veg Green Thai Curry Bowl served alongside a bowl of fluffy jasmine rice, shot for a premium food delivery app listing.

Camera & Angle: Elevated 45–60 degree angle, mimicking how a diner would naturally look down at a meal placed on a table. Not a flat lay, not eye-level — the classic food app perspective that gives depth while clearly showing the food surface and textures.

Composition & Layout: Two bowls placed on a rustic wooden rectangular serving board — the green Thai curry bowl positioned in the foreground-left, the jasmine rice bowl in the mid-right. A simple steel spoon placed diagonally on the right side of the frame, leading the eye inward. A small condiment element (tiny ceramic bowl of crushed roasted peanuts) placed in the soft-focus background-left area. Loose triangular composition. Clean negative space on the right and bottom edges. Minimal, uncluttered, premium but homestyle.

Background: Warm muted beige/off-white surface, matching the Rajma Rice Bowl background tone.

The Curry Bowl: Veg green Thai curry in a matte-finish ceramic/stoneware bowl. The curry must look authentically green with a rich coconut milk base — glossy but NOT oily. Visible vegetables: broccoli florets, sliced baby corn, chunks of firm tofu (clearly identifiable as tofu, not chicken), Thai eggplant rounds, sliced red bell pepper strips. The curry surface should have a natural, slightly uneven coconut cream swirl. No fake steam. Garnished with 2–3 fresh Thai basil leaves and thinly sliced red chili rings.

The Rice Bowl: Fluffy, long-grain jasmine rice in a slightly larger matte ceramic bowl. Rice grains distinctly separate, slightly translucent — characteristic jasmine rice appearance. A single Thai basil leaf on top. Rice freshly steamed, individual grains visible, not clumpy.

Garnishes & Props: A few scattered fresh Thai basil leaves and a small coriander sprig on the wooden board; 3–4 thin red chili slices near the curry bowl; a few crushed roasted peanuts on the board surface; a small woven rattan coaster in the background. No lemon or lime wedges. Steel spoon resting on the right side.

Lighting: Soft, diffused light from the top-left. Large softbox or natural window light feel. Gentle highlights on the curry surface showing coconut milk sheen. Subtle highlights on jasmine rice grains. Soft shadows, no harsh or dramatic lighting.

Color palette: Warm beige background. Rich green curry with coconut cream tones. Bright white jasmine rice. Deep green from basil and broccoli, red from chili and bell pepper, golden-beige from tofu. Earthy wood tones from serving board.

Depth: Sharp focus on both bowls. Slight shallow DOF softening background (peanut bowl, rattan coaster). Three depth layers: foreground curry bowl + spoon, midground rice bowl + board, background peanut bowl + garnish.

Mood: Clean, minimal, premium food delivery listing quality. Warm and inviting. Clearly vegetarian at a glance — tofu and vegetables unmistakably visible.

Alternate framing (Option B): A top-down angled shot of Thai green curry in a round ceramic bowl with broccoli, baby corn, zucchini, red bell pepper, mushrooms, fresh basil and red chilies in creamy green coconut broth, placed on a rustic wooden cutting board alongside a bowl of steamed white rice with cilantro, silver spoon resting on the board, scattered green chilies, dried chili flakes and fresh basil as props, sage green background, soft natural studio lighting, photorealistic, high-resolution food photography.`,
    negativePrompt: "No fake steam, no lemon or lime, no chopsticks, no white balance making curry look grey, no plastic or waxy textures, no AI uncanny symmetry. Bottom-right quadrant completely clear.",
    aiTool: "Flora, Higgsfield — Models: ChatGPT Sunburst 2.5, Gemini Nano Banana Pro",
    creativeDirection: {
      angle: "60° near top-down; two bowls in frame — curry left, rice right; angle shows curry colour and veg without losing rice texture",
      lighting: "Warm directional from upper-left; highlights catch glossy curry surface; rice grains get individual definition; same light family as Chicken Pad Thai",
      surface: "Warm cream/off-white matte plaster; two Swish kraft bowls (truthful to what customer receives)",
      props: "Fresh Thai basil sprig (top-left, on surface); halved lime (top-centre, behind bowls); 2-3 red chilli rings scattered loose (left side); ribbed glass with lime wheel (top-right, partial) — bottom-right clear",
      garnish: "Glossy vibrant green curry (not flat or grey); broccoli, pumpkin, baby corn visible in sauce; spring onion on rice bowl",
      cropFill: "~65% fill, loose two-bowl composition; curry bowl hero left, rice bowl right",
    },
    hasProductionData: true,
    price: null,
  },
  {
    id: "chicken-green-thai-curry",
    name: "Chicken Green Thai Curry with Jasmine Rice",
    shortName: "Chicken Green Thai Curry",
    category: "nonveg",
    description: "Tender chicken in a fragrant coconut green curry with seasonal vegetables, served with steamed jasmine rice and fresh Thai basil.",
    keyIngredients: ["Green coconut curry", "Chicken", "Broccoli", "Baby corn", "Jasmine rice", "Spring onion", "Thai basil"],
    heroImage: null,
    rawImage: null,
    pdpImage: null,
    iterations: [],
    prompt: `A close-up food photography shot of a Thai green chicken curry served in a matte ceramic bowl placed on a rustic wooden serving board. The curry is rich and creamy with a vibrant green coconut milk base. The bowl is generously loaded with large, clearly visible golden-seared bone-in and boneless chicken pieces as the hero ingredient, prominently surfacing above the curry. Only minimal vegetables are present — a few slices of zucchini and two or three baby corn pieces tucked between the chicken. Fresh Thai basil leaves and sliced red chilies are scattered on top as garnish. A bowl of steamed white jasmine rice topped with a single cilantro sprig sits beside it on the wooden board. A stainless steel spoon rests on the right side of the board. In the background and around the board, styled props include whole red chilies, halved zucchini slices, raw baby corn, and a few dried chili flakes scattered naturally for a rustic feel. The background is a warm muted sage green surface. The lighting is soft, directional studio light from the upper left, creating gentle shadows and highlighting the glossy texture of the curry and the juicy chicken pieces. Shot from a 45-degree angle, hyper-realistic, commercial food photography style, ultra-detailed, 8K resolution.`,
    negativePrompt: "No fake steam, no chopsticks, no grey or flat light, no extra ingredients not listed, nothing plastic or waxy. Chicken must not be submerged or pale — golden-seared pieces must surface above curry. Bottom-right quadrant completely clear.",
    aiTool: "Flora, Higgsfield — Models: ChatGPT Sunburst 2.5, Gemini Nano Banana Pro",
    creativeDirection: {
      angle: "45° three-quarter; close-up, slightly intimate; shows glossy curry, chicken above sauce, rice bowl beside — all in one frame",
      lighting: "Soft directional from upper-left; gentle shadows fall right; highlights catch curry gloss and seared chicken surface; warm studio quality",
      surface: "Warm muted sage green — lighter and warmer than Veg Pad Thai dark forest green; matte ceramic bowl on rustic wooden serving board",
      props: "Whole red chillies on surface around board; halved zucchini slices scattered near board; raw baby corn pieces placed naturally; dried chilli flakes scattered loosely; steel spoon resting right side of board — bottom-right clear",
      garnish: "Golden-seared chicken pieces surfacing above curry (must be first thing eye lands on); fresh Thai basil + sliced red chilli on curry top; single coriander sprig on rice bowl",
      cropFill: "Close-up, intimate two-bowl composition on wooden board; chicken clearly identifiable and prominent",
    },
    hasProductionData: true,
    price: null,
  },
  {
    id: "veg-combo",
    name: "Combo — Veg Pad Thai + Veg Green Thai Curry",
    shortName: "Veg Combo",
    category: "veg",
    description: "One generous meal: a full portion of Veg Pad Thai noodles plus Veg Green Thai Curry, all three containers reading as one satisfying spread.",
    keyIngredients: ["Veg Pad Thai", "Veg Green Thai Curry", "Jasmine rice"],
    heroImage: null,
    rawImage: null,
    pdpImage: null,
    iterations: [],
    prompt: `Professional food photography, top-down angled shot of a Thai combo meal arranged in a staggered triangular composition on a warm beige surface, inspired by a multi-dish plating layout with three items placed at varying heights and depths creating visual hierarchy.

Top-right position: A white ceramic bowl sitting on a round rustic wooden board, filled with veg pad thai noodles — glossy flat rice noodles tossed with golden pan-seared tofu cubes, red bell pepper strips, purple cabbage shreds, broccoli florets, baby corn slices, bean sprouts, edamame, sliced spring onions, and crushed peanuts. A bamboo chopstick lifts noodles and tofu from the bowl. A lime wedge rests on the edge. Scattered red chili slices and peanuts around the wooden board.

Middle-left position: A matte beige ceramic bowl filled with veg green Thai curry — creamy green coconut curry with visible baby corn, broccoli florets, zucchini chunks, sliced mushrooms, red bell pepper pieces, topped with fresh Thai basil leaves and sliced red chilies. The curry has a rich, slightly glossy green-yellow coconut milk base with a thin oil sheen.

Bottom-center position: A smaller matte beige ceramic bowl of fluffy steamed jasmine rice, perfectly mounded with a sprig of fresh cilantro on top. The rice is pure white, long-grain, with individual grains visible and slightly glistening.

A stainless steel spoon placed casually beside the curry bowl. A few scattered Thai basil leaves, green chilies, and crushed red chili flakes as styling props on the beige surface. No wooden serving board under the curry and rice — they sit directly on the surface. Soft, warm directional lighting from the upper left creating gentle shadows. Shallow depth of field with the front dish in sharpest focus. Clean, minimal, modern foodtech app aesthetic. Shot with a 85mm lens, f/2.8, warm neutral color grading, high resolution, commercial food photography quality.`,
    negativePrompt: "No wooden serving board under curry or rice (they sit directly on surface), no napkin, no extra ingredients not listed, no fake steam, no artificial mist. Bottom-right quadrant completely clear.",
    aiTool: "Flora, Higgsfield — Models: ChatGPT Sunburst 2.5, Gemini Nano Banana Pro",
    creativeDirection: {
      angle: "Top-down angled; staggered triangular composition — noodles top-right (elevated on board), curry middle-left, rice bottom-centre; two layout options: Option A diagonal spread, Option B front-on hero",
      lighting: "Soft warm directional from upper-left; gentle shadows fall right; shallow DOF — front dish (rice) sharpest, noodles and curry slightly softer behind",
      surface: "Warm beige/cream; all three containers sit directly on surface — no tray, no unifying board (noodle bowl on round wooden board only); surface is the stage",
      props: "Bamboo chopstick lifting noodles from noodle bowl; lime wedge on noodle bowl rim; scattered red chilli slices + peanuts around wooden board; Thai basil leaves scattered between three bowls; green chillies + chilli flakes on surface; steel spoon beside curry bowl — bottom-right completely clear",
      garnish: "Golden tofu + peanuts on noodles; Thai basil + red chilli on curry; cilantro sprig on rice; loose basil + chilli flakes between containers",
      cropFill: "Three containers all identifiable; triangular staggered depths; no container hidden or dominated; spread reads as one generous meal",
    },
    hasProductionData: true,
    price: null,
  },
];

export const moodboardColors = [
  { name: "Swish Green", hex: "#33C362", source: "Swish brand primary", role: "Primary brand CTA, add button, veg indicator" },
  { name: "Warm White", hex: "#F5F0E8", source: "Serveware / bowls", role: "Background surface, card base" },
  { name: "Jasmine Cream", hex: "#EDE8D0", source: "Jasmine rice", role: "Hover states, section backgrounds" },
  { name: "Peanut Orange", hex: "#C4712A", source: "Roasted peanuts, chicken", role: "Warmth accent, non-veg signal" },
  { name: "Chilli Red", hex: "#C0392B", source: "Garnish accent", role: "Non-veg indicator, spice signal" },
  { name: "Curry Yellow-Green", hex: "#8FA832", source: "Green curry", role: "Category accent, veg flavour" },
  { name: "Jade", hex: "#1C4A47", source: "Background depth", role: "Deep hero text, premium sections" },
];

export const catalogueItems = [
  { name: "Grilled Chicken Wrap", bg: "Warm cream/off-white stone", angle: "45° three-quarter", light: "Soft, top-left, warm" },
  { name: "Chutney Cheese Sandwich", bg: "Light beige stone", angle: "45° three-quarter", light: "Soft diffused, warm" },
  { name: "Chicken Tikka Roll", bg: "Off-white stone + wood board", angle: "45° elevated", light: "Warm side-left" },
  { name: "Rajma Rice Bowl", bg: "Warm cream stone", angle: "45° angled top", light: "Soft diffused, warm top-left" },
  { name: "Moong Dal Khichdi", bg: "Light warm grey stone", angle: "Near top-down, slight tilt", light: "Side-right, soft shadows" },
  { name: "Full House Veg Platter", bg: "Warm peach/amber fabric", angle: "Flat-lay overhead", light: "Even, diffused overhead" },
  { name: "Chole Kachori Chaat", bg: "Cool light grey stone", angle: "30–45° elevated", light: "Soft top-left" },
  { name: "Crispy Fried Paneer Burger", bg: "Warm cream/sand stone", angle: "45° three-quarter", light: "Hard side-left, defined shadows" },
  { name: "Cottage Cheese Steak", bg: "Dark forest green fabric", angle: "45° overhead", light: "Soft top-right, moody" },
  { name: "Veg Alfredo Penne + Fries", bg: "Warm peach/nude fabric", angle: "45° three-quarter", light: "Soft even warm" },
];
