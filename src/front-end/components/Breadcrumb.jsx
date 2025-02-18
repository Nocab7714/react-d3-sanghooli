// 資料驅動範例
// 備註：
// 1. 請從外層傳入 breadcrumbItem 資料
// 2. 後台系統也可以使用
// const breadcrumbItem = [
//   {
//     page: '首頁',
//     link: '#',
//   },
//   {
//     page: '產品列表',
//     link: '#',
//   },
//   {
//     page: '醇香紅酒禮盒',
//     link: '#',
//   }
// ]

import { Link } from 'react-router-dom';

const Breadcrumb = ({breadcrumbItem}) => {
  return(<>
        <nav
        aria-label="breadcrumb"
      >
        <ol className="breadcrumb">
          {
            breadcrumbItem.map((item, index) => {
              return (
                <li key={item.page} className={`breadcrumb-item ${index === breadcrumbItem.length - 1 ? 'active' : ''}`}>
                  {
                    index === breadcrumbItem.length - 1 ? ( <span>{item.page}</span>) : (<Link to={item.link} className='link-neutral40'>{item.page}</Link>)
                  }
                </li>
              )
            })
          }
        </ol>
      </nav></>)
}

export default Breadcrumb;