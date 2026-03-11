import { Box, Container } from "@mui/material";
import { NetworkSidebar, Invitations, ProfileCard } from "@/components/network";
export default function Network() {
  return (
    <Box sx={{ width: "100%", py: 2 }}>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // موبايل: فوق بعض، كبير: بجانب بعض
          gap: { xs: 2, md: 3 },
          alignItems: "flex-start",
        }}
      >
        {/* الصندوق الأول: 7-9 */}
        <Box sx={{ width: { xs: "100%", md: "28%" } }}>
          <NetworkSidebar />
        </Box>

        {/* الصندوق الثاني: 10-13 */}
        <Box sx={{ width: { xs: "100%", md: "72%" } }}>
          <Invitations />
          <ProfileCard
            name="John Doe"
            headline="Software Engineer"
            mutuals={10}
            avatarSrc="https://via.placeholder.com/150"
          />
        </Box>
      </Container>
    </Box>
  );
}