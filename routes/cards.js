'use strict';
const
  express = require('express'),
  router = express.Router(),
  data = require('../data/flashcardData.json').data,
  cards = data.cards; // es6 cards = data.cards

router
  // for routes starting with /cards
  .get('/', (req, res) => {
    const id = Math.floor(Math.random() * cards.length);
    res.redirect(`/cards/${id}?side=question`);
  })
  .get('/:id', (req, res) => {
    const 
      side = req.query.side,
      id = req.params.id;

    if ((side !== 'answer' && side !== 'question')
      && id > -1 && id <= cards.length) {
      res.redirect(`/cards/${id}?side=question`);
    } else {
      const
        name = req.cookies.username,
        text = cards[id][side],
        hint = cards[id].hint,
        templateData = { text, id, side, name }; // es6 { text: text }
      
      if (side === 'question') {
        templateData.hint = hint;
      }
      res.render('card', templateData);
    }
    
  });
    
module.exports = router;