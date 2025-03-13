import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import Filter from "../components/Filter";
import Navbar from "../components/Navbar";
import { getEvents } from "../firebase/firebaseDB";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "All",
    searchTerm: "",
    dateRange: "all"
  });
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        // Filter out any invalid events (those without an id or title)
        const validEvents = eventsData.filter(event => event && event.id && event.title);
        setEvents(validEvents);
        setFilteredEvents(validEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Apply filters
    let result = [...events];
    
    // Filter by category
    if (filters.category !== "All") {
      result = result.filter(event => event.category === filters.category);
    }
    
    // Filter by search term
    if (filters.searchTerm.trim() !== "") {
      result = result.filter(event => {
        // Safely check if properties exist before using toLowerCase()
        const title = event.title ? event.title.toLowerCase() : "";
        const description = event.description ? event.description.toLowerCase() : "";
        const location = event.location ? event.location.toLowerCase() : "";
        const searchTerm = filters.searchTerm.toLowerCase();
        
        return (
          title.includes(searchTerm) || 
          description.includes(searchTerm) || 
          location.includes(searchTerm)
        );
      });
    }
    
    // Filter by date range
    if (filters.dateRange !== "all") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const weekFromNow = new Date(today);
      weekFromNow.setDate(today.getDate() + 7);
      
      const monthFromNow = new Date(today);
      monthFromNow.setMonth(today.getMonth() + 1);
      
      result = result.filter(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        
        if (filters.dateRange === "today") {
          return eventDate.getTime() === today.getTime();
        } else if (filters.dateRange === "week") {
          return eventDate >= today && eventDate <= weekFromNow;
        } else if (filters.dateRange === "month") {
          return eventDate >= today && eventDate <= monthFromNow;
        }
        return true;
      });
    }
    
    setFilteredEvents(result);
  }, [filters, events]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Community Events</h1>
        
        <Filter filters={filters} setFilters={setFilters} />
        
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
          </p>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md ${viewMode === "grid" ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              aria-label="Grid view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md ${viewMode === "list" ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              aria-label="List view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className={viewMode === "grid" ? 
            "grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fadeIn" : 
            "space-y-6 animate-fadeIn"
          }>
            {filteredEvents.map((event, index) => (
              <div 
                key={event.id || index} 
                className="animate-fadeIn" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <EventCard event={event} viewMode={viewMode} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow animate-fadeIn">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No events found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your filters to find events.</p>
          </div>
        )}
      </div>
    </div>
  );
}