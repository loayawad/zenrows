export default function Combinations({ combinations = [], loading = false, onDelete }) {
  return (
    <div className="mt-8 space-y-2.5">
      {loading ? (
        <div className="text-gray-400 text-sm">Loading...</div>
      ) : combinations.length === 0 ? (
        <div className="text-gray-400 text-sm">No saved combinations yet.</div>
      ) : (
        combinations.map((comb) => (
          <div
            key={comb.id}
            className="flex items-center justify-between p-3.5 bg-white border border-gray-200 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-white flex-shrink-0">
                <img src={comb.origin.image} alt={comb.origin.name} className="w-5 h-5 object-contain" />
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-white flex-shrink-0">
                <img src={comb.destination.image} alt={comb.destination.name} className="w-5 h-5 object-contain" />
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  {comb.origin.name} → {comb.destination.name}
                </div>
                <div className="text-gray-500 text-xs mt-0.5 line-clamp-1">
                  {comb.origin.description}
                </div>
              </div>
            </div>
            <button
              className="text-gray-400 hover:text-gray-600 text-lg ml-4 flex-shrink-0 cursor-pointer"
              onClick={() => onDelete && onDelete(comb.id)}
              aria-label="Delete combination"
            >
              ✕
            </button>
          </div>
        ))
      )}
    </div>
  );
}

