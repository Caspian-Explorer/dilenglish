import LandingPage from "../page";

export default function CareersLayout({
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
