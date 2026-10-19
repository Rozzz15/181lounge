'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle } from 'lucide-react';

type MenuItem = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  sizes?: { name: string; price: number }[];
};

const MENU: MenuItem[] = [
  { id: 1, name: 'Matcha Frappe', category: 'Frappe', description: 'Creamy blended matcha frappe', price: 190 },
  { id: 2, name: 'Oreo Frappe', category: 'Frappe', description: 'Blended frappe with crushed Oreo cookies', price: 190 },
  { id: 3, name: 'Salted Caramel Frappe', category: 'Frappe', description: 'Rich frappe with salted caramel swirl', price: 190 },
  { id: 4, name: 'Dark Mocha Frappe', category: 'Frappe', description: 'Bold dark chocolate mocha frappe', price: 190 },
  { id: 5, name: 'White Mocha', category: 'Frappe', description: 'Smooth white chocolate mocha frappe', price: 190 },
  { id: 6, name: 'Choco Chip Frappe', category: 'Frappe', description: 'Blended frappe with chocolate chips', price: 190 },
  { id: 7, name: 'Strawberry Frappe', category: 'Frappe', description: 'Refreshing strawberry blended frappe', price: 190 },
  { id: 58, name: 'Biscoff Frappe', category: 'Frappe', description: 'Blended frappe with Biscoff cookie butter and cream', price: 195 },
  { id: 8, name: 'Americano', category: 'Coffee', description: 'Bold espresso with cold water over ice', price: 120 },
  { id: 9, name: 'Hazelnut Latte', category: 'Coffee', description: 'Espresso with hazelnut syrup and cold milk', price: 165 },
  { id: 10, name: 'Cafe Latte', category: 'Coffee', description: 'Classic espresso with smooth cold milk', price: 150 },
  { id: 11, name: 'Spanish Latte', category: 'Coffee', description: 'Espresso with condensed milk over ice', price: 165 },
  { id: 12, name: 'Caramel Latte', category: 'Coffee', description: 'Espresso with caramel syrup and cold milk', price: 165 },
  { id: 42, name: 'Dark Mocha Latte', category: 'Coffee', description: 'Espresso with rich dark chocolate and cold milk', price: 165 },
  { id: 43, name: 'White Mocha Latte', category: 'Coffee', description: 'Espresso with smooth white chocolate and cold milk', price: 165 },
  { id: 47, name: 'Cappuccino', category: 'Coffee', description: 'Espresso with steamed milk and a thick layer of foam', price: 180 },
  { id: 48, name: 'Caramel Macchiato', category: 'Coffee', description: 'Espresso layered with vanilla syrup, milk, and caramel drizzle', price: 175 },
  { id: 57, name: 'Biscoff Latte', category: 'Coffee', description: 'Espresso with Biscoff cookie butter syrup and cold milk', price: 175 },
  { id: 60, name: 'Honey Oat Latte', category: 'Coffee', description: 'Espresso with honey oat syrup and cold milk', price: 175 },
  { id: 13, name: 'Strawberry Matcha', category: 'Matcha', description: 'Layered matcha with fresh strawberry puree', price: 180, sizes: [{ name: 'Medium', price: 180 }, { name: 'Large', price: 195 }] },
  { id: 14, name: 'Matcha Latte', category: 'Matcha', description: 'Premium matcha whisked with steamed milk', price: 180, sizes: [{ name: 'Medium', price: 180 }, { name: 'Large', price: 195 }] },
  { id: 34, name: 'Dirty Matcha', category: 'Matcha', description: 'Matcha with a shot of espresso', price: 180 },
  { id: 30, name: 'Offwhite Latte', category: 'Signature Drinks', description: 'Our signature offwhite latte blend', price: 210 },
  { id: 31, name: 'Salted Mocha', category: 'Signature Drinks', description: 'Rich mocha with a hint of salt', price: 210 },
  { id: 32, name: '181 Signature', category: 'Signature Drinks', description: 'Our iconic 181 signature drink', price: 210 },
  { id: 33, name: 'Sea Salt Spanish Latte', category: 'Signature Drinks', description: 'Spanish latte with a sea salt twist', price: 210 },
  { id: 21, name: 'Chicken Souvlaki', category: 'Rice Meal', description: 'Grilled chicken souvlaki served with rice', price: 190 },
  { id: 22, name: 'Chicken Ala King', category: 'Rice Meal', description: 'Creamy chicken ala king served with rice', price: 190 },
  { id: 23, name: 'Chicken Tenders', category: 'Rice Meal', description: 'Crispy chicken tenders served with rice', price: 190 },
  { id: 24, name: 'Adobo Flakes', category: 'Rice Meal', description: 'Classic Filipino adobo flakes served with rice', price: 190 },
  { id: 49, name: 'Tap Silog', category: 'Silog Serye', description: 'Savory beef tapa with garlic rice and fried egg', price: 130 },
  { id: 50, name: 'Corn Silog', category: 'Silog Serye', description: 'Crispy corned beef with garlic rice and fried egg', price: 130 },
  { id: 51, name: 'Tocilog', category: 'Silog Serye', description: 'Sweet and savory tocino with garlic rice and fried egg', price: 130 },
  { id: 52, name: 'Hot Silog', category: 'Silog Serye', description: 'Spicy hotdog with garlic rice and fried egg', price: 130 },
  { id: 53, name: 'Hungarian Silog', category: 'Silog Serye', description: 'Hungarian sausage with garlic rice and fried egg', price: 130 },
  { id: 54, name: 'Sisig Silog', category: 'Silog Serye', description: 'Sizzling sisig with garlic rice and fried egg', price: 135 },
  { id: 55, name: 'Adobo Silog', category: 'Silog Serye', description: 'Savory Filipino adobo with garlic rice and fried egg', price: 135 },
  { id: 56, name: 'Liempo Silog', category: 'Silog Serye', description: 'Grilled pork belly with garlic rice and fried egg', price: 170 },
  { id: 25, name: 'Mushroom White', category: 'Pasta', description: 'Creamy white sauce pasta with mushrooms', price: 189 },
  { id: 26, name: 'Creamy Pesto Pasta', category: 'Pasta', description: 'Penne pasta tossed in rich creamy pesto sauce', price: 189 },
  { id: 27, name: 'Aglio Olio', category: 'Pasta', description: 'Classic garlic and olive oil pasta', price: 189 },
  { id: 28, name: 'Sour Cream Fries', category: 'Sandwich & Snack', description: 'Crispy fries tossed in savory sour cream seasoning', price: 150 },
  { id: 29, name: 'Nachos', category: 'Sandwich & Snack', description: 'Crispy nachos with cheese dip', price: 190 },
  { id: 59, name: 'Cheese Fries', category: 'Sandwich & Snack', description: 'Golden cheese fries perfect for sharing', price: 150 },
  { id: 44, name: 'Strawberry Spritz', category: 'Spritzers', description: 'Refreshing strawberry spritzer', price: 120 },
  { id: 45, name: 'Blueberry Spritz', category: 'Spritzers', description: 'Refreshing blueberry spritzer', price: 120 },
  { id: 46, name: 'Mixed Berry Spritz', category: 'Spritzers', description: 'Refreshing mixed berry spritzer', price: 120 },
];

const ADDONS = [
  { name: 'Breve', price: 50 },
  { name: 'Oatmilk Sub', price: 60 },
  { name: 'Extra Shot of Espresso', price: 50 },
  { name: 'Syrup', price: 50 },
  { name: 'Whip Cream', price: 25 },
];

const QUICK_REPLIES = [
  'What do you recommend?',
  'Ano ang maganda?',
  'Show me the menu',
  'Anong oras kayo?',
  'Saan kayo located?',
  'Business hours',
  'Where are you located?',
  'Delivery options',
  'How to franchise?',
];

interface Message {
  role: 'bot' | 'user';
  text: string;
}

function priceOf(item: MenuItem): string {
  if (item.sizes && item.sizes.length > 0) {
    return item.sizes.map((s) => `${s.name} ${formatPrice(s.price)}`).join(' / ');
  }
  return formatPrice(item.price);
}

function formatPrice(price: number): string {
  return `₱${price.toFixed(2)}`;
}

function listItems(items: MenuItem[]): string {
  if (items.length === 0) return 'None found.';
  return items.map((i) => `• ${i.name} — ${priceOf(i)}`).join('\n');
}

function categoryItems(category: string): MenuItem[] {
  return MENU.filter((i) => i.category.toLowerCase() === category.toLowerCase());
}

function categoryExists(category: string): boolean {
  return MENU.some((i) => i.category.toLowerCase() === category.toLowerCase());
}

function describeItem(item: MenuItem): string {
  const price =
    item.sizes && item.sizes.length > 0
      ? item.sizes.map((s) => `${s.name}: ${formatPrice(s.price)}`).join(', ')
      : formatPrice(item.price);
  return `${item.name} (${item.category})\n${item.description}\nPrice: ${price}`;
}

function contains(text: string, words: string[]): boolean {
  return words.some((w) => text.includes(w));
}

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'if', 'so', 'to', 'of', 'in', 'on', 'at', 'for', 'with', 'from', 'by',
  'i', 'me', 'my', 'we', 'us', 'our', 'you', 'your', 'u', 'it', 'its', 'they', 'them',
  'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'do', 'does', 'did', 'done',
  'have', 'has', 'had', 'having', 'can', 'could', 'will', 'would', 'shall', 'should', 'may', 'might',
  'what', 'which', 'who', 'whom', 'whose', 'when', 'where', 'why', 'how', 'this', 'that', 'these', 'those',
  'there', 'here', 'please', 'thanks', 'thank', 'hi', 'hello', 'hey', 'sir', 'po',
  'much', 'many', 'more', 'most', 'some', 'any', 'all', 'every', 'about', 'into', 'over', 'just', 'only',
  'get', 'got', 'need', 'want', 'wants', 'looking', 'look', 'find', 'show', 'give', 'tell', 'know',
  'sell', 'sells', 'sold', 'offer', 'offers', 'serve', 'serves', 'serving', 'available', 'availability',
  'good', 'great', 'best', 'nice', 'really', 'very', 'too', 'also', 'again',
  '181', 'lounge', 'branch', 'shop', 'store', 'team', 'staff',
  // Tagalog / Filipino fillers
  'ang', 'ng', 'mga', 'ba', 'sa', 'na', 'ay', 'at', 'o', 'ito', 'iyon', 'yan', 'yun', 'yung', 'ung',
  'ano', 'sino', 'saan', 'kailan', 'bakit', 'paano', 'pano', 'may', 'wala', 'meron', 'daw', 'raw',
  'din', 'rin', 'lang', 'lamang', 'tungkol', 'para', 'kung', 'pag', 'kapag', 'dito', 'diyan', 'jan',
  'ngayon', 'mamaya', 'kanina', 'gusto', 'gustong', 'kailangan', 'pwede', 'pede', 'puede', 'paki',
  'pakiusap', 'kasi', 'pero', 'dahil', 'habang', 'isang', 'marami', 'maraming', 'konti', 'kaunti',
  'magkano', 'presyo', 'oras', 'bukas', 'tawag', 'bayad', 'salamat', 'ko', 'mo', 'ka', 'kayo',
  'ako', 'tayo', 'namin', 'ninyo', 'nyo', 'kanya', 'kanila', 'nito', 'noon', 'mula', 'hanggang',
  'tulad', 'gaya', 'naman', 'yata', 'pala', 'nga', 'eh', 'oh', 'oho',
]);

const CATEGORY_WORDS = new Set([
  'frappe', 'frappes', 'matcha', 'latte', 'lattes', 'coffee', 'coffees', 'espresso', 'cafe',
  'pasta', 'pastas', 'silog', 'spritz', 'spritzer', 'spritzers', 'sandwich', 'sandwiches',
  'snack', 'snacks', 'rice', 'meal', 'meals', 'drink', 'drinks', 'beverage', 'beverages',
  'book', 'books', 'boardgame', 'boardgames', 'menu', 'item', 'items', 'signature', 'addon', 'add', 'on', 'extras',
]);

function queryTokens(raw: string): string[] {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 2 && !STOP_WORDS.has(w));
}

function matchMenuItems(rawInput: string): MenuItem[] {
  const text = rawInput.toLowerCase();

  if (contains(text, ['oat milk', 'oatmilk', 'oat-milk']) && !contains(text, ['honey', 'latte'])) return [];
  if (contains(text, ['add on', 'add-on', 'addon', 'extra shot', 'breve', 'whip cream'])) return [];

  const tokens = queryTokens(rawInput);
  if (tokens.length === 0) return [];
  if (tokens.every((t) => CATEGORY_WORDS.has(t))) return [];

  const tokenSet = new Set(tokens);
  let best = 0;
  const scored = MENU.map((item) => {
    const nameTokens = queryTokens(item.name);
    const hits = nameTokens.filter((w) => tokenSet.has(w)).length;
    let score = 0;
    if (hits > 0) {
      if (hits === nameTokens.length) score = 3;
      else if (hits >= 2) score = 2;
      else score = nameTokens.length === 1 ? 2 : 1;
    }
    if (score > best) best = score;
    return { item, score };
  });

  if (best === 0) return [];
  return scored
    .filter((s) => s.score === best)
    .map((s) => s.item)
    .slice(0, 8);
}

const BUSINESS_INFO = `📍 35 Mamatid, Cabuyao, Philippines 4025
🕐 Monday - Sunday: 11:00 AM - 12:00 AM
📞 Call us at 0948 751 0923
📧 official.181lounge@gmail.com

Conveniently located near academic institutions in Mamatid, Cabuyao.`;

function deliveryResponse(text: string): string {
  const asksGrab = contains(text, ['grab']);
  const asksPanda = contains(text, ['foodpanda', 'food panda']) || /\bpanda\b/.test(text);
  const options = `Right now you can:\n\n🛍️ Dine In — 35 Mamatid, Cabuyao\n🥡 Pick Up — order through our website order flow`;

  if (asksGrab && !asksPanda) {
    return `Do we have GrabFood? Not yet — but it's coming soon! 🚚\n\n${options}\n\n🚚 GrabFood — Coming soon\n\nWe'll announce it here as soon as it's live. Stay tuned! 🚀`;
  }
  if (asksPanda && !asksGrab) {
    return `Do we have foodpanda? Not yet — but it's coming soon! 🐼\n\n${options}\n\n🐼 foodpanda — Coming soon\n\nWe'll announce it here as soon as it's live. Stay tuned! 🚀`;
  }
  return `Here are your options:\n\n${options}\n\n🚚 GrabFood — Coming soon\n🐼 foodpanda — Coming soon\n\nDelivery is launching soon — stay tuned! 🚀`;
}

function getBotResponse(rawInput: string): string {
  const text = rawInput.toLowerCase().trim();
  const cleaned = text.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();

  const productName = MENU.find(
    (i) =>
      cleaned.length >= 3 &&
      (cleaned.includes(i.name.toLowerCase()) || i.name.toLowerCase().includes(cleaned))
  );
  if (productName) return describeItem(productName);

  const matchedItems = matchMenuItems(cleaned);
  if (matchedItems.length === 1) return describeItem(matchedItems[0]);
  if (matchedItems.length > 1) {
    return `Here's what I found on our menu:\n\n${listItems(matchedItems)}\n\nTap "Show me the menu" to browse everything.`;
  }

  const asksRecommendation =
    /(what should i|recommend|best seller|most popular|popular drink|suggest|favorite|famous)/.test(text) ||
    /\b(maganda|paborito|sikat|mungkahi|iminumungkahi|irekomenda|rekomenda|masarap)\b/.test(text) ||
    contains(text, ['pinakamaganda', 'anong ok', 'ano bang ok']);
  if (asksRecommendation) {
    const favorites = ['Matcha Frappe', 'Cafe Latte', 'Caramel Latte', 'Strawberry Matcha', 'Dirty Matcha', '181 Signature', 'Adobo Flakes', 'Sisig Silog', 'Sour Cream Fries'].map((name) => MENU.find((i) => i.name === name)).filter((i): i is MenuItem => Boolean(i));
    return `Some crowd favorites:\n\n${listItems(favorites)}\n\nPopular picks are also marked on our /menu page. Tap "Show me the menu" to browse everything.`;
  }

  const mentionsGrab = contains(text, ['grab']);
  if (mentionsGrab && contains(text, ['seat', 'table', 'chair', 'sit'])) {
    return `Of course — pull up a chair! 🪑\n\n181 Lounge has cozy corners for readers and big tables for boardgame nights. You can also read our books and play boardgames in-store.\n\n📍 35 Mamatid, Cabuyao\n🕐 Open daily, 11:00 AM - 12:00 AM`;
  }
  const wantsDelivery = contains(text, [
    'delivery',
    'deliver',
    'takeout',
    'take out',
    'take-out',
    'pickup',
    'pick up',
    'pick-up',
    'to-go',
    'to go',
    'foodpanda',
    'food panda',
    'grabfood',
    'grab food',
    'padala',
    'magpadala',
    'pagpadala',
    'padalhan',
  ]) || /\bpanda\b/.test(text);
  const grabInDeliveryContext =
    mentionsGrab &&
    contains(text, ['deliver', 'order', 'available', 'have', 'offer', 'via', 'app', 'platform', 'partner']);
  if (wantsDelivery || grabInDeliveryContext) return deliveryResponse(text);

  if (contains(text, ['how to order', 'how do i order', 'order', 'cart', 'buy', 'purchase', 'online', 'umorder', 'mag-order', 'magorder', 'bumili', 'kumuha'])) {
    return `Ordering is easy!\n\n1️⃣ Browse our menu (click "Order Now" in the header)\n2️⃣ Tap an item to customize (size, add-ons, Dine In or Pick Up)\n3️⃣ Add to cart, then checkout\n\n🚚 GrabFood and 🐼 foodpanda delivery is coming soon — stay tuned! 🚀`;
  }

  if (contains(text, ['addon', 'add-on', 'add on', 'extra shot', 'breve', 'oatmilk', 'oat milk', 'syrup', 'whip cream', 'extras', 'dagdag'])) {
    return `Add-ons (available on drinks):\n${ADDONS.map((a) => `• ${a.name} — ${formatPrice(a.price)}`).join('\n')}`;
  }

  if (contains(text, ['frappe', 'frappes'])) {
    return `⚠️ SALE! Frappe Blended Collection — all at ${formatPrice(190)}:\n\n${listItems(categoryItems('Frappe'))}`;
  }

  if (contains(text, ['matcha'])) {
    return `Matcha Collection:\n\n${listItems(categoryItems('Matcha'))}`;
  }

  if (contains(text, ['pasta'])) {
    return `Pasta:\n\n${listItems(categoryItems('Pasta'))}`;
  }

  if (contains(text, ['silog'])) {
    return `Silog Serye:\n\n${listItems(categoryItems('Silog Serye'))}`;
  }

  if (contains(text, ['sandwich', 'snack', 'nachos', 'fries', 'sour cream', 'cheese friends'])) {
    return `Sandwich & Snack:\n\n${listItems(categoryItems('Sandwich & Snack'))}`;
  }

  if (contains(text, ['spritz', 'spritzer'])) {
    return `Spritzers:\n\n${listItems(categoryItems('Spritzers'))}`;
  }

  if (contains(text, ['rice meal', 'rice meals', 'suvlaki', 'ala king', 'chicken ala king', 'adobo', 'tenders', 'ulam', 'kanin'])) {
    return `Rice Meal:\n\n${listItems(categoryItems('Rice Meal'))}`;
  }

  if (contains(text, ['signature'])) {
    return `Signature Drinks:\n\n${listItems(categoryItems('Signature Drinks'))}`;
  }

  if (contains(text, ['coffee', 'latte', 'americano', 'cappuccino', 'macchiato', 'espresso', 'kape'])) {
    return `Coffee (Hot & Iced):\n\n${listItems(categoryItems('Coffee'))}`;
  }

  if (contains(text, ['book', 'boardgame', 'board game', 'board games', 'read', 'games', 'kintugi', 'alchemist', 'quiet', 'atomic habits', 'manila after dark'])) {
    const books = [
      { name: 'The Coffee Guide', description: 'A beginner-friendly guide to brewing the perfect cup' },
      { name: 'Kintugi: Embracing Imperfection', description: 'A local Filipino author\'s take on resilience and beauty' },
      { name: 'Quiet: The Power of Introverts', description: 'Bestseller on the strength of quiet people' },
      { name: 'Manila After Dark', description: 'A collection of short stories set in the city' },
      { name: 'Atomic Habits', description: 'Build good habits and break bad ones' },
      { name: 'The Alchemist', description: 'A timeless fable about following your dreams' },
    ];
    return `We offer a curated collection of books and a variety of boardgames!\n\nGrab a seat, pick your activity, and enjoy. You can browse and read in-store, and books are available for purchase — just ask at the cashier desk for pricing.\n\nAvailable titles include:\n${books.map((b) => `• ${b.name} — ${b.description}`).join('\n')}\n\n(Prices for books are available at the cashier desk.)`;
  }

  if (contains(text, ['under', 'below', 'cheap', 'cheapest', 'budget', 'affordable', 'mura', 'less than'])) {
    const cheap = MENU.filter((i) => i.price > 0 && i.price <= 150);
    return `Items at or under ${formatPrice(150)}:\n\n${listItems(cheap)}`;
  }

  if (contains(text, ['hour', 'open', 'close', 'time', 'schedule', 'when', 'oras', 'bukas', 'buksan', 'sarado', 'kailan'])) {
    return `We're open 7 days a week:\n\n🕐 Monday - Sunday\n⏰ 11:00 AM - 12:00 AM\n\nHours may vary during holidays.`;
  }

  if (contains(text, ['where', 'location', 'address', 'map', 'direction', 'find you', 'how to get', 'cabuyao', 'visit', 'saan', 'lugar', 'pumunta', 'pano pumunta', 'paano pumunta'])) {
    return `You can find us at:\n\n📍 35 Mamatid, Cabuyao, Philippines 4025\n\nGet directions on Google Maps: https://maps.google.com/?q=35+Mamatid+Cabuyao+Philippines+4025`;
  }

  if (contains(text, ['contact', 'phone', 'number', 'email', 'call', 'reach', 'email us', 'numero', 'telepono', 'tawag', 'kontak'])) {
    return `You can reach us through:\n\n📞 Phone: 0948 751 0923\n📧 Email: official.181lounge@gmail.com\n\nOr visit our Facebook: facebook.com/profile.php?id=61564700682320\nInstagram: @181lounge`;
  }

  if (contains(text, ['franchise', 'get a branch', 'own a branch', 'invest', 'business', 'capital', 'open a branch', 'negosyo', 'prangkisa', 'pagnegosyo'])) {
    return `Yes, we offer franchise opportunities! 🏪\n\n💰 Total Investment: ₱1.5M - ₱3M\n  • Store Build-Out: ₱500K - ₱800K\n  • Equipment & Fixtures: ₱400K - ₱600K\n  • Initial Inventory: ₱200K - ₱300K\n  • Franchise Fee: ₱250K - ₱400K\n  • Working Capital: ₱150K - ₱300K\n\n📈 ROI: Most franchisees break even within 12-18 months\n\nIncludes training (2-4 weeks), supply chain, marketing support, POS setup, and exclusive territory rights.\n\nStart the process on our website's "Get a Branch" page or call 0948 751 0923!`;
  }

  if (contains(text, ['story', 'about', 'history', 'founder', 'family', 'who are you', 'background', 'mission', 'vision', 'kwento', 'sino', 'may-ari', 'mayari', 'pinagmulan', 'tungkol sa inyo', 'tungkol sa shop', 'bakit 181', 'bat 181'])) {
    return `181 Lounge is a family-founded specialty café brand created by siblings Alison Joy Darato and Alvin Jay Pring. The name "181" comes from their children's birthdays — reflecting family, intention, and meaningful beginnings. 💛\n\nThe first branch opened beneath the Darato family residence in Mamatid, Cabuyao, near several academic institutions. What began as a modest family venture grew into a recognized community café known for accessible pricing without compromising quality.\n\nMore than a café, it's a curated social space where boardgames and books are available to read, play, and purchase. ☕📚`;
  }

  if (contains(text, ['payment', 'pay', 'gcash', 'cash', 'card', 'credit', 'bayad', 'magbayad', 'babayaran'])) {
    return `We accept multiple payment options. The best way to know exactly what's available is to checkout through the website or ask at the cashier desk. We also accept cash in-store. 💳`;
  }

  if (contains(text, ['wifi', 'internet', 'wireless'])) {
    return `Yes! We offer free Wi-Fi for our customers — a great spot for studying, working, or unwinding. 📶`;
  }

  if (contains(text, ['park', 'parking', 'paradahan', 'paparada'])) {
    return `We're located in Mamatid, Cabuyao, near academic institutions. For specific parking details, it's best to check with our team or view our location on Google Maps: https://maps.google.com/?q=35+Mamatid+Cabuyao+Philippines+4025 🚗`;
  }

  if (contains(text, ['price', 'how much', 'cost', 'menu', 'food', 'drink', 'what do you have', 'offer', 'available', 'catalog', 'products', 'items', 'magkano', 'presyo', 'ano ang meron', 'ano meron', 'kainin', 'inumin', 'pagkain', 'pricelist'])) {
    return `Here's our menu at a glance:\n\n☕ Coffee — ${formatPrice(120)} to ${formatPrice(180)}\n🍃 Matcha — ${formatPrice(180)} to ${formatPrice(195)}\n🥤 Frappe — ${formatPrice(190)} to ${formatPrice(195)}\n✨ Signature Drinks — ${formatPrice(210)}\n🍚 Rice Meal — ${formatPrice(190)}\n🍳 Silog Serye — ${formatPrice(130)} to ${formatPrice(170)}\n🍝 Pasta — ${formatPrice(189)}\n🥪 Sandwich & Snack — ${formatPrice(150)} to ${formatPrice(190)}\n🍹 Spritzers — ${formatPrice(120)}\n📚 Books — ask at the cashier desk\n\nAsk me about any category (e.g. "frappe", "coffee", "silog") or a specific item for full details!`;
  }

  if (contains(text, ['today', 'brand', 'what is']) || /^what(s| is)? 181?/.test(text) || contains(text, ['181 lounge'])) {
    return `181 Lounge is a premium specialty café in Cabuyao offering coffee, frappes, matcha, silog, pasta, books, and boardgames — a curated space where you can slow down, connect, and enjoy. ☕✨`;
  }

  if (contains(text, ['thank', 'thanks', 'salamat', 'appreciate'])) {
    return `You're welcome! 😊 Enjoy your coffee, and feel free to ask if you need anything else.`;
  }

  if (contains(text, ['help', 'what can you do', 'options', 'commands', 'tulong'])) {
    return `Here's what I can help you with:\n\n• Menu & prices (try "menu", "frappe", "coffee", "silog")\n• Recommendations ("what do you recommend?" / "Ano ang maganda?")\n• Business hours ("Anong oras kayo?")\n• Location & directions ("Saan kayo located?")\n• Contact details\n• Delivery options (GrabFood & foodpanda — coming soon)\n• Franchise & investment\n• Our story\n• Books & boardgames\n• Add-ons\n\nPuwede kang mag-Tagalog — naiintindihan ko po! 😊`;
  }

  if (contains(text, ['bye', 'goodbye', 'see you', 'paalam'])) {
    return `Thanks for chatting with 181 Lounge AI! ☕ See you at 35 Mamatid, Cabuyao. Have a great day!`;
  }

  const isGreeting =
    text.length < 30 &&
    /^\s*(hi|hii+|hello+|hey+|yo|oy|good (morning|afternoon|evening)|kumusta|kamusta|musta|magandang (araw|umaga|hapon|gabi))[.!]?\s*$/.test(text);
  if (isGreeting) {
    return `Hello! 👋 Welcome to 181 Lounge — your cozy spot for coffee, books, and boardgames in Cabuyao!\n\nTry asking about our menu, prices, hours, or delivery. What can I help you with today?`;
  }

  return `I'm not sure about that one yet. 🤔 / Hindi ko pa sigurado 'yan.\n\nPuwede ka mag-Tagalog — naiintindihan ko po! I can help with:\n• Menu & prices / Mga presyo\n• Recommendations / Mga iminumungkahi\n• Hours & location / Oras at lokasyon\n• Delivery (coming soon)\n• Franchise info\n• Our story / Kwento ng 181 Lounge\n\nTry "Show me the menu" or "Anong oras kayo?"!`;
}

export function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: 'Hello! Welcome to 181 Lounge. ☕ How can I help you today? Try asking about our menu, prices, hours, delivery, or franchise opportunities.',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = (raw: string) => {
    const value = raw.trim();
    if (!value) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: value }]);
    setIsTyping(true);
    setTimeout(() => {
      const reply = getBotResponse(value);
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-3rem)] max-w-96 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#d4cfc7] overflow-hidden"
          >
            <div className="bg-[#525A40] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo.jpg"
                  alt="AI Assistant"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-white/30"
                />
                <div>
                  <p className="text-white font-semibold text-sm">181 Lounge AI</p>
                  <p className="text-white/60 text-xs">Online</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div ref={scrollRef} className="h-80 p-4 overflow-y-auto overflow-x-hidden bg-[#F3F0E8]/50 flex flex-col gap-3">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 w-full min-w-0 ${
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {message.role === 'bot' ? (
                    <img
                      src="/images/chat.png"
                      alt="AI"
                      className="w-7 h-7 object-contain mt-1 flex-shrink-0"
                    />
                  ) : null}
                  <div
                    className={`rounded-2xl px-4 py-2.5 shadow-sm max-w-[80%] min-w-0 break-words [overflow-wrap:anywhere] whitespace-pre-line text-sm ${
                      message.role === 'bot'
                        ? 'bg-white rounded-tl-sm text-[#44362A]'
                        : 'bg-[#525A40] rounded-tr-sm text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2">
                  <img
                    src="/images/chat.png"
                    alt="AI"
                    className="w-7 h-7 object-contain mt-1 flex-shrink-0"
                  />
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#948D82] rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-[#948D82] rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-[#948D82] rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-[#d4cfc7] bg-white">
              <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => handleSend(reply)}
                    className="shrink-0 px-3 py-1.5 rounded-full bg-[#F3F0E8] text-[#525A40] text-xs font-medium hover:bg-[#525A40] hover:text-white transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  autoFocus
                  className="flex-1 px-4 py-2.5 rounded-full bg-[#F3F0E8] text-sm text-[#44362A] placeholder-[#948D82] outline-none focus:ring-2 focus:ring-[#525A40]/30"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  className="w-9 h-9 rounded-full bg-[#525A40] text-white flex items-center justify-center hover:bg-[#44362A] transition-colors flex-shrink-0 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="drop-shadow-lg flex items-center justify-center transition-shadow"
      >
        {isOpen ? (
          <span className="w-14 h-14 rounded-full bg-[#525A40] flex items-center justify-center">
            <X className="h-6 w-6 text-white" />
          </span>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-white/80 rounded-full blur-xl scale-125" />
            <div className="absolute inset-0 w-20 h-20 bg-[#525A40] rounded-full animate-ping opacity-20" />
            <img
              src="/images/chat.png"
              alt="Chat"
              className="w-20 h-20 object-contain relative drop-shadow-lg"
            />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
              <MessageCircle className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-400 rounded-full animate-ping opacity-75" />
          </div>
        )}
      </motion.button>
    </div>
  );
}