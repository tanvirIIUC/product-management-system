import SideNavbar from "@/components/shared/SideNevbar";



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
         <div className="my-3 flex w-full">
        <div className="w-1/5">
          <SideNavbar />
        </div>
        <div className="w-4/5">{children}</div>
      </div>
    );
}
