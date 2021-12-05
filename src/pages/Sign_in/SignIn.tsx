import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Layout, Button, Row, Col, Typography, Form, Input, notification } from "antd";
import signinbg from "../../assets/images/img-signin.jpg";
import { Content } from "antd/lib/layout/layout";
import SignInService from "./SignInService";
import { KeyToken } from "../../utils/Constant";

export default function SignIn() {
  const history = useHistory()
  const Service = new SignInService();
  const { Title } = Typography;
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function login() {
    const results = await Service.GetUser(username, password)
    if (results && results.data && results.data.token) {
      localStorage.setItem(KeyToken, JSON.stringify(results.data))
      window.location.reload()
      return
    } else if (results.statusCode === 700) {
      history.push(`/verification/${results.data.email}/${results.data.phone}`)
    }
    notification.error({
      message: results.message,
      description: results.error_message,
      placement: "bottomRight",
    });
  }

  return (
    <Fragment>
      <Layout className="layout-default layout-signin">
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Sign In</Title>
              <Title className="font-regular text-muted" level={5}>
                Enter your username and password to sign in
              </Title>
              <Form
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Username"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  className="username"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input
                    type={'password'}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    onClick={() => login()}
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    SIGN IN
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    onClick={() => history.push('/forgot-password')}
                    type="ghost"
                    style={{ width: "100%" }}
                  >
                    Forgot Password
                  </Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  Don't have an account?{" "}
                  <Link to="/sign-up" className="text-dark font-bold">
                    Sign Up
                  </Link>
                </p>
              </Form>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Fragment>
  );
}
