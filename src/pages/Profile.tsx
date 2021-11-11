import { Fragment, useState } from "react";
import { Row, Col } from "antd";
import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import ProfileComponent from "../components/sdsb-component/profile/Profile";
import ProfilePicture from "../components/sdsb-component/profile_picture/ProfilePicture";

function Profile() {
  return (
    <Fragment>
      <ProfilePicture
        avatarUrl={profilavatar}
        backgroundUrl={BgProfile}
        name="Arthur Samuel"
      ></ProfilePicture>
      <Row gutter={[24, 0]}>
        <Col span={24} md={24} lg={24} className="mb-24">
          <ProfileComponent
            memberCode="CUST_A123"
            name="Arthur Samuel"
            username="Arth"
          ></ProfileComponent>
        </Col>
      </Row>
    </Fragment>
  );
}

export default Profile;
