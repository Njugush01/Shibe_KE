import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import Pagination from "../Pagination";

export default function ScheduledPickups() {
  const [scheduledPickups, setScheduledPickups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});

  const onPageClick = (link) => {
    getListings(link.url);
  };

  useEffect(() => {
    getScheduledPickups();
  }, []);

  const getScheduledPickups = (url) => {
    url = url || "/auth/scheduled-pickups";
    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        setLoading(false);
        console.log(data.data);
        setScheduledPickups(data.data);
        setMeta(data.meta);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="font-bold">Scheduled Pickups</h1>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Listing ID</th> 
              <th>Pickup Date</th>
              <th>Message</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading &&
            Array.isArray(scheduledPickups) &&
            scheduledPickups.length > 0 && (
              <tbody>
                {scheduledPickups.map((pickup) => (
                  <tr key={pickup.id}>
                    <td>{pickup.id}</td>
                    <td>{pickup.listing_id}</td>
                    <td>{pickup.pickup_date}</td>
                    <td>{pickup.message}</td>
                  </tr>
                ))}
              </tbody>
            )}
        </table>
      </div>
      {/* <Pagination meta={meta} onPageClick={onPageClick} /> */}
    </div>
  );
}
