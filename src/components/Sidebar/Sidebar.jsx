import React from "react";
import { BiSolidHome, BiLibrary } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import Signup from "./Signup";
import "./Sidebar.css"
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        
        <div className="w-1/4 fixed left-0 mt-2 top-0 sidebar ">
            <div className="nav secondary_bg rounded-lg p-6">
                <Link to={'/'} className="flex items-center gap-6">
                    <BiSolidHome className="font-bold text-2xl" />
                    <span className="text-lg">Trang chủ</span>
                </Link>
                <Link to={'/search'} className="flex mt-4 items-center gap-6">
                    <FiSearch className="font-bold text-2xl" />
                    <span className="text-lg">Tìm kiếm</span>
                </Link>
            </div>
            <div className="mt-2 secondary_bg rounded-lg px-2 py-2">
                <div className="flex px-4 justify-between mb-4 items-center gap-4">
                    <div className="flex gap-2 items-center">
                        <BiLibrary className="font-bold text-xl" />
                        <span>Thư viện</span>
                    </div>
                    <button className="hover:bg-black/25 rounded-[50%] p-2">
                        <FaPlus className="font-bold text-xl" />
                    </button>
                </div>
                <div className="your_library">
                    <div className="leading-8 mt-2 tertiary_bg rounded-lg py-6 px-4">
                        <p className="font-bold">Tạo danh sách phát đầu tiên của bạn</p>
                        <p className="font-semibold">
                            Rất dễ, chúng tôi sẽ giúp bạn
                        </p>
                        <button className="rounded-full text-black mt-4 px-4 py-0 bg-white font-semibold">
                            Tạo danh sách phát
                        </button>
                    </div>
                    <div className="leading-8 mt-4 tertiary_bg rounded-lg py-6 px-4">
                        <p className="font-bold">
                            Hãy cũng tìm và theo dõi một số podcast
                        </p>
                        <p className="font-semibold">
                            Chúng tôi sẽ cập nhật cho bạn thông tin về các tập mới
                        </p>
                        <button className="rounded-full text-black mt-4 px-4 py-0 bg-white font-semibold">
                            Duyệt xem podcast
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-4 px-4 flex gap-4 flex-wrap">
                <a className="text-xs text-gray-300 mx-4" href="#">
                    Pháp lý
                </a>
                <a className="text-xs text-gray-300 mx-4" href="#">
                    Trung tâm bảo mật
                </a>
                <a className="text-xs text-gray-300 mx-4" href="#">
                    Bảo mật
                </a>
                <a className="text-xs text-gray-300 mx-4" href="#">
                    Cookies
                </a>
                <a className="text-xs text-gray-300 mx-4" href="#">
                    Quảng cáo
                </a>
                <a className="text-xs text-gray-300 mx-4" href="#">
                    Truy cập
                </a>
            </div>
            <button className="mx-4 mt-8 text-sm border-white border rounded-full flex gap-2 px-3 py-1 items-center  text-white ">
                <TbWorld />
                <span className="text-white font-bold">Tiếng việt</span>
            </button>

            {/* <Signup /> */}
        </div>
    );
};

export default Sidebar;
