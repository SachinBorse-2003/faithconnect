import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { getEvents } from "../firebase/firebaseDB";

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("Fetching events for home page...");
        const allEvents = await getEvents();
        console.log("All events fetched:", allEvents);
        
        if (!allEvents || allEvents.length === 0) {
          console.log("No events returned from database");
          setFeaturedEvents([]);
          return;
        }
        
        // Filter for valid events first
        const validEvents = allEvents.filter(event => 
          event && event.id && event.title && event.date
        );
        
        console.log("Valid events:", validEvents);
        
        // Get upcoming events, sorted by date
        const upcoming = validEvents
          .filter(event => {
            const eventDate = new Date(event.date);
            const today = new Date();
            return eventDate >= today;
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3); // Take only 3 events
        
        console.log("Upcoming events for display:", upcoming);
        setFeaturedEvents(upcoming);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8 text-center animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-700 mb-6 animate-slideUp">
          Connecting People Across <span className="text-yellow-500">Faiths & Interests</span>
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8 animate-slideUp animation-delay-200">
          Discover events, connect with like-minded individuals, and build meaningful communities.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slideUp animation-delay-400">
          <Link to="/events" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
            Explore Events
          </Link>
          <a href="#featured" className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 px-8 py-3 rounded-md font-medium transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1">
            See What's Happening
          </a>
        </div>
      </div>
      
      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slideRight">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About FaithConnect</h2>
              <p className="text-gray-600 mb-4">
                FaithConnect is a platform dedicated to bringing together people from diverse faith backgrounds and interests. 
                We believe in the power of community and shared experiences to foster understanding and connection.
              </p>
              <p className="text-gray-600 mb-6">
                Whether you're looking to attend religious ceremonies, participate in charitable activities, or simply 
                connect with others in social settings, FaithConnect provides a space for everyone.
              </p>
              <Link to="/about" className="text-blue-600 hover:text-blue-800 font-medium flex items-center group">
                Learn more about our mission
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl animate-slideLeft">
              <img 
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="People connecting" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Events Section */}
      <section id="featured" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Upcoming Events</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Join our community at these upcoming events. Connect with others, learn something new, and be part of something meaningful.
          </p>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">
              <p>{error}</p>
            </div>
          ) : featuredEvents.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredEvents.map((event, index) => (
                <div 
                  key={event.id || index} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fadeIn"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`h-3 ${
                    event.category === 'Religious' ? 'bg-purple-500' : 
                    event.category === 'Charity' ? 'bg-green-500' : 
                    event.category === 'Social' ? 'bg-blue-500' :
                    event.category === 'Educational' ? 'bg-yellow-500' :
                    event.category === 'Cultural' ? 'bg-pink-500' :
                    event.category === 'Community' ? 'bg-indigo-500' :
                    'bg-gray-500'
                  }`}></div>
                  <div className="p-6">
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">
                      {event.description ? 
                        (event.description.length > 100 ? 
                          `${event.description.substring(0, 100)}...` : 
                          event.description) : 
                        "No description available"}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{event.location || "Location TBA"}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.category === 'Religious' ? 'bg-purple-100 text-purple-800' : 
                        event.category === 'Charity' ? 'bg-green-100 text-green-800' : 
                        event.category === 'Social' ? 'bg-blue-100 text-blue-800' :
                        event.category === 'Educational' ? 'bg-yellow-100 text-yellow-800' :
                        event.category === 'Cultural' ? 'bg-pink-100 text-pink-800' :
                        event.category === 'Community' ? 'bg-indigo-100 text-indigo-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.category || "General"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No upcoming events found.</p>
          )}
          
          <div className="text-center mt-10">
            <Link 
              to="/events" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Community Says</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Community Member",
                quote: "FaithConnect has helped me find events that align with my spiritual journey. I've met amazing people from different backgrounds.",
                avatar: "https://randomuser.me/api/portraits/women/32.jpg"
              },
              {
                name: "Rahul Patel",
                role: "Event Organizer",
                quote: "As someone who organizes interfaith dialogues, this platform has been invaluable in reaching a diverse audience.",
                avatar: "https://randomuser.me/api/portraits/men/44.jpg"
              },
              {
                name: "Ananya Gupta",
                role: "Volunteer",
                quote: "I found my passion for community service through charity events on FaithConnect. It's more than just a platform, it's a community.",
                avatar: "https://randomuser.me/api/portraits/women/68.jpg"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-6 rounded-lg shadow-md animate-fadeIn"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 animate-pulse">Ready to Connect?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our growing community today and discover events that match your interests and beliefs.
          </p>
          <Link 
            to="/events" 
            className="inline-block bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Explore Events Now
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FaithConnect</h3>
              <p className="text-gray-400">Bringing communities together through shared experiences.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/events" className="text-gray-400 hover:text-white transition-colors">Events</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/admin" className="text-gray-400 hover:text-white transition-colors">Admin</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} FaithConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
