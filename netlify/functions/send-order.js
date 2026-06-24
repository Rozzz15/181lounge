export default async function handler(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env vars');
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server configuration error' }) };
  }

  try {
    const data = JSON.parse(event.body);

    if (!data.items || data.items.length === 0) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Cart is empty' }) };
    }

    if (!data.customerName || !data.tableNumber) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Customer name and table number are required' }) };
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
      return { statusCode: 502, headers, body: JSON.stringify({ error: 'Failed to send order to Telegram' }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ success: true, messageId: telegramResult.result?.message_id }) };
  } catch (error) {
    console.error('Function error:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Internal server error' }) };
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

function getTableEmoji(tableNumber) {
  const emojis = ['🟢','🔵','🟣','🔴','🟡','🟠','⚪','🩷','💚','🩵','💜','🖤'];
  return emojis[(parseInt(tableNumber) - 1) % emojis.length] || '⚪';
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

  const tableEmoji = getTableEmoji(data.tableNumber);
  const dineInItems = data.items.filter((i) => i.orderType === 'dine-in');
  const takeOutItems = data.items.filter((i) => i.orderType === 'take-out');

  const lines = [];
  lines.push(tableEmoji + '  *181 LOUNGE \u00B7 ORDER*  ' + tableEmoji);
  lines.push('');
  lines.push('  ' + tableEmoji + '  *TABLE ' + data.tableNumber + '*');
  lines.push('');
  lines.push('  ' + data.customerName);
  if (data.customerPhone) lines.push('  \uD83D\uDCDE ' + formatPhone(data.customerPhone));
  if (data.customerEmail) lines.push('  \u2709\uFE0F ' + data.customerEmail);
  lines.push('  ' + (data.paymentMethod === 'cash' ? '\uD83D\uDCB5 Cash' : '\uD83D\uDCF1 E-Wallet'));
  lines.push('');
  lines.push('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');

  if (dineInItems.length > 0) {
    lines.push('');
    lines.push('\uD83C\uDF7D\uFE0F  *DINE IN*');
    lines.push('');
    dineInItems.forEach((item) => {
      const lineTotal = item.price * item.quantity;
      const qty = '\u00D7' + item.quantity;
      const price = formatPrice(lineTotal);
      const namePad = item.name.length < 20 ? item.name + ' '.repeat(20 - item.name.length) : item.name;
      lines.push('  ' + namePad + qty + '  ' + price);
      if (item.specialRequest) lines.push('    \u21B3 _' + item.specialRequest + '_');
    });
    lines.push('');
    const dineInSubtotal = dineInItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    lines.push('  Subtotal \u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7  *' + formatPrice(dineInSubtotal) + '*');
    lines.push('');
    lines.push('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  }

  if (takeOutItems.length > 0) {
    lines.push('');
    lines.push('\uD83C\uDF54  *PICK UP*');
    lines.push('');
    takeOutItems.forEach((item) => {
      const lineTotal = item.price * item.quantity;
      const qty = '\u00D7' + item.quantity;
      const price = formatPrice(lineTotal);
      const namePad = item.name.length < 20 ? item.name + ' '.repeat(20 - item.name.length) : item.name;
      lines.push('  ' + namePad + qty + '  ' + price);
      if (item.specialRequest) lines.push('    \u21B3 _' + item.specialRequest + '_');
    });
    lines.push('');
    const takeOutSubtotal = takeOutItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    lines.push('  Subtotal \u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7\u00B7  *' + formatPrice(takeOutSubtotal) + '*');
    lines.push('');
    lines.push('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  }

  lines.push('');
  lines.push('  \uD83D\uDCB0  *TOTAL: ' + formatPrice(data.total) + '*');
  lines.push('');
  lines.push('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500');
  lines.push('');
  lines.push('  \uD83D\uDCCD 35 Mamatid, Cabuyao');
  lines.push('  \uD83D\uDCC5 ' + dateStr + '  \u00B7  ' + timeStr);
  lines.push('');
  lines.push('  _' + tableEmoji + ' Pay at counter upon pick up ' + tableEmoji + '_');

  return lines.join('\n');
}
