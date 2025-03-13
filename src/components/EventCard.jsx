import { useState, useEffect } from "react";

export default function EventCard({ event, viewMode = "grid" }) {
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  

  const validPosterUrl = event.posterUrl 
  
  // Get category color class names
  const getCategoryColorClasses = (category) => {
    switch(category) {
      case "Religious":
        return { bg: "bg-purple-100", text: "text-purple-800", accent: "bg-purple-500" };
      case "Charity":
        return { bg: "bg-green-100", text: "text-green-800", accent: "bg-green-500" };
      case "Social":
        return { bg: "bg-blue-100", text: "text-blue-800", accent: "bg-blue-500" };
      case "Educational":
        return { bg: "bg-yellow-100", text: "text-yellow-800", accent: "bg-yellow-500" };
      case "Cultural":
        return { bg: "bg-pink-100", text: "text-pink-800", accent: "bg-pink-500" };
      case "Community":
        return { bg: "bg-indigo-100", text: "text-indigo-800", accent: "bg-indigo-500" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800", accent: "bg-gray-500" };
    }
  };
  
  // Log the event data for debugging
  useEffect(() => {
    console.log("Event data:", event);
  }, [event]);
  
  const colorClasses = getCategoryColorClasses(event.category);
  
  // Fallback image component
  const FallbackImage = () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-200">
      <div className="text-center p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="mt-2 text-gray-600 text-sm">No image available</p>
      </div>
    </div>
  );
  
  // Simpler URL check
  const hasValidImage = event.posterUrl && event.posterUrl.trim() !== "";
  
  const renderImage = () => (
    imageError || !validPosterUrl ? (
      <FallbackImage />
    ) : (
      <img 
        src={validPosterUrl}
        alt={event.title} 
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        onError={() => {
          console.log("Image failed to load:", validPosterUrl);
          setImageError(true);
        }}
      />
    )
  );
  
  if (viewMode === "list") {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition hover:shadow-lg animate-fadeIn">
        <div className="flex flex-col md:flex-row">
          {/* Poster Image */}
          <div className="md:w-1/3 h-48 md:h-auto">
            {renderImage()}
          </div>
          
          {/* Content */}
          <div className="p-5 md:w-2/3">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colorClasses.bg} ${colorClasses.text}`}>
                {event.category}
              </span>
            </div>
            
            <div className="flex items-center text-gray-500 text-sm mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(event.date)}</span>
            </div>
            
            <div className="flex items-center text-gray-500 text-sm mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.location}</span>
            </div>
            
            {event.description && (
              <p className={`text-gray-600 ${expanded ? '' : 'line-clamp-2'}`}>
                {event.description}
              </p>
            )}
            
            {event.description && event.description.length > 100 && (
              <button 
                onClick={() => setExpanded(!expanded)}
                className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none"
              >
                {expanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition hover:shadow-lg animate-fadeIn">
      {/* Poster Image */}
      <div className="h-48 overflow-hidden">
        {renderImage()}
      </div>
      
      <div className={`h-2 ${colorClasses.accent}`}></div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colorClasses.bg} ${colorClasses.text}`}>
            {event.category}
          </span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formatDate(event.date)}</span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{event.location}</span>
        </div>
        
        {event.description && (
          <p className={`text-gray-600 ${expanded ? '' : 'line-clamp-3'}`}>
            {event.description}
          </p>
        )}
        
        {event.description && event.description.length > 100 && (
          <button 
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
    </div>
  );
}
  