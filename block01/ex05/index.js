const express = require('express');

const app = express();

let accounts = [];

app.listen(4040, () => {
    console.log('app is listening at port 4040');
});

app.get('/account/new/:accountId/:balance', (req, res) => {
    const id = req.params.accountId;
    const balance = req.params.balance;

    let accountIndex = accounts.findIndex(element => {
        return element.id === id;
    });

    if (accountIndex !== -1) {
        res.send({ ok: true, data: `account ${id} already exists` });
    } else {
        accounts.push({
            id: id,
            balance: balance
        });
        res.send({ ok: true, data: `account ${id} created with ${balance} euros` });
    }
});

app.get('/:accountId/balance', (req, res) => {
    const id = req.params.accountId;
    let account = accounts.find(element => element.id === id);
    if (account) {
        res.send({ ok: true, data: account.balance });
    } else {
        res.send({ ok: true, data: 'Account not found' });
    }
});

app.get('/:accountId/withdraw/:amount', (req, res) => {
    const id = req.params.accountId;
    const amount = parseFloat(req.params.amount);
    let account = accounts.find(element => element.id === id);
    if (account) {
        if (account.balance >= amount) {
            account.balance -= amount;
            res.send({ ok: true, data: `${amount} euros taken from account num ${id}` });
        } else {
            res.send({ ok: true, data: 'Insufficient funds' });
        }
    } else {
        res.send({ ok: true, data: 'Account not found' });
    }
});

app.get('/:accountId/deposit/:amount', (req, res) => {
    const id = req.params.accountId;
    const amount = parseFloat(req.params.amount);
    let account = accounts.find(element => element.id === id);
    if (account) {
        account.balance += amount;
        res.send({ ok: true, data: `${amount} euros added to account num ${id}` });
    } else {
        res.send({ ok: true, data: 'Account not found' });
    }
});

app.get('/:accountId/delete', (req, res) => {
    const id = req.params.accountId;
    let accountIndex = accounts.findIndex(element => element.id === id);
    if (accountIndex !== -1) {
        accounts.splice(accountIndex, 1);
        res.send({ ok: true, data: `Account num ${id} deleted` });
    } else {
        res.send({ ok: true, data: 'Account not found' });
    }
});


app.use((req, res) => {
    res.status(404).send({ ok: true, data: '404 resource not found' });
});
