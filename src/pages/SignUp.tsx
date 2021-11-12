import React, { Component, Fragment } from "react";
import {
  Button,
  Card,
  Form,
  Input,
} from "antd";
import { Link } from "react-router-dom";
import { Content } from "antd/lib/layout/layout";

export default class SignUp extends Component {
  render() {
    return (
      <Fragment>
        <div className="layout-default ant-layout layout-sign-up">
          <Content className="p-0">
            <div className="sign-up-header"></div>
            <Card
              className="card-signup header-solid h-full ant-card pt-0"
              title={<h5>Register</h5>}
            >
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={() => console.log('asd')}
                className="row-col"
              >
                <Form.Item
                  name="Name"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input placeholder="email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input placeholder="Password" />
                </Form.Item>
                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    SIGN UP
                  </Button>
                </Form.Item>
              </Form>
              <p className="font-semibold text-muted text-center">
                Already have an account?{" "}
                <Link to="/sign-in" className="font-bold text-dark">
                  Sign In
                </Link>
              </p>
            </Card>
          </Content>
        </div>
      </Fragment>
    );
  }
}
