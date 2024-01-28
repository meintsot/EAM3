import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

interface Props {
  crumbs: Array<{
    label: string;
    pathname: string;
  }>;
}

const BreadcrumbTrail = ({ crumbs }: Props) => {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {crumbs.map((crumb, index) =>
          index === crumbs.length - 1 ? (
            <Typography color="text.primary">{crumb.label}</Typography>
          ) : (
            <Link underline="hover" color="inherit" href={crumb.pathname}>
              {crumb.label}
            </Link>
          )
        )}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbTrail;
