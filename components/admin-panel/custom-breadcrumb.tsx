"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { usePathname } from "next/navigation";

interface BreadcrumbLinkType {
  label: string;
  href?: string;
}

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const CustomBreadCrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbLinks: BreadcrumbLinkType[] = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    return {
      label: capitalizeFirstLetter(decodeURIComponent(segment)),
      href: index < segments.length - 1 ? href : undefined,
    };
  });
  return (
    <Breadcrumb className="w-full">
      <BreadcrumbList className="w-full">
        <BreadcrumbItem>LunaChime</BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        {breadcrumbLinks.map((link, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem className={index === breadcrumbLinks.length - 1 ? "" : "hidden md:block"}>
              {link.href ? (
                <BreadcrumbLink href={link.href}>{link.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{link.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < breadcrumbLinks.length - 1 && <BreadcrumbSeparator className="hidden md:block" />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadCrumb;
