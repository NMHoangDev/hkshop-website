import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const Test = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake API call
    setTimeout(() => {
      const fetchedData = [
        { id: 1, name: "Order 1", status: "Pending", total: "$100" },
        { id: 2, name: "Order 2", status: "Completed", total: "$200" },
        { id: 3, name: "Order 3", status: "Canceled", total: "$50" },
      ];
      setData(fetchedData);

      const chartSampleData = {
        labels: ["January", "February", "March", "April"],
        datasets: [
          {
            label: "Revenue",
            data: [500, 1000, 750, 1200],
            fill: false,
            borderColor: "#42A5F5",
          },
        ],
      };

      setChartData(chartSampleData);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="p-4">
      <h2>Dashboard</h2>
      <div className="p-grid">
        {/* Widget Cards */}
        <div className="p-col-12 p-md-4">
          <Card title="Total Orders">
            <p className="p-m-0">150</p>
          </Card>
        </div>
        <div className="p-col-12 p-md-4">
          <Card title="Revenue">
            <p className="p-m-0">$10,000</p>
          </Card>
        </div>
        <div className="p-col-12 p-md-4">
          <Card title="New Customers">
            <p className="p-m-0">50</p>
          </Card>
        </div>
      </div>

      {/* Chart */}
      <div className="p-grid p-mt-3">
        <div className="p-col-12">
          <Card title="Monthly Revenue">
            <Chart type="line" data={chartData} />
          </Card>
        </div>
      </div>

      {/* Data Table */}
      <div className="p-grid p-mt-3">
        <div className="p-col-12">
          <Card title="Latest Orders">
            <DataTable value={data} paginator rows={5} loading={loading}>
              <Column field="id" header="ID" />
              <Column field="name" header="Name" />
              <Column field="status" header="Status" />
              <Column field="total" header="Total" />
              <Column
                body={() => <Button label="View" className="p-button-text" />}
                header="Actions"
              />
            </DataTable>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Test;
