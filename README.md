# 👗 Stylist AI — Your Personal Fashion Advisor

**Stylist AI** is a modern, high-performance outfit recommendation engine. It uses a multi-agent logic (Traditional, Modern, and Budget) to analyze user profiles and suggest the perfect look for any occasion.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Deepali1830/stylist-ai)

## ✨ Features

- **Multi-Agent Logic**: Three distinct AI personas (Traditional, Modern, Budget) collaborate on every recommendation.
- **Visual Analysis**: Heuristic-based processing of user photos to understand body type and skin tone.
- **Smart Scoring**: Ranks 1200+ outfits from an internal dataset to find the best match for your style.
- **Premium UI**: Luxury dark-themed interface with smooth animations and interactive chatbot.
- **Auto-Generating Dataset**: Automatically builds a comprehensive 1200+ outfit library on first run.

## 🚀 One-Click Deployment

Click the button above to deploy this project instantly to **Render**.

### Manual Deployment
If you prefer manual setup:
1. Connect this GitHub repository to a **New Web Service** on Render.
2. **Runtime**: Node
3. **Build Command**: `npm install`
4. **Start Command**: `node server.js`
5. **Environment Variable**: `PORT=3001` (Render auto-detects this too)

## 🛠️ Local Development

1. Clone the repo:
   ```bash
   git clone https://github.com/Deepali1830/stylist-ai.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. Open `http://localhost:3001` in your browser.

## 📦 Project Structure

- `server.js`: Express backend & recommendation engine.
- `app.js`: Frontend logic & pipeline management.
- `database.js`: Knowledge base (Rules & Outfits).
- `generate_dataset.js`: Dataset generator (1200+ entries).
- `index.html`: Premium dark-themed UI.
- `style.css`: Modern styling system.

Built with ❤️ by Deepali1830
