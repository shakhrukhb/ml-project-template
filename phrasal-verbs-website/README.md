# 📚 English Phrasal Verbs Learning Website

A full-stack web application for learning English phrasal verbs based on "English for Everyone: English Phrasal Verbs" book.

## Features

- 🎯 Browse through common English phrasal verbs
- 🔍 Search functionality to find specific phrasal verbs
- 🏷️ Filter by categories (Movement, Actions, Problems, etc.)
- 📱 Responsive design for mobile and desktop
- ⚡ Fast and modern React frontend
- 🚀 Express.js backend API

## Tech Stack

### Frontend
- React 19 with Vite
- Axios for API calls
- CSS3 with modern features (Grid, Flexbox)

### Backend
- Node.js
- Express.js
- CORS enabled
- RESTful API

## Project Structure

```
phrasal-verbs-website/
├── backend/
│   └── server.js          # Express server and API routes
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── App.css        # Styles
│   │   └── main.jsx       # Entry point
│   └── package.json
├── .env                   # Environment variables
├── package.json           # Root package.json
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd phrasal-verbs-website
```

2. Install all dependencies:
```bash
npm run install-all
```

Or manually:
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

## Running the Application

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend development server on http://localhost:5173

### Run Separately

Backend only:
```bash
npm run server
```

Frontend only:
```bash
npm run client
```

### Production Build

```bash
npm run build
```

## API Endpoints

- `GET /api/phrasal-verbs` - Get all phrasal verbs
  - Query params: `category`, `search`
- `GET /api/phrasal-verbs/:id` - Get a specific phrasal verb
- `GET /api/categories` - Get all categories

## Sample Data

The application comes with 20 sample phrasal verbs including:
- back up, break down, bring up, call off, carry on
- come across, cut down, do over, fall apart, get along
- give up, go over, hold on, look after, pick up
- put off, run out of, set up, take off, turn down

## Customization

You can easily add more phrasal verbs by editing the `phrasalVerbs` array in `backend/server.js`.

## License

ISC

## Acknowledgments

Content inspired by "English for Everyone: English Phrasal Verbs" book series.
