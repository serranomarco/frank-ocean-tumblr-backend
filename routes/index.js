const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'welcome to Endless' })
});

module.exports = router;
