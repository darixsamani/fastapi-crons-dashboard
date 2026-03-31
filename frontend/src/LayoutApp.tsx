import React, { useEffect } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { SiIobroker } from "react-icons/si";
import { Layout, Menu, message, theme } from "antd";
import type { MenuProps } from "antd";
import HostInput from "./components/hostInput";
import StatusBadge from "./components/statusBadge";
import type { StatusType } from "./components/statusBadge";
import Outlet from "./router/Outlet";
import { useRouter } from "./router/RouterContext";

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps["items"] = [
  { key: "/",    icon: React.createElement(HomeOutlined), label: "Home" },
  { key: "/api", icon: React.createElement(SiIobroker),  label: "API"  },
];

const LayoutApp: React.FC = () => {
  const [status, setStatus] = React.useState<StatusType>("Unreachable");
  const { pathname, navigate } = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key); 
  };

  useEffect(() => {
    const checkApiHealth = () => {
      fetch(localStorage.getItem("apiUrl")?.replace(/\/+$/, "") + "/system/status")
        .then((res) => setStatus(res.ok ? "Reachable" : "Unreachable"))
        .catch(() => setStatus("Unreachable"));
    };
    checkApiHealth();
    const interval = setInterval(checkApiHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider style={{ overflow: "auto", height: "100vh", position: "fixed", left: 0, top: 0, bottom: 0 }}>
        <div className="demo-logo-vertical" />
        <Menu
          onClick={onClick}
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]} 
          items={items}
        />
      </Sider>

      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: 24, paddingRight: 24, alignItems: "center" }}>
            <div style={{ fontSize: 24, fontWeight: "bold", color: "#1890ff" }}>
              Fastapi Crons Dashboard
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
              <HostInput onChange={(value) => localStorage.setItem("apiUrl", value)} />
              <StatusBadge
                status={status}
                onClick={() => {
                  fetch(localStorage.getItem("apiUrl")?.replace(/\/+$/, "") + "/system/status")
                    .then((res) => res.ok ? message.success("API is healthy") : message.error("API is not healthy"))
                    .catch(() => message.error("API is not healthy"));
                }}
              />
            </div>
          </div>
        </Header>

        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div style={{ padding: 24, textAlign: "center", background: colorBgContainer, borderRadius: borderRadiusLG }}>
            <Outlet />
          </div>
        </Content>

        <Footer style={{ borderTop: "1px solid #e8e8e8", position: "fixed", left: 0, bottom: 0, width: "100%", backgroundColor: "white", textAlign: "center" }}>
          Fastapi Crons ©{new Date().getFullYear()} dashboard Created by{" "}
         
          <a href="https://github.com/darixsamani" target="_blank" rel="noopener noreferrer">
            @darixsamani
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutApp;