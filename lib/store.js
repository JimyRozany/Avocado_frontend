import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserAuth";
import ClientSlice from "./ClientManagement";
import CaseSlice from "./CaseManagement";
import LawyerSlice from "./LawyerManagement";
import LegalSlice from "./LegalManagement";
import HomeSlice from "./Home";
import RoleSlice from "./RolePermissions"
export const store = configureStore({
  reducer: {
    UserRTK: UserSlice,
    ClientRTK: ClientSlice,
    CaseRTK: CaseSlice,
    LawyerRTK: LawyerSlice,
    LegalRTK: LegalSlice,
    HomeRTK: HomeSlice,
    RoleRTK:RoleSlice
  },
});
