import React, { useEffect, useState } from 'react';
import { axionsInstance } from "../utils/constants";
import { Spin } from 'antd';

interface SystemStatusType {
  instance_id: string;
  total_jobs: number;
  running_jobs: number;
  failed_jobs: number;
  completed_jobs: number;
  backend_type: string;
  distributed_locking: boolean;
  redis_configured: boolean;
}


interface StatusItemProps {
  label: string;
  value: string | number;
}

const StatusItem: React.FC<StatusItemProps> = ({ label, value }: StatusItemProps) => (
  <div className="flex justify-between">
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);


const Home: React.FC = () => {
  const [status, setStatus] = useState<SystemStatusType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSystemStatus = async () =>{

        axionsInstance.get("api/system/status").then(response =>{
            console.log(response)
            setStatus(response.data)
            setLoading(false)
        }).catch(error => {
            console.log(error)
            setError(error)
            setLoading(false)
        })
    }

    const interval = setInterval(fetchSystemStatus, 5000)

    return () => {
        clearInterval(interval)
    }
  }, []);

  if (loading) {
    return (<Spin tip="Loading..." size="large">
                    <div className="content" />
                    </Spin>)
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!status) {
    return <div className="text-center text-gray-500">No data available.</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">System Status</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        <StatusItem label="Instance ID" value={status.instance_id} />
        <StatusItem label="Backend Type" value={status.backend_type} />
        <StatusItem label="Total Jobs" value={status.total_jobs} />
        <StatusItem label="Running Jobs" value={status.running_jobs} />
        <StatusItem label="Failed Jobs" value={status.failed_jobs} />
        <StatusItem label="Completed Jobs" value={status.completed_jobs} />
        <StatusItem
          label="Distributed Locking"
          value={status.distributed_locking ? 'Enabled' : 'Disabled'}
        />
        <StatusItem
          label="Redis Configured"
          value={status.redis_configured ? 'Yes' : 'No'}
        />
      </div>
    </div>
  );
};

export default Home;