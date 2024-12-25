import { ShootingStars } from "@/components/aceternity/shooting-stars";
import { StarsBackground } from "@/components/aceternity/stars-background";
import AuthHero from "@/components/auth-components/auth-hero";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<AuthHero />
			{children}
			<ShootingStars />
			<StarsBackground twinkleProbability={1} />
		</div>
	);
};

export default AuthLayout;
