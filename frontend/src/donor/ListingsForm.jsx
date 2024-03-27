import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import DatePicker from "react-datepicker";
import get from "../GetIp";
import "react-datepicker/dist/react-datepicker.css";

function ListingsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const { setNotification, user } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [listing, setListing] = useState({
    id: null,
    title: "",
    description: "",
    quantity: "",
    email: JSON.parse(localStorage.getItem("user")).email,
    expiry_date: "",
    location: location,
  });

  //Whenever the user id is available we want to fetch the listing info and load it into the form

  useEffect(() => {
    get()
      .then((data) => {
        setListing({ ...listing, location: data });
      })
      .catch((err) => {
        setLocation("error");
      });

    if (id) {
      setLoading(true);
      axiosClient
        .get(`/auth/listing/${id}`)
        .then(({ data }) => {
          setLoading(false);
          // console.log(data)
          setListing(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, []);

  //implementing save or form submit
  const onSubmit = (ev) => {
    ev.preventDefault();
    setSubmitting(true);
    // console.log(listing)
    if (listing.id) {
      axiosClient
        .put(`/auth/listing/${id}`, listing)
        .then(() => {
          setSubmitting(false);
          setNotification("Listing was successfully updated");
          navigate("/auth/listing");
        })

        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            console.log(response.data.errors);
            setErrors(response.data.errors);
          }
          setSubmitting(false);
        });
    } else {
      axiosClient
        .post(`/auth/listing/`, listing)
        .then(() => {
          setSubmitting(false);
          setNotification("Listing was successfully created");
          navigate("/auth/listing");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
          setSubmitting(false);
        });
    }
  };

  return (
    <>
      {listing.id && (
        <h1 className="font-bold text-2xl">Update Listing: {listing.title}</h1>
      )}
      {!listing.id && <h1 className="font-bold text-2xl">New Listing</h1>}
      <div className="card animated fadeInDown relative">
        {submitting && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <svg
              className="animate-spin h-10 w-10 text-blue-500"
              fill="none"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3C6.13401 3 3 6.13401 3 10C3 10.2761 2.77614 10.5 2.5 10.5C2.22386 10.5 2 10.2761 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C9.72386 18 9.5 17.7761 9.5 17.5C9.5 17.2239 9.72386 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3Z"
                fill="#212121"
              />
            </svg>
          </div>
        )}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!submitting && (
          <form onSubmit={onSubmit}>
            <div className="select-wrapper">
              <select
                value={listing.title}
                onChange={(ev) =>
                  setListing({ ...listing, title: ev.target.value })
                }
              >
                <option value="">Select Category</option>
                <option value="cereals">Dry Foods</option>
                <option value="vegetables">Vegetables</option>
                <option value="dairy products">Dairy Products</option>
                <option value="meats">Meats</option>
                <option value="fruits">Fruits</option>
              </select>
            </div>
            <textarea
              value={listing.description}
              onChange={(ev) =>
                setListing({ ...listing, description: ev.target.value })
              }
              placeholder="Description"
            />
            <input
              type="number"
              value={listing.quantity}
              onChange={(ev) =>
                setListing({ ...listing, quantity: ev.target.value })
              }
              placeholder="Quantity in kg "
            />
            <DatePicker
              selected={
                listing.expiry_date ? new Date(listing.expiry_date) : null
              }
              onChange={(date) =>
                setListing({
                  ...listing,
                  expiry_date: date.toISOString().slice(0, 10),
                })
              }
              placeholderText="Expiry Date"
            />
            {
              <input
                type="text"
                value={listing.location}
                onChange={(ev) => {
                  setListing({ ...listing, location: ev.target.value });
                }}
                placeholder="Location"
                // readOnly
              />
            }
            <button className="btn" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default ListingsForm;
