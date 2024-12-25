import { ContentLayout } from "@/components/admin-panel/content-layout";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <ContentLayout title="Create">{children}</ContentLayout>;
};

export default AuthLayout;
