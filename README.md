<div align="center">

# 🚀 CollabNet
### AI-Powered Creator & Brand Collaboration Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-6366f1?style=for-the-badge&logo=vercel)](https://navya185.github.io/collabnet)
[![GitHub Stars](https://img.shields.io/github/stars/navya185/collabnet?style=for-the-badge&color=8b5cf6)](https://github.com/navya185/collabnet)
[![License](https://img.shields.io/badge/License-MIT-06b6d4?style=for-the-badge)](LICENSE)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> **CollabNet** is an AI-powered SaaS platform that bridges the gap between content creators and brands — think LinkedIn, but built for the Creator Economy.

</div>

---

## 🌟 Overview

The creator economy is a **₹2,400 Crore+** industry in India alone — yet it's completely fragmented. Brands waste hours manually searching for influencers, creators struggle to find brand deals, and millions of rupees are lost to fake followers and bot accounts every year.

**CollabNet solves all of this in one place.**

---

## ✨ Features

### 🤖 AI-Powered Matching
Automatically matches creators to brand campaigns based on niche, audience demographics, engagement rate, budget, and location — with a compatibility score from 0–100%.

### 🛡️ Fake Influencer Detection
Audits every creator profile using follower growth analysis, engagement ratio checks, and comment quality scoring to produce an **Authenticity Score** — protecting brand budgets from fraud.

### 👤 Verified Creator Profiles
Creators register with full social media analytics, pricing, portfolio, and an AI Creator Score that brands can trust at a glance.

### 📋 Campaign Management
Brands post campaigns, creators apply with custom bids and pitch messages. Brands accept or decline — all within one dashboard.

### 💬 Real-Time Messenger
Built-in secure messaging for negotiations, contract discussions, and collaboration coordination — with smart auto-reply bots.

### 📊 Role-Based Dashboards
Separate, fully featured dashboards for **Brands** and **Creators** with analytics, campaign tracking, and proposal management.

---

## 🎯 Demo

### 🔐 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| 🏢 Brand | `nike@collabnet.com` | `password` |
| 🏢 Brand | `zora@collabnet.com` | `password` |
| 🎨 Creator | `aisha@collabnet.com` | `password` |
| 🎨 Creator | `rohit@collabnet.com` | `password` |

### 🗺️ Quick Demo Paths

**As a Brand:**
1. Login → Brand Dashboard → View campaigns & proposals
2. Accept a proposal → Messenger auto-opens with that creator
3. Send a message → get an AI auto-reply in 2 seconds

**As a Creator:**
1. Login → Browse Campaigns → Apply with a custom bid
2. Track your application status in the Creator Dashboard

**AI Features:**
1. Landing page → scroll to **AI Match Engine**
2. Select niche + location + budget → click **Run AI Match**
3. Watch the compatibility meter animate live

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic page structure |
| **CSS3 (Vanilla)** | Glassmorphism design, animations, responsive layouts |
| **JavaScript (ES6+)** | SPA routing, auth, AI matching, real-time messaging |
| **LocalStorage** | Client-side data persistence (mock database) |
| **Font Awesome 6** | Icon library |
| **Google Fonts** | Typography — Outfit & Plus Jakarta Sans |

> Built with **zero frameworks** and **zero external dependencies** — pure foundational web technologies.

---

## 🏗️ Architecture

```
CollabNet (SPA)
├── index.html          → All views & modals in one file
├── styles.css          → Full design system (glassmorphism, animations)
├── app.js              → Router, Auth, AI Engine, Messaging, Dashboards
└── server.ps1          → Native PowerShell local web server
```

**Key architectural patterns:**
- **Hash-based SPA Router** — `#/brand/dashboard`, `#/creators`, `#/messages`
- **LocalStorage as Database** — Users, campaigns, messages stored as JSON
- **Role Guards** — Routes protected by session role checks
- **AI Matching Formula**: `Score = (Niche × 40%) + (Location × 30%) + (Engagement × 30%)`

---

## 🚀 Run Locally

### Option 1 — PowerShell Server (Recommended for Windows)
```powershell
# Clone the repo
git clone https://github.com/navya185/collabnet.git
cd collabnet

# Start the server
powershell -ExecutionPolicy Bypass -File server.ps1
```
Then open → **[http://localhost:3000](http://localhost:3000)**

### Option 2 — VS Code Live Server
1. Install the **Live Server** extension in VS Code
2. Open the `collabnet` folder
3. Right-click `index.html` → **Open with Live Server**

### Option 3 — Direct File
Just double-click `index.html` — most features will work directly in the browser.

---

## 📁 Project Structure

```
collabnet/
├── index.html          # Complete SPA markup (~550 lines)
├── styles.css          # Design system & animations (~2,200 lines)
├── app.js              # Core application logic (~900 lines)
├── server.ps1          # Windows PowerShell HTTP server
└── README.md           # You are here!
```

---

## 🗺️ Roadmap

- [x] Landing page with animated hero & features
- [x] Creator & Brand registration (multi-step)
- [x] Client-side authentication & session management
- [x] AI Matching Engine with compatibility scoring
- [x] Fake Influencer Detection dashboard
- [x] Campaign creation, listing & application system
- [x] Real-time messenger with AI auto-reply bots
- [x] Role-based dashboards (Brand & Creator)
- [ ] Real backend integration (Firebase / Supabase)
- [ ] Social media API connections (Instagram, YouTube)
- [ ] Payment & escrow system
- [ ] Mobile app (React Native)
- [ ] TikTok & Reels analytics integration

---

## 👥 Team

Built with ❤️ by **Team CollabNet**

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

---

<div align="center">

**⭐ Star this repo if you found it useful!**

[🌐 Live Demo](https://navya185.github.io/collabnet) • [🐛 Report Bug](https://github.com/navya185/collabnet/issues) • [💡 Request Feature](https://github.com/navya185/collabnet/issues)

</div>
