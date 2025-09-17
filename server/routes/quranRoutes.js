const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');

const surahs = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatihah", englishTranslation: "The Opening", verses: 7 },
  { number: 2, name: "البقرة", englishName: "Al-Baqarah", englishTranslation: "The Cow", verses: 286 },
  { number: 3, name: "آل عمران", englishName: "Ali 'Imran", englishTranslation: "Family of Imran", verses: 200 },
  { number: 4, name: "النساء", englishName: "An-Nisa", englishTranslation: "The Women", verses: 176 },
  { number: 5, name: "المائدة", englishName: "Al-Ma'idah", englishTranslation: "The Table Spread", verses: 120 },
  { number: 6, name: "الأنعام", englishName: "Al-An'am", englishTranslation: "The Cattle", verses: 165 },
  { number: 7, name: "الأعراف", englishName: "Al-A'raf", englishTranslation: "The Heights", verses: 206 },
  { number: 8, name: "الأنفال", englishName: "Al-Anfal", englishTranslation: "The Spoils of War", verses: 75 },
  { number: 9, name: "التوبة", englishName: "At-Tawbah", englishTranslation: "The Repentance", verses: 129 },
  { number: 10, name: "يونس", englishName: "Yunus", englishTranslation: "Jonah", verses: 109 },
  { number: 11, name: "هود", englishName: "Hud", englishTranslation: "Hud", verses: 123 },
  { number: 12, name: "يوسف", englishName: "Yusuf", englishTranslation: "Joseph", verses: 111 },
  { number: 13, name: "الرعد", englishName: "Ar-Ra'd", englishTranslation: "The Thunder", verses: 43 },
  { number: 14, name: "ابراهيم", englishName: "Ibrahim", englishTranslation: "Abraham", verses: 52 },
  { number: 15, name: "الحجر", englishName: "Al-Hijr", englishTranslation: "The Rocky Tract", verses: 99 },
  { number: 16, name: "النحل", englishName: "An-Nahl", englishTranslation: "The Bee", verses: 128 },
  { number: 17, name: "الإسراء", englishName: "Al-Isra", englishTranslation: "The Night Journey", verses: 111 },
  { number: 18, name: "الكهف", englishName: "Al-Kahf", englishTranslation: "The Cave", verses: 110 },
  { number: 19, name: "مريم", englishName: "Maryam", englishTranslation: "Mary", verses: 98 },
  { number: 20, name: "طه", englishName: "Taha", englishTranslation: "Ta-Ha", verses: 135 },
  { number: 21, name: "الأنبياء", englishName: "Al-Anbya", englishTranslation: "The Prophets", verses: 112 },
  { number: 22, name: "الحج", englishName: "Al-Hajj", englishTranslation: "The Pilgrimage", verses: 78 },
  { number: 23, name: "المؤمنون", englishName: "Al-Mu'minun", englishTranslation: "The Believers", verses: 118 },
  { number: 24, name: "النور", englishName: "An-Nur", englishTranslation: "The Light", verses: 64 },
  { number: 25, name: "الفرقان", englishName: "Al-Furqan", englishTranslation: "The Criterion", verses: 77 },
  { number: 26, name: "الشعراء", englishName: "Ash-Shu'ara", englishTranslation: "The Poets", verses: 227 },
  { number: 27, name: "النمل", englishName: "An-Naml", englishTranslation: "The Ant", verses: 93 },
  { number: 28, name: "القصص", englishName: "Al-Qasas", englishTranslation: "The Stories", verses: 88 },
  { number: 29, name: "العنكبوت", englishName: "Al-'Ankabut", englishTranslation: "The Spider", verses: 69 },
  { number: 30, name: "الروم", englishName: "Ar-Rum", englishTranslation: "The Romans", verses: 60 },
  { number: 31, name: "لقمان", englishName: "Luqman", englishTranslation: "Luqman", verses: 34 },
  { number: 32, name: "السجدة", englishName: "As-Sajdah", englishTranslation: "The Prostration", verses: 30 },
  { number: 33, name: "الأحزاب", englishName: "Al-Ahzab", englishTranslation: "The Combined Forces", verses: 73 },
  { number: 34, name: "سبإ", englishName: "Saba", englishTranslation: "Sheba", verses: 54 },
  { number: 35, name: "فاطر", englishName: "Fatir", englishTranslation: "Originator", verses: 45 },
  { number: 36, name: "يس", englishName: "Ya-Sin", englishTranslation: "Ya Sin", verses: 83 },
  { number: 37, name: "الصافات", englishName: "As-Saffat", englishTranslation: "Those who set the Ranks", verses: 182 },
  { number: 38, name: "ص", englishName: "Sad", englishTranslation: "The Letter Sad", verses: 88 },
  { number: 39, name: "الزمر", englishName: "Az-Zumar", englishTranslation: "The Troops", verses: 75 },
  { number: 40, name: "غافر", englishName: "Ghafir", englishTranslation: "The Forgiver", verses: 85 },
  { number: 41, name: "فصلت", englishName: "Fussilat", englishTranslation: "Explained in Detail", verses: 54 },
  { number: 42, name: "الشورى", englishName: "Ash-Shuraa", englishTranslation: "The Consultation", verses: 53 },
  { number: 43, name: "الزخرف", englishName: "Az-Zukhruf", englishTranslation: "The Ornaments of Gold", verses: 89 },
  { number: 44, name: "الدخان", englishName: "Ad-Dukhan", englishTranslation: "The Smoke", verses: 59 },
  { number: 45, name: "الجاثية", englishName: "Al-Jathiyah", englishTranslation: "The Crouching", verses: 37 },
  { number: 46, name: "الأحقاف", englishName: "Al-Ahqaf", englishTranslation: "The Wind-Curved Sandhills", verses: 35 },
  { number: 47, name: "محمد", englishName: "Muhammad", englishTranslation: "Muhammad", verses: 38 },
  { number: 48, name: "الفتح", englishName: "Al-Fath", englishTranslation: "The Victory", verses: 29 },
  { number: 49, name: "الحجرات", englishName: "Al-Hujurat", englishTranslation: "The Rooms", verses: 18 },
  { number: 50, name: "ق", englishName: "Qaf", englishTranslation: "The Letter Qaf", verses: 45 },
  { number: 51, name: "الذاريات", englishName: "Adh-Dhariyat", englishTranslation: "The Winnowing Winds", verses: 60 },
  { number: 52, name: "الطور", englishName: "At-Tur", englishTranslation: "The Mount", verses: 49 },
  { number: 53, name: "النجم", englishName: "An-Najm", englishTranslation: "The Star", verses: 62 },
  { number: 54, name: "القمر", englishName: "Al-Qamar", englishTranslation: "The Moon", verses: 55 },
  { number: 55, name: "الرحمن", englishName: "Ar-Rahman", englishTranslation: "The Beneficent", verses: 78 },
  { number: 56, name: "الواقعة", englishName: "Al-Waqi'ah", englishTranslation: "The Inevitable", verses: 96 },
  { number: 57, name: "الحديد", englishName: "Al-Hadid", englishTranslation: "The Iron", verses: 29 },
  { number: 58, name: "المجادلة", englishName: "Al-Mujadila", englishTranslation: "The Pleading Woman", verses: 22 },
  { number: 59, name: "الحشر", englishName: "Al-Hashr", englishTranslation: "The Exile", verses: 24 },
  { number: 60, name: "الممتحنة", englishName: "Al-Mumtahanah", englishTranslation: "She that is to be examined", verses: 13 },
  { number: 61, name: "الصف", englishName: "As-Saf", englishTranslation: "The Ranks", verses: 14 },
  { number: 62, name: "الجمعة", englishName: "Al-Jumu'ah", englishTranslation: "The Congregation, Friday", verses: 11 },
  { number: 63, name: "المنافقون", englishName: "Al-Munafiqun", englishTranslation: "The Hypocrites", verses: 11 },
  { number: 64, name: "التغابن", englishName: "At-Taghabun", englishTranslation: "The Mutual Disillusion", verses: 18 },
  { number: 65, name: "الطلاق", englishName: "At-Talaq", englishTranslation: "The Divorce", verses: 12 },
  { number: 66, name: "التحريم", englishName: "At-Tahrim", englishTranslation: "The Prohibition", verses: 12 },
  { number: 67, name: "الملك", englishName: "Al-Mulk", englishTranslation: "The Sovereignty", verses: 30 },
  { number: 68, name: "القلم", englishName: "Al-Qalam", englishTranslation: "The Pen", verses: 52 },
  { number: 69, name: "الحاقة", englishName: "Al-Haqqah", englishTranslation: "The Reality", verses: 52 },
  { number: 70, name: "المعارج", englishName: "Al-Ma'arij", englishTranslation: "The Ascending Stairways", verses: 44 },
  { number: 71, name: "نوح", englishName: "Nuh", englishTranslation: "Noah", verses: 28 },
  { number: 72, name: "الجن", englishName: "Al-Jinn", englishTranslation: "The Jinn", verses: 28 },
  { number: 73, name: "المزمل", englishName: "Al-Muzzammil", englishTranslation: "The Enshrouded One", verses: 20 },
  { number: 74, name: "المدثر", englishName: "Al-Muddaththir", englishTranslation: "The Cloaked One", verses: 56 },
  { number: 75, name: "القيامة", englishName: "Al-Qiyamah", englishTranslation: "The Resurrection", verses: 40 },
  { number: 76, name: "الانسان", englishName: "Al-Insan", englishTranslation: "The Man", verses: 31 },
  { number: 77, name: "المرسلات", englishName: "Al-Mursalat", englishTranslation: "The Emissaries", verses: 50 },
  { number: 78, name: "النبإ", englishName: "An-Naba", englishTranslation: "The Tidings", verses: 40 },
  { number: 79, name: "النازعات", englishName: "An-Nazi'at", englishTranslation: "Those who drag forth", verses: 46 },
  { number: 80, name: "عبس", englishName: "'Abasa", englishTranslation: "He Frowned", verses: 42 },
  { number: 81, name: "التكوير", englishName: "At-Takwir", englishTranslation: "The Overthrowing", verses: 29 },
  { number: 82, name: "الإنفطار", englishName: "Al-Infitar", englishTranslation: "The Cleaving", verses: 19 },
  { number: 83, name: "المطففين", englishName: "Al-Mutaffifin", englishTranslation: "The Defrauding", verses: 36 },
  { number: 84, name: "الإنشقاق", englishName: "Al-Inshiqaq", englishTranslation: "The Sundering", verses: 25 },
  { number: 85, name: "البروج", englishName: "Al-Buruj", englishTranslation: "The Mansions of the Stars", verses: 22 },
  { number: 86, name: "الطارق", englishName: "At-Tariq", englishTranslation: "The Morning Star", verses: 17 },
  { number: 87, name: "الأعلى", englishName: "Al-A'la", englishTranslation: "The Most High", verses: 19 },
  { number: 88, name: "الغاشية", englishName: "Al-Ghashiyah", englishTranslation: "The Overwhelming", verses: 26 },
  { number: 89, name: "الفجر", englishName: "Al-Fajr", englishTranslation: "The Dawn", verses: 30 },
  { number: 90, name: "البلد", englishName: "Al-Balad", englishTranslation: "The City", verses: 20 },
  { number: 91, name: "الشمس", englishName: "Ash-Shams", englishTranslation: "The Sun", verses: 15 },
  { number: 92, name: "الليل", englishName: "Al-Layl", englishTranslation: "The Night", verses: 21 },
  { number: 93, name: "الضحى", englishName: "Ad-Duhaa", englishTranslation: "The Morning Hours", verses: 11 },
  { number: 94, name: "الشرح", englishName: "Ash-Sharh", englishTranslation: "The Relief", verses: 8 },
  { number: 95, name: "التين", englishName: "At-Tin", englishTranslation: "The Fig", verses: 8 },
  { number: 96, name: "العلق", englishName: "Al-'Alaq", englishTranslation: "The Clot", verses: 19 },
  { number: 97, name: "القدر", englishName: "Al-Qadr", englishTranslation: "The Power", verses: 5 },
  { number: 98, name: "البينة", englishName: "Al-Bayyinah", englishTranslation: "The Clear Proof", verses: 8 },
  { number: 99, name: "الزلزلة", englishName: "Az-Zalzalah", englishTranslation: "The Earthquake", verses: 8 },
  { number: 100, name: "العاديات", englishName: "Al-'Adiyat", englishTranslation: "The Courser", verses: 11 },
  { number: 101, name: "القارعة", englishName: "Al-Qari'ah", englishTranslation: "The Calamity", verses: 11 },
  { number: 102, name: "التكاثر", englishName: "At-Takathur", englishTranslation: "The Rivalry in world increase", verses: 8 },
  { number: 103, name: "العصر", englishName: "Al-'Asr", englishTranslation: "The Declining Day", verses: 3 },
  { number: 104, name: "الهمزة", englishName: "Al-Humazah", englishTranslation: "The Traducer", verses: 9 },
  { number: 105, name: "الفيل", englishName: "Al-Fil", englishTranslation: "The Elephant", verses: 5 },
  { number: 106, name: "قريش", englishName: "Quraysh", englishTranslation: "Quraysh", verses: 4 },
  { number: 107, name: "الماعون", englishName: "Al-Ma'un", englishTranslation: "The Small Kindnesses", verses: 7 },
  { number: 108, name: "الكوثر", englishName: "Al-Kawthar", englishTranslation: "The Abundance", verses: 3 },
  { number: 109, name: "الكافرون", englishName: "Al-Kafirun", englishTranslation: "The Disbelievers", verses: 6 },
  { number: 110, name: "النصر", englishName: "An-Nasr", englishTranslation: "The Divine Support", verses: 3 },
  { number: 111, name: "المسد", englishName: "Al-Masad", englishTranslation: "The Palm Fiber", verses: 5 },
  { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas", englishTranslation: "The Sincerity", verses: 4 },
  { number: 113, name: "الفلق", englishName: "Al-Falaq", englishTranslation: "The Daybreak", verses: 5 },
  { number: 114, name: "الناس", englishName: "An-Nas", englishTranslation: "The Mankind", verses: 6 }
];

router.get('/surahs', authenticate, async (req, res) => {
  try {
    res.json(surahs);
  } catch (error) {
    console.error('Error fetching surahs:', error);
    res.status(500).json({ error: 'Failed to fetch surahs' });
  }
});

router.get('/surah/:number', authenticate, async (req, res) => {
  try {
    const { number } = req.params;
    const { translation = 'en-ahmedali' } = req.query;
    
    // Validate surah number
    const surahNumber = parseInt(number);
    if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
      return res.status(400).json({ error: 'Invalid surah number' });
    }
    
    // Build URLs properly
    const arabicUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quransimple/${surahNumber}.json`;
    
    const arabicResponse = await fetch(arabicUrl);
    if (!arabicResponse.ok) {
      throw new Error(`Failed to fetch Arabic text: ${arabicResponse.status}`);
    }
    
    const arabicData = await arabicResponse.json();
    
    // Map translation IDs to fawazahmed0 API format
    const translationMap = {
      'en-ahmedali': 'eng-ahmedali',
    };
    
    const translationId = translationMap[translation] || 'eng-ahmedali';
    const translationUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/${translationId}/${surahNumber}.json`;
    
    const translationResponse = await fetch(translationUrl);
    if (!translationResponse.ok) {
      throw new Error(`Failed to fetch translation: ${translationResponse.status}`);
    }
    
    const translationData = await translationResponse.json();
    
    const surahInfo = surahs[surahNumber - 1];
    
    res.json({
      arabic: {
        surahName: surahInfo.name,
        surahNameLatin: surahInfo.englishName,
        verses: arabicData.chapter.map(verse => verse.text),
      },
      translation: {
        surahName: surahInfo.englishTranslation,
        verses: translationData.chapter.map(verse => verse.text)
      },
      translationId: translation
    });
  } catch (error) {
    console.error('Error getting surah:', error);
    res.status(500).json({ error: 'Failed to fetch surah', details: error.message });
  }
});

router.get('/translations', authenticate, async (req, res) => {
  try {
    const translations = [
      { id: 'en-ahmedali', name: 'Ahmed Ali', language: 'English' },
    ];
    
    res.json({ translations });
  } catch (error) {
    console.error('Error fetching translations:', error);
    res.status(500).json({ error: 'Failed to fetch translations' });
  }
});

module.exports = router;