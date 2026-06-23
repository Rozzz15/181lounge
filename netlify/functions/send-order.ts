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
  requests?: string;
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
  const timestamp = now.toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const lines: string[] = [];
  lines.push('🛒 *NEW ORDER*');
  lines.push('');
  lines.push(`🪑 Table: *${data.tableNumber}*`);
  lines.push(`👤 *${data.customerName}*`);
  if (data.customerPhone) lines.push(`📱 ${formatPhone(data.customerPhone)}`);
  if (data.customerEmail) lines.push(`📧 ${data.customerEmail}`);
  if (data.requests) lines.push(`📝 ${data.requests}`);
  lines.push('');

  const dineInItems = data.items.filter((i) => i.orderType === 'dine-in');
  const takeOutItems = data.items.filter((i) => i.orderType === 'take-out');

  if (dineInItems.length > 0) {
    lines.push('🍽️ *DINE IN*');
    dineInItems.forEach((item) => {
      const lineTotal = item.price * item.quantity;
      lines.push(`  • ${item.name} x${item.quantity} — ${formatPrice(lineTotal)}`);
      if (item.specialRequest) lines.push(`    📝 _${item.specialRequest}_`);
    });
    const dineInSubtotal = dineInItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    lines.push(`  Subtotal: *${formatPrice(dineInSubtotal)}*`);
    lines.push('');
  }

  if (takeOutItems.length > 0) {
    lines.push('📦 *TAKE OUT*');
    takeOutItems.forEach((item) => {
      const lineTotal = item.price * item.quantity;
      lines.push(`  • ${item.name} x${item.quantity} — ${formatPrice(lineTotal)}`);
      if (item.specialRequest) lines.push(`    📝 _${item.specialRequest}_`);
    });
    const takeOutSubtotal = takeOutItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    lines.push(`  Subtotal: *${formatPrice(takeOutSubtotal)}*`);
    lines.push('');
  }

  lines.push(`💰 *TOTAL: ${formatPrice(data.total)}*`);
  lines.push('📍 35 Mamatid, Cabuyao');
  lines.push(`🕐 ${timestamp}`);

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
