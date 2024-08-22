import fs from 'fs';
import dayjs from 'dayjs';
import Parser from 'rss-parser';
import timezone from 'dayjs/plugin/timezone.js'; 
import utc from 'dayjs/plugin/utc.js';           

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

const NUM_POSTS = 5;
const readmePath = "README.md";

let readmeContent = fs.readFileSync(readmePath, "utf8");

let latestPosts = `
### 🔥 Tech Blog
`;

const parser = new Parser({
    headers: {
        Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
    },
});

(async () => {
    try {
        const feed = await parser.parseURL("https://soobysu.tistory.com/rss");

        for (let i = 0; i < Math.min(NUM_POSTS, feed.items.length); i++) {
            const { title, link, pubDate } = feed.items[i];
            console.log(`${i + 1}번째 게시물`);
            console.log(`추가될 제목: ${title}`);
            console.log(`추가될 링크: ${link}`);

            const date = dayjs(pubDate).tz("Asia/Seoul").format("YYYY.MM.DD HH:mm");
            latestPosts += `<a href="${link}">${title}</a></br>`;
            latestPosts += `Date: ${date}</br></br>`;
        }

        const updatedReadmeContent = readmeContent.includes("### 🔥 Tech Blog")
            ? readmeContent.replace(
                /### 🔥 Tech Blog[\s\S]*?(?=\n\n## |\n$)/,
                latestPosts
              )
            : readmeContent + '\n' + latestPosts;
        
        if (updatedReadmeContent !== readmeContent) {
            fs.writeFileSync(readmePath, updatedReadmeContent, "utf8");
            console.log("README.md 업데이트 완료");
        } else {
            console.log("새로운 블로그 포스트가 없습니다. README.md 파일이 업데이트되지 않았습니다.");
        }

    } catch (error) {
        console.error("오류 발생:", error);
    }
})();
