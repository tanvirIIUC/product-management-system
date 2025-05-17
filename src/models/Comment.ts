import { model, models, Schema } from "mongoose";

const commentSchema = new Schema({
    comment: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  }, { timestamps: true });

export const Comment = models.Comment || model("Comment", commentSchema);