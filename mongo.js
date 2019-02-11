const mongoose = require('mongoose')

const password = process.argv[2]

const url =
  `mongodb+srv://miiu:${password}@cluster0-nkytj.mongodb.net/test?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if ( process.argv.length<4 ) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })
  person.save().then(response => {
    console.log('lisättiin ' + name + ' numero ' + number + ' luetteloon');
    mongoose.connection.close();
  })
}
