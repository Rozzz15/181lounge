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
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
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
            if (!data.customerName || !data.customerPhone) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Customer name and phone are required' }));
              return;
            }

            const dineInItems = data.items.filter((i: any) => i.orderType === 'dine-in');
            const takeOutItems = data.items.filter((i: any) => i.orderType === 'take-out');
            const lines: string[] = ['🛒 *NEW ORDER*', '', `👤 *${data.customerName}*`, `📱 ${data.customerPhone}`, ''];

            if (dineInItems.length) {
              lines.push('🍽️ *DINE IN*');
              dineInItems.forEach((i: any) => lines.push(`  • ${i.name} x${i.quantity} — ₱${(i.price * i.quantity).toFixed(2)}`));
              lines.push(`  Subtotal: *₱${dineInItems.reduce((s: number, i: any) => s + i.price * i.quantity, 0).toFixed(2)}*`, '');
            }
            if (takeOutItems.length) {
              lines.push('📦 *TAKE OUT*');
              takeOutItems.forEach((i: any) => lines.push(`  • ${i.name} x${i.quantity} — ₱${(i.price * i.quantity).toFixed(2)}`));
              lines.push(`  Subtotal: *₱${takeOutItems.reduce((s: number, i: any) => s + i.price * i.quantity, 0).toFixed(2)}*`, '');
            }

            lines.push(`💰 *TOTAL: ₱${data.total.toFixed(2)}*`, '📍 35 Mamatid, Cabuyao');

            const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ chat_id: chatId, text: lines.join('\n'), parse_mode: 'Markdown' }),
            });

            const result = await tgRes.json();

            if (!tgRes.ok) {
              console.error('Telegram error:', result);
              res.writeHead(502, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Failed to send to Telegram' }));
              return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, messageId: result.result?.message_id }));
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
});
