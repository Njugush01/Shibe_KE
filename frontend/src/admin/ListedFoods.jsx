//import { Link } from "react-router-dom"
export default function ListedFoods() {
  return (
    <div>
       <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Listed Food</h1>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Food Type</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
        </table>
        </div>
    </div>
  )
}
