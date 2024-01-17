import { useState } from "react";

import SearchTable from "../../components/Table/SearchTable";

import { GradesRow, Column } from "../../model";
import { useAuth } from "../../providers/AuthProvider";

const GradeBooks = () => {
  const { userData } = useAuth();
  const { userType } = userData;

  return <></>;
};

export default GradeBooks;
