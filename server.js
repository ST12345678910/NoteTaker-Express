const express = require('express')
let notes = require('./db/db.json')
let alert = require('alert');
const app = express()

const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  })
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
  })

  app.get('/api/notes', function (req, res) {
      res.json(notes)
    })
  app.post('/api/notes', function (req, res) {
      let savedNote = {
        title: req.body.title,
        text: req.body.text,
        id: (Math.floor((Math.random() * 100) + 1))
      }
      console.log(savedNote)
      alert('Note Saved');
      notes.push(savedNote)
      res.json(200)
    })
app.delete('/api/notes/:id', function (req, res) {
  notes = notes.filter(note => note.id != req.params.id)
  res.json(notes)
  alert('Note Deleted');
})


app.listen(process.env.PORT || 3001)