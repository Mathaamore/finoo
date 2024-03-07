//Components
import SideBar from './SideBar';
import { PageWrapper, Content} from "../components/MainElements"



export default function PageLayout({ children }) {
  return (
    <PageWrapper>
      <SideBar />
      <Content>
        {children}
      </Content>
    </PageWrapper>
  )
}