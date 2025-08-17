import midnightnoir from "@/assets/midnightnoir.webp";
import golden from "@/assets/goldensunrise.jfif";
import ocean from "@/assets/ocean.webp";
import velvet from "@/assets/velvet.webp";
import urban from "@/assets/urban.webp";
import mystic from "@/assets/mystic.webp";
import heroFragrance from "@/assets/hero-fragrance.jpg";
export interface Fragrance {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  category: 'mens' | 'womens' | 'unisex';
  type: 'eau-de-parfum' | 'eau-de-toilette' | 'cologne' | 'perfume-oil';
  sizes: { size: string; price: number }[];
  images: string[];
  rating: number;
  reviewCount: number;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  inStock: boolean;
  featured: boolean;
  bestSeller: boolean;
  fragranceOfWeek?: boolean;
}

export const mockFragrances: Fragrance[] = [
  {
    id: '1',
    name: 'Midnight Noir',
    brand: 'Luxury Scents',
    price: 120,
    originalPrice: 150,
    description: 'A sophisticated blend of dark berries and smoky woods',
    longDescription: 'Midnight Noir is an enigmatic fragrance that captures the essence of a moonlit garden. This sophisticated blend opens with dark berries and bergamot, transitions into a heart of rose and jasmine, and settles into a base of smoky woods and vanilla. Perfect for evening wear and special occasions.',
    category: 'unisex',
    type: 'eau-de-parfum',
    sizes: [
      { size: '30ml', price: 120 },
      { size: '50ml', price: 180 },
      { size: '100ml', price: 280 }
    ],
    images: [midnightnoir, heroFragrance],
    rating: 4.8,
    reviewCount: 127,
    notes: {
      top: ['Dark Berries', 'Bergamot', 'Black Pepper'],
      middle: ['Rose', 'Jasmine', 'Violet'],
      base: ['Sandalwood', 'Vanilla', 'Musk']
    },
    inStock: true,
    featured: true,
    bestSeller: true,
    fragranceOfWeek: true
  },
  {
    id: '2',
    name: 'Golden Sunrise',
    brand: 'Maison Élégance',
    price: 95,
    description: 'Fresh citrus with warm amber undertones',
    longDescription: 'Golden Sunrise embodies the warmth and optimism of a new day. This luminous fragrance combines zesty citrus notes with the richness of amber and honey, creating a scent that is both invigorating and comforting.',
    category: 'womens',
    type: 'eau-de-toilette',
    sizes: [
      { size: '50ml', price: 95 },
      { size: '100ml', price: 145 }
    ],
    images: [golden, heroFragrance],
    rating: 4.6,
    reviewCount: 89,
    notes: {
      top: ['Lemon', 'Orange', 'Grapefruit'],
      middle: ['Honey', 'Jasmine', 'Peach'],
      base: ['Amber', 'Cedarwood', 'White Musk']
    },
    inStock: true,
    featured: true,
    bestSeller: true
  },
  {
    id: '3',
    name: 'Ocean Breeze',
    brand: 'Aqua Luxe',
    price: 85,
    description: 'A clean and refreshing marine fragrance, evoking the gentle touch of sea breeze',
    longDescription: 'Ocean Breeze captures the essence of pristine coastal waters. This refreshing fragrance combines marine notes with crisp citrus and subtle florals, evoking the feeling of a gentle sea breeze on a summer day.',
    category: 'mens',
    type: 'eau-de-toilette',
    sizes: [
      { size: '50ml', price: 85 },
      { size: '100ml', price: 125 }
    ],
    images: [ocean, heroFragrance],
    rating: 4.4,
    reviewCount: 156,
    notes: {
      top: ['Sea Salt', 'Lemon', 'Mint'],
      middle: ['Marine Notes', 'Lavender', 'Geranium'],
      base: ['Driftwood', 'Ambergris', 'White Musk']
    },
    inStock: true,
    featured: false,
    bestSeller: true
  },
  {
    id: '4',
    name: 'Velvet Rose',
    brand: 'Floral Dreams',
    price: 110,
    description: 'Luxurious rose with velvety undertones',
    longDescription: 'Velvet Rose is a tribute to the queen of flowers. This sumptuous fragrance features the finest Bulgarian rose petals, enhanced with creamy vanilla and soft musk, creating an indulgent and romantic scent experience.',
    category: 'womens',
    type: 'eau-de-parfum',
    sizes: [
      { size: '30ml', price: 110 },
      { size: '50ml', price: 165 },
      { size: '100ml', price: 245 }
    ],
    images: [velvet, heroFragrance],
    rating: 4.9,
    reviewCount: 203,
    notes: {
      top: ['Pink Pepper', 'Bergamot'],
      middle: ['Bulgarian Rose', 'Peony', 'Magnolia'],
      base: ['Vanilla', 'Sandalwood', 'Soft Musk']
    },
    inStock: true,
    featured: true,
    bestSeller: false
  },
  {
    id: '5',
    name: 'Urban Legend',
    brand: 'Modern Classics',
    price: 75,
    description: 'Contemporary woody-spicy blend',
    longDescription: 'Urban Legend represents the modern gentleman. This contemporary fragrance blends spicy cardamom with rich woods and leather notes, creating a bold and confident scent perfect for the urban lifestyle.',
    category: 'mens',
    type: 'eau-de-parfum',
    sizes: [
      { size: '50ml', price: 75 },
      { size: '100ml', price: 115 }
    ],
    images: [urban, heroFragrance],
    rating: 4.3,
    reviewCount: 94,
    notes: {
      top: ['Cardamom', 'Black Pepper', 'Ginger'],
      middle: ['Cedarwood', 'Patchouli', 'Vetiver'],
      base: ['Leather', 'Amber', 'Tonka Bean']
    },
    inStock: true,
    featured: false,
    bestSeller: false
  },
  {
    id: '6',
    name: 'Mystic Garden',
    brand: 'Enchanted Scents',
    price: 135,
    description: 'Mysterious floral-oriental composition',
    longDescription: 'Mystic Garden is an enchanting journey through a secret botanical paradise. This complex fragrance weaves together exotic florals with warm spices and precious woods, creating an intoxicating and unforgettable scent.',
    category: 'unisex',
    type: 'eau-de-parfum',
    sizes: [
      { size: '30ml', price: 135 },
      { size: '50ml', price: 195 },
      { size: '100ml', price: 295 }
    ],
    images: [mystic, heroFragrance],
    rating: 4.7,
    reviewCount: 78,
    notes: {
      top: ['Saffron', 'Pink Pepper', 'Cardamom'],
      middle: ['Turkish Rose', 'Iris', 'Ylang-Ylang'],
      base: ['Oud', 'Sandalwood', 'Amber']
    },
    inStock: true,
    featured: true,
    bestSeller: false
  }
];

export const getFragranceById = (id: string): Fragrance | undefined => {
  return mockFragrances.find(fragrance => fragrance.id === id);
};

export const getFeaturedFragrances = (): Fragrance[] => {
  return mockFragrances.filter(fragrance => fragrance.featured);
};

export const getBestSellers = (): Fragrance[] => {
  return mockFragrances.filter(fragrance => fragrance.bestSeller);
};

export const getFragranceOfWeek = (): Fragrance | undefined => {
  return mockFragrances.find(fragrance => fragrance.fragranceOfWeek);
};