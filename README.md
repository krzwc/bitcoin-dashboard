# Bitcoin Dashboard App
To launch run `docker-compose up` or individually run `npm run start` both in `/proxy` and `/frontend`.<br>
The app should be running at [http://localhost:3000](http://localhost:3000).

## Tricky parts solved - for future reference
* functional-component-based architecture with async actions and a thunk reducer
* scss hierarchical architecture
* react-grid-layout (responsive)
* recharts
* using webfonts in react
* DRY color/numerical vars shared by react & scss
* immutable.js data structures as react functional components state
* fetching & polling react hooks
* infinite scroll hook with `IntersectionObserver` ([ref](https://www.smashingmagazine.com/2020/03/infinite-scroll-lazy-image-loading-react/))
* node.js based REST API proxy
* using SVGs in react
* `docker` / `docker-compose` based launching
* root path imports ([ref](https://medium.com/@martin_hotell/type-safe-es2015-module-import-path-aliasing-with-webpack-typescript-and-jest-fe461347e010))
