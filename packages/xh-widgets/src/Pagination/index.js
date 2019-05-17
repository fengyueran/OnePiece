import withData from './container';
import Pagination from './stateless/Pagination';

const PaginationContainer = withData(Pagination);
export { PaginationContainer };
export default PaginationContainer;
