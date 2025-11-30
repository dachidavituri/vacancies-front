import React, { useState } from "react";
import { message, Spin } from "antd";
import AdminView from "@/pages/admin/views";
import { useCurrentUser } from "@/react-query/query/auth";
import LoginForm from "../components/login-form/login-form";

const AdminPage: React.FC = () => {
  const { data: user, isLoading, isError, refetch } = useCurrentUser();
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess = async () => {
    const { data } = await refetch();
    if (data?.role === "admin") {
      setLoggedIn(true);
      message.success("Welcome Admin!");
    } else {
      message.error("You are not an admin");
    }
  };

  if (isLoading)
    return (
      <Spin size="large" style={{ display: "block", margin: "100px auto" }} />
    );
  if (isError) return <div>Error fetching user</div>;

  if (loggedIn || user?.role === "admin") {
    return <AdminView />;
  }

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};

export default AdminPage;
