import  express  from "express";
import { Client } from "@notionhq/client";
import dotenv from "dotenv"
dotenv.config()
const app = express();
app.set("port", 3000);
app.use(express.json())

app.get("/", async (req, res) => {
  const notionKey = process.env.NOTION_KEY
  const notionDatabaseKey = process.env.NOTION_DATABASE_KEY

  const notion = new Client({ auth: notionKey })
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
    "생성 일시" : createdAt,
    }
  })
  console.log(resultss)
  res.json({...resultss})
});

app.post("/:id", async (req, res) => {
  const {id} = req.params
  console.log(req.params)
  res.json({id})
});


app.listen(app.get("port"), () => {
  console.log("Notion API 서버 실행");
});