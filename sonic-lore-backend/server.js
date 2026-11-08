import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let albums = [
    { id: 1, title: "Preacher's Daughter", artist: "Ethel Cain", year: "2022", type: "LP", image: "https://i.pinimg.com/736x/d2/15/fd/d215fd2d44f60ddaa50b93ec15932375.jpg" },
    { id: 2, title: "LUX", artist: "Rosalía", year: "2025", type: "EP", image: "https://i.pinimg.com/736x/58/2a/55/582a550e3b88805ac9666a218e95ae0d.jpg" },
    { id: 3, title: "Music, Fashion, Film", artist: "Charli XCX", year: "2024", type: "LP", image: "https://i.pinimg.com/1200x/52/72/3a/52723ab084a2a693a5325d1b9d8d4e51.jpg" },
    { id: 4, title: "Lemonade", artist: "Beyoncé", year: "2026", type: "LP", image: "https://upload.wikimedia.org/wikipedia/en/5/53/Beyonce_-_Lemonade_%28Official_Album_Cover%29.png" },
    { id: 5, title: "Caprisongs", artist: "FKA Twigs", year: "2023", type: "LP", image: "https://i.pinimg.com/736x/e6/89/a7/e689a74c5e745cc6aab16b380c958405.jpg" },
    { id: 6, title: "Who Really Cares", artist: "TV Girl", year: "2025", type: "EP", image: "https://i.pinimg.com/736x/08/47/49/0847492b14cf53e8d7c03fe74f61fa44.jpg" },
    { id: 7, title: "Romeo", artist: "Sega Bodega", year: "2022", type: "LP", image: "https://i.pinimg.com/736x/6c/20/4c/6c204cb0bc2436bcede361e32e1dd446.jpg" },
    { id: 8, title: "Popstar", artist: "Tinashe", year: "2024", type: "LP", image: "https://i.pinimg.com/1200x/48/dd/85/48dd8500e5e8143e876090da84a6ddcd.jpg" }
];

let reviews = [
    { id: 101, albumId: 1, title: "Шедевр", text: "Найкращий альбом Ethel Cain.", date: "2026-11-08" }
];

app.post('/api/auth', (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        res.status(200).json({ message: "Успішний вхід!" });
    } else {
        res.status(400).json({ message: "Помилка авторизації." });
    }
});

app.get('/api/albums', (req, res) => {
    res.status(200).json(albums);
});

app.get('/api/albums/:id', (req, res) => {
    const albumId = parseInt(req.params.id);
    const album = albums.find(a => a.id === albumId);

    if (!album) {
        return res.status(404).json({ message: "Альбом не знайдено" });
    }

    const albumReviews = reviews.filter(r => r.albumId === albumId);
    res.status(200).json({ ...album, reviews: albumReviews });
});

app.post('/api/albums', (req, res) => {
    const { title, artist, year, type, image } = req.body;

    const isDuplicate = albums.some(
        a => a.title.toLowerCase().trim() === title.toLowerCase().trim() &&
            a.artist.toLowerCase().trim() === artist.toLowerCase().trim()
    );

    if (isDuplicate) {
        return res.status(400).json({ message: "Цей альбом вже існує в каталозі!" });
    }

    const newAlbum = {
        id: Date.now(),
        title: title.trim(),
        artist: artist.trim(),
        year: year || "2026",
        type: type || "LP",
        image: image || `https://placehold.co/400x400/2a2a30/e06853?text=${artist.replace(/\s/g, "+")}`
    };

    albums.unshift(newAlbum);

    console.log("💿 Створено новий альбом:", newAlbum.title);
    res.status(201).json({ message: "Альбом успішно додано!", album: newAlbum });
});

app.post('/api/reviews', (req, res) => {
    const newReview = req.body;

    if (!newReview.albumId) {
        return res.status(400).json({ message: "Не вказано ID альбому!" });
    }

    newReview.id = Date.now();
    newReview.albumId = parseInt(newReview.albumId);
    reviews.unshift(newReview);

    console.log(`📝 Нове рев'ю для альбому ${newReview.albumId}:`, newReview);
    res.status(201).json({ message: "Відгук збережено!" });
});

app.listen(PORT, () => {
    console.log(`Бекенд працює на http://localhost:${PORT}`);
});