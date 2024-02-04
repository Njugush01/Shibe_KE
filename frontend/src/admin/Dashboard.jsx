import { FaBowlFood } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { VscRequestChanges } from "react-icons/vsc";
const details =[
  {
    title:'Total listed food',
    icon: <FaBowlFood />
  },
  {
    title:'Total donors',
    icon: <IoPeople />
  },
  {
    title:'Total volunteers',
    icon: <IoPeople />
  },
  {
    title:'Requests',
    icon: <VscRequestChanges />
  },

];
export default function Dashboard() {
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Dashboard</h1>
      </div> 
      <div className="card--container">
        {details.map((item) =>(
          <div className="card-2">
            <div className="card--cover">{item.icon}</div>
            <div className="card--title">
              <h2>{item.title}</h2>
            </div>
          </div>
        )
        )}
      </div>
    </div>
  )
}
