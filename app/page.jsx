// app/page.jsx  (SERVER COMPONENT)
import HomeClient from "./HomeClient";

export const metadata = {
  description: "Advanced bonded and unbonded post-tensioning systems in India, including PT slabs, mono strand and multi-strand tendons, anchorage systems, ducts, and complete structural engineering solutions.",
};

export default function Page() {
  return (
    <>
      <HomeClient />
    </>
  )
}
