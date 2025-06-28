
import UserProfile from "@/components/UserProfile";
import DashboardLayout from "@/components/DashboardLayout";

const Profile = () => {
  // In a real app, this would come from authentication context
  const userRole = "buyer" as "farmer" | "buyer" | "admin";

  return (
    <DashboardLayout userRole={userRole}>
      <UserProfile userRole={userRole} />
    </DashboardLayout>
  );
};

export default Profile;
