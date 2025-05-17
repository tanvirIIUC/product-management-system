"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { commentSchema } from "@/lib/validations/comment";
import { useEffect, useState } from "react";
import { FullComment } from "@/types";
import { postComment } from "@/action/comments/postComment";
import { getCommentsByProduct } from "@/action/comments/getCommentsByProduct";

type CommentForm = z.infer<typeof commentSchema>;

export default function CommentForm({ productId }: { productId: string }) {

  const [comments, setComments] = useState<FullComment[]>([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentForm>({
    resolver: zodResolver(commentSchema),
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchComments = async () => {
    setLoading(true);
    const res = await getCommentsByProduct(productId);
    setComments(res);

    if (res.data) {
      setComments(res.data);
    } else {
      console.error(res.error);
    }
    setLoading(false);
  };

  const onSubmit = async (data: CommentForm) => {
    const result = await postComment(productId, data);

    if (result?.data) {
      toast.success('Comment added successfully');
      fetchComments(); // Refresh comment list
      reset();
    } else {
      toast.error(result?.error || 'Failed to add comment');
    }
  };

  useEffect(() => {

    fetchComments();

  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-2">
      {
        comments?.length > 0 ? (
          <div className="flex flex-col gap-5">
            {comments.map((comment) => (
              <div key={comment._id} className="p-4 border rounded">
                <p>{comment.comment}</p>
                <p className="text-sm text-gray-500">By: {comment.user.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No comments yet.</p>
        )
      }

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-5 my-10"
      >

        <input
          className="w-full py-4 border rounded"
          placeholder="Comment"
          {...register("comment")}
        />
        {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}

        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            className="flex-1 px-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>


  );
}
