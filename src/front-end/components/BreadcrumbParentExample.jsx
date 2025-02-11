import Breadcrumb from '../components/Breadcrumb.jsx';

const breadcrumbItem = [
  {
    page: '首頁',
    link: '#',
  },
  {
    page: '產品列表',
    link: '#',
  },
  {
    page: '醇香紅酒禮盒',
    link: '#',
  },
];

const BreadcrumbParentExample = () =>{
  return(<>
        <Breadcrumb breadcrumbItem={breadcrumbItem}/>
      </>)
}

export default BreadcrumbParentExample