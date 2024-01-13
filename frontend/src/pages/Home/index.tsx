import { Typography } from "@mui/material";

import "./Home.css";

function Home() {
  return (
    <div className="container">
      <div className="homeText">
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Καλωσήρθατε στη δικτυακή περιοχή των γραμματειών του Εθνικού και
          Καποδιστριακού Πανεπιστημίου Αθηνών
        </Typography>
        <Typography>
          Συνδεθείτε στον λογαριασμό σας για να κάνετε νέα δήλωση, δείτε τις
          βαθμολογίες σας, αιτηθείτε πιστοποιητικό.
        </Typography>
      </div>
    </div>
  );
}

export default Home;
