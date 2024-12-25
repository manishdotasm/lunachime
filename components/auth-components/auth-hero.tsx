import Image from "next/image";
import Logo_black from "@/public/logo-black.png";
import Link from "next/link";

const AuthHero = () => {
  return (
    <div className="sm:mx-auto flex justify-center w-full z-20">
      <Link href="/" className="">
        {" "}
        <Image src={Logo_black} alt="Logo" height={200} width={200} className="mx-auto" role="img" />
      </Link>
    </div>
  );
};

export default AuthHero;
