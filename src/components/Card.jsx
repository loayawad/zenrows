export default function Card({ id, name, image, description, selected, onClick }) {
  return (
    <div
      className={`flex items-start space-x-3 p-3.5 rounded-lg cursor-pointer transition-all border ${
        selected 
          ? 'border-[#3434F4] bg-[#EBEBFE]' 
          : 'border-gray-200 bg-white hover:bg-[#F3F4F7] hover:border-[#E7E9EF]'
      }`}
      onClick={() => onClick && onClick(id)}
      data-testid={id}
    >
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-white">
          <img src={image} alt={name} className="w-5 h-5 object-contain" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-900 text-sm mb-0.5">{name}</div>
        <div className="text-gray-500 text-xs leading-relaxed line-clamp-2">{description}</div>
      </div>
    </div>
  );
}

