
 import Navbar from '../../Navbar';
 import AdminOrdersView from '../../DashboardPage/AdminOrdersView'
 const Orders=()=>{
    return(
        <div>
            <Navbar/>
            <AdminOrdersView showSummary={false}/>
        </div>
    )
 }
 export default Orders;