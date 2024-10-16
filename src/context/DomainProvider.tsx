import React, { useEffect, useState } from "react";
import { company } from "@/api/services/company.service";

// Create a context for the domain
export const DomainContext = React.createContext<{ domain: string; loading: boolean }>({
  domain: "",
  loading: true,
});

type DomainProviderProps = {
  children: React.ReactNode;
};

const DomainProvider: React.FC<DomainProviderProps> = ({ children }) => {
  const [domain, setDomain] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch domain name once the component is mounted
  useEffect(() => {
    const fetchDomainName = async () => {
      try {
        const data = await company.getDomainName();
        setDomain(data);
      } catch (error) {
        console.error("Failed to fetch domain name:", error);
      } finally {
        setLoading(false); // Loading completed
      }
    };

    fetchDomainName();
  }, []);

  // Provide both domain and loading state to context consumers
  return (
    <DomainContext.Provider value={{ domain, loading }}>
      {children}
    </DomainContext.Provider>
  );
};

export default DomainProvider;
