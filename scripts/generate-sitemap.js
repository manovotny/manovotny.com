const fs = require('fs');
const {parse} = require('path');

const globby = require('globby');
const prettier = require('prettier');

(async () => {
    const removeTrailingSlash = (text) => (text.endsWith('/') ? text.slice(0, -1) : text);
    const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
    const pages = await globby(['pages/**/*', '!pages/**/_*']);
    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
                .map((page) => {
                    const path = page.replace('pages', '');
                    const parsed = parse(path);
                    const loc = parsed.name === 'index' ? parsed.dir : parsed.dir + parsed.name;

                    return `
                        <url>
                            <loc>${`https://manovotny.com${removeTrailingSlash(loc)}`}</loc>
                        </url>
                    `;
                })
                .join('')}
        </urlset>
    `;

    const formatted = prettier.format(sitemap, {
        ...prettierConfig,
        parser: 'html'
    });

    // eslint-disable-next-line no-sync
    fs.writeFileSync('public/sitemap.xml', formatted);
})();
