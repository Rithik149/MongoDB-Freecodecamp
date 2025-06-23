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

let personName = "Bob";

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

let food = ["steak"];
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, people) => {
    if (err) return console.error(err);

    people.favoriteFoods.push(foodToAdd);

    people.save((err, updatedPerson) => {
      if (err) return console.error(err);

      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedDoc) => {
      //You should return the updated document. To do that, you need to pass the options document { new: true } as the 3rd argument
      if (err) return console.log(err);
      done(null, updatedDoc);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })                            //1 for ascending	order and -1 for descending order.
    .limit(2)                                    // return array which has x(here 2) items in it.
    .select({ name: 1 })                        // 1=show 0=hide
    .exec((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
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
