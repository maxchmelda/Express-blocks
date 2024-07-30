const express = require('express');

const app = express();

app.listen(4040, () => {
    console.log('app is listening on port 4040');
})

app.get('/', (req, res) => {
    res.send({ ok: true, data: 'Hello World'});
})

app.get('/:language', (req, res) => {
    const language = req.params.language;
    
    if (language in languages) {
        const message = languages[language];
        res.send({ ok: true, data: message });
    } else {
        res.send({ ok: true, data: `Hello world in ${language} not found` });
    }
})

app.get('/:language/:message', (req, res) => {
    const language = req.params.language;
    const message = req.params.message;

    if (message === 'remove') {
        delete languages[language];
        res.send({ ok: true, data: `${language} removed` });
    } else {
        languages[language] = message;
        res.send({ ok: true, data: `${language} added with message '${message}'` });
    }
})


const languages = {};

