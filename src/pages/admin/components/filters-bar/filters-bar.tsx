import React from "react";
import { Input, Select, DatePicker, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { FiltersBarProps } from "./index.types";

const { RangePicker } = DatePicker;
const { Option } = Select;


const FiltersBar: React.FC<FiltersBarProps> = ({
  searchTerm,
  onSearchChange,
  vacancyOptions,
  vacancyFilter,
  onVacancyChange,
  dateFilter,
  onDateChange,
  sortOrder,
  onSortChange,
  onExportCSV,
}) => {
  return (
    <div style={{ marginBottom: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Input
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ width: 200 }}
      />
      <Select
        placeholder="Filter by vacancy"
        allowClear
        style={{ width: 180 }}
        value={vacancyFilter || undefined}
        onChange={(value) => onVacancyChange(value || null)}
      >
        {vacancyOptions.map((v) => (
          <Option key={v} value={v}>
            {v}
          </Option>
        ))}
      </Select>
      <RangePicker
        value={
          dateFilter
            ? [dayjs(dateFilter[0]), dayjs(dateFilter[1])]
            : undefined
        }
        onChange={(dates: (Dayjs | null)[] | null) => {
          if (dates && dates[0] && dates[1]) {
            onDateChange([dates[0].toDate(), dates[1].toDate()]);
          } else {
            onDateChange(null);
          }
        }}
      />
      <Select
        placeholder="Sort by name"
        allowClear
        style={{ width: 150 }}
        value={sortOrder || undefined}
        onChange={(value) => onSortChange(value as "ascend" | "descend" | null)}
      >
        <Option value="ascend">A → Z</Option>
        <Option value="descend">Z → A</Option>
      </Select>
      <Button type="primary" icon={<DownloadOutlined />} onClick={onExportCSV}>
        Export CSV
      </Button>
    </div>
  );
};

export default FiltersBar;
