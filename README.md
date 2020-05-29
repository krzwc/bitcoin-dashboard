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
* infinite scroll with `IntersectionObserver`
* node.js based REST API proxy
* using SVGs in react
* `docker` / `docker-compose` based launching
