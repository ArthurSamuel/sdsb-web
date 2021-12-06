import { Typography } from "antd";
import React from "react";

export default function NotFound() {
  const { Title, Paragraph } = Typography
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column'
      }}>
        <Title>404</Title>
        <Paragraph>Page Not Found</Paragraph>
      </div>
  );
}
