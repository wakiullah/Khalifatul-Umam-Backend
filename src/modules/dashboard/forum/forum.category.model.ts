import mongoose, { Schema, Document } from "mongoose";

export interface IForumCategory extends Document {
  name: string;
  description?: string;
  slug: string;
  createdAt: Date;
}

const ForumCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// নাম থেকে স্লাগ তৈরি করার জন্য প্রি-সেভ হুক
ForumCategorySchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = this.name.split(" ").join("-").toLowerCase();
  }
});

export default mongoose.model<IForumCategory>(
  "ForumCategory",
  ForumCategorySchema,
);
