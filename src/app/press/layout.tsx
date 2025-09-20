import LandingPage from "../page";

export default function PressLayout({
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
