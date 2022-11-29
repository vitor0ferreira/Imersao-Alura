
import React from "react";
import config from "../config.json"
import styled from "styled-components"
import Menu from "../src/components/Menu/index.js";
import { StyledTimeline } from "../src/components/Timeline";

export default function Homepage() {
    const [valorDaBusca, setvalorDaBusca] = React.useState('');
    return (
        <>
            <div>
                <Menu busca={valorDaBusca} setBusca={setvalorDaBusca} />
                <Header/>
                <Timeline searchValue={valorDaBusca} playlists={config.playlists} />
            </div>
        </>
    )
}

const StyledBanner = styled.div`
    background-color: gray;
    background-image: url(https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80);
    background-position: center center;
    min-height: 230px;
    height: 30vh;
    width: 100%;

`;

const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info{
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }

`;

function Header() {
    return (
        <StyledHeader>
            <StyledBanner/>
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} alt="foto-perfil"/>
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({searchValue, ...props}) {

    const playlistsNames = Object.keys(props.playlists)

    return (
        <StyledTimeline>
            {playlistsNames.map((playlistsNames) => {
                const videos = props.playlists[playlistsNames];
                return (
                    <section>
                        <h2>{playlistsNames}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {
                                return (
                                    <a href={video.url}>
                                        <img src={video.thumb}/>
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}