require('dotenv').config();
let mongoose = require('mongoose')
const mongooseURI = process.env['MONGO_URI']
const Schema = mongoose.Schema
mongoose.connect(mongooseURI, { useNewUrlParser: true, useUnifiedTopology: true });

//let Person;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model("Person", personSchema)

var createAndSavePerson = function(done) {
  var janeFonda = new Person({ name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"] });

  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople,
    function(err, people) {
      if (err) return console.log(err);
      done(null, people);
    });
};

const findPeopleByName = (personName, done) => {
  Person.find(
    { name: personName }, function(err, personFound) {
      if (err) return console.log(err);
      done(null, personFound)
    })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById( personId, function(err, data){
    if(err) return console.log(err);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  let foundPerson = Person.findById(personId, function(err, person){
    if(err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save(function(err, updatedPerson){
      if(err) return console.log(err);
      done(null, updatedPerson);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  let updatedPerson = Person.findOneAndUpdate({name: personName}, {age: ageToSet},          {new: true}, function(err, updatedDoc){
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, removedDoc){
    if(err) return console.log(err);
    done(null, removedDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, document){
    if(err) return console.log(err);
    done(null, document)
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2).
    select({age : 0})
    .exec(function(err, data){
    if(err) return console.log(err);
     done(null, data)
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
