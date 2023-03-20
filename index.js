      let arr = [0]
      let count = 0

       function result(type){
        /* 결과 */
        const resultElement = document.getElementById('result')
        /* 숫자 정규식 */
        const check = /^[0-9]+$/
        /* 입력값 */
        const num = document.getElementById('num')
       /*  화면 표시값 */
        let result = resultElement.innerText
        const ouputVal = parseInt(result) 
        const inputVal = parseInt(num.value)
        /* 아무런 입력이 없을 때 */
// 카운터가 2이상이고 + or - 버튼 누를시 배열 맨 끝 값 제거
//    console.log(arr,"<=전역")
//    console.log(count,"<=언두 횟수")

        if(type == "Undo" || type == "Redo") {
                if(type == "Undo"){
                /* 더이상 돌아갈 값이 없으면 결과값= 0, 아닐시 전체길이 에서 카운트 빼서 표시*/
                    arr.length - count === 1 ? result = 0 : ++count, result = arr[arr.length - (count+1)]
                // console.log(count)
                } else {
                /* 더이상 돌아갈 값이 없으면 가장 마지막 결과값 표시, 아닐시 전체길이에서 카운트 빼서 표시 */
                   count === 0 ? result = arr[arr.length - 1] : --count, result = arr[arr.length - (count+1)]
                }
                resultElement.innerText = result
        } else if(check.test(inputVal)){
                if(type === "+"){
                    /* Undo를 한번이라도 누를시 ex) count = 1 */
                    if(count !== 0){
                        /* 길이에서 언두누른 횟수만큼 제거 */
                        arr.splice(arr.length - (count))
                        count = 0
                        /* 출력숫자 + 입력숫자 */
                        result = ouputVal + inputVal
                        arr.push(result)
                        /* 인풋값 초기화 */
                        num.value = null;
                    }else{
                        result = ouputVal + inputVal
                        arr.push(result)
                            /* 인풋값 초기화 */
                        num.value = null;
                    }
                } else {
                    if(count !== 0){
                        arr.splice(arr.length - (count))
                        count = 0
                        result = ouputVal - inputVal
                        arr.push(result)
                        /* 인풋값 초기화 */
                        num.value = null;
                    }else{
                        result = ouputVal - inputVal
                        arr.push(result)
                        /* 인풋값 초기화 */
                        num.value = null;                    
                    }
                }
                resultElement.innerText = result
            /* 아무런 입력이 없지만 언두 리두 버튼 누를시 */
        } else {
            alert("숫자를 입력해주세요")
        }
        async  function name(){
            const defaltUrl = "https://server.routest.link/" 
            const num1 = Math.floor(Math.random() * 100)+1
            const num2 = Math.floor(Math.random() * 2)+1
            const url = [
              `camps/?doNm=강원도&numOfRows=${num1}&pageNo=1&sort=${num2}`,
              "users/nearCamp/?campX=127.2868240&campY=36.3623491"]
            /* 헤더 */
              const myHeaders = {
                  'Content-Type': 'application/json;charset=UTF-8' ,
                   Accept : 'application/json' }
              // myHeaders.append("Cookie", "accessToken=eYyA19iag3f; refreshToken=eyJhbGciOi");
              /* 바디 */
              const raw = JSON.stringify({
                  email: `youwa${num1}${num1}@gmail.com`,
                  password: "@Umm1231234"
                });
                          
            /* 옵션 */
              const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
              };
          
              /* 겟 */
              fetch(`${defaltUrl}${url[num2]}`)
                .then((res) =>res.json())
                .then((data) => console.log(data))
                .catch((error) => console.log("error:", error));
              /* 포스트 */
                fetch(`${defaltUrl}users/signup/check`, requestOptions)
                  .then((res) =>res.json())
                  .then((data) => console.log(data))
                  .catch(error => console.log('error', error));
                fetch(`${defaltUrl}users/signup`, requestOptions)
                .then((res) =>res.json())
                .then((data) => console.log(data))
                  .catch(error => console.log('error', error));
                fetch(`${defaltUrl}users/login`, requestOptions)
                .then((res) =>res.json())
                .then((data) => console.log(data))
                .catch(error => console.log('error', error));
                }
              name()
    }

   

