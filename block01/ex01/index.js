const express = require('express');

const app = express();

app.listen(4040, () => {
    console.log('app is listening on port 4040');
})

app.get('/:language', (req, res) => {
    const language = req.params.language;
    
    if (language in languages) {
        const message = languages[language];
        res.send({ ok: true, data: languages[language] });
    } else {
        res.send({ ok: true, data: 'Hello World'});
    }
})

app.get('/', (req, res) => {
    res.send({ ok: true, data: 'Hello World'});
})


const languages = {
    'EN': 'Hello World', // English
    'ES': 'Hola Mundo', // Spanish
    'FR': 'Bonjour le Monde', // French
    'DE': 'Hallo Welt', // German
    'IT': 'Ciao Mondo', // Italian
    'NL': 'Hallo Wereld', // Dutch
    'PT': 'Olá Mundo', // Portuguese
    'RU': 'Привет, мир', // Russian
    'ZH': '你好，世界', // Chinese (Simplified)
    'JA': 'こんにちは世界', // Japanese
    'KO': '안녕하세요 세계', // Korean
    'AR': 'مرحبا بالعالم', // Arabic
    'HI': 'नमस्ते दुनिया', // Hindi
    'TR': 'Merhaba Dünya', // Turkish
    'SV': 'Hej Värld', // Swedish
    'NO': 'Hallo Verden', // Norwegian
    'DA': 'Hej Verden', // Danish
    'FI': 'Hei Maailma', // Finnish
    'PL': 'Witaj Świecie', // Polish
    'CS': 'Ahoj světe', // Czech
    'SK': 'Ahoj svet', // Slovak
    'HU': 'Helló Világ', // Hungarian
    'EL': 'Γειά σου Κόσμε', // Greek
    'TH': 'สวัสดีชาวโลก', // Thai
    'HE': 'שלום עולם', // Hebrew
    'ID': 'Halo Dunia', // Indonesian
    'MS': 'Halo Dunia', // Malay
    'VI': 'Xin chào Thế giới', // Vietnamese
    'BG': 'Здравей свят', // Bulgarian
    'RO': 'Salut Lume', // Romanian
    'LT': 'Labas Pasauli', // Lithuanian
    'LV': 'Sveika Pasaule', // Latvian
    'ET': 'Tere maailm', // Estonian
    'SR': 'Здраво Свете', // Serbian
    'BS': 'Zdravo svijete', // Bosnian
    'HR': 'Pozdrav svijetu', // Croatian
    'SL': 'Pozdravljen svet', // Slovenian
    'MK': 'Здраво Свету', // Macedonian
    'MT': 'Hello Dinja', // Maltese
    'JW': 'Halo Dunia', // Javanese
    'XH': 'Molo Worl', // Xhosa
    'SW': 'Habari Dunia', // Swahili
    'NE': 'नमस्कार संसार', // Nepali
    'PA': 'ਹੈਲੋ ਦੁਨੀਆ', // Punjabi
    'TA': 'வணக்கம் உலகம்', // Tamil
    'TE': 'హలో వరల్డ్', // Telugu
    'BN': 'হ্যালো বিশ্ব', // Bengali
    'MY': 'ဟယ်လိုကမ္ဘာ', // Burmese
    'LO': 'ສະບາຍດີແກ່ໂລກ', // Lao
    'KM': 'សួស្ដីពិភពលោក', // Khmer
    'GL': 'Ola Mundo', // Galician
    'CA': 'Hola Món', // Catalan
    'AN': 'Halo Mundo', // Aragonese
    'UK': 'Привіт Світ', // Ukrainian
    'IU': 'ᓯᓚᓂᒃ ᑕᑯᑕᕐ', // Inuktitut
    'MA': 'Hello World', // Marathi
    'SQ': 'Përshëndetje Botë', // Albanian
    'HT': 'Bonjou Mond', // Haitian Creole
    'RO': 'Salut Lume', // Romanian
    'MK': 'Здраво Свету', // Macedonian
    'HE': 'שלום עולם', // Hebrew
    'LO': 'ສະບາຍດີແກ່ໂລກ', // Lao
    'MM': 'မင်္ဂလာပါ ကမ္ဘာ', // Burmese
    'YT': 'Salam Dunia', // Yao
    'AK': 'Hallo Wiya', // Akan
    'ES': 'Hola Mundo', // Spanish
    'EU': 'Kaixo Mundua', // Basque
    'CY': 'Helo Byd', // Welsh
    'GA': 'Dia duit Domhan', // Irish
    'LB': 'Hallo Welt', // Luxembourgish
    'SC': 'Ciao Mondo', // Sardo
    'TS': 'Sawubona Umhlaba', // Tsonga
    'SO': 'Salaan Dunida', // Somali
    'AM': 'ሰላም ሰሜን', // Amharic
    'PS': 'سلام نړی', // Pashto
    'KZ': 'Сәлем Әлем', // Kazakh
    'UZ': 'Salom Dunyo', // Uzbek
    'TT': 'Сәлам Дөнья', // Tatar
    'KA': 'გამარჯობა მსოფლიო', // Georgian
    'MN': 'Сайн уу Дэлхий', // Mongolian
    'AR': 'مرحبا بالعالم', // Arabic
    'BA': 'Zdravstvuyte, mir', // Bashkir
    'UZ': 'Salom Dunyo', // Uzbek
    'TL': 'Kamusta Mundo', // Tagalog
    'BA': 'Сәләм донъя', // Bashkir
    'GA': 'Dia duit Domhan', // Irish
    'KI': 'Bula, Ote', // Kiribati
    'LO': 'ສະບາຍດີແກ່ໂລກ', // Lao
    'RM': 'Hello Mondo', // Romansh
    'SM': 'Talofa le lalolagi', // Samoan
    'TT': 'Сәлам Дөнья', // Tatar
    'NI': 'Hola Mundo', // Nicaraguan
    'KL': 'Hallo Verden', // Greenlandic
    'TJ': 'Салом Дунё', // Tajik
    'BA': 'Сәләм донъя', // Bashkir
    'NE': 'नमस्कार संसार', // Nepali
    'SR': 'Zdravo Svete', // Serbian
    'KY': 'Hello World', // Kyrgyz
    'TG': 'Salom Dunyo', // Tajik
    'CI': 'Bonjour le Monde', // French (Ivory Coast)
    'CR': 'Hola Mundo', // Costa Rican Spanish
    'HU': 'Helló Világ', // Hungarian
    'NN': 'Hallo Verden', // Norwegian Nynorsk
    'YI': 'העלא וועלט', // Yiddish
    'LR': 'Hello World', // Liberian English
    'DZ': 'Hello World', // Algerian Arabic
    'GJ': 'હેલો વર્લ્ડ', // Gujarati
    'NE': 'नमस्कार संसार', // Nepali
    'SA': 'مرحبا بالعالم', // Saudi Arabic
    'RS': 'Zdravo Svete', // Serbian
    'SZ': 'Hello World', // Swati
    'MK': 'Здраво Свету', // Macedonian
    'SA': 'مرحبا بالعالم', // Saudi Arabic
    'ES': 'Hola Mundo', // Spanish
    'HT': 'Bonjou Mond', // Haitian Creole
};

