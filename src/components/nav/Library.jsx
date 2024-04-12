import React from "react";

import "./Library.scss";
import { RiAddFill, RiBook3Line } from "react-icons/ri";
import LibraryLink from "./LibraryLink.jsx";
import likedSongsImg from "../../img/likedSongs.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist } from "../../store/thunks/user.js";
import { useEffect, useState } from "react";
import axios from "../../api/axios.js";
// Thư viện danh sách ca khúc
const Library = () => {
  const { id, likedPlaylists, followedArtists, playlists } = useSelector(
    (state) => state.user.data,
  );
  const dispatch = useDispatch();

  const [sharePlaylistData, setSharePlaylistData] = useState(null);

  const isArtist = (el) => el.role === "artist";

  const handleCreatePlaylist = () => {
    dispatch(createPlaylist());
  };

  useEffect(() => {
    const fetcher = async () => {
      const res = await axios.get(`/playlists/share`);
      setSharePlaylistData(res.data.data.playlists);
    };

    fetcher();
  }, []);

  const saved = (list) => {
    const uniqueIds = new Set();
    const uniqueItems = [];

    list.forEach((item) => {
      if (!uniqueIds.has(item.id)) {
        uniqueIds.add(item.id);
        uniqueItems.push(item);
      }
    });

    return uniqueItems
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map((item) => (
        <LibraryLink
          key={item.id}
          isArtist={isArtist(item)}
          to={(isArtist(item) ? "/artist/" : "/playlist/") + item.id}
          img={item.img}
        >
          {item.name}
        </LibraryLink>
      ))
  };

  return (
    <div className="library">
      <div className="library__header">
        <RiBook3Line />
        <span>Thư viện</span>
        <RiAddFill
          style={{ marginLeft: "auto", fontSize: 28, cursor: "pointer" }}
          onClick={handleCreatePlaylist}
        />
      </div>

      {id && (
        <div className="saved">
          <LibraryLink
            isArtist={false}
            to="/likedSongs"
            img={likedSongsImg}
            pinned={true}
          >
            Ca khúc yêu thích
          </LibraryLink>

          {saved([...likedPlaylists, ...followedArtists, ...playlists, ...(Array.isArray(sharePlaylistData) ? sharePlaylistData : [])])}
        </div>
      )}
    </div>
  );
};

export default Library;