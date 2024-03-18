import Layout from "../../Layout/Layout";
import { FaAngleLeft, FaAngleRight, FaSearch, FaUser } from "react-icons/fa";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import SongBar from "../MasterBar/SongBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { userActor } from "../../states/Actors/UserActor";
import Navbar from "../Navbar";
import { useGlobalContext } from "../../states/Contet";
import Footer from "../Footer/Footer";

export const songs = [
  {
    id: Math.random() * Date.now(),
    title: "Từng Quen",
    artist: "Wren Evans",
    mp3: new Audio("/assets/mp3/tungquen.mp3"),
    img: "/assets/tungquen.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Buồn Hay Vui",
    artist: "VSOUL x MCK x Obito x Ronboogz x Boyzed",
    mp3: new Audio("/assets/mp3/buonhayvui.mp3"),
    img: "/assets/buonhayvui.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Chịu Cách Mình Nói Thua",
    artist: "Rhyder x BAN x Coolkid",
    mp3: new Audio("/assets/mp3/chiucach.mp3"),
    img: "/assets/chiucach.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Khi Cơn Mưa Dần Phai",
    artist: "Tez x Myra Trần",
    mp3: new Audio("/assets/mp3/khiconmua.mp3"),
    img: "/assets/khiconmua.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Chìm Sâu",
    artist: "MCK x Trung Trần",
    mp3: new Audio("/assets/mp3/chimsau.mp3"),
    img: "/assets/chimsau.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Xích Thêm Chút",
    artist: "MCK x Tlinh x Groovie",
    mp3: new Audio("/assets/mp3/xtc.mp3"),
    img: "/assets/xtc.jpg",
  },
];

const Home = () => {

  const { getUser } = useGlobalContext();

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Layout>
      <Navbar />

      <div className="tertiary_bg ml-2 px-4 py-4 home ">
        <div className="flex justify-between mb-4 pt-4 items-center">
          <span className="text-xl font-bold hover:underline cursor-pointer">
            Được quan tâm
          </span>
          <span>Hiện tất cả</span>
        </div>
        <div className="grid  gap-6 grid-cols-5">
          {songs.map((song, i) => {
            return <Card key={song.id} idx={i} song={song} />;
          })}
        </div>
        <div className="flex justify-between my-4 items-center">
          <span className="text-xl font-bold hover:underline cursor-pointer">
            Danh sách phát trên Spotify
          </span>
          <span>Hiện tất cả</span>
        </div>
        <div className="grid  gap-6 grid-cols-5">
          {songs.map((song, i) => {
            return <Card key={song.id} idx={i} song={song} />;
          })}
        </div>
      </div>
      <Footer/>
      <SongBar />
    </Layout>
  );
};

export default Home;
