const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121

let db,
    dbConnectionStr = 'mongodb+srv://ParejaOnPurpose:ParejaOnPurpose@cluster0.8osuw.mongodb.net/todo?retryWrites=true&w=majority',
    dbName = 'todo'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
  .then(client => {
    console.log(`Hey, connected to ${dbName} database`)
    db = client.db(dbName)
  })
.catch(err => {
  console.log(err)
})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/',(req,res) =>{
    db.collection('todos').find().toArray()
    .then(data =>{
        res.render('index.ejs',{zebra:data})
    })

app.post('/createToDo', (req,res) => {
  db.collection('todos').insertOne ({todo: req.body.todoItem, completed: false})
    .then(result =>{
        console.log('Todos has been added!')
        res.redirect('/')
    })

  })

  app.listen(PORT, ()=>{
      console.log('Server is running, you better catch it.')
  })
