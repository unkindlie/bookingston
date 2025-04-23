import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import "./container.styles.css";

const Container = ({ children }: { children: React.ReactNode }) => (
    <div className="container">
        <Header />
        <div className="inner">{children}</div>
        <Footer />
    </div>
);

export { Container };
