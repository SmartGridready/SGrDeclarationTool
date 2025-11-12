import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex flex-col cursor-pointer select-none">
      <div>
        <span className="text-lg font-bold leading-none">SmartGrid</span>
        <span className="text-lg font-bold leading-none text-[#59b886]">
          ready
        </span>
      </div>
      <span className="text-md font-bold leading-none text-[#868686]">
        Deklarationstool
      </span>
    </Link>
  );
};

export default Logo;
