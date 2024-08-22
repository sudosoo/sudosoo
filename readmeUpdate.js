import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

let text = `
##
### 🎲 This is my killer Shot
`;

const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {
    const feed = await parser.parseURL('https://soobysu.tistory.com/rss');
    for (let i = 0; i < 5; i++) {
        const {title, link} = feed.items[i];
        text += `<a href=${link}>${title}</a></br>`;
    }
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e)
    })

})();
