const { Schema, model } = require("mongoose");

// name of the pizza.
// name of the user that created the pizza.
// timestamp of when the pizza was created.
// timestamp of any updates to the pizza's data.
// pizza's suggested size.
// pizza's toppings.

const PizzaSchema = new Schema({
  pizzaName: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  size: {
    type: String,
    default: "Large",
  },
  toppings: [],
});

// create the pizza model using the pizzaSchema.
const Pizza = model("Pizza", PizzaSchema);

// export the Pizza model.
module.exports = Pizza;
