import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://user:rom8AbmlHiWF6Twk@cluster0.3otfo.mongodb.net/aat",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);
