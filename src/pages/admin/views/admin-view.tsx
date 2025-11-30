import React, { useState, useMemo } from "react";
import { Alert, message } from "antd";
import Papa from "papaparse";
import { useGetApplications } from "@/react-query/query/applications";
import ApplicationsTable from "../components/applications-table";
import type { ApplicationTable } from "../components/applications-table/index.types";
import FiltersBar from "../components/filters-bar";

const AdminView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [vacancyFilter, setVacancyFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<[Date, Date] | null>(null);
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);

  const { data, isError } = useGetApplications();

  const tableData: ApplicationTable[] = useMemo(() => {
    if (!data?.applications) return [];

    return data.applications
      .map((app) => ({
        id: app.id,
        name: app.name,
        email: app.email,
        phone: app.phone,
        date: app.date,
        vacancyTitle: app.vacancyTitle,
        resumePath: app.resumePath,
        vacancyId: app.vacancyId,
      }))
      .filter((app) => {
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          if (!app.name.toLowerCase().includes(term) && !app.email.toLowerCase().includes(term)) {
            return false;
          }
        }
        if (vacancyFilter && app.vacancyTitle !== vacancyFilter) return false;
        if (dateFilter) {
          const appDate = new Date(app.date).getTime();
          const start = dateFilter[0].setHours(0, 0, 0, 0);
          const end = dateFilter[1].setHours(23, 59, 59, 999);
          if (appDate < start || appDate > end) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (!sortOrder) return 0;
        if (sortOrder === "ascend") return a.name.localeCompare(b.name);
        return b.name.localeCompare(a.name);
      });
  }, [data, searchTerm, vacancyFilter, dateFilter, sortOrder]);

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
    message.success("CSV exported successfully");
  };

  if (isError) return <Alert message="Error loading applications" type="error" />;

  const vacancyOptions = Array.from(new Set(data?.applications.map((a) => a.vacancyTitle) || []));

  return (
    <div style={{ padding: 24, borderRadius: 12 }}>
      <h2 style={{ marginBottom: 16 }}>Admin Panel - Applications</h2>

      <FiltersBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        vacancyOptions={vacancyOptions}
        vacancyFilter={vacancyFilter}
        onVacancyChange={setVacancyFilter}
        dateFilter={dateFilter}
        onDateChange={setDateFilter}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onExportCSV={exportCSV}
      />

      <ApplicationsTable data={tableData} />
    </div>
  );
};

export default AdminView;
