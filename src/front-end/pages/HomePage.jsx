import SearchInputComponent from '../components/SearchInputComponent.jsx';
import BreadcrumbParentExampleComponent from '../components/BreadcrumbParentExampleComponent.jsx';
import PaginationParentExampleComponent from '../components/PaginationParentExampleComponent.jsx';
import SelectExampleComponent from '../components/SelectExampleComponent.jsx';
import InputExampleComponent from '../components/InputExampleComponent.jsx';

const HomePage = () => {
  return (
    <>
      <p className="mb-5">Home 頁面元件</p>
      <div className="mb-5">
        <BreadcrumbParentExampleComponent />
      </div>
      <div className="mb-5">
        <PaginationParentExampleComponent />
      </div>
      <div className="mb-5">
        <SearchInputComponent />
      </div>
      <div className="mb-5">
        <SelectExampleComponent />
      </div>
      <div className="mb-5">
        <InputExampleComponent />
      </div>
    </>
  );
};

export default HomePage;
