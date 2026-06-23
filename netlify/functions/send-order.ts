interface CartItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  orderType: 'dine-in' | 'take-out';
  specialRequest?: string;
}

interface OrderRequest {
  items: CartItem[];
  customerName: string;
  tableNumber: string;
  customerPhone?: string;
  customerEmail?: string;
  paymentMethod: 'cash' | 'ewallet';
  total: number;
}

function formatPrice(price: number): string {
  return `₱${price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) return `+63 ${cleaned.slice(1)}`;
  if (cleaned.length === 12 && cleaned.startsWith('63')) return `+${cleaned}`;
  if (cleaned.length === 13 && cleaned.startsWith('0')) return `+63 ${cleaned.slice(1)}`;
  return phone;
}

function buildTelegramMessage(data: OrderRequest): string {
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

  const lines: string[] = [];
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');
  lines.push('🛒  *NEW ORDER*');
  lines.push('🪑  Table *' + data.tableNumber + '*');
  lines.push('');
  lines.push('👤  *' + data.customerName + '*');
  if (data.customerPhone) lines.push('📱  ' + formatPhone(data.customerPhone));
  if (data.customerEmail) lines.push('📧  ' + data.customerEmail);
  lines.push('💳  *' + (data.paymentMethod === 'cash' ? '💵  Cash' : '📱  E-Wallet') + '*');
  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━');

  if (dineInItems.length > 0) {
    lines.push('');
    lines.push('☕  *D I N E   I N*');
    lines.push('');
    dineInItems.forEach((item) => {
      const lineTotal = item.price * item.quantity;
      lines.push('  •  *' + item.name + '*');
      lines.push('      x' + item.quantity + '  ──  ' + formatPrice(lineTotal));
      if (item.specialRequest) lines.push('      📝 _' + item.specialRequest + '_');
      lines.push('');
    });
    const dineInSubtotal = dineInItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    lines.push('  ───────────────────────');
    lines.push('  *Subtotal: ' + formatPrice(dineInSubtotal) + '*');
    lines.push('');
    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━');
  }

  if (takeOutItems.length > 0) {
    lines.push('');
    lines.push('📦  *T A K E   O U T*');
    lines.push('');
    takeOutItems.forEach((item) => {
      const lineTotal = item.price * item.quantity;
      lines.push('  •  *' + item.name + '*');
      lines.push('      x' + item.quantity + '  ──  ' + formatPrice(lineTotal));
      if (item.specialRequest) lines.push('      📝 _' + item.specialRequest + '_');
      lines.push('');
    });
    const takeOutSubtotal = takeOutItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    lines.push('  ───────────────────────');
    lines.push('  *Subtotal: ' + formatPrice(takeOutSubtotal) + '*');
    lines.push('');
    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━');
  }

  lines.push('');
  lines.push('💰  *TOTAL: ' + formatPrice(data.total) + '*');
  lines.push('');
  lines.push('📍  35 Mamatid, Cabuyao');
  lines.push('📅  ' + dateStr);
  lines.push('🕐  ' + timeStr);
  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━');

  return lines.join('\n');
}

export default async (request: Request): Promise<Response> => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers,
    });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env vars');
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers,
    });
  }

  try {
    const data: OrderRequest = await request.json();

    if (!data.items || data.items.length === 0) {
      return new Response(JSON.stringify({ error: 'Cart is empty' }), {
        status: 400,
        headers,
      });
    }

    if (!data.customerName || !data.tableNumber) {
      return new Response(JSON.stringify({ error: 'Customer name and table number are required' }), {
        status: 400,
        headers,
      });
    }

    const message = buildTelegramMessage(data);

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    const telegramResult = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error('Telegram API error:', telegramResult);
      return new Response(JSON.stringify({ error: 'Failed to send order to Telegram' }), {
        status: 502,
        headers,
      });
    }

    return new Response(JSON.stringify({ success: true, messageId: telegramResult.result?.message_id }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Function error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers,
    });
  }
};

export const config = {
  path: "/api/send-order",
};
