const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'welcome to endless' })
});

module.exports = router;
