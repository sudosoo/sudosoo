import fs from 'fs';
import dayjs from 'dayjs';
import Parser from 'rss-parser';
import timezone from 'dayjs/plugin/timezone.js'; 
import utc from 'dayjs/plugin/utc.js';           
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

const NUM_POSTS = 5; // 최신 글의 수

let text = `
##
### 🔥 Tech Blog

`;

const parser = new Parser({
    headers: {
        Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
    },
});

(async () => {
    try {
        // 피드 목록
        const feed = await parser.parseURL("https://soobysu.tistory.com/rss");

        for (let i = 0; i < Math.min(NUM_POSTS, feed.items.length); i++) {
            const { title, link, pubDate } = feed.items[i];
            console.log(`${i + 1}번째 게시물`);
            console.log(`추가될 제목: ${title}`);
            console.log(`추가될 링크: ${link}`);

            const date = dayjs(pubDate).tz("Asia/Seoul").format("YYYY.MM.DD HH:mm");
            text += `<a href="${link}">${title}</a></br>`;
            text += `Date: ${date}</br></br>`;
        }

        fs.writeFileSync("README.md", text, "utf8");
        console.log("업데이트 완료");

    } catch (error) {
        console.error("오류 발생:", error);
    }
})();
