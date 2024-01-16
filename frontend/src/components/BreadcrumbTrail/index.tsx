import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

interface Props {
  crumbs: Array<{
    name: string;
    link: string;
  }>;
}

export default function BreadcrumbTrail({ crumbs }: Props) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ pt: "120px", pl: "250px" }}>
        {crumbs.map((crumb, index) =>
          index === crumbs.length - 1 ? (
            <Typography color="text.primary">{crumb.name}</Typography>
          ) : (
            <Link underline="hover" color="inherit" href={crumb.link}>
              {crumb.name}
            </Link>
          )
        )}
      </Breadcrumbs>
    </div>
  );
}
