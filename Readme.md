# sneakers

sneakers is your zero configuration front-end dream tool. By using sensible
defaults, and a handy CLI, you can get almost any dev-project up and running
with no work. Even dependencies are hot-loaded! As for the haters, you can of
course override the config, we just try to make it unnecessary.

The end goal is to fully automate front-end pipelines from development to
Dockerized microservice deployment with minimal configuration. We're not there
yet: this is the first step of many!

How do we do this with zero configuration? See below!


## Features

* Live browser refresh via [BrowserSync](https://github.com/Browsersync/browser-sync)  
* Automatic compilation of templating libraries (Jade, Handlebars, JSX, etc.)  
* Automatic compilation of transpile-to-JS language (CoffeeScript, LiveScript, etc.)  
* Automatic compilation of stylesheet languages (Less, Sass, Stylus)  
* Automatic bundling of single page apps via [webpack](https://github.com/webpack/webpack)
* No excess waste: compiled files are stored in-memory, leaving your file system pristine
* Support for advanced chaining of engines (CoffeeScript > Babel > UglifyJS)  
* JSON REST API via [json-server](https://github.com/typicode/json-server)  
* Cookie, session and environment variables  
* Database querying via [Universql](https://github.com/brandoncarl/universql)  


## Installation

```
$ npm install -g sneakers
```

## Zero Configuration

By using a core set of rules, we are able to use zero configuration.  

1. **Compilation engines are inferred from, and attached to file extensions.**
For example, `.coffee` files will be automatically transpiled by CoffeeScript,
`.ts` by TypeScript, `.hbs` by Handlebars, and so on. You can override these
settings using the CLI. For example, `$ sneakers add:engine html=dust`

2. **Route handlers are inferred from directory structure**. For example,
```
views/
└─ about/
`   ├─ legal.jade
`   └─ privacy.jade
```
turns into `/about/legal` and `/about/privacy`.

3. **Scripts named index.* will compile via webpack**.
```
scripts/
└─ app/
`   ├─ index.js
`   ├─ helper.js
`   └─ utils.js
```
turns into `/scripts/app.js`.

4. **HTML files named `template` turn into wildcard routes**.
```
views/
└─ posts/
`   └─ template.html
```
turns into `/posts/:query`, where query is passed into your templating engine.
Note that this also applies to HTML-like files.

5. **JSON in your `data` directory will be swallowed into your server**.
If the JSON file is an array, it can be queried using the filename and path.
If it an object, the keys function as paths (including folder). Let's see an example:
```bash
data/
├─ music.json         # Contains { "artists" : [...], "albums" : [...] }
└─ api/
      └─ users.json   # Contains [user1, user2, user3]
```
Yields the routes: `/artists`, `/albums`, and `/api/users`. Note that since
`music.json` contained an object, its keys give the route. Meanwhile, since
`users.json` contained an array, the route is determined from the filename. In
both cases, the parent directory is used as a prefix.

6. **HTML files can have QUERY metadata using Universql**
```html
<html>
<!-- QUERY=api/albums?id={{query}} -->
<head>
...
</html>
```
This is a fairly advanced topic and needs to be covered in more detail.

## Recommended Directory Structure

Not only does sneakers cover many directory structures automatically, you can
use the CLI or `sneakers.config.js` file to roll-your-own.

Here's what we recommend:

```bash
project/
├─ data/        # (alt: json)
├─ fonts/       # (alt: type)
├─ images/
├─ scripts/     # (alt: js)
├─ styles/      # (alt: css)
├─ vendor/      # (alt: components, vendors)
└─ views/       # (alt: pages)

```
Note that `scripts` contain your own JavaScript and `vendor` contains third-party.
Third-party JavaScript is assumed to be precompiled and is handled as static files.


## CLI

Type `sneakers help` for CLI options.


## License
MIT