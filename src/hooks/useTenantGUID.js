import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const useTenantGUID = () => {
  const { data, refetch } = useQuery(
    "tenantGUID",
    async () => {
      const { data: tenantGUID } = await axios.get("/api/Tenants");
      return tenantGUID;
    },
    { enabled: false }
  );

  React.useEffect(() => {
    refetch();
  }, []);

  return data;
};

export default useTenantGUID;
