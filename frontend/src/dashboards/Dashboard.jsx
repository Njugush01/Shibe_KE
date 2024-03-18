import DashboardCard from "./DashboardCard";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import Status from "../Status";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    axiosClient
      .get("/auth/dashboard")
      .then((res) => {
        setLoading(false);
        setData(res.data);
        return res;
      })
      .catch((error) => {
        setLoading(false);
        return error;
      });
  }, []);

  return (
    <div>
      {loading && <div className="flex justify-center">Loading...</div>}
      {!loading && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5
        text-gray-800"
        >
          <DashboardCard
            title="Total Donations"
            className="order-1 lg:order-2"
            style={{ animationDelay: "0.1s" }}
          >
            <div
              className="text-8xl pb-4 font-semibold flex-1 flex
               items-center justify-center"
            >
              {data.totalListings}
            </div>
          </DashboardCard>

          <DashboardCard
            title="Latest Donation"
            className="order-1 lg:order-2"
            style={{ animationDelay: "0.2s" }}
          >
            {data.latestListing && (
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
                  <div>Expiry_date:</div>
                  <div>{data.latestListing.expiry_date}</div>
                </div>
              </div>
            )}
            {!data.latestListing && (
              <div className="text-gray-600 text-center py-16">
                You don't have any donations yet
              </div>
            )}
          </DashboardCard>
        </div>
      )}
    </div>
  );
}
