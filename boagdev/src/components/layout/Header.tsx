import React from "react";

import LinkedInLogo from "../ui/icons/LinkedInLogo";
import GitHubLogo  from "../ui/icons/GitHubLogo";
import LogoLink from "../ui/LogoLink";

const Header: React.FC = () => {
  return (
    <header className="fixed top-4 left-4 z-10 flex items-start justify-between w-full max-w-screen-xl pr-8">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">James Boag</h1>
        <p className="text-sm text-gray-600 mb-3">
          Software Developer + LLM Whisperer
        </p>
      </div>

      <div className="flex items-center space-x-4 mt-1">
        <LogoLink url="https://linkedin.com" label="LinkedIn Profile">
          <LinkedInLogo />
        </LogoLink>
        <LogoLink url="https://github.com" label="github account">
          <GitHubLogo />
        </LogoLink>
      </div>
    </header>
  );
};

export default Header;
