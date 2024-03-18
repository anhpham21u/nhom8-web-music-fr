import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="ml-2  tertiary_bg px-8 py-16 mb-20">
      <div className="grid grid-cols-12 ">
        <div className="col-span-3 text-sm">
          <ul>
            <li className="font-bold mb-4">Doanh nghiệp</li>
            <li className="text-gray-400 my-2 hover:text-white hover:underline cursor-pointer">Thông tin</li>
           
          </ul>
        </div>
        <div className="col-span-3">
          <ul>
            <li className="font-bold">Cộng đồng</li>
            <li className="text-gray-400 my-2">Quảng cáo</li>
            <li className="text-gray-400 my-2">Phát triển</li>
            
          </ul>
        </div>
        <div className="col-span-3">
          <ul>
            <li className="font-bold">Liên kết</li>
            <li className="text-gray-400 my-2">Hỗ trợ khách hàng</li>
            <li className="text-gray-400 my-2">Ứng dụng</li>
          </ul>
        </div>
        <div className="col-span-3">
          <div className="flex justify-end gap-2">
            <FaFacebook className="text-4xl p-2 rounded-full bg-[#292929] shadow-2xl hover:bg-white/10" />
            <FaInstagram className="text-4xl p-2 rounded-full bg-[#292929] shadow-2xl hover:bg-white/10" />
            <FaTwitter className="text-4xl p-2 rounded-full bg-[#292929] shadow-2xl hover:bg-white/10" />
          </div>
        </div>
      </div>
      <div className="border-b border-white/10 my-8 w-full"></div>
      <div className="flex justify-between">
        <ul className="text-sm flex gap-4">
          <li className="text-gray-400">Pháp lý</li>
          <li className="text-gray-400">Trung tâm bảo mật</li>
          <li className="text-gray-400">Bảo mật</li>
          <li className="text-gray-400">Cookies</li>
          <li className="text-gray-400">Quảng cáo</li>
          <li className="text-gray-400">Truy cập</li>
        </ul>
        <h4 className="text-gray-400 text-sm">© 2024 Spotify</h4>
      </div>
    </div>
  );
};

export default Footer;
