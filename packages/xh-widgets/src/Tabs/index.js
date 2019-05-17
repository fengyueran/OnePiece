import withData from './constainer/tabs-data-provider';
import Tabs from './stateless/Tabs';

const TabsContainer = withData(Tabs);

export { TabsContainer };
export default TabsContainer;
