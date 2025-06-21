require("dotenv").config();
const mongoose = require("mongoose");

// Connect to MongoDB Atlas causes an error which chatgpt can't even fix
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// Create the model
let Person = mongoose.model("Person", personSchema);

// Create and Save a Record of a Model 
const createAndSavePerson = (done) => {
  let Rithik = new Person({
    name: "rithik p",
    age: 21,
    favoriteFoods: ["eggs", "chicken", "beef"],
  });

  Rithik.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const arrayOfPeople = [
  { name: "Alice", age: 25, favoriteFoods: ["pizza", "salad"] },
  { name: "Bob", age: 30, favoriteFoods: ["steak"] },
  { name: "Charlie", age: 40, favoriteFoods: ["burrito", "tacos"] },
];
// Create Many Records with model.create() passing array and done is like signature
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

let personName="Bob"

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},(err,people)=>{
    if(err) return console.error(err)
    done(null ,people);
  })
};

let food=["steak"]
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err,people)=>{
    if (err) return console.error(err)
    done(null ,people);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId,(err,people)=>{
    if(err) return console.error(err)
    done(null,people);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

// DO NOT EDIT BELOW THIS LINE ----------------------------------
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
