import { Column, Filters } from "../../model";
import SearchTable from "../../components/Table/SearchTable";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../providers/AuthProvider";
import {
  RetrieveDeclarationsRequest,
  RetrieveDeclarationsResponse,
} from "../../../../backend/models/types/declaration";
import API from "../../api";

const titles: Array<Column> = [
  {
    key: "examPeriod",
    label: "Εξεταστική περίοδος",
    searchInputType: "text",
    options: [],
  },
  {
    key: "state",
    label: "Κατάσταση δήλωσης",
    searchInputType: "dropdown",
    options: ["Προσωρινή αποθήκευση", "Οριστική υποβολή"],
  },
  {
    key: "actions",
    label: "",
    searchInputType: "none",
    options: [],
  },
];

const Declarations = () => {
  const { userData } = useAuth();

  const [declarationResults, setDeclarationResults] =
    useState<RetrieveDeclarationsResponse>({ declarations: [], total: 0 });

  useEffect(() => {
    API.retrieveDeclarations({ page: 1, pageSize: 10 }).then((res) =>
      setDeclarationResults(res)
    );
  }, [userData.authToken]);

  const handleFilterChange = (filters: Filters) => {
    const request = filters as RetrieveDeclarationsRequest;
    API.retrieveDeclarations(request).then((res) => setDeclarationResults(res));
  };

  return (
    <Box className="wrapper">
      <Box className="header">
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Δηλώσεις
        </Typography>
      </Box>
      <SearchTable
        columns={titles}
        rows={declarationResults.declarations ?? []}
        onFilterChange={handleFilterChange}
        totalResults={declarationResults.total}
        actions={["view"]}
      />
    </Box>
  );
};

export default Declarations;
