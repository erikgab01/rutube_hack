import rutube_logo from "../assets/rutube_logo.png";
import hack_logo from "../assets/hack_logo.png";

export default function Layout({ children }) {
    return (
        <>
            <header className="header">
                <img className="rutube-logo" src={rutube_logo} alt="rutube logo" />
                <img className="hack-logo" src={hack_logo} alt="hack logo" />
                <p className="header-title">ИИ-генерация обложек для видео и каналов</p>
            </header>
            <main className="main">{children}</main>
            <footer className="footer">
                <p className="footer-note">
                    Проект выполнен в рамках хакатона Цифровой прорыв командой threadrippers
                </p>
            </footer>
        </>
    );
}
