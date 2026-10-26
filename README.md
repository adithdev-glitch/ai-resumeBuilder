# CVCRAFT — AI Resume Builder

A production-quality resume builder web application built with React, Node.js, Express, MongoDB, and the Google Gemini API.

## Features

- **Sectioned Editor**: Personal Details, Professional Summary, Work Experience, Education, Projects, Skills, and Certifications with dynamic add, remove, and reordering.
- **Real-Time Live Preview**: Instantly updates as the user edits, displayed on a standard A4 canvas with zoom and pan controls.
- **Three ATS-Compliant Templates**:
  - *Classic Serif*: Single-column editorial layout using Newsreader serif.
  - *Modern Sans*: Clean, high-contrast typography using Public Sans.
  - *Compact One-Page*: High-density layout with 10pt type for single-page requirements.
  - Switching templates preserves 100% of user data.
- **Quiet, Inline AI Utility (Google Gemini)**:
  - *Rewrite*: Improves bullet points with strong action verbs and impact metrics.
  - *Suggest Summary*: Synthesizes an executive summary from existing work history.
  - *Tailor to Job Description*: Re-aligns experience bullets with keywords from a pasted job posting.
  - All suggestions appear in an interactive diff dialog where users can review, edit, accept, or reject changes without automatic overwriting.
- **Export Options**:
  - *Print to PDF*: Dedicated `@media print` stylesheet with pure selectable text, standard ATS heading hierarchy, and zero parsing obstacles.
  - *DOCX Export*: Generates a clean, editable Microsoft Word document.
- **Persistence & Cloud Sync**:
  - JWT authentication using secure `httpOnly` cookies.
  - MongoDB backend with Mongoose models for users and resumes.
  - Debounced quiet autosave indicator ("Saving...", "Saved", "Unsaved changes").
  - LocalStorage fallback ensuring guest users never lose edits.

## Tech Stack

- **Frontend**: React 18, Vite, React Router 6, Tailwind CSS, Lucide React, docx
- **Backend**: Node.js, Express, Mongoose, Cookie Parser, CORS, express-rate-limit
- **AI Integration**: Official Google Gemini SDK (`@google/genai`)

## Directory Structure

```text
├── DESIGN.md
├── README.md
├── package.json
├── frontend/
│   ├── src/
│   │   ├── api/             # API client and service endpoints
│   │   ├── components/      # Common, landing, editor, and preview components
│   │   ├── context/         # AuthContext and ResumeContext
│   │   ├── data/            # Realistic seed resume data
│   │   ├── pages/           # Landing, Editor, Dashboard, Auth pages
│   │   ├── utils/           # DOCX export generator
│   │   └── index.css        # Design tokens and A4 print stylesheet
│   └── tailwind.config.js
└── server/
    ├── src/
    │   ├── config/          # Database and Gemini configuration
    │   ├── controllers/     # Auth, Resume, and AI route handlers
    │   ├── middleware/      # JWT auth and rate limiting
    │   ├── models/          # Mongoose schemas (User, Resume)
    │   ├── routes/          # Express route definitions
    │   ├── services/        # Gemini API prompt engineering and schema validation
    │   └── server.js        # Express application entry point
    └── .env.example
```

## Getting Started

### 1. Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB (optional for local guest building; required for cloud sync)

### 2. Installation
Install all dependencies across root, server, and frontend:

```bash
npm run install:all
```

Or install individually:
```bash
cd server && npm install
cd ../frontend && npm install
```

### 3. Environment Variables
Create `.env` in the `server` directory:

```bash
cp server/.env.example server/.env
```

Configuration keys:
- `PORT`: Port for the Express server (default: `5001`).
- `MONGODB_URI`: MongoDB connection string (default: `mongodb://127.0.0.1:27017/cvcraft`).
- `JWT_SECRET`: Secret key used for signing JWT authentication tokens.
- `GEMINI_API_KEY`: Your Google Gemini API key. If omitted, the server operates with built-in rule-based editorial rewrites.
- `GEMINI_MODEL`: Gemini model identifier (default: `gemini-2.5-flash`).

### 4. Running the Development Servers

From the root directory:
```bash
npm run dev
```

Or start each service independently:
- **Backend**: `npm --prefix server run dev` (starts on `http://localhost:5001`)
- **Frontend**: `npm --prefix frontend run dev` (starts on `http://localhost:5173`)

Open `http://localhost:5173` in your web browser.

## Gemini API Key Usage & Security

- The Gemini API is called strictly from backend controllers (`server/src/services/geminiService.js`).
- The API key is loaded into server memory from `.env` and is never exposed to client-side bundles.
- System instructions enforce truthfulness, forbid hallucinated metrics or skills, and validate JSON output schemas before sending responses to the client.
- Rate limiting is enforced via `express-rate-limit` on all `/api/ai/*` endpoints.
