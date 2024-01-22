import { Column } from "../../model";
import SearchTable from "../../components/Table/SearchTable";
import { useState } from "react";
import { Box, Typography } from "@mui/material";

const defaultData = [
  {
    declarationId: "6532a02cb97059bf3be476d5",
    examPeriod: "Χειμερινό 23-24",
    state: "Προσωρινή αποθήκευση",
  },
  {
    declarationId: "6532a02cb97059bf3be476d5",
    examPeriod: "Χειμερινό 23-24",
    state: "hgjfjkd",
  },
  {
    declarationId: "6532a02cb97059bf3be476d5",
    examPeriod: "Χειμερινό 23-24",
    state: "hgjfjkd",
  },
  {
    declarationId: "6532a02cb97059bf3be476d5",
    examPeriod: "Χειμερινό 23-24",
    state: "hgjfjkd",
  },
];

const titles: Array<Column> = [
  {
    key: "examPeriod",
    label: "Εξεταστική περίοδος",
    searchInputType: "dropdown",
    options: ["Χειμερινό 23-24"],
  },
  {
    key: "state",
    label: "Κατάσταση δήλωσης",
    searchInputType: "dropdown",
    options: ["Προσωρινή αποθήκευση"],
  },
  {
    key: "actions",
    label: "",
    searchInputType: "none",
    options: [],
  },
];

const Declarations = () => {
  const [declarations, setDeclarations] = useState(defaultData);

  return (
    <Box className="wrapper">
      <Box className="header">
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Δηλώσεις
        </Typography>
      </Box>
      <SearchTable
        columns={titles}
        rows={declarations}
        setRows={setDeclarations}
        actions={["view"]}
      />
    </Box>
  );
};

export default Declarations;
