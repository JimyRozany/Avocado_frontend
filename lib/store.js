import { configureStore } from "@reduxjs/toolkit";
// import HomeSlice from "./Home";
import UserSlice from "./UserAuth"
import ClientSlice from "./ClientManagement"
import CaseSlice from "./CaseManagement"
import LawyerSlice from "./LawyerManagement"
// import Articleslice from "./Articles"
// import CartSlice from "./Cart"
// import NotificationSlice from "./Notifications"
// import AddressSlice from "./Address"
// import ProfileSlice from "./Profile"
// import OrdersSlice from "./Orders"

export const store = configureStore({
  reducer: {
    UserRTK:UserSlice,
    ClientRTK:ClientSlice,
    CaseRTK:CaseSlice,
    LawyerRTK:LawyerSlice,
  },
});
