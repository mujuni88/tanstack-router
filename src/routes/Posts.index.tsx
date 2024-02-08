import { Outlet } from '@tanstack/react-router';
import React from 'react';

export const PostsIndex = () => {
  // const posts = useLoaderData();

  return (
    <div className='grid grid-cols-2'>
      <div className={`p-2`}>
        <h1 className={`text-2xl font-bold`}>Post Index</h1>
        <p>
          Select a post from the list on the left. 
        </p>
      </div>
      <Outlet />
    </div>
  )
}