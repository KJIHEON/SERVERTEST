import  express  from "express";
import { Client } from "@notionhq/client";
import dotenv from "dotenv"
dotenv.config()
const app = express();
app.set("port", 3000);
app.use(express.json())
const notionKey = process.env.NOTION_KEY
const notionDatabaseKey = process.env.NOTION_DATABASE_KEY
const notion = new Client({ auth: notionKey })

app.get("/", async (req, res) => {
  try{
    const {results} = await notion.databases.query({ database_id: notionDatabaseKey })
    const resultss = results.map((x)=>{
      const office =  x.properties.회사명.title.map((x)=> x.plain_text).join("")
      const name = x.properties.이름.rich_text.map((x)=>x.plain_text).join("")
      const phone = x.properties.연락처.rich_text.map((x)=>x.plain_text).join("")
      const content = x.properties.문의내용.rich_text.map((x)=>x.plain_text).join("")
      const createdAt = x.properties.생성일시.created_time
      return{
      "회사명" : office,
      "이름" : name,
      "연락처" : phone,
      "문의내용" : content,
      "생성일시" : createdAt
      }
    })
    console.log(...results)
    res.json({...resultss})
  }catch(e){
    console.log(e)
  }
});

app.post("/", async (req, res) => {
    //  const createdUrl = "https://api.notion.com/v1/pages"
    //  const headers = {
    //   "Authorization": "Bearer " + notionKey,
    //   "Content-Type": "application/json",
    //   "Notion-Version": "2022-02-22"
    // }
     const page_values = {
      "회사명": "ㅇㅇㅇㅇ",
      "이름": "ㅇㅇㅇㅇ",
      "연락처": "ㅇㅇㅇㅇ",
      "문의내용": "ㅇㅇㅇㅇㅇㅇ????",
      "생성일시": "2023-03-10T02:56:00.000Z"
    }
    await notion.pages.create({
  "parent": { "database_id": notionDatabaseKey },
  "properties": {
    "회사명": {
      "title": [
        {
          "text": {
            "content": page_values["회사명"]
          }
        }
      ]
    },
    "연락처": {
      "rich_text": [
        {
          "text": {
            "content": page_values["연락처"]
          }
        }
      ]
    },
    "이름": {
      "type":"rich_text",
      "rich_text": [
        {
          "text": {
            "content": page_values["이름"]
          }
        }
      ]
    },
    "문의내용": {
      "type":"rich_text",
      "rich_text": [
        {
          "text": {
            "content": page_values["문의내용"]
          }
        }
      ]
    }
  }
})
});


app.listen(app.get("port"), () => {
  console.log("Notion API 서버 실행");
});