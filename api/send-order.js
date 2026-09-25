export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_IDS = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_IDS) {
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env vars');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const data = req.body;

    if (!data.items || data.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    if (!data.customerName || !data.tableNumber) {
      return res.status(400).json({ error: 'Customer name and table number are required' });
    }

    const invalidItems = data.items.some(
      (item) => !item || typeof item.name !== 'string' || typeof item.price !== 'number'
    );
    if (invalidItems) {
      return res.status(400).json({ error: 'Invalid item data' });
    }

    // Fallback: recompute total the same way the website cart does
    if (typeof data.total !== 'number') {
      data.total = data.items.reduce((sum, item) => sum + itemLineTotal(item), 0);
    }

    const message = buildTelegramMessage(data);
    const chatIds = CHAT_IDS.split(',').map((id) => id.trim());

    const sendToChat = async (chatId) => {
      if (data.image) {
        const base64Data = data.image.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Data, 'base64');
        const ext = data.image.match(/^data:image\/(\w+);/)?.[1] || 'jpg';
        const filename = `payment.${ext}`;

        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('photo', new Blob([imageBuffer], { type: `image/${ext}` }), filename);
        formData.append('caption', message);
        formData.append('parse_mode', 'Markdown');

        const r = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
          method: 'POST',
          body: formData,
        });
        return r.json();
      }

      const r = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });
      return r.json();
    };

    const results = await Promise.all(chatIds.map(sendToChat));

    const failures = results.filter((r) => !r.ok);
    if (failures.length > 0) {
      console.error('Telegram send errors:', failures);
    }

    return res.status(200).json({ success: true, sent: chatIds.length });
  } catch (error) {
    console.error('Function error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function formatPrice(price) {
  return '\u20B1' + price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) return '+63 ' + cleaned.slice(1);
  if (cleaned.length === 12 && cleaned.startsWith('63')) return '+' + cleaned;
  if (cleaned.length === 13 && cleaned.startsWith('0')) return '+63 ' + cleaned.slice(1);
  return phone;
}

const CATEGORY_LABELS = {
  'frappe': 'Frappe',
  'ice-coffee': 'Coffee',
  'matcha': 'Matcha',
  'signature': 'Signature Drinks',
  'rice-meal': 'Rice Meal',
  'silog-serye': 'Silog Serye',
  'pasta': 'Pasta',
  'sandwich-snack': 'Sandwich & Snack',
  'spritzers': 'Spritzers',
  'books': 'Books',
};

const DOUBLE = '\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550';
const SINGLE = '\u2500\u2500\u2500\u2500\u2550\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500';
const DOTS = '\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7';

function quantityOf(item) {
  const qty = Number(item.quantity);
  return Number.isFinite(qty) && qty > 0 ? Math.floor(qty) : 1;
}

function addOnsTotal(item) {
  if (!item.selectedAddOns || item.selectedAddOns.length === 0) return 0;
  return item.selectedAddOns.reduce((sum, addOn) => sum + (Number(addOn.price) || 0), 0);
}

// Matches the website cart math: (price + add-ons) * quantity
function itemLineTotal(item) {
  return (Number(item.price) + addOnsTotal(item)) * quantityOf(item);
}

function pushItemBlock(lines, items) {
  items.forEach((item) => {
    const isBook = item.category === 'books';
    const qty = '\u00D7' + quantityOf(item);
    const categoryLabel = CATEGORY_LABELS[item.category] || item.category;

    lines.push('  *' + item.name + '*  `' + categoryLabel + '`');
    if (item.selectedAddOns && item.selectedAddOns.length > 0) {
      item.selectedAddOns.forEach((addOn) => {
        lines.push('    +' + addOn.name + ' ' + formatPrice(addOn.price));
      });
    }
    if (isBook) {
      lines.push('    ' + qty + '   Ask at Cashier');
    } else {
      lines.push('    ' + qty + '   ' + formatPrice(itemLineTotal(item)));
    }
    if (item.specialRequest) lines.push('    \u21B3 _' + item.specialRequest + '_');
    lines.push('');
  });
}

function subtotalOf(items) {
  return items.reduce((sum, item) => sum + (item.category === 'books' ? 0 : itemLineTotal(item)), 0);
}

function buildTelegramMessage(data) {
  const now = new Date();
  const dateStr = now.toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeStr = now.toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const dineInItems = data.items.filter((i) => i.orderType === 'dine-in');
  const takeOutItems = data.items.filter((i) => i.orderType === 'take-out');

  const lines = [];
  lines.push(DOUBLE);
  lines.push('     *181 LOUNGE \u00B7 ORDER*');
  lines.push(DOUBLE);
  lines.push('');
  lines.push('Table ' + data.tableNumber);
  lines.push('');
  lines.push(data.customerName);
  if (data.customerPhone) lines.push(data.customerPhone);
  if (data.customerEmail) lines.push(data.customerEmail);
  lines.push(data.paymentMethod === 'cash' ? 'Cash' : 'E-Wallet');
  lines.push('');
  lines.push(SINGLE);

  if (dineInItems.length > 0) {
    lines.push('');
    lines.push('*DINE IN \u00B7 Eat Here*');
    lines.push('');
    dineInItems.forEach((item) => {
      const isBook = item.category === 'books';
      const lineTotal = itemLineTotal(item);
      const qty = '\u00D7' + quantityOf(item);
      const categoryLabel = CATEGORY_LABELS[item.category] || item.category;

      lines.push('  *' + item.name + '*  `' + categoryLabel + '`');
      if (item.selectedAddOns && item.selectedAddOns.length > 0) {
        item.selectedAddOns.forEach((addOn) => {
          lines.push('    +' + addOn.name + ' ' + formatPrice(addOn.price));
        });
      }
      if (isBook) {
        lines.push('    ' + qty + '   Ask at Cashier');
      } else {
        lines.push('    ' + qty + '   ' + formatPrice(lineTotal));
      }
      if (item.specialRequest) lines.push('    \u21B3 _' + item.specialRequest + '_');
      lines.push('');
    });
    lines.push('  Subtotal ' + DOTS + '  *' + formatPrice(subtotalOf(dineInItems)) + '*');
    lines.push('');
    lines.push(SINGLE);
  }

  if (takeOutItems.length > 0) {
    lines.push('');
    lines.push('*PICK UP \u00B7 Pay at Counter*');
    lines.push('');
    takeOutItems.forEach((item) => {
      const isBook = item.category === 'books';
      const lineTotal = itemLineTotal(item);
      const qty = '\u00D7' + quantityOf(item);
      const categoryLabel = CATEGORY_LABELS[item.category] || item.category;

      lines.push('  *' + item.name + '*  `' + categoryLabel + '`');
      if (item.selectedAddOns && item.selectedAddOns.length > 0) {
        item.selectedAddOns.forEach((addOn) => {
          lines.push('    +' + addOn.name + ' ' + formatPrice(addOn.price));
        });
      }
      if (isBook) {
        lines.push('    ' + qty + '   Ask at Cashier');
      } else {
        lines.push('    ' + qty + '   ' + formatPrice(lineTotal));
      }
      if (item.specialRequest) lines.push('    \u21B3 _' + item.specialRequest + '_');
      lines.push('');
    });
    lines.push('  Subtotal ' + DOTS + '  *' + formatPrice(subtotalOf(takeOutItems)) + '*');
    lines.push('');
    lines.push(SINGLE);
  }

  lines.push('');
  lines.push('  *TOTAL ' + DOTS + '  ' + formatPrice(data.total) + '*');
  lines.push('');
  lines.push(DOUBLE);
  lines.push('');
  lines.push('\uD83D\uDCCD 35 Mamatid, Cabuyao');
  lines.push('\uD83D\uDCE7 official.181lounge@gmail.com');
  lines.push('\uD83D\uDCC5 ' + dateStr + '  \u00B7  ' + timeStr);
  lines.push('');
  lines.push('_Pay at counter upon pick up_');

  if (data.image) {
    lines.push('');
    lines.push('\uD83D\uDCF7 _Payment screenshot attached_');
  }

  return lines.join('\n');
}
