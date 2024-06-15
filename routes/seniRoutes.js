// routes/seniRoutes.js
const express = require('express');
const router = express.Router();
const Seni = require("../models/seni");

// GET semua seni
router.get('/', async (req, res) => {
    try {
        const seniList = await Seni.find();
        res.json(seniList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET seni berdasarkan ID
router.get('/:id', async (req, res) => {
    console.log('Received ID:', req.params.id); // Tambahkan log ini
    try {
        const seni = await Seni.findById(req.params.id);
        if (!seni) {
            return res.status(404).json({ message: 'Seni not found' });
        }
        res.json(seni);
    } catch (err) {
        console.error('Error finding seni by ID:', err);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: err.message });
    }
});

// POST buat seni baru
router.post('/', async (req, res) => {
    const seni = new Seni({
        nama: req.body.nama,
        daerah: req.body.daerah,
        deskripsi: req.body.deskripsi,
        videoLink: req.body.videoLink
    });

    try {
        const newSeni = await seni.save();
        res.status(201).json(newSeni);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH update seni
router.patch('/:id', async (req, res) => {
    try {
        const seni = await Seni.findById(req.params.id);
        if (!seni) {
            return res.status(404).json({ message: 'Seni not found' });
        }

        if (req.body.nama != null) {
            seni.nama = req.body.nama;
        }
        if (req.body.daerah != null) {
            seni.daerah = req.body.daerah;
        }
        if (req.body.deskripsi != null) {
            seni.deskripsi = req.body.deskripsi;
        }
        if (req.body.videoLink != null) {
            seni.videoLink = req.body.videoLink;
        }

        const updatedSeni = await seni.save();
        res.json(updatedSeni);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE seni
router.delete('/:id', async (req, res) => {
    try {
        const seni = await Seni.findById(req.params.id);
        if (!seni) {
            return res.status(404).json({ message: 'Seni not found' });
        }

        await seni.remove();
        res.json({ message: 'Seni deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
