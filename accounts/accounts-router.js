const express = require("express");

// database access using knex
const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
    db.select('*').from('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: "You shall not get list of accounts"})
    })
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    db("accounts")
    .where({id})
    .first()
    .then(account => {
        res.status(200).json(account)
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: "You shall not pass ID"})
    })
});

router.post("/", (req, res) => {
    db("accounts").insert(req.body, "id")
    .then(ids => {
        res.status(201).json(ids)
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: "You shall not post"})
    })
});

router.put("/:id", (req, res) => {
const id = req.params.id;
  const changes = req.body;
    db("accounts")
    .where({ id })
    .update(changes)
    .then(count => {
        res.status(200).json(count)
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: "You shall not update your account"})
    })
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    db("accounts")
    .where({ id })
    .del()
    .then(count => {
        res.status(200).json(count)
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: "You shall not delete"})
    })
});

module.exports = router;

