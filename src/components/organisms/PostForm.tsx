"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema, CreatePostInput } from "@/schema/post";

export function PostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit = async (data: CreatePostInput) => {
    const res = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // <== ini wajib ditambah
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Post berhasil dibuat!");
    } else {
      alert("Gagal membuat post");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Judul"
          {...register("title")}
          className="border px-2 py-1 w-full"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div>
        <textarea
          placeholder="Konten"
          {...register("content")}
          className="border px-2 py-1 w-full"
        />
        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
