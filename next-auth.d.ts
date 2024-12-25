import { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: CustomUser & DefaultSession["user"];
	}

	interface CustomUser {
		id: string;
		email: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string]: any;
	}
}
