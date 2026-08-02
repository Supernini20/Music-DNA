import Button from "@mui/material/Button";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

function App() {
  return (
    <main>
      <h1>Music Personality</h1>
      <Button variant="contained" startIcon={<MusicNoteIcon />}>
        Musikprofil starten
      </Button>
    </main>
  );
}

export default App;
