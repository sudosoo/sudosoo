const fs = require("fs");
const dayjs = require("dayjs");
const Parser = require("rss-parser");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

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
        const { title, link, pubDate } = feed.items[i];

        const date = dayjs(pubDate).add(9, "hours").format("YYYY.MM.DD");
        text += `<a href=${link}>${title}</a></br>`;
        text += `Date : ${date}</br></br>`;
    }


    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e)
    })

})();
