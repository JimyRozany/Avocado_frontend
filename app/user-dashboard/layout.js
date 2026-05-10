import AdminNavbar from "@/components/Admin/Navbar";
import SideBar from "@/components/Admin/SideBar";
import { redirect } from "next/navigation";

// Simulate getting user info, replace with your auth logic
async function getUser() {
  // Example: fetch user from cookie/session/API
  return {
    isLoggedIn: true,
    role: "admin", // or 'user'
  };
}

export default async function AdminLayout({ children }) {
  const user = await getUser();

  if (!user.isLoggedIn || user.role !== "admin") {
    // If not admin, redirect to homepage or login page
    redirect("/");
  }

  return (
    <div className="flex items-center min-h-screen bg-black">
      <SideBar  type="user"/>
      <div className="min-h-screen bg-gray-50 font-sans px-4 sm:px-6 overflow-hidden sm:w-[calc(100%-260px)]  w-full ml-auto sm:rounded-l-[50px] rounded-none">
        <AdminNavbar type="user"/>
        <main className="   ">
          {children}
        </main>
      </div>
    </div>
  );
}
