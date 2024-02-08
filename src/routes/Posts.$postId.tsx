import React from 'react';
import { postRoute } from './router';

export const Post = () => {
  const post = postRoute.useLoaderData();
  return (
    <div className={`p-2`}>
      <h1 className={`text-2xl font-bold`}>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  )
}