import { useState, useEffect, Fragment } from "react";
import { Row, Col, Button } from "antd";
import { IdcardOutlined } from "@ant-design/icons";
import { KeyToken } from "../../utils/Constant";

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
  const userInformation = localStorage.getItem(KeyToken);
  const [kode, setKode] = useState<string>('...');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if (userInformation) {
      let temp = JSON.parse(userInformation);
      setKode(temp.user.member.code);
    }
  },[]);

  return (
    <Fragment>
      <Row gutter={[24, 0]}>
        <Col
          xs={12}
          md={12}
          className="header-control"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            type="link"
            className="sidebar-toggler"
            onClick={() => props.onPress()}
          >
            {toggler}
          </Button>
        </Col>
        <Col xs={12} md={12} className="header-control">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #dedede",
              padding: 10,
              borderRadius: 5,
            }}
          >
            <IdcardOutlined></IdcardOutlined>
            <span style={{ marginLeft: 10, fontWeight: "bold" }}>
              {kode}
            </span>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
}

export default Header;
