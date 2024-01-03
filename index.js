const express = require('express')
const bodyParser = require('body-parser')
const expHbs = require('express-handlebars')
const Handlebars = require('handlebars')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
const {
  allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access')
const mongoUrl =
  'mongodb+srv://yarikkot04:tTRT5ZfVYfTh2Ugo@cluster0.8iwqsa4.mongodb.net/shop'
const userConf = require('./middleware/user_config')
const varMiddleware = require('./middleware/varMiddleware')

const app = express()

const mainRoute = require('./routes/main')
const authRoute = require('./routes/auth')
const profileRoute = require('./routes/profile')
const postRoute = require('./routes/post')
const catalogRoute = require('./routes/catalog')
const shopRoute = require('./routes/basket')

const hbs = expHbs.create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  defaultLayout: 'main',
  extname: 'hbs'
})

const store = new MongoStore({
  collection: 'sessions',
  uri: mongoUrl
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, './public')))
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: 'secretword',
    resave: false,
    saveUninitialized: false,
    store
  })
)
app.use(flash())
app.use(userConf)
app.use(varMiddleware)

app.use('/', mainRoute)
app.use('/auth', authRoute)
app.use('/profile', profileRoute)
app.use('/myposts', postRoute)
app.use('/catalog', catalogRoute)
app.use('/basket', shopRoute)
async function main() {
  const PORT = process.env.PORT || 3000
  await mongoose.connect(mongoUrl)
  app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`)
  })
}
main()
