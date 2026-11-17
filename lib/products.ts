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
    heroImage: "/images/products/veg-pad-thai.png",
    rawImage: "/images/raw/veg-pad-thai-raw.png",
    pdpImage: "/images/products/veg-pad-thai.png",
    iterations: [],
    prompt: "Detailed prompt for Veg Pad Thai in a white ceramic bowl on a warm cream surface with minimal props — see shoot sheet in Figma.",
    negativePrompt: "No fake steam, no watermarks, no clumped noodles, no flat grey light, no food in bottom-right quadrant.",
    aiTool: "AI image generation (documented in Figma shoot sheet)",
    creativeDirection: {
      angle: "45° elevated overhead",
      lighting: "Soft left side light, warm golden tone, subtle shadows",
      surface: "Warm cream / off-white matte surface",
      props: "Max 2 — small ramekin, lime wedge",
      garnish: "Roasted peanuts, spring onion rings, red chilli rings",
      cropFill: "60–70% fill, landscape orientation",
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
    heroImage: "/images/iterations/chicken-pad-thai-iter1.png",
    rawImage: "/images/raw/chicken-pad-thai-raw.png",
    pdpImage: "/images/iterations/chicken-pad-thai-iter1.png",
    iterations: [
      { src: "/images/iterations/chicken-pad-thai-iter1.png", label: "Iteration A", rejected: false },
      { src: "/images/iterations/chicken-pad-thai-iter2.png", label: "Iteration B — Prompt reference", rejected: false },
      { src: "/images/iterations/chicken-pad-thai-iter3.png", label: "Iteration C — Setup reference", rejected: false },
    ],
    prompt: `45-degree overhead food photography of Chicken Pad Thai in a wide white ceramic bowl, bowl occupies approximately 50-55% of the square frame and is centered slightly left of center, flat rice noodles with visible seared boneless chicken pieces, scrambled egg ribbons, bean sprouts, roasted crushed peanuts, julienned carrot and red bell pepper strips, spring onion rings garnished on top, single lime wedge resting on the bowl rim at 10 o'clock position, chopsticks lifting a tangle of noodles from the bowl showing separation and gloss. Surface: round dark walnut wooden serving board with natural live edge, sitting on warm off-white cream matte surface. Bottom-right quadrant completely empty for UI overlay. Props: small ceramic ramekin with Pad Thai sauce, halved lime, red chilli rings, Thai basil leaves, roasted peanuts — all placed in top-left half. Lighting: soft warm directional from top-left, gentle shadow bottom-right.`,
    negativePrompt: "No green cloth, no napkin, no parchment, no loose chopsticks on surface, no rectangular boards, no fake steam, no text, no logos, no watermarks, no extra ingredients.",
    aiTool: "AI image generation (documented in Figma shoot sheet)",
    creativeDirection: {
      angle: "45° overhead, food center-left",
      lighting: "Soft warm directional top-left, shadow bottom-right",
      surface: "Warm cream surface + dark walnut round board under bowl",
      props: "Ceramic ramekin, lime wedge, red chilli rings, fresh basil — top-left only",
      garnish: "Spring onion rings, roasted peanuts, chilli rings on top",
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
    heroImage: "/images/products/veg-green-thai-curry.png",
    rawImage: "/images/raw/veg-green-thai-curry-raw.png",
    pdpImage: "/images/products/veg-green-thai-curry.png",
    iterations: [],
    prompt: `Professional food photography of a Veg Green Thai Curry Bowl served alongside a bowl of fluffy jasmine rice. Camera: 45–60 degree angle. Composition: Two bowls on a rustic wooden rectangular serving board — green Thai curry in foreground-left, jasmine rice in mid-right. Steel spoon placed diagonally. Background: warm muted beige/off-white surface. The curry bowl: veg green Thai curry in a matte-finish ceramic bowl, glossy coconut milk base, visible broccoli, baby corn, tofu, Thai eggplant, red bell pepper. Garnished with Thai basil leaves and red chilli rings. The rice bowl: fluffy long-grain jasmine rice with individual grains visible. Lighting: soft diffused from top-left, no harsh shadows.`,
    negativePrompt: "No fake steam, no lemon or lime, no chopsticks, no white balance making curry look grey, no plastic or waxy textures, no AI uncanny symmetry.",
    aiTool: "AI image generation (documented in Figma shoot sheet)",
    creativeDirection: {
      angle: "45–60° elevated, two-bowl composition",
      lighting: "Soft diffused top-left, gentle highlights on curry surface",
      surface: "Warm beige/off-white — matches Swish catalogue tone",
      props: "Steel spoon, small peanut ramekin, rattan coaster — no lemon",
      garnish: "Thai basil leaves, red chilli rings on curry; single basil leaf on rice",
      cropFill: "~65% fill, loose triangular two-bowl composition",
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
    prompt: "Direction documented in Figma. Follows identical composition logic to Veg Green Thai Curry — warm beige surface, two-bowl format, 45–60° angle, soft left side light — with chicken substituted for tofu.",
    negativePrompt: "No fake steam, no chopsticks, no grey or flat light, no extra ingredients.",
    aiTool: "AI image generation (in production)",
    creativeDirection: {
      angle: "45–60° elevated, two-bowl composition",
      lighting: "Soft diffused top-left — identical to Veg Green Thai Curry",
      surface: "Warm beige/off-white — matches Swish catalogue tone",
      props: "Steel spoon, small peanut ramekin — no lemon",
      garnish: "Thai basil leaves, spring onion on curry; single basil leaf on rice",
      cropFill: "~65% fill, chicken clearly visible and identifiable",
    },
    hasProductionData: false,
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
    prompt: `Professional food photography, top-down angled shot of a Thai combo meal in a staggered triangular composition on warm beige surface. Top-right: white ceramic bowl on round rustic wooden board — veg pad thai noodles with golden tofu, red bell pepper, broccoli, peanuts, chopstick lift. Middle-left: matte beige ceramic bowl — veg green Thai curry with baby corn, broccoli, mushrooms, Thai basil, red chilli. Bottom-center: smaller matte beige bowl — fluffy steamed jasmine rice with cilantro sprig. Steel spoon beside curry bowl. Soft warm directional light from upper left. Clean, minimal, modern foodtech app aesthetic.`,
    negativePrompt: "No wooden serving board under curry/rice (they sit on surface), no napkin, no extra ingredients not listed, no fake steam.",
    aiTool: "AI image generation (in production)",
    creativeDirection: {
      angle: "Top-down angled, staggered triangular composition",
      lighting: "Soft warm directional upper left, shallow depth of field",
      surface: "Warm beige, all three containers on surface directly",
      props: "Steel spoon, scattered Thai basil, chilli flakes — minimal",
      garnish: "Cilantro on rice, Thai basil on curry, peanuts on noodles",
      cropFill: "Three containers, all identifiable, no container hidden",
    },
    hasProductionData: false,
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
