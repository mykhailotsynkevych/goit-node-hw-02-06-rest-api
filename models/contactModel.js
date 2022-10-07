const { Schema, SchemaTypes, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
    // owner: {
    //   type: SchemaTypes.ObjectId,
    //   ref: "user",
    // },
  }
);

const Contact = model("db-contact", contactSchema);

module.exports = Contact;
