import { Schema, model, models } from "mongoose";

const MemberSchema = new Schema(
  {
    full_name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    father_name: {
      type: String,
      required: [true, "Father's name is required"],
      trim: true,
      minlength: [2, "Father's name must be at least 2 characters"],
      maxlength: [100, "Father's name cannot be more than 100 characters"],
    },
    mother_name: {
      type: String,
      required: [true, "Mother's name is required"],
      trim: true,
      minlength: [2, "Mother's name must be at least 2 characters"],
      maxlength: [100, "Mother's name cannot be more than 100 characters"],
    },
    date_of_birth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["পুরুষ", "মহিলা"],
    },
    religion: {
      type: String,
      trim: true,
    },
    nationality: {
      type: String,
      trim: true,
      default: "বাংলাদেশী",
    },
    nid_number: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[0-9]{11,14}$/, "Please fill a valid phone number"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    present_address: {
      type: String,
      required: [true, "Present address is required"],
      trim: true,
      minlength: [10, "Present address must be at least 10 characters"],
      maxlength: [500, "Present address cannot be more than 500 characters"],
    },
    permanent_address: {
      type: String,
      required: [true, "Permanent address is required"],
      trim: true,
      minlength: [10, "Permanent address must be at least 10 characters"],
      maxlength: [500, "Permanent address cannot be more than 500 characters"],
    },
    occupation: {
      type: String,
      trim: true,
    },
    education: {
      type: String,
      trim: true,
    },
    blood_group: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", ""],
    },
    reason_to_join: {
      type: String,
      trim: true,
      maxlength: [
        1000,
        "Reason for joining cannot be more than 1000 characters",
      ],
    },
    reference_name: {
      type: String,
      trim: true,
      maxlength: [100, "Reference name cannot be more than 100 characters"],
    },
    reference_phone: {
      type: String,
      trim: true,
      maxlength: [14, "Reference phone cannot be more than 14 characters"],
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

const Member = models.Member || model("Member", MemberSchema);

export default Member;
