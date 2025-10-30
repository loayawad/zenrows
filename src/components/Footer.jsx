export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-white py-10 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          {/* Left side - Branding */}
          <div className="space-y-3 max-w-sm">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <span className="font-normal text-sm text-white">navlogo</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Web scraping API handles all anti-bot bypass<br />
              for you with rotating proxies, headless browsers<br />
              and more.
            </p>
            <div className="flex items-center space-x-2 pt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-xs">All services are online</span>
            </div>
          </div>

          {/* Right side - Reviews */}
          <div className="flex items-start space-x-12">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-yellow-500 text-base">🏆</span>
                <span className="font-medium text-sm text-white">Capterra</span>
              </div>
              <div className="flex space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-base">⭐</span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">G2</span>
                </div>
                <span className="font-medium text-sm text-white">G2</span>
              </div>
              <div className="flex space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-red-500 text-base">⭐</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-xs">© 2024 Navlogo. All rights reserved.</p>
          <div className="flex space-x-4">
            <button className="text-gray-500 hover:text-white text-sm">𝕏</button>
            <button className="text-gray-500 hover:text-white text-sm">in</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

