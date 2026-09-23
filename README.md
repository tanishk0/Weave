# 🧠 Weave.ai — Turn Scattered Knowledge into Actionable Playbooks

> **Transform screenshots, social bookmarks, PDFs, and fragmented notes into structured, searchable, and battle-ready playbooks using Google Gemini & Unstructured.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-7.9-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Google Gemini](https://img.shields.io/badge/Gemini-3.1_Flash_Lite-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.6-purple?style=for-the-badge)](https://www.better-auth.com/)

---

## ⚡ The Problem: The Scattered Knowledge Trap

Every day, we consume and discover incredible insights across dozens of disjointed channels:
- 📱 **Social Media Bookmarks:** Threads on X, saved posts on LinkedIn, and Reddit comments you never open again.
- 📸 **Screenshot Graveyard:** Hundreds of screenshots rotting in your camera roll with zero searchability.
- 📄 **Heavy PDFs & Papers:** Long whitepapers, slide decks, and research docs filled with fluff and buried gems.
- 📝 **Fragmented Scratchpads:** Half-baked ideas and raw notes scattered across Apple Notes, Notion, and Slack.

**Knowledge isn't valuable when it's scattered. It's only valuable when it's actionable.**

---

## 💡 The Solution: Weave Engine

**Weave.ai** continuously ingests your raw informational chaos, strips away advertising fluff and boilerplate, categorizes key insights semantically, and organizes them into cohesive, execution-ready **Playbooks**.

```
  [ Screenshots ]   [ Social Links ]   [ PDFs & Docs ]   [ Raw Notes ]
         │                  │                  │               │
         ▼                  ▼                  ▼               ▼
   ┌─────────────────────────────────────────────────────────────┐
   │                  Unstructured Partitioning                  │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │             LangChain Recursive Chunking Engine             │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │           Gemini 3.1 Flash Lite Intelligence Core           │
   │    • Noise Filtering  • Markdown Synthesis  • Auto-Topic    │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │        Actionable Playbook with Topic Classification        │
   └─────────────────────────────────────────────────────────────┘
```

---

## ✨ Core Features

### 📥 1. Universal Capture Engine
Drop in any format. Weave uses high-performance OCR and document partitioning via `@unstructured-client` to ingest images, screenshots, PDFs, Word docs, code snippets, web links, and raw clipboard text seamlessly.

### 🧹 2. Fluff & Noise Stripping
Raw web articles and social feeds contain up to 80% noise (navbars, ads, cookie banners, clickbait). Weave isolates high-signal insights, code blocks, metrics, and takeaways into clean, readable GitHub-flavored Markdown.

### 🏷️ 3. Autonomous Topic Classification
When new intelligence arrives, Weave evaluates your existing Playbook taxonomy. It matches the entry with an existing topic or creates a precise new category, keeping your workspace organized without manual filing.

### 📚 4. Contextual Living Playbooks
Browse playbooks organized by topic and date. Each knowledge entry contains concise summaries, source media tags, formatted code snippets, and structured action items ready for immediate reference.

### 🔒 5. Enterprise-Ready Architecture
Powered by Better Auth with session management, Neon PostgreSQL serverless database with Prisma 7 ORM, UploadThing cloud storage, and Framer Motion micro-interactions.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | High-performance React server components & API routes |
| **UI & Styling** | React 19 + Tailwind CSS v4 | Ultra-modern aesthetic, Framer Motion animations & Lucide icons |
| **AI Engine** | Google Gemini 3.1 Flash Lite | High-speed structured extraction & semantic classification |
| **Document Parser** | Unstructured API | Heavy lifting for multi-format OCR, PDFs, and images |
| **Text Splitting** | LangChain Text Splitters | Context-aware recursive token chunking |
| **Database** | PostgreSQL (Neon Serverless) | Relational persistence with pooler connection optimization |
| **ORM** | Prisma 7.9 (`@prisma/adapter-pg`) | Type-safe schema generation and database queries |
| **Authentication** | Better Auth 1.6 | Fast credential & session management |
| **Asset Storage** | UploadThing | Secure asset uploads for media and attachments |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 20.x
- **PostgreSQL** instance (e.g. [Neon](https://neon.tech))
- **Google Gemini API Key** ([Google AI Studio](https://aistudio.google.com/))
- **Unstructured API Key** ([Unstructured Platform](https://unstructured.io/))

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/tanishk0/Weave.git
cd Weave
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
# Authentication
BETTER_AUTH_SECRET="your_32_char_random_secret"
BETTER_AUTH_URL="http://localhost:3000"
# AI & Parsing
GEMINI_API_KEY="your_gemini_api_key"
UNSTRUCTURED_API_KEY="your_unstructured_api_key"
UNSTRUCTURED_SERVER_URL="https://api.unstructuredapp.io"
# Uploads (Optional for media files)
UPLOADTHING_TOKEN="your_uploadthing_token"
```

### 3. Setup Database Schema
Push the schema migrations to your PostgreSQL database:
```bash
npx prisma generate
npx prisma db push
```

### 4. Launch Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser and build your first playbook.

---

## 📂 Project Architecture

```
weave.ai/
├── app/                    # Next.js 16 App Router (Pages, Layouts, API endpoints)
│   ├── (app)/              # Authenticated dashboard, playbooks, composer views
│   ├── api/playbook/       # Playbook creation, topic query, capture pipeline
│   └── how-it-works/       # Interactive product journey visualizer
├── components/             # Reusable UI component library (Tailwind + Framer)
├── context/                # Client state management (PlaybookContext, TopicContext)
├── lib/
│   ├── ai/                 # Gemini prompt engineering, chunking, topic classification
│   ├── parser/             # Unstructured API integration for OCR & doc parsing
│   ├── auth.ts             # Better Auth server configuration
│   └── prisma.ts           # Prisma client singleton with PG adapter
└── prisma/schema.prisma    # PostgreSQL relational data schema
```

---

## 📄 License & Community

Distributed under the MIT License. Contributions and feature requests are welcome!
