import "./Playlist.scss";
import "./../../UI/Modal.scss";

import {
  IoCloseCircle,
  IoHeart,
  IoHeartOutline,
  IoPlayCircle,
} from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import {
  getPlaylist,
  likePlaylist,
  dislikePlaylist,
  updatePlaylist,
} from "../../../store/thunks/playlist";
import { useDispatch, useSelector } from "react-redux";
import List from "../../UI/List";
import { useNavigate, useParams } from "react-router-dom";
import { replaceQueue } from "../../../store/reducers/queue";
import { deletePlaylist, getAllPlaylists } from "../../../store/thunks/user";
import Loading from "../../UI/Loading";
import Button from "../../UI/Button";
import { RiEditCircleLine } from "react-icons/ri";
import axios from "../../../api/axios.js";

// Danh sách ca khúc mà người dùng đưa vào danh sách của mình, có thêm chức năng xóa playlist 
const Playlist = () => {
  const [modal, setModal] = useState(false);

  const userId = useSelector((state) => state.user.data.id);
  console.log(userId);
  const { playlist } = useSelector((state) => state.playlist);
  const likedPlaylists = useSelector((state) => state.user.data.likedPlaylists);
  const dispatch = useDispatch();

  const formRef = useRef();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPlaylist(id));
  }, [id]);

  const sharePlaylistHandler = async () => {
    await axios.post(`playlists/share/${playlist.id}`);
    window.location.reload();
  };

  const deleteSharePlaylistHandler = async () => {
    await axios.delete(`playlists/share/${playlist.id}`);
    window.location.reload();
  };

  const replaceQueueHandler = (songs) => {
    if (songs.length > 0) dispatch(replaceQueue({ songs }));
  };

  const openModalHandler = () => {
    if (playlist.user.id === userId) setModal(true);
  };

  const closeModalHandler = () => {
    setModal(false);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    await dispatch(updatePlaylist({ data: formData, id: playlist.id }));
    await dispatch(getAllPlaylists());
    setModal(false);
  };

  const deletePlaylistHandler = (id) => {
    dispatch(deletePlaylist(id));
    navigate("/");
  };

  // Chức năng theo dõi hoặc bỏ theo dõi danh sách trên dữ liệu
  const likePlaylistHandler = (id) => dispatch(likePlaylist(id));

  const dislikePlaylistHandler = (id) => dispatch(dislikePlaylist(id));

  const userLikedPlaylist = (id) => {
    let pl = likedPlaylists.find((obj) => obj.id === id);

    return !!pl;
  };

  return (
    <>
      {/* Hiển thị thông tin danh sách */}
      {userId && playlist ? (
        <div className="playlist">
          <div className="playlist__header">
            <div className="playlist__img">
              <img src={playlist.img} alt="Danh sách" />
            </div>
            <div>
              <p>Danh sách</p>
              <h1 className="playlist__name">{playlist.name}</h1>
              {playlist.description && (
                <p className="playlist__des">{playlist.description}</p>
              )}
              <div className="playlist__user">
                <img
                  className="playlist__user-img"
                  src={playlist.user.img}
                  alt="user"
                />
                <span className="playlist__user-name">
                  {playlist.user.name}
                </span>
                <span className="playlist__user-songs">
                  {playlist.songs.length} ca khúc
                </span>
              </div>
            </div>
          </div>

          {/* Khởi chạy danh sách */}
          <div className="playlist__nav">
            <IoPlayCircle onClick={() => replaceQueueHandler(playlist.songs)} />
            {/* Chức năng liên quan đến danh sách ca khúc */}
            {playlist.user.id !== userId &&
              (userLikedPlaylist(playlist.id) ? (
                <IoHeart
                  className="heart heart--active"
                  onClick={() => dislikePlaylistHandler(playlist.id)}
                />
              ) : (
                <IoHeartOutline
                  className="heart"
                  onClick={() => likePlaylistHandler(playlist.id)}
                />
              ))}
            {/* Chức năng chỉnh sửa thông tin danh sách ca khúc, người dùng có thể chỉnh sửa thông tin, một modal hiển thị */}
            {playlist.user.id === userId && (
              <RiEditCircleLine
                onClick={openModalHandler}
                style={{
                  fontSize: "3.2rem",
                  color: "#fff",
                }}
              />
            )}

            {
              userId === playlist.user._id &&
              (playlist.isShared
                ? <div className="flex-1 flex justify-end">
                  <svg onClick={deleteSharePlaylistHandler} width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M7.33856 16.754C7.35772 17.9823 8.32114 18.9749 9.51866 19H13.8828C15.0479 18.977 15.9978 18.0346 16.059 16.841C16.0668 16.725 16.0726 16.609 16.0892 16.495L17.54 6.145C17.5829 5.86079 17.5036 5.57145 17.3226 5.35182C17.1416 5.13219 16.8766 5.00385 16.5962 5H6.80524C6.52485 5.00385 6.25986 5.13219 6.07883 5.35182C5.89779 5.57145 5.81849 5.86079 5.86144 6.145L7.32394 16.58C7.33187 16.6377 7.33675 16.6958 7.33856 16.754Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10.2517 13.1222C10.4699 12.7702 10.3614 12.3078 10.0094 12.0896C9.65731 11.8714 9.19499 11.9798 8.97675 12.3319L10.2517 13.1222ZM9.58168 13.3839L10.2555 13.0545L10.2555 13.0545L9.58168 13.3839ZM10.1144 13.7501L10.0569 14.4978C10.076 14.4993 10.0952 14.5001 10.1144 14.5001V13.7501ZM10.908 14.5001C11.3222 14.5001 11.658 14.1643 11.658 13.7501C11.658 13.3358 11.3222 13.0001 10.908 13.0001V14.5001ZM14.4247 12.3319C14.2064 11.9798 13.7441 11.8714 13.3921 12.0896C13.04 12.3078 12.9315 12.7702 13.1498 13.1222L14.4247 12.3319ZM13.8197 13.3839L13.146 13.0545L13.146 13.0545L13.8197 13.3839ZM13.287 13.7501V14.5001C13.3062 14.5001 13.3254 14.4993 13.3445 14.4978L13.287 13.7501ZM12.4944 13.0001C12.0801 13.0001 11.7444 13.3358 11.7444 13.7501C11.7444 14.1643 12.0801 14.5001 12.4944 14.5001V13.0001ZM9.99106 10.409C9.75687 10.7507 9.844 11.2175 10.1857 11.4517C10.5273 11.6859 10.9941 11.5987 11.2283 11.2571L9.99106 10.409ZM11.2005 9.97106L11.8192 10.3951C11.8352 10.3717 11.8498 10.3475 11.8631 10.3225L11.2005 9.97106ZM12.2009 9.97106L11.5383 10.3225C11.5516 10.3475 11.5663 10.3717 11.5823 10.3951L12.2009 9.97106ZM12.1731 11.2571C12.4073 11.5987 12.8741 11.6859 13.2158 11.4517C13.5574 11.2175 13.6445 10.7507 13.4104 10.409L12.1731 11.2571ZM8.97675 12.3319C8.71784 12.7496 8.69244 13.2727 8.9079 13.7133L10.2555 13.0545C10.266 13.076 10.2653 13.1003 10.2517 13.1222L8.97675 12.3319ZM8.9079 13.7133C9.12421 14.1558 9.55726 14.4594 10.0569 14.4978L10.1719 13.0023C10.2156 13.0056 10.2441 13.0313 10.2555 13.0545L8.9079 13.7133ZM10.1144 14.5001H10.908V13.0001H10.1144V14.5001ZM13.1498 13.1222C13.1362 13.1003 13.1355 13.076 13.146 13.0545L14.4935 13.7133C14.709 13.2727 14.6836 12.7496 14.4247 12.3319L13.1498 13.1222ZM13.146 13.0545C13.1573 13.0313 13.1859 13.0056 13.2295 13.0023L13.3445 14.4978C13.8442 14.4594 14.2772 14.1558 14.4935 13.7133L13.146 13.0545ZM13.287 13.0001H12.4944V14.5001H13.287V13.0001ZM11.2283 11.2571L11.8192 10.3951L10.5819 9.54702L9.99106 10.409L11.2283 11.2571ZM11.8631 10.3225C11.836 10.3737 11.7766 10.4161 11.7007 10.4161V8.91614C11.2077 8.91614 10.7645 9.19257 10.538 9.61962L11.8631 10.3225ZM11.7007 10.4161C11.6248 10.4161 11.5655 10.3737 11.5383 10.3225L12.8634 9.61962C12.6369 9.19257 12.1938 8.91614 11.7007 8.91614V10.4161ZM11.5823 10.3951L12.1731 11.2571L13.4104 10.409L12.8195 9.54702L11.5823 10.3951Z" fill="#ffffff"></path> </g></svg>
                </div>
                : <div className="flex-1 flex justify-end">
                  <svg onClick={sharePlaylistHandler} width="64px" height="64px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.734 15.8974L19.22 12.1374C19.3971 11.9927 19.4998 11.7761 19.4998 11.5474C19.4998 11.3187 19.3971 11.1022 19.22 10.9574L14.734 7.19743C14.4947 6.9929 14.1598 6.94275 13.8711 7.06826C13.5824 7.19377 13.3906 7.47295 13.377 7.78743V9.27043C7.079 8.17943 5.5 13.8154 5.5 16.9974C6.961 14.5734 10.747 10.1794 13.377 13.8154V15.3024C13.3888 15.6178 13.5799 15.8987 13.8689 16.0254C14.158 16.1521 14.494 16.1024 14.734 15.8974Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </div>)
            }
          </div>

          <div className="playlist__songs">
            <List list={playlist.songs} onPlaylist={true} pId={playlist.id} />
          </div>
        </div>
      ) : (
        <Loading fullHeight={true} />
      )}

      {modal && (
        <div className="modal modal--playlist">
          <div className="modal__header">
            <h2>Chỉnh sửa thông tin</h2>
            <div className="modal__close">
              <IoCloseCircle onClick={closeModalHandler} />
            </div>
          </div>
          <form
            className="modal__form"
            ref={formRef}
            onSubmit={formSubmitHandler}
          >
            <div className="modal__img">
              <img src={playlist.img} alt="Danh sách" />
              <input type="file" name="img" />
            </div>
            <div>
              <input type="text" name="name" placeholder={playlist.name} />
              <textarea
                name="description"
                cols="30"
                placeholder="Thay đổi thông tin"
              ></textarea>
              <Button type="submit" color="white" fullWidth={true}>
                Lưu
              </Button>
              <Button
                color="red"
                fullWidth={true}
                onClick={(e) => {
                  e.preventDefault();
                  console.log("123");
                  deletePlaylistHandler(playlist.id);
                }}
              >
                Xóa
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Playlist;