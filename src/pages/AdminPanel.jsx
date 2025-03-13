import { useState, useEffect } from "react";
import { login, logout } from "../firebase/firebaseAuth";
import { addEvent, getEvents, deleteEvent } from "../firebase/firebaseDB";
import Navbar from "../components/Navbar";
import AddEventForm from "../components/AddEventForm";

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("events"); // "events" or "add"

  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem("adminUser");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    };
    
    checkUser();
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsData = await getEvents();
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events. Please try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const response = await login(email, password);
      if (response.error) {
        setError(response.error);
      } else {
        setUser(response.user);
        localStorage.setItem("adminUser", JSON.stringify(response.user));
        setSuccess("Login successful!");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      setUser(null);
      localStorage.removeItem("adminUser");
      setSuccess("Logged out successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Logout error:", error);
      setError("Logout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setIsLoading(true);
      try {
        await deleteEvent(eventId);
        await fetchEvents();
        setSuccess("Event deleted successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } catch (error) {
        console.error("Error deleting event:", error);
        setError("Failed to delete event. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!user ? (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-fadeIn">
            <div className="bg-blue-600 p-6">
              <h2 className="text-2xl font-bold text-white">Admin Login</h2>
              <p className="text-blue-100 mt-1">Sign in to manage events</p>
            </div>
            
            <form onSubmit={handleLogin} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  placeholder="admin@example.com" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-200">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md border border-green-200">
                  {success}
                </div>
              )}
              
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        ) : (
          <div className="animate-fadeIn">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Logout
              </button>
            </div>
            
            {success && (
              <div className="mb-6 p-3 bg-green-100 text-green-700 rounded-md border border-green-200 animate-fadeIn">
                {success}
              </div>
            )}
            
            {error && (
              <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md border border-red-200 animate-fadeIn">
                {error}
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="flex border-b">
                <button 
                  className={`px-6 py-3 font-medium text-sm focus:outline-none transition ${activeTab === 'events' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('events')}
                >
                  Manage Events
                </button>
                <button 
                  className={`px-6 py-3 font-medium text-sm focus:outline-none transition ${activeTab === 'add' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('add')}
                >
                  Add New Event
                </button>
              </div>
              
              <div className="p-6">
                {activeTab === 'events' ? (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">All Events</h2>
                    
                    {events.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No events found. Add your first event!</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Event
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Location
                              </th>
                              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {events.map((event) => (
                              <tr key={event.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0">
                                      <img 
                                        className="h-10 w-10 rounded-full object-cover" 
                                        src={event.posterUrl || "https://via.placeholder.com/150?text=Event"} 
                                        alt="" 
                                        onError={(e) => {e.target.src = "https://via.placeholder.com/150?text=Event"}}
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">{event.title}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{formatDate(event.date)}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    event.category === 'Religious' ? 'bg-purple-100 text-purple-800' : 
                                    event.category === 'Charity' ? 'bg-green-100 text-green-800' : 
                                    event.category === 'Social' ? 'bg-blue-100 text-blue-800' :
                                    event.category === 'Educational' ? 'bg-yellow-100 text-yellow-800' :
                                    event.category === 'Cultural' ? 'bg-pink-100 text-pink-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {event.category}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {event.location}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button 
                                    onClick={() => handleDeleteEvent(event.id)}
                                    className="text-red-600 hover:text-red-900 transition focus:outline-none"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ) : (
                  <AddEventForm setEvents={setEvents} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
