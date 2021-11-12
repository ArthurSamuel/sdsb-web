import { useState, useEffect, Fragment } from "react";
import { Row, Col, Badge, Dropdown, Button, List, Avatar } from "antd";
import {
  FacebookFilled,
  IdcardOutlined,
  BellOutlined,
  ClockCircleFilled,
} from "@ant-design/icons";

const data = [
  {
    title: "New message from Sophie",
    description: (
      <>
        {" "}
        <ClockCircleFilled></ClockCircleFilled> 2 days ago
      </>
    ),
    avatar: <FacebookFilled></FacebookFilled>,
  },
  {
    title: "New album by Travis Scott",
    description: (
      <>
        {" "}
        <ClockCircleFilled></ClockCircleFilled> 2 days ago
      </>
    ),
    avatar: <FacebookFilled></FacebookFilled>,
  },
  {
    title: "Payment completed",
    description: (
      <>
        {" "}
        <ClockCircleFilled></ClockCircleFilled> 2 days ago
      </>
    ),
    avatar: <FacebookFilled></FacebookFilled>,
  },
];

const menu = (
  <List
    min-width="100%"
    className="header-notifications-dropdown "
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar shape="square" src={item.avatar} />}
          title={item.title}
          description={item.description}
        />
      </List.Item>
    )}
  />
);

const toggler = [
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    key={0}
  >
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>,
];

interface IHeader {
  placement?: any;
  name: string;
  subName: string;
  onPress: Function;
  handleSidenavColor: Function;
  handleSidenavType: Function;
  handleFixedNavbar: Function;
}

function Header(props: IHeader) {
  useEffect(() => window.scrollTo(0, 0));

  return (
    <Fragment>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}></Col>
        <Col span={24} md={18} className="header-control">
          <Badge size="small" count={4}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                href="#pablo"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <BellOutlined></BellOutlined>
              </a>
            </Dropdown>
          </Badge>
          <Button
            type="link"
            className="sidebar-toggler"
            onClick={() => props.onPress()}
          >
            {toggler}
          </Button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: 20,
              border: "1px solid #dedede",
              padding: 10,
              borderRadius: 5,
            }}
          >
            <IdcardOutlined></IdcardOutlined>
            <span style={{ marginLeft: 10, fontWeight: "bold" }}>CUST_123</span>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
}

export default Header;
