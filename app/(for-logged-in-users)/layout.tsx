import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
};

export default AuthLayout;
