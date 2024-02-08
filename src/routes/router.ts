import { createRootRoute, createRoute, createRouter, lazyRouteComponent } from "@tanstack/react-router";
import { Root } from "./Root";
import { Home } from "./Root.index";
import { Posts } from "./Posts";
import { Post } from "./Posts.$postId";
import { PostsIndex } from "./Posts.index";
import { fetchPost, fetchPosts } from "../lib/mockTodos";
import { z } from "zod";

export const rootRoute = createRootRoute({
  component: Root
});

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home
});

export const postsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "posts",
  validateSearch: z.object({
    sortBy: z.enum(["asc", "desc"]).optional().default("asc"),
    filterBy: z.string().optional().default("")
  }),
  loaderDeps: ({ search: { sortBy, filterBy } }) => ({ sortBy, filterBy}),
  loader: async ({deps}) => {
    const posts = await fetchPosts();
    return posts.sort((a, b) => {
      return deps.sortBy === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    }).filter((d) => { 
      if(!deps.filterBy) return true;

      return d.title.toLowerCase().includes(deps.filterBy.toLowerCase())
    });
  },
  component: Posts,
});

export const postsIndexRoute = createRoute({
  getParentRoute: () => postsRoute,
  path: "/",
  component: PostsIndex,
});

export const postRoute = createRoute({
  getParentRoute: () => postsRoute,
  path: "$postId",
  parseParams: (params) => ({
    postId: z.number().int().parse(Number(params.postId))
  }),
  stringifyParams: (params) => ({
    postId: `${params.postId}`
  }),
  loader: async ({ params }) => {
    return fetchPost(params.postId);
  },
  component: Post,
});

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "about",
  component: lazyRouteComponent(() => import("./About.lazy"))
});


const routeTree = rootRoute.addChildren([
  indexRoute, 
  postsRoute.addChildren([
    postRoute,
    postsIndexRoute
  ]), 
  aboutRoute
]);

export const router = createRouter({routeTree});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
