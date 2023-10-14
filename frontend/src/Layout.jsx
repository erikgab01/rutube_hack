import rutubeLogo from "./assets/rutube_logo.png";
import hackLogo from "./assets/hack_logo.png";

export default function Layout({ children }) {
    return (
        <>
            <header className="header">
                <img className="rutube-logo" src={rutubeLogo} alt="rutube logo" />
                <img className="hack-logo" src={hackLogo} alt="hack logo" />
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
