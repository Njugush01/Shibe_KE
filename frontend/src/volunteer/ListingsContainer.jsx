import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import VolunteerListed from "./VolunteerListed";
import MyClaims from "./MyClaims";

export default function ListingsContainer() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [claimedListings, setClaimedListings] = useState([]);

    // useEffect(() => {
    //     getListings();
    // }, []);

    // const getListings = () => {
    //     setLoading(true);
    //     axiosClient
    //         .get("/auth/listed")
    //         .then(({ data }) => {
    //             setLoading(false);
    //             setListings(data.data);
    //         })
    //         .catch(() => {
    //             setLoading(false);
    //         });


    // };

    // const onClaim = (claimedListing) => {
    //     setClaimedListings(prevClaimedListings => [claimedListing, ...prevClaimedListings]);
    // };

    return (
        <div>
            length == {claimedListings.length}
            <VolunteerListed listings={listings} loading={loading}  />
            <MyClaims claimedListings={claimedListings} />
        </div>
    );
}
