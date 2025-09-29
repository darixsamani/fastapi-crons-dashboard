import React, { useEffect, useState } from "react";
import { Spin, Table, Tag, Modal, Button, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { axionsInstance } from "../utils/constants";

export interface Job {
  name: string;
  expr: string;
  tags: string[];
  last_run: string | null;
  next_run: string;
  hooks: Hooks;
  status?: JobStatus;
}

export interface Hooks {
  before_run: number;
  after_run: number;
  on_error: number;
}

export interface JobStatus {
  status: 'completed' | 'running' | 'failed' | string;
  instance_id: string;
  started_at: string;
  updated_at: string;
}

const Api: React.FC = () => {
  const [loading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<Job[]>([]);
  const [runningJob, setRunningJob] = useState<string | null>(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axionsInstance.get("api");
        setDataSource(response.data);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
        setIsLoading(false);
      }
    };

    fetchApi();
    const interval = setInterval(fetchApi, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleRunJob = async (jobName: string) => {
    try {
      setRunningJob(jobName);
      await axionsInstance.post(`/api/${jobName}/run?force=false`);
      message.success(`Job "${jobName}" triggered successfully.`);
    } catch (err) {
      console.error(err);
      message.error(`Failed to run job "${jobName}".`);
    } finally {
      setRunningJob(null);
    }
  };

  const confirmRun = (jobName: string) => {
    Modal.confirm({
      title: `Run job "${jobName}"?`,
      content: "Are you sure you want to trigger this job now?",
      okText: "Run",
      cancelText: "Cancel",
      onOk: () => handleRunJob(jobName),
    });
  };

  const columns: ColumnsType<Job> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Expression",
      dataIndex: "expr",
      key: "expr",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Last Run",
      dataIndex: "last_run",
      key: "last_run",
    },
    {
      title: "Next Run",
      dataIndex: "next_run",
      key: "next_run",
    },
    {
      title: "Before Run",
      key: "before_run",
      render: (_, record) => record.hooks.before_run,
    },
    {
      title: "After Run",
      key: "after_run",
      render: (_, record) => record.hooks.after_run,
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => record.status?.status || "N/A",
    },
    {
      title: "Instance ID",
      key: "instance_id",
      render: (_, record) => record.status?.instance_id || "N/A",
    },
    {
      title: "Started At",
      key: "started_at",
      render: (_, record) => record.status?.started_at || "N/A",
    },
    {
      title: "Updated At",
      key: "updated_at",
      render: (_, record) => record.status?.updated_at || "N/A",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          loading={runningJob === record.name}
          onClick={() => confirmRun(record.name)}
        >
          Run
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10 text-lg">{error}</div>
    );
  }

  return (
    <div className="p-4">
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="name"
        bordered
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default Api;
