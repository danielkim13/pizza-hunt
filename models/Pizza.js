const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// name of the pizza.
// name of the user that created the pizza.
// timestamp of when the pizza was created.
// timestamp of any updates to the pizza's data.
// pizza's suggested size.
// pizza's toppings.

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      trim: true,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    size: {
      type: String,
      default: "Large",
      enum: ["Personal", "Small", "Medium", "Large", "Extra Large"],
      default: "Large",
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the pizza model using the pizzaSchema.
const Pizza = model("Pizza", PizzaSchema);

// export the Pizza model.
module.exports = Pizza;
