


const userSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: [true, "Please enter your first name"],
        trim: true,
        validate: {
          validator: function (v) {
            return /^[a-zA-Z ]*$/.test(v);
          },
          message: "Must be all characters",
        },
      },
      lastName: {
        type: String,
        required: [true, "Please enter your last name"],
        trim: true,
        validate: {
          validator: function (v) {
            return /^[a-zA-Z ]*$/.test(v);
          },
          message: "Must be all characters",
        },
      },
      fullName: {
        type: String,
        index: true,
      },
      phoneNumber: {
        type: String,
        index: true,
        unique: true,
        required: [true, "Must have a primary phone number"],
        trim: true,
        validate: {
          validator: function (v) {
            return /^[0-9 +]+$/.test(v);
          },
          message: "Must be all numbers (or plus)",
        },
      },
      password: {
        type: String,
        required: [true, "Please enter a valid password"],
        trim: true,
      },
      privacyPreferences: [String],
      profilePicture: {
        type: String,
        default: profilePicBaseURL + "default.png",
      },
      // primaryAddress: Number,
      creationDate: Date,
      jobHistory: [jobSchema]
    }
    // Useful if want to create Redacted User view
    // {autoCreate: false, autoIndex: false}
  );
  
const User = mongoose.model("User", userSchema);

export default User;