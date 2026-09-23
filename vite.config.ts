import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

function sendOrderPlugin() {
  return {
    name: 'send-order-api',
    configureServer(server: any) {
      server.middlewares.use('/api/send-order', async (req: any, res: any) => {
        if (req.method === 'OPTIONS') {
          res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
          });
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatIdsRaw = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatIdsRaw) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in .env' }));
          return;
        }

        let body = '';
        req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);

            if (!data.items?.length) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Cart is empty' }));
              return;
            }
            if (!data.customerName || !data.tableNumber) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Customer name and table number are required' }));
              return;
            }

            const CATEGORY_LABELS: Record<string, string> = {
              'frappe': 'Frappe',
              'ice-coffee': 'Ice Coffee',
              'hot-coffee': 'Hot Coffee',
              'matcha': 'Matcha',
              'signature': 'Signature',
              'rice-meal': 'Rice Meal',
              'pasta': 'Pasta',
              'sandwich-snack': 'Sandwich & Snack',
              'books': 'Books',
            };

            const dineInItems = data.items.filter((i: any) => i.orderType === 'dine-in');
            const takeOutItems = data.items.filter((i: any) => i.orderType === 'take-out');
            const now = new Date();
            const dateStr = now.toLocaleString('en-PH', {
              timeZone: 'Asia/Manila', year: 'numeric', month: 'long', day: 'numeric',
            });
            const timeStr = now.toLocaleString('en-PH', {
              timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hour12: true,
            });

            const DOUBLE = '═══════════════════════════════════';
            const SINGLE = '───────────────────────────────────';
            const DOTS = '···················';

            const lines: string[] = [
              DOUBLE,
              '          *181 LOUNGE*',
              '            *ORDER*',
              DOUBLE,
              '',
              `           *TABLE ${data.tableNumber}*`,
              '',
              '  ' + data.customerName,
            ];
            if (data.customerPhone) lines.push('  ' + data.customerPhone);
            if (data.customerEmail) lines.push('  ' + data.customerEmail);
            lines.push('  ' + (data.paymentMethod === 'cash' ? 'Cash' : 'E-Wallet'));
            lines.push('');
            lines.push(SINGLE);

            if (dineInItems.length) {
              lines.push('', '*DINE IN \u00B7 Eat Here*', '');
              dineInItems.forEach((i: any) => {
                const isBook = i.category === 'books';
                const lineTotal = (i.price * i.quantity).toFixed(2);
                const categoryLabel = CATEGORY_LABELS[i.category] || i.category;
                lines.push(`  *${i.name}*  \`${categoryLabel}\``);
                if (i.selectedAddOns && i.selectedAddOns.length > 0) {
                  i.selectedAddOns.forEach((a: any) => {
                    lines.push(`    +${a.name} \u20B1${a.price.toFixed(2)}`);
                  });
                }
                if (isBook) {
                  lines.push(`    \u00D7${i.quantity}   Ask at Cashier`);
                } else {
                  lines.push(`    \u00D7${i.quantity}   \u20B1${lineTotal}`);
                }
                if (i.specialRequest) lines.push(`    \u21B3 _${i.specialRequest}_`);
                lines.push('');
              });
              const sub = dineInItems.reduce((s: number, i: any) => s + i.price * i.quantity, 0).toFixed(2);
              lines.push(`  Subtotal ${DOTS}  *\u20B1${sub}*`);
              lines.push('');
              lines.push(SINGLE);
            }
            if (takeOutItems.length) {
              lines.push('', '*PICK UP \u00B7 Pay at Counter*', '');
              takeOutItems.forEach((i: any) => {
                const isBook = i.category === 'books';
                const lineTotal = (i.price * i.quantity).toFixed(2);
                const categoryLabel = CATEGORY_LABELS[i.category] || i.category;
                lines.push(`  *${i.name}*  \`${categoryLabel}\``);
                if (i.selectedAddOns && i.selectedAddOns.length > 0) {
                  i.selectedAddOns.forEach((a: any) => {
                    lines.push(`    +${a.name} \u20B1${a.price.toFixed(2)}`);
                  });
                }
                if (isBook) {
                  lines.push(`    \u00D7${i.quantity}   Ask at Cashier`);
                } else {
                  lines.push(`    \u00D7${i.quantity}   \u20B1${lineTotal}`);
                }
                if (i.specialRequest) lines.push(`    \u21B3 _${i.specialRequest}_`);
                lines.push('');
              });
              const sub = takeOutItems.reduce((s: number, i: any) => s + i.price * i.quantity, 0).toFixed(2);
              lines.push(`  Subtotal ${DOTS}  *\u20B1${sub}*`);
              lines.push('');
              lines.push(SINGLE);
            }

            lines.push('');
            lines.push(`  *TOTAL ${DOTS}  \u20B1${data.total.toFixed(2)}*`);
            lines.push('');
            lines.push(DOUBLE);
            lines.push('');
            lines.push('📍 35 Mamatid, Cabuyao');
            lines.push('📧 official.181lounge@gmail.com');
            lines.push(`📅 ${dateStr}  ·  ${timeStr}`);
            lines.push('');
            lines.push('_Pay at counter upon pick up_');

            if (data.image) {
              lines.push('');
              lines.push('\uD83D\uDCF7 _Payment screenshot attached_');
            }

            const message = lines.join('\n');
            const chatIds = chatIdsRaw.split(',').map((id: string) => id.trim());

            const sendToChat = async (chatId: string) => {
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

                const r = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
                  method: 'POST',
                  body: formData,
                });
                return r.json();
              }

              const r = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' }),
              });
              return r.json();
            };

            const results = await Promise.all(chatIds.map(sendToChat));

            const failures = results.filter((r: any) => !r.ok);
            if (failures.length > 0) {
              console.error('Telegram send errors:', failures);
              res.writeHead(502, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Failed to send to Telegram' }));
              return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, sent: chatIds.length }));
          } catch (err) {
            console.error('API error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), sendOrderPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    hmr: {
      host: '127.0.0.1',
      protocol: 'ws',
    },
  },
});
