import React, { useState } from "react";
import { RiFacebookCircleFill, RiTwitterXFill } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io";
import { FaYoutube } from "react-icons/fa6";
import { MdOutlineCopyright } from "react-icons/md";
import FooterImg from './images/Footer.jpg';

const Footer = () => {
  const [isOpen, setIsOpen] = useState(null);

  const toggleSection = (index) => {
    setIsOpen(isOpen === index ? null : index);
  };

  const sections = [
    {
      title: "Caze Labs",
      links: [
        { label: "About", href: "https://www.cazelabs.com/about-us/" },
        { label: "Blog", href: "https://www.cazelabs.com/" },
        { label: "Careers", href: "https://www.linkedin.com/company/cazelabs/jobs/" },
        { label: "Contact", href: "https://www.cazelabs.com/contact-us/" },
      ],
    },
    {
      title: "HireSense",
      links: [
        { label: "Job Listings" },
        { label: "Hiring Process" },
        { label: "Career Advice" },
        { label: "Success Stories" },
      ],
    },
    {
      title: "For Employers",
      links: [
        { label: "Post a Job" },
        { label: "Manage Applications" },
        { label: "Employer Resources" },
      ],
    },
    {
      title: "More",
      links: [
        { label: "Help" },
        { label: "Privacy Policy", href: "https://www.cazelabs.com/privacy-policy/" },
        { label: "Terms & Conditions", href: "https://www.cazelabs.com/terms-of-use/" },
      ],
    },
  ];

  return (
    <div
      className="text-white py-10 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${FooterImg})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-wrap justify-between">

          {/* Desktop layout */}
          <div className="hidden sm:flex w-full flex-wrap justify-between">
            {sections.map((section, i) => (
              <div key={i} className="w-full sm:w-1/5 mb-6">
                <h3 className="font-semibold text-lg mb-2">{section.title}</h3>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link, idx) => (
                    <li key={idx} className="cursor-pointer hover:underline">
                      {link.href ? <a href={link.href}>{link.label}</a> : link.label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* Social Media */}
            <div className="w-full sm:w-1/5 flex flex-col items-start">
              <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <RiFacebookCircleFill size={25} />
                <RiTwitterXFill size={25} />
                <a href="https://www.linkedin.com/company/cazelabs/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
                  <IoLogoLinkedin size={25} />
                </a>
                <FaYoutube size={25} />
              </div>
            </div>
          </div>

          {/* Mobile Accordion layout */}
          <div className="sm:hidden w-full">
            {sections.map((section, i) => (
              <div key={i} className="mb-4">
                <button
                  className="w-full flex justify-between items-center text-left text-md font-semibold py-2 border-b border-gray-400"
                  onClick={() => toggleSection(i)}
                >
                  {section.title}
                  <span>{isOpen === i ? "-" : "+"}</span>
                </button>
                {isOpen === i && (
                  <ul className="mt-2 space-y-2 ml-2 text-sm">
                    {section.links.map((link, idx) => (
                      <li key={idx} className="cursor-pointer hover:underline">
                        {link.href ? <a href={link.href}>{link.label}</a> : link.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Mobile social icons */}
            <div className="mt-6">
              <h3 className="font-semibold text-md mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <RiFacebookCircleFill size={25} />
                <RiTwitterXFill size={25} />
                <IoLogoLinkedin size={25} />
                <FaYoutube size={25} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative z-10 flex flex-col sm:flex-row justify-center items-center gap-4 mt-10 text-sm text-center px-4">
          <div className="text-2xl font-bold tracking-wide">Hire Sense</div>
          <p>
            Copyright <MdOutlineCopyright className="inline" /> 2025, Hire Sense.
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;









// import React from "react";
// import { RiFacebookCircleFill, RiTwitterXFill } from "react-icons/ri";
// import { IoLogoLinkedin } from "react-icons/io";
// import { FaYoutube } from "react-icons/fa6";
// import { MdOutlineCopyright } from "react-icons/md";
// import FooterImg from './images/Footer.jpg';


// const Footer = () => {
//     return (
//         <div
//             className="h-auto text-white py-10 bg-cover bg-center relative"
//             style={{ backgroundImage: `url(${FooterImg})` }}
//         >
//             <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

//             {/* Main Content */}
//             <div className="relative z-10 container mx-auto flex flex-wrap justify-between px-6">
//                 <div className="w-full sm:w-1/5 mb-6 sm:mb-0">
//                     <h3 className="font-semibold text-lg mb-2">Caze Labs</h3>
//                     <ul className="space-y-2">
//                         <li className="cursor-pointer hover:underline">
//                             <a href="https://www.cazelabs.com/about-us/" className="hover:underline">About</a>
//                         </li>
//                         <li className="cursor-pointer hover:underline">
//                             <a href="https://www.cazelabs.com/" className="hover:underline">Blog</a>
//                         </li>
//                         <li className="cursor-pointer hover:underline">
//                             <a href="https://www.linkedin.com/company/cazelabs/jobs/" className="hover:underline">Careers</a>
//                         </li>
//                         <li className="cursor-pointer hover:underline">
//                             <a href="https://www.cazelabs.com/contact-us/" className="hover:underline">Contact</a>
//                         </li>
//                     </ul>
//                 </div>


//                 {/* Column 2 - HireSense */}
//                 <div className="w-full sm:w-1/5 mb-6 sm:mb-0">
//                     <h3 className="font-semibold text-lg mb-2">HireSense</h3>
//                     <ul className="space-y-2">
//                         <li className="cursor-pointer hover:underline">Job Listings</li>
//                         <li className="cursor-pointer hover:underline">Hiring Process</li>
//                         <li className="cursor-pointer hover:underline">Career Advice</li>
//                         <li className="cursor-pointer hover:underline">Success Stories</li>
//                     </ul>
//                 </div>

//                 {/* Column 3 - For Employers */}
//                 <div className="w-full sm:w-1/5 mb-6 sm:mb-0">
//                     <h3 className="font-semibold text-lg mb-2">For Employers</h3>
//                     <ul className="space-y-2">
//                         <li className="cursor-pointer hover:underline">Post a Job</li>
//                         <li className="cursor-pointer hover:underline">Manage Applications</li>
//                         <li className="cursor-pointer hover:underline">Employer Resources</li>
//                     </ul>
//                 </div>

//                 {/* Column 4 - More */}
//                 <div className="w-full sm:w-1/5 mb-6 sm:mb-0">
//                     <h3 className="font-semibold text-lg mb-2">More</h3>
//                     <ul className="space-y-2">
//                         <li className="cursor-pointer hover:underline">Help</li>
//                         <li className="cursor-pointer hover:underline">
//                             <a href="https://www.cazelabs.com/privacy-policy/" className="hover:underline">Privacy Policy</a>
//                         </li>
//                         <li className="cursor-pointer hover:underline">
//                             <a href="https://www.cazelabs.com/terms-of-use/" className="hover:underline">Terms & Conditions</a>
//                         </li>
//                     </ul>
//                 </div>

//                 {/* Column 5 - Social Media */}
//                 <div className="w-full sm:w-1/5 flex flex-col items-start">
//                     <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
//                     <div className="flex space-x-4">
//                         <RiFacebookCircleFill size={25} className="cursor-pointer hover:scale-110" />
//                         <RiTwitterXFill size={25} className="cursor-pointer hover:scale-110" />
//                         <a href="https://www.linkedin.com/company/cazelabs/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
//                             <IoLogoLinkedin size={25} className="cursor-pointer hover:scale-110" />
//                         </a>
//                         <FaYoutube size={25} className="cursor-pointer hover:scale-110" />
//                     </div>
//                 </div>
//             </div>

//             {/* Bottom Section */}
//             <div className="relative z-10 flex justify-center items-center gap-4 mt-10 text-sm text-center px-4">
//                 <div className="text-3xl font-bold tracking-wide">Hire Sense</div>
//                 <p>
//                     Copyright <MdOutlineCopyright className="inline" /> 2025, Hire Sense.
//                     All rights reserved.
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Footer;



