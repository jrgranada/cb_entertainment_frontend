"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import '../styles/layout.scss';
import { Layout, Button, Card, Input } from "antd";
import React, { useState } from "react";
import { redirect } from 'next/navigation';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AlbumCard from "../components/AlbumCard";
import { searchByQuery } from "@/redux/features/spotifySlice";
import ArtistCard from "../components/ArtistCard";
import TrackCard from "../components/TrackCard";

declare module 'next-auth' {
    interface Session {
        access_token?: string;
    }
}

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;



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
    left: 0,
    bottom: 0,
    right: 0,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#008c44",
};

export default function Home() {
    const albumList = useAppSelector((state) => state.searchReducer.albumList);
    const artistList = useAppSelector((state) => state.searchReducer.artistList);
    const trackList = useAppSelector((state) => state.searchReducer.trackList);
    const dispatch = useAppDispatch();
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    // Si no existe una sesión activa entonces retornar la página de login
    if (session) {
        const access_token = session.access_token ?? '';

        const onSearch = (value: string) => {
            dispatch(searchByQuery({
                token: access_token,
                query: value
            }))
        };

        return (
            <>
                <Layout>
                    <Layout>
                        <Header style={headerStyle}>
                            <div className="container-header">
                                <img src="https://www.constructorabolivar.com/sites/all/themes/constructora/assets/icons/logo-bolivar_scroll.svg" alt="logo" />
                                <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
                                <div className="header_button">
                                    <p> Bienvenido {session.user?.name} </p>
                                    <Button className="btn-header" type="primary" onClick={() => signOut()}>
                                        Cerrar Sesión
                                    </Button>
                                </div>
                            </div>
                        </Header>
                        <Content style={contentStyle}>
                            <br></br>
                            <div className="container-content"><h1>Albumes</h1>
                                <br></br>
                                <div className="container_album_cards">
                                    {albumList.map((data, index) => (
                                        index < 8 &&
                                        (<AlbumCard key={index} images={data.images} name={data.name} releaseDate={data.releaseDate} totalTracks={data.totalTracks} />)
                                    ))}
                                </div>
                            </div>
                            <br></br>
                            <div className="container-content"><h1>Artistas</h1>
                                <br></br>
                                <div className="container_album_cards">
                                    {artistList.map((data, index) => (
                                        index < 8 &&
                                        (<ArtistCard key={index} images={data.images} name={data.name} popularity={data.popularity} />)
                                    ))}
                                </div>
                            </div>
                            <br></br>
                            <div className="container-content"><h1>Canciones</h1>
                                <br></br>
                                <div className="container_album_cards">
                                    {trackList.map((data, index) => (
                                        index < 8 &&
                                        (<TrackCard key={index} 
                                            image={data.album.images[0].url} 
                                            name={data.name} 
                                            artists={data.artists} 
                                            artistName={data.artists[0].name}
                                            album={ data.album}
                                            />)
                                    ))}
                                </div>
                            </div>
                        </Content>
                        <Footer style={footerStyle}>Constructora Bolívar y Spotify</Footer>
                    </Layout>
                </Layout >
            </>
        )
    }

    // Redirigir al home si hay una sesión activa
    if (!session) {
        redirect('/');
    }
}


