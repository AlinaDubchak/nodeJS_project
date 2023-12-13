const express = require('express')
const bodyParser = require('body-parser')
const expHbs = require('express-handlebars')
const Handlebars = require('handlebars')
const path = require('path')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const app = express()

const mainRoute = require('./routes/main')

const hbs = expHbs.create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, './public')))
app.use(express.urlencoded({ extended: true }))


app.use('/', mainRoute)

async function main() {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`)
  })
}
main()


