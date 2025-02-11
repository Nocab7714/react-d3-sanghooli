import { useEffect } from 'react';
import axios from 'axios'; // 引入 axios

// 環境變數提取
const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env; // 將 env 解構出來並重新命名使用

// axios 與 env 測試
const AxiosTestComponent = () => {
  console.log(`成功取得環境變數資源：${baseUrl},${apiPath}`);
  useEffect(() => {
    (async () => {
      const res = await axios.get('https://randomuser.me/api/');
      console.log('axios 成功引入並取得資料', res);
    })();
  }, []);

  return <></>;
};

export default AxiosTestComponent;
