import DashboardCard from "./DashboardCard";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import Status from "../Status";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend} from 'recharts';
import { PieChart, Pie, Tooltip } from "recharts";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    axiosClient
      .get("/auth/admin-dashboard")
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((error) => {
        setLoading(false);
        return error;
      });
  }, []);

  const pieChartData = [
    { name: "Pending", value: data.totalPendingListings },
    { name: "Accepted", value: data.totalAcceptedListings },
    { name: "Rejected", value: data.totalRejectedListings },
    { name: "Claimed", value: data.totalClaimedListings },
    { name: "Picked UP", value: data.totalPickedUpListings},

  ];

  return (
    <div>
      {loading && <div className="flex justify-center">Loading...</div>}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-800">
          <DashboardCard
            title="Total Donors"
            className="order-1 lg:order-2"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
              {data.totalDonors}
            </div>
          </DashboardCard>

          <DashboardCard
            title="Total Volunteers"
            className="order-1 lg:order-2"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
              {data.totalVolunteers}
            </div>
          </DashboardCard>

          <DashboardCard
            title="Total Listings"
            className="order-1 lg:order-2"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
              {data.totalListings}
            </div>
          </DashboardCard>

          <DashboardCard
            title="Latest Listing"
            className="order-1 lg:order-2"
            style={{ animationDelay: "0.4s" }}
          >
            {data.latestListing ? (
              <div>
                <h3 className="font-bold text-xl mb-3">
                  {data.latestListing.title}
                </h3>
                <div className="flex justify-between text-sm mb-1">
                  <div>Description:</div>
                  <div>{data.latestListing.description}</div>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <div>Location:</div>
                  <div>{data.latestListing.location}</div>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <div>Quantity:</div>
                  <div>{data.latestListing.quantity}</div>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <div>Create Date:</div>
                  <div>{data.latestListing.created_at}</div>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <div>Expiry Date:</div>
                  <div>{data.latestListing.expiry_date}</div>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <div>Status:</div>
                  <div>{Status(data.latestListing.status)}</div>
                </div>
              </div>
            ) : (
              <div className="text-gray-600 text-center py-16">
                No latest listing available
              </div>
            )}
          </DashboardCard>

          {/* <PieChart width={250} height={250}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={pieChartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart> */}
          <BarChart
          width={400}
          height={300}
          data={pieChartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
        </div>
      )}
    </div>
  );
}
