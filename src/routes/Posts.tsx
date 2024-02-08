import { Link, Outlet, useNavigate } from '@tanstack/react-router';
import React from 'react';
import { postsRoute } from './router';

type PostsSortBy = 'asc' | 'desc';
const sortByOptions: PostsSortBy[] = ['asc', 'desc'];
export const Posts = () => {
  const navigate = useNavigate({ from : postsRoute.fullPath });
  const posts = postsRoute.useLoaderData();
  const search = postsRoute.useSearch();
  const timeOutIdRef = React.useRef<number>();

  const [filterDraft, setFilterDraft] = React.useState(search.filterBy ?? '');

  const setSortBy = (sortBy: PostsSortBy) => {
    navigate({ 
      search:(old) => ({ ...old, sortBy })
    });
  }

  React.useEffect(() => {
    if(timeOutIdRef.current) {
      window.clearTimeout(timeOutIdRef.current);
    }

    timeOutIdRef.current = window.setTimeout(() => {
      navigate({
          search: (old) => ({ ...old, filterBy: filterDraft })
      });
    }, 300);

    return () => {
      window.clearTimeout(timeOutIdRef.current);
    }
  }, [filterDraft]);

  return (
    <div className='grid grid-cols-2'>
      <div className={`p-2 span-2`}>
        <h1 className={`text-2xl font-bold mb-4`}>Posts</h1>
      <div className="divide-y divide-gray-500/30 bg-gray-800/30 rounded-lg w-2/3 mb-10">
        <div className="py-2 px-3 flex gap-2 items-center">
          <div>Sort By:</div>
          <select
            value={search.sortBy}
            onChange={(e) => setSortBy(e.target.value as PostsSortBy)}
            className="flex-1 p-1 px-2 rounded bg-gray-800/70"
          >
            {sortByOptions.map((d) => {
              return <option key={d} value={d} children={d} />
            })}
          </select>
        </div>
        <div className="py-2 px-3 flex gap-2 items-center">
          <div>Filter By:</div>
          <input
            value={filterDraft}
            onChange={(e) => setFilterDraft(e.target.value)}
            placeholder="Search Names..."
            className="min-w-0 flex-1 p-1 px-2 rounded bg-gray-800/70"
          />
        </div>
      </div>
        <ul>
          {posts.map((post) => {
            return (
            <li className="mb-4" key={post.id}>
              <Link to='/posts/$postId' params={{postId: post.id}} className="text-purple-200 hover:text-purple-300">
                {post.title}
              </Link>
            </li>
            )
          })}
        </ul> 
      </div>
      <div className=''>
        <Outlet />
      </div>
    </div>
  )
}