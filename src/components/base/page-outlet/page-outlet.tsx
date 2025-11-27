import type { PropsWithChildren } from "react";

const PageOutlet: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex-1">{children}</div>;
};
export default PageOutlet;
