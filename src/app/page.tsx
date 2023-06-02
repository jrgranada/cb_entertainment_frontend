"use client"
import { useSession, signIn } from "next-auth/react";
import './styles/layout.scss';
import { Layout, Button, Card } from "antd";
import { redirect } from 'next/navigation';


const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
    color: "#fff",
    height: 64,
    padding: '1rem 2rem',
    backgroundColor: "#038C4C",
    display: "flex",
};

const contentStyle: React.CSSProperties = {
    backgroundColor: "#f8f8f8",
};

const footerStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#008c44",
};

export default function Login() {

    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    // Si no existe una sesión activa entonces retornar la página de login
    if (!session) {
        return (
            <>
                <Layout>
                    <Layout>
                        <Header style={headerStyle}>
                            <div className="container-header">
                                <img src="https://www.constructorabolivar.com/sites/all/themes/constructora/assets/icons/logo-bolivar_scroll.svg" alt="logo" />
                                <Button className="btn-header" type="primary" onClick={() => signIn()}>
                                    Iniciar Sesión
                                </Button>
                            </div>
                        </Header>
                        <Content style={contentStyle}>
                            <div className="div-content-login">
                                <img className="image-content-login" src="/images/spotify.png" alt="Logo" />
                            </div>
                        </Content>
                        <Footer style={footerStyle}>Constructora Bolívar y Spotify</Footer>
                    </Layout>
                </Layout>
            </>
        )
    }

    // Redirigir al home si hay una sesión activa
    if (session) {
        redirect('/home');
    }
}


