export interface KeyIngredient {
  id: string;
  name: string;
  origin: string;
  type: "Clinical Active" | "Botanical Extract" | "Lipid Restorative";
  concentration?: string;
  tagline: string;
  description: string;
  benefits: string[];
  image: string;
}

export interface RoutineStep {
  step: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  tip: string;
  recommendedTypes: string;
  image: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  skinType: string;
  rating: number;
  productUsed: string;
  review: string;
  date: string;
  verified: boolean;
  avatar: string;
}

export type CommunityStatIcon =
  | "Star"
  | "Sparkles"
  | "ShieldCheck"
  | "HeartHandshake"
  | "Leaf"
  | "CheckCircle2";

export interface CommunityStat {
  value: string;
  label: string;
  icon?: CommunityStatIcon;
}

export const KEY_INGREDIENTS: KeyIngredient[] = [
  {
    id: "ing-niacinamide",
    name: "Niacinamide (Vitamin B3)",
    origin: "Precision Bio-Ferment",
    type: "Clinical Active",
    concentration: "5% Active Formula",
    tagline: "Pore refining & barrier reinforcement",
    description: "Multi-functional essential vitamin that visibly tightens dilated pores, balances excess sebum, and strengthens the natural ceramides of the lipid barrier.",
    benefits: ["Refines texture", "Regulates sebum", "Fades dark spots"],
    image: "https://images.unsplash.com/photo-1728842931548-db2b3dc5b67d?q=80&w=706&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "ing-hyaluronic",
    name: "Multi-Weight Hyaluronic Acid",
    origin: "Botanical Fermentation",
    type: "Clinical Active",
    concentration: "Triple Molecular Matrix",
    tagline: "Trans-epidermal deep plumping",
    description: "Combines ultra-low and high molecular weights to saturate deep dermal layers with moisture while creating an invisible, breathable moisture-lock shield on the surface.",
    benefits: ["Multi-layer hydration", "Instant plumping", "Soothes dehydration"],
    image: "https://images.unsplash.com/photo-1743926959711-73960c2a7b4e?q=80&w=784&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "ing-centella",
    name: "Centella Asiatica (Cica)",
    origin: "Madagascan Wild-Harvest",
    type: "Botanical Extract",
    concentration: "High-Potency Madecassoside",
    tagline: "Intensive calming & redness relief",
    description: "Centuries-old restorative botanical rich in asiaticoside and madecassic acid. Actively pacifies sensitized barriers, calms inflammation, and boosts collagen synthesis.",
    benefits: ["Calms redness", "Barrier recovery", "Antioxidant defense"],
    image: "https://images.unsplash.com/photo-1770717984650-21665d4362b9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "ing-camellia",
    name: "Camellia Japonica Seed Oil",
    origin: "Cold-Pressed Botanical Seed",
    type: "Lipid Restorative",
    concentration: "100% Virgin Cold-Pressed",
    tagline: "Restorative omega-rich lipid nourishment",
    description: "Lightweight, non-comedogenic elixir abundant in Oleic Omega-9 and polyphenol vitamins A, B, D, and E that deeply softens while sealing active moisture.",
    benefits: ["Lipid replenishment", "Velvety skin finish", "Non-comedogenic seal"],
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
  },
];

export const PURE_ROUTINE_STEPS: RoutineStep[] = [
  {
    step: "01",
    title: "Cleanse",
    category: "Step 01 · Morning & Evening",
    tagline: "Purify without stripping the delicate acid mantle",
    description: "Wash away impurities, sunscreen, and daily pollution with gentle botanical cleansers that respect your skin's natural pH and moisture barrier.",
    tip: "Massage onto damp skin for 60 seconds with lukewarm water.",
    recommendedTypes: "Suitable for all skin types",
    image: "https://plus.unsplash.com/premium_photo-1706800175680-27c871f15fcc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    step: "02",
    title: "Treat",
    category: "Step 02 · Targeted Correction",
    tagline: "Deliver precision bio-actives deep into the epidermis",
    description: "Target specific concerns like hyperpigmentation, uneven texture, or dehydration with concentrated serums formulated without fillers or synthetic fragrances.",
    tip: "Press 3–4 drops gently into freshly cleansed, slightly damp skin.",
    recommendedTypes: "Matched to your skin discovery type",
    image: "https://plus.unsplash.com/premium_photo-1755892594620-a38b81e66610?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    step: "03",
    title: "Hydrate & Protect",
    category: "Step 03 · Moisture Lock",
    tagline: "Seal nutrients and build a resilient protective shield",
    description: "Lock in hydration with lipid-rich botanical moisturizers that fortify your stratum corneum, preventing trans-epidermal moisture loss throughout the day.",
    tip: "Warm between fingertips before smoothing outward over face and neck.",
    recommendedTypes: "Adjust texture from gel to rich balm",
    image: "https://plus.unsplash.com/premium_photo-1682096423780-41ca1b04af68?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    name: "Elena Vance",
    location: "San Francisco, CA",
    skinType: "Combination Skin",
    rating: 5,
    productUsed: "Camellia Cleansing Balm & Niacinamide Serum",
    review: "The Camellia Cleansing Balm and Niacinamide serum completely rebalanced my oily T-zone within three weeks. My complexion looks luminous and calm without ever feeling weighed down.",
    date: "Verified Customer · 2 weeks ago",
    verified: true,
    avatar: "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "rev-2",
    name: "Marcus Thorne",
    location: "Austin, TX",
    skinType: "Sensitive / Reactive",
    rating: 5,
    productUsed: "Centella Barrier Calming Cream",
    review: "Finding skincare without hidden synthetic fragrances or irritants seemed impossible until PureYuna. The Centella calming cream relieved my barrier flare-ups in just three days.",
    date: "Verified Customer · 1 month ago",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1531891570158-e71b35a485bc?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "rev-3",
    name: "Aria Chen",
    location: "Seattle, WA",
    skinType: "Dry & Flaky",
    rating: 5,
    productUsed: "Multi-Molecular Hyaluronic Treatment",
    review: "The triple-weight hyaluronic acid combined with the lipid repair cream gave me that coveted glass-skin glow through harsh winter winds. Truly formulated skincare perfection.",
    date: "Verified Customer · 3 weeks ago",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1690444963408-9573a17a8058?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const COMMUNITY_STATS: CommunityStat[] = [
  { value: "4.9 / 5.0", label: "Average Customer Rating", icon: "Sparkles" },
  { value: "98%", label: "Reported Calmer Barrier", icon: "ShieldCheck" },
  { value: "100%", label: "Clean & Cruelty-Free", icon: "Leaf" },
];
