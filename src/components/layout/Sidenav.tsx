import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {
  HomeOutlined,
  QrcodeOutlined,
  WalletOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

function Sidenav(color:any) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  function logout() {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>SDSB Dashboard</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/dashboard">
            <span
              className="icon"
              style={{
                background: page === "dashboard" ? color : "",
              }}
            >
              <HomeOutlined></HomeOutlined>
            </span>
            <span className="label">Beranda</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/qrcode">
            <span
              className="icon"
              style={{
                background: page === "qrcode" ? color : "",
              }}
            >
              <QrcodeOutlined></QrcodeOutlined>
            </span>
            <span className="label">QR Code</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/billing">
            <span
              className="icon"
              style={{
                background: page === "billing" ? color : "",
              }}
            >
              <WalletOutlined></WalletOutlined>
            </span>
            <span className="label">Wallet SDSB</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/profile">
            <span
              className="icon"
              style={{
                background: page === "profile" ? color : "",
              }}
            >
              <UserOutlined></UserOutlined>
            </span>
            <span className="label">Profil</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="7">
          <div onClick={() => logout()} style={{paddingLeft: 15, paddingTop: 10}}>
            <span
              className="icon"
              style={{
                background: page === "logout" ? color : "",
              }}
            >
              <LogoutOutlined></LogoutOutlined>
            </span>
            <span className="label">Logout</span>
          </div>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
