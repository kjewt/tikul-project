import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log('scrolltotop : useEffect 실행됨!');
    }, [pathname]);

    return null;
}