// 用於設定網頁 title
// 元件使用方式如下：
// 模擬情境：目前在「關於我們」頁面

// 1.引入 ReactHelmetAsync 元件
import ReactHelmetAsync from "../plugins/ReactHelmetAsync";

const ReactHelmetAsyncExample = () =>{

  return (<>
    {/* 2. 在 JSX 樣板上方使用元件，並透過 props 傳入 title 設定網頁名稱*/}
    {/*    title 若未設定則會顯示 "請設定 title" */}
    <ReactHelmetAsync title="關於我們"/>
    <div>
      <h1>關於我們</h1>
      <p>這是關於我們的內容</p>
    </div>
  </>)
}

export default ReactHelmetAsyncExample;
