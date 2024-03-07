import { useRouter } from 'next/router';
import { FaLayerGroup, FaMoneyCheck } from "react-icons/fa";

// Components
import { Container, NavItem, NavItems } from './Elements'
import { useAuth } from '../../context/auth';


export default function SideBar() {
  const { refreshUser } = useAuth();
  const router = useRouter()

  return (
    <Container>
      <NavItems>
        <h3>Finoo</h3>
        <div style={{ "height": "20px" }} />
        <NavItem href="/" className={router.pathname === "/" || router.pathname.startsWith("/dashboard") ? "selected" : ""}>
          <FaLayerGroup />
          <span>Locked Assets</span>
        </NavItem>
        <NavItem href="/loans" className={router.pathname === "/loans" || router.pathname.startsWith("/dashboard") ? "selected" : ""}>
          <FaMoneyCheck />
          <span>Loans Manager</span>
        </NavItem>
        <small style={{cursor: "pointer"}} onClick={() => {localStorage.removeItem('access_token'); refreshUser()}}>disconnect</small>
      </NavItems>
    </Container>
  )
}
