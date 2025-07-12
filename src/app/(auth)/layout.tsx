import type React from "react";

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return <div>{children}</div>;
};

export default Layout;
