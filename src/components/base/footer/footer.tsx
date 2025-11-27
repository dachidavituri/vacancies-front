import { links } from "@/data";
import { NavLink } from "react-router";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0C1220] text-[#DDE2E9]">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-[#F5C96B]">
            Gstore Jobs
          </h2>
          <p className="text-[#DDE2E9]">
            Discover the best job opportunities. Browse vacancies, apply easily,
            and get hired faster.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-xl font-semibold text-[#F5C96B]">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `transition-colors hover:text-[#3A6FF8] ${isActive ? "text-[#3A6FF8]" : ""}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xl font-semibold text-[#F5C96B]">
            Contact Us
          </h3>
          <ul className="space-y-2 text-[#DDE2E9]">
            <li>Email: dachi.davituri.1@btu.edu.ge</li>
            <li>Phone: +995 577 21 20 54</li>
            <li>Address: Tbilisi, Georgia</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
