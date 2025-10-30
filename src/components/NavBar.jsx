'use client';

import Auth from './Auth';

export default function NavBar() {
  return (
    <nav className="w-full flex items-center justify-between bg-white border-b border-gray-200 px-6 md:px-12 lg:px-20 xl:px-[200px] py-4">
      <div className="flex items-center gap-9">
      <button className="text-gray-700 hover:text-gray-900 text-sm font-normal cursor-pointer">Products</button>
        <button className="text-gray-700 hover:text-gray-900 text-sm font-normal cursor-pointer">Pricing</button>
        <button className="text-gray-700 hover:text-gray-900 text-sm font-normal cursor-pointer">Docs</button>
        <button className="text-gray-700 hover:text-gray-900 text-sm font-normal cursor-pointer">Blog</button>
      </div>
      <div className="flex items-center gap-4">
        <Auth />
      </div>
    </nav>
  );
}

