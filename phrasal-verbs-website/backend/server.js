const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample phrasal verbs data (from "English for Everyone: English Phrasal Verbs")
const phrasalVerbs = [
  { id: 1, verb: 'back up', meaning: 'to move backwards or support someone', example: 'Can you back up your car?', category: 'Movement' },
  { id: 2, verb: 'break down', meaning: 'to stop working (machine) or lose emotional control', example: 'The car broke down on the highway.', category: 'Problems' },
  { id: 3, verb: 'bring up', meaning: 'to raise a child or mention a topic', example: 'She was brought up by her grandmother.', category: 'Family' },
  { id: 4, verb: 'call off', meaning: 'to cancel something', example: 'They called off the meeting.', category: 'Actions' },
  { id: 5, verb: 'carry on', meaning: 'to continue doing something', example: 'Carry on with your work.', category: 'Actions' },
  { id: 6, verb: 'come across', meaning: 'to find or meet by chance', example: 'I came across an old photo.', category: 'Discovery' },
  { id: 7, verb: 'cut down', meaning: 'to reduce or fell a tree', example: 'You should cut down on sugar.', category: 'Reduction' },
  { id: 8, verb: 'do over', meaning: 'to repeat or redo something', example: 'Let me do that over.', category: 'Actions' },
  { id: 9, verb: 'fall apart', meaning: 'to break into pieces or become very upset', example: 'The book is falling apart.', category: 'Problems' },
  { id: 10, verb: 'get along', meaning: 'to have a good relationship', example: 'They get along very well.', category: 'Relationships' },
  { id: 11, verb: 'give up', meaning: 'to quit or surrender', example: 'Don\'t give up on your dreams.', category: 'Actions' },
  { id: 12, verb: 'go over', meaning: 'to review or examine', example: 'Let\'s go over the plan again.', category: 'Review' },
  { id: 13, verb: 'hold on', meaning: 'to wait or grip tightly', example: 'Hold on a moment!', category: 'Actions' },
  { id: 14, verb: 'look after', meaning: 'to take care of', example: 'Can you look after my cat?', category: 'Care' },
  { id: 15, verb: 'pick up', meaning: 'to lift or collect someone/something', example: 'I\'ll pick you up at 8.', category: 'Movement' },
  { id: 16, verb: 'put off', meaning: 'to postpone', example: 'Don\'t put off until tomorrow.', category: 'Time' },
  { id: 17, verb: 'run out of', meaning: 'to use all of something', example: 'We ran out of milk.', category: 'Problems' },
  { id: 18, verb: 'set up', meaning: 'to arrange or establish', example: 'They set up a new business.', category: 'Creation' },
  { id: 19, verb: 'take off', meaning: 'to remove or depart (airplane)', example: 'The plane will take off soon.', category: 'Movement' },
  { id: 20, verb: 'turn down', meaning: 'to refuse or reduce volume', example: 'He turned down the offer.', category: 'Actions' }
];

// API Routes
app.get('/api/phrasal-verbs', (req, res) => {
  const { category, search } = req.query;
  
  let filtered = phrasalVerbs;
  
  if (category && category !== 'All') {
    filtered = filtered.filter(pv => pv.category === category);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(pv => 
      pv.verb.toLowerCase().includes(searchLower) ||
      pv.meaning.toLowerCase().includes(searchLower)
    );
  }
  
  res.json(filtered);
});

app.get('/api/phrasal-verbs/:id', (req, res) => {
  const pv = phrasalVerbs.find(p => p.id === parseInt(req.params.id));
  if (!pv) {
    return res.status(404).json({ message: 'Phrasal verb not found' });
  }
  res.json(pv);
});

app.get('/api/categories', (req, res) => {
  const categories = ['All', ...new Set(phrasalVerbs.map(pv => pv.category))];
  res.json(categories);
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
