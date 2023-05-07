import { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

type Props = {
    children?: ReactNode
}

export default function MainLayout({ children }: Props ) {  
    return(
        <>
            <Header/>
                {children}
            <Footer/>
        </>
    )
}