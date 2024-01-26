import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { AccordionsProps } from "../../model";

const Accordions: React.FC<AccordionsProps> = ({ sections, children }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box>
      {sections.map((section, index) => (
        <Accordion
          key={section.title}
          expanded={expanded === section.title}
          onChange={handleChange(section.title)}
          sx={{ width: "100%" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>{section.title}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>{children[index]}</AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Accordions;
