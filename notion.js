import dotenv from 'dotenv'
import { Client } from "@notionhq/client";
dotenv.config()
/* 순서 
1. 노션 디벨롭에서 API키 발급
2. 페이지 작성(표로 만들었습니다.)
3. 우측 상단 점3개 클릭후 연결에 발급받은 API추가 
*/
/* 노션 API키 */
const notionKey = process.env.NOTION_KEY
/* 노션 페이지 id
https://www.notion.so/노션페이지id(이거사용) ?v=이거아님=4 */
const notionDatabaseId = process.env.NOTION_DATABASE_KEY
const notion = new Client({ auth: notionKey })

const page_values = {
    "회사명": "디앤커머스",
    "이름": "단",
    "연락처": "01069904",
    "문의내용": "얼마죠?",
    "생성일시": "2023-03-10T02:56:00.000Z"
}

async function getData(){
    const {results} = await notion.databases.query({ database_id: notionDatabaseId })
    console.log(results)
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
    console.log(resultss)
}

async function createData(){
    await notion.pages.create({
        "parent": { "database_id": notionDatabaseId },
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
      });
}
console.log(createData())
console.log(getData())
