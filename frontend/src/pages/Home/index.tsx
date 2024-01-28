import { Typography } from "@mui/material";
import { useAuth } from "../../providers/AuthProvider";

import "./Home.css";

function Home() {
  const { userData } = useAuth();
  const { userType } = userData;
  return (
    <div className="container">
      <div className="homeText">
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Καλωσήρθατε στη δικτυακή περιοχή των γραμματειών του Εθνικού και
          Καποδιστριακού Πανεπιστημίου Αθηνών
        </Typography>
        {userType === "guest" ? (
          <Typography>
            Συνδεθείτε στον λογαριασμό σας για να κάνετε νέα δήλωση, δείτε τις
            βαθμολογίες σας, αιτηθείτε πιστοποιητικό, αν είστε φοιτητής, και να
            υποβάλλετε βαθμολόγια, αν είστε καθηγητής.
          </Typography>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Home;
