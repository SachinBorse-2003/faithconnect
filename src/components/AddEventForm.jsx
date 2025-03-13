import { useState } from "react";
import { addEvent, getEvents } from "../firebase/firebaseDB";

export default function AddEventForm({ setEvents }) {
  const [event, setEvent] = useState({ 
    title: "", 
    date: "", 
    category: "Religious", 
    location: "", 
    description: "",
    posterUrl: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    
    try {
      // Add to Firebase with poster URL
      await addEvent(event);
      
      // Refresh events list
      const updatedEvents = await getEvents();
      setEvents(updatedEvents);
      
      // Reset form
      setEvent({ title: "", date: "", category: "Religious", location: "", description: "", posterUrl: "" });
      setSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error adding event:", error);
      setError("Failed to add event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Event</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
            <input 
              type="text" 
              placeholder="Event Title" 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
              value={event.title}
              onChange={(e) => setEvent({ ...event, title: e.target.value })} 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input 
              type="date" 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
              value={event.date}
              onChange={(e) => setEvent({ ...event, date: e.target.value })} 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={event.category}
              onChange={(e) => setEvent({ ...event, category: e.target.value })}
            >
              <option value="Religious">Religious</option>
              <option value="Social">Social</option>
              <option value="Charity">Charity</option>
              <option value="Educational">Educational</option>
              <option value="Cultural">Cultural</option>
              <option value="Community">Community</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input 
              type="text" 
              placeholder="Location" 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
              value={event.location}
              onChange={(e) => setEvent({ ...event, location: e.target.value })} 
              required 
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              placeholder="Event Description" 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition h-32" 
              value={event.description}
              onChange={(e) => setEvent({ ...event, description: e.target.value })} 
              required 
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Poster URL</label>
            <input 
              type="url" 
              placeholder="https://example.com/image.jpg" 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
              value={event.posterUrl}
              onChange={(e) => setEvent({ ...event, posterUrl: e.target.value })} 
            />
            <p className="mt-1 text-sm text-gray-500">Enter a URL for the event poster image (optional)</p>
          </div>
        </div>
        
        {error && (
          <div className="mt-6 p-3 bg-red-100 text-red-700 rounded-md border border-red-200">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}
        
        {success && (
          <div className="mt-6 p-3 bg-green-100 text-green-700 rounded-md border border-green-200">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Event added successfully!
            </div>
          </div>
        )}
        
        <div className="mt-6 flex justify-end">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding Event...
              </span>
            ) : "Add Event"}
          </button>
        </div>
      </form>
    </div>
  );
} 