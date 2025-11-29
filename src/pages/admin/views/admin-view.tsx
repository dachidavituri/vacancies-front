import React from "react";
import { Table, Spin, Alert, Button, message } from "antd";
import { FilePdfOutlined, DownloadOutlined } from "@ant-design/icons";
import { useGetApplications } from "@/react-query/query/applications";
import type { ColumnsType } from "antd/es/table";
import { useDownloadResume } from "@/react-query/mutation/applications";
import Papa from "papaparse";

interface ApplicationTable {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  vacancyTitle: string;
  resumePath: string;
  vacancyId: number;
}

const AdminView: React.FC = () => {
  const { data, isLoading, isError } = useGetApplications({});
  const downloadMutation = useDownloadResume();

  const tableData: ApplicationTable[] = data?.applications.map((app) => ({
    id: app.id,
    name: app.name,
    email: app.email,
    phone: app.phone,
    date: app.date,
    vacancyTitle: app.vacancyTitle,
    resumePath: app.resumePath,
    vacancyId: app.vacancyId,
  })) || [];

  const columns: ColumnsType<ApplicationTable> = [
    { title: "სახელი", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "ვაკანსია", dataIndex: "vacancyTitle", key: "vacancy" },
    { title: "თარიღი", dataIndex: "date", key: "date" },
    {
      title: "რეზიუმე",
      key: "resume",
      render: (_, record) => (
        <Button
          type="link"
          icon={<FilePdfOutlined style={{ color: "#e74c3c" }} />}
          onClick={async () => {
            try {
              await downloadMutation.mutateAsync({ id: record.id, filename: record.resumePath });
              message.success("Resume downloaded successfully");
            } catch {
              message.error("Failed to download resume");
            }
          }}
        >
          Download
        </Button>
      ),
    },
  ];

  const exportCSV = () => {
    if (!tableData.length) return;

    const csv = Papa.unparse(
      tableData.map(({ id, resumePath, vacancyId, ...rest }) => rest) 
    );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "applications.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) return <Spin tip="Loading applications..." style={{ marginTop: 50 }} />;
  if (isError) return <Alert message="Error loading applications" type="error" />;

  return (
    <div style={{ padding: 24, borderRadius: 12 }}>
      <h2 style={{ marginBottom: 16 }}>Admin Panel - Applications</h2>
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        style={{ marginBottom: 16 }}
        onClick={exportCSV}
      >
        Export CSV
      </Button>
      <Table<ApplicationTable>
        rowKey="id"
        dataSource={tableData}
        columns={columns}
        pagination={{ pageSize: 10 }}
        bordered
        style={{ background: "#fff", borderRadius: 8 }}
      />
    </div>
  );
};

export default AdminView;
