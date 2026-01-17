import { Avatar, Paper } from "@mui/material";
export default function ProfilePage() {
  return (
    <main
      className="page"
      style={{ display: "flex", justifyContent: "space-between", padding: 2 , direction: 'rtl'}}>
      <section style={{width: '60%', height: '80vh'}}>
        <Paper elevation={2} sx={{height: '100%'}}>
        <Avatar>
          A
        </Avatar>
        </Paper>
      </section>

      <section>

      </section>
    </main>
  );
}
