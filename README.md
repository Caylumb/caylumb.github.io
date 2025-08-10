# Website

Vite + React + Markdown portfolio

## GH Pages quirk

To deal with a quirk with github pages, this repo includes a custom vite plugin which generates a 404.html page as a duplicate of the index.html page at build time. Doing this forces GH pages to load the main site again as the 404 page, which kicks the client side rendering into gear. This way we can also get to define a custom 404 page in React
