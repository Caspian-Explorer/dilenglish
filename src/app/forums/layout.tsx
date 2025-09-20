import LandingPage from "../page";

export default function ForumLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <LandingPage>
            {children}
        </LandingPage>
    )
}
