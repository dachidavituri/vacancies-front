import React from "react";
import { Table, Button, message } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useDownloadResume } from "@/react-query/mutation/applications";
import type { ApplicationsTableProps, ApplicationTable } from "./index.types";



const ApplicationsTable: React.FC<ApplicationsTableProps> = ({ data }) => {
  const downloadMutation = useDownloadResume();

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
              await downloadMutation.mutateAsync({
                id: record.id,
                filename: record.resumePath,
              });
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

  return (
    <Table<ApplicationTable>
      rowKey="id"
      dataSource={data}
      columns={columns}
      pagination={{ pageSize: 10 }}
      bordered
      style={{ background: "#fff", borderRadius: 8 }}
    />
  );
};

export default ApplicationsTable;
