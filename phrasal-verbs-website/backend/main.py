from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import json
import os

app = FastAPI(title="Phrasal Verbs API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load phrasal verbs data
def load_json_data(filename: str):
    """Load JSON data from file"""
    filepath = os.path.join(os.path.dirname(__file__), filename)
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        return []

# Load data on startup
phrasal_verbs = load_json_data('phrasal_verbs.json')
games = load_json_data('games.json')
answers = load_json_data('answers.json')

# Pydantic models for response
class PhrasalVerb(BaseModel):
    id: int
    verb: str
    meaning: str
    example: str
    category: str

class Game(BaseModel):
    id: int
    title: str
    description: str
    type: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the Phrasal Verbs API"}

@app.get("/api/phrasal-verbs", response_model=List[PhrasalVerb])
def get_phrasal_verbs(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    """Get all phrasal verbs with optional filtering by category or search term"""
    filtered = phrasal_verbs
    
    if category and category != 'All':
        filtered = [pv for pv in filtered if pv.get('category') == category]
    
    if search:
        search_lower = search.lower()
        filtered = [
            pv for pv in filtered 
            if search_lower in pv.get('verb', '').lower() or 
               search_lower in pv.get('meaning', '').lower()
        ]
    
    return filtered

@app.get("/api/phrasal-verbs/{verb_id}")
def get_phrasal_verb(verb_id: int):
    """Get a specific phrasal verb by ID"""
    for pv in phrasal_verbs:
        if pv.get('id') == verb_id:
            return pv
    
    raise HTTPException(status_code=404, detail="Phrasal verb not found")

@app.get("/api/categories")
def get_categories():
    """Get all unique categories"""
    categories = ['All']
    if phrasal_verbs:
        unique_categories = list(set(pv.get('category') for pv in phrasal_verbs if pv.get('category')))
        categories.extend(unique_categories)
    return categories

@app.get("/api/games")
def get_games():
    """Get all available games"""
    return games

@app.get("/api/games/{game_id}")
def get_game(game_id: int):
    """Get a specific game by ID"""
    for game in games:
        if game.get('id') == game_id:
            return game
    
    raise HTTPException(status_code=404, detail="Game not found")

@app.get("/api/answers")
def get_answers():
    """Get all answers"""
    return answers

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
