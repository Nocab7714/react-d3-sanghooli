import BreadcrumbComponent from '../components/BreadcrumbComponent.jsx';

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

const BreadcrumbParentExampleComponent = () =>{
  return(<>
        <BreadcrumbComponent breadcrumbItem={breadcrumbItem}/>
      </>)
}

export default BreadcrumbParentExampleComponent