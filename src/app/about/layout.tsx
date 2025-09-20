import LandingPage from "../page";

export default function AboutLayout({
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
