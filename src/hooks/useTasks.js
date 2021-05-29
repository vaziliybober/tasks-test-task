import { useQuery } from "react-query";
import axios from "axios";
import useTenantGUID from "./useTenantGUID";

const useTasks = () => {
  const tenantGUID = useTenantGUID();

  const { data, isLoading } = useQuery(
    "tasks",
    async () => {
      const {
        data: { value: tasks },
      } = await axios.get("/odata/tasks", {
        params: { tenantguid: tenantGUID },
      });
      return tasks;
    },
    {
      enabled: !!tenantGUID,
    }
  );

  return { tasks: data, isLoading };
};

export default useTasks;
