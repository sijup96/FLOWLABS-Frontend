import { useContext } from "react";
import { DomainContext } from "@/context/DomainProvider";

export const useDomain = () => {
  const { domain, loading } = useContext(DomainContext);

  // Ensure that the hook is used within a DomainProvider
  if (!domain && !loading) {
    throw new Error("useDomain must be used within a DomainProvider");
  }

  return { domain, loading };
};
