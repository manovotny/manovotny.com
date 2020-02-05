const fs = require('fs');
const {parse} = require('path');

const globby = require('globby');
const prettier = require('prettier');

(async () => {
    const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
    const pages = await globby(['**/*', '!_{app,document,error}.js', '!api'], {cwd: 'pages'});
    const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
                .map((page) => {
                    const parsed = parse(page);

                    let loc = 'https://manovotny.com';

                    if (parsed.dir.length) {
                        loc += `/${parsed.dir}`;
                    }

                    if (parsed.name !== 'index') {
                        loc += `/${parsed.name}`;
                    }

                    return `
                        <url>
                            <loc>${loc}</loc>
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
