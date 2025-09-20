import LandingPage from "../page";

export default function LanguageLayout({
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
