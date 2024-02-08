import { Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import React from 'react';
import { RouterSpinner } from '../components/RouterSpinner';

export function Root(){
  return (
    <div className="bg-gradient-to-r from-purple-700 to-blue-600 text-white">
      <div className={`min-h-screen flex flex-col`}>
        <div className={`flex items-center gap-2 bg-gray-800/70`}>
          <h1 className={`text-3xl p-2`}>Tanstack Demo</h1>
          {/* Show a global spinner when the router is transitioning */}
          <div className={`text-3xl`}>
            <RouterSpinner />
          </div>
        </div>

        <div className={`flex-1 flex p-2 gap-2`}>
          <div
            className={`bg-gray-800/70 rounded-lg divide-y divide-gray-500/30 w-56`}
          >
                <div>
                  <Link
                    to={'/'}
                    preload="intent"
                    className="block py-1 px-2 text-purple-300 hover:text-purple-200"
                    activeProps={{ className: '!text-white font-bold' }}
                  >
                    Home
                  </Link>
                  {/* Create a Post Link */}
                  <Link
                    to='/posts'
                    preload="intent"
                    className="block py-1 px-2 text-purple-300 hover:text-purple-200"
                    activeProps={{ className: '!text-white font-bold' }}
                  >
                    Posts
                  </Link>
                  <Link
                    to='/about'
                    preload="intent"
                    className="block py-1 px-2 text-purple-300 hover:text-purple-200"
                    activeProps={{ className: '!text-white font-bold' }}
                  >
                    About
                  </Link>
                </div>
          </div>
          <div className={`flex-1`}>
            {/* Render our first route match */}
            <Outlet />
          </div>
        </div>
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  )
}