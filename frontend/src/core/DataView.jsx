import React, { useState, useEffect, useRef } from 'react';
import axiosClient from '../axios-client';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useReactToPrint } from 'react-to-print';
import { useStateContext } from "../contexts/ContextProvider";
import Accounts from '../Util';
import companyLogo from "../assets/pdflogo.png";
import generatePdf from './PdfFileCopy';
import TButton from "../core/TButton";
import { IoPrintOutline } from "react-icons/io5";

function DataView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const componentRef = useRef();
  const { user } = useStateContext();
  const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, [selectedDate]);

  useEffect(() => {
    getUsers();
  }, [selectedDate]);

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/auth/users")
      .then(({ data }) => {
        setLoading(false);
        //console.log(data.data)
        setUsers(data.data);
        //setFilteredData(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // Filter users based on selected month
  const filteredUsers = (chosenDate) => {
    // if(chosenDate.getMonth() === null){
    //     setFilteredData(users);
    //     return;
    // }
    try{
        const filtered = users.filter((user) => {
            const date = new Date(user.created_at);
            return date.getMonth() === chosenDate.getMonth() && date.getFullYear() === chosenDate.getFullYear();
          });
          setFilteredData(filtered);
          //console.log(selectedDate);
    console.log(filtered);
    } catch(err){
        setFilteredData(users);
    }

  }
  // Function to handle printing
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });



  const checkSelectedDate = () =>{
    if (selectedDate.getMonth() == null){
        return 0;
    } else{selectedDate
        return selectedDate;
    }
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div>
          <label className="mr-2">Select Month:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {setSelectedDate(date);
                console.log(date)
                filteredUsers(date);
            }}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            className="border rounded-md px-3 py-1"
          />
        </div>
        <TButton onClick= {()=>{generatePdf(filteredData, 'Users Report', user.name, new Date(), selectedDate)}}> <IoPrintOutline /> Print Report</TButton>
      </div>
      {loading && <div>Loading...</div>}
      {!loading && (
        <div ref={componentRef}>
          {checkSelectedDate > new Date() ? (
            <div>No data available for future months</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Account Type</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{Accounts(user.account_type)}</td>
                    <td>{user.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default DataView;
