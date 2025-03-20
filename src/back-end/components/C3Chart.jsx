import { useEffect } from "react";
import * as d3 from "d3"; // 確保 D3.js 也被載入
import * as c3 from "c3";
import "c3/c3.css"; // 匯入 C3.js 樣式

const C3Chart= () => {
  useEffect(() => {
    c3.generate({
      bindto: "#chart", // 綁定 ID
      data: {
        columns: [
          ["產品類型", 30, 18, 47, 25, 19, 7 , 12, 5 ],
        ],
          type: "bar", // 長條柱狀圖
         //自訂 data 顏色
         colors: {
            產品類型: "#FFBB6D",
        },
        bar: {
            width: {
              ratio: 0.8, // 長條圖寬度比例
            },
          },
        },
        legend: {
        show: true, //是否顯示項目
        },
        //客製左邊數據
        axis: {
        //客製 X 軸內容
        x: {
            type: "category",
            categories: [
                "電子與實用", 
                "美妝與保養", 
                "居家與生活", 
                "服飾與配件", 
                "食品與飲品", 
                "花卉與植物" , 
                "文具與書籍" , 
                "嬰幼兒與兒童"
            ],
            label: {
            position: "outer-center",
            },
        },
        //客製 Y 軸內容
        y: {
            label: {
            text: "銷售數量",
            position: "outer-middle", //名稱位置
            },
        },
     },
    });
    }, []);
  // 依賴可以為 空陣列[] (表示每次載入會更新圖表) 
  // 或是 [data] (表示當 data 改變時會更新圖表) 


  return <div id="chart"></div>;
};

export default C3Chart;