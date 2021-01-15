import React, {useEffect, useState} from 'react'
import {Link, Route} from "react-router-dom";
import {Button} from "react-bootstrap";
import './home.css'
import Dashboard from "../dashboard/Dashboard";


const apiKey = 'AIzaSyD0wOueZH7hQPNxfDFSaWX-Cag5GyMsuLA';
const playlistId = 'PLX56KwBDdowY32DNPrU_HwlCclLvwE_Bq';
const result = 20;


const Home = (props) => {
    const [videos, setVideos] = useState([]);


    useEffect(() => {
        getVideos()
    }, []);


    const getVideos = async () => {
        const allVideos = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=${result}&playlistId=${playlistId}&key=${apiKey}&mine=true&part=contentDetails&managedByMe=false`);
        const resVideos = await allVideos.json();
        console.log(resVideos);
        setVideos(resVideos.items);
    }


    return (
        <div className="pt-5 pb-5">
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-6">
                            <h2>All videos</h2>
                        </div>
                        <div className="col-lg-6">
                            <Link to={'/login'}><Button className="w-50 float-left mb-5">Log In</Button></Link>
                        </div>
                    </div>
                </div>
                {
                    videos.map((e) => {
                        let source = 'https://www.youtube.com/embed/';
                        let button = <Button/>
                        let likeVideo = ()=>{

                        };
                        return (
                            <div key={e.id} className="col-lg-3">
                                <div className="video_cover">
                                    <iframe height="250"
                                            src={source + `${e.snippet.resourceId.videoId}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen>
                                    </iframe>
                                </div>
                                <a href={source + `${e.snippet.resourceId.videoId}`} target="_blank">
                                    <h6
                                        className="title mt-3 mb-3">{e.snippet.title}</h6>
                                </a>
                                <Button className="mb-5 w-50 like_btn" onClick={likeVideo}>Like</Button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Home;