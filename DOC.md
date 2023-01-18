Accademy workshop NextJS

- Parliamo di cosa è next e delle sue main features - 15min
  - JSX, React
  - Server Side Rendering - Next.js renders your pages on the server, providing better performance and improved SEO.
  - File Based Page Routing - Next.js uses file-based routing, which means you can create pages simply by creating a file in the pages directory.
    - Specific and global components
  - API Routes - Next.js provides an easy way to create API routes, allowing you to build powerful APIs which can be consumed by client-side applications.
- Parliamo di turbopack vs webpack - 5min
- Sessione live coding - 15min/20min
  - Pagina dashboard con filtro di ricerca per le pokeapi (PokéAPI (pokeapi.co))
    - Spiegazione JSX
    - Routes e Dynamic routes
    - Spiegazione dei vari hooks di NextJS (ex getServerSideProps)
  - Far vedere test lighthouse per il SEO e performance
  - (Nel caso si può andare ai 20min) Ottimizzazione asset statici
- Sessione domande

Resources:

- Icon types: [Category:Pokémon types icons - Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Pok%C3%A9mon_types_icons)
- Interfaccia api:

```ts
declare module namespace {
  export interface Stat {
    base_stat: number;
    effort: number;
    name: string;
  }

  export interface RootObject {
    height: number;
    id: number;
    weight: number;
    name: string;
    image: string;
    image_shiny: string;
    types: string[];
    stats: Stat[];
  }
}
```
