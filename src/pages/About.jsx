import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">About FaithConnect</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-10">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              FaithConnect was founded with a simple yet powerful mission: to bring together faith communities through meaningful events and connections. We believe that by fostering these connections, we can build stronger, more supportive communities that celebrate diversity while honoring shared values.
            </p>
            
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">What We Do</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our platform serves as a central hub for religious, charitable, educational, and cultural events. We make it easy for community members to discover events that align with their interests and beliefs, while also providing organizers with tools to reach a wider audience.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 my-10">
              <div className="text-center p-4">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Connect</h3>
                <p className="text-gray-600">Bringing together people of all faiths and backgrounds</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Organize</h3>
                <p className="text-gray-600">Helping communities organize and promote meaningful events</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Grow</h3>
                <p className="text-gray-600">Supporting the growth and enrichment of faith communities</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Values</h2>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2 leading-relaxed">
              <li><span className="font-medium">Inclusivity:</span> We welcome people of all faiths, backgrounds, and beliefs.</li>
              <li><span className="font-medium">Respect:</span> We foster an environment of mutual respect and understanding.</li>
              <li><span className="font-medium">Community:</span> We believe in the power of community to support, heal, and inspire.</li>
              <li><span className="font-medium">Service:</span> We are dedicated to serving our users and their communities.</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">Contact Us</h2>
            <p className="text-gray-700 mb-6">
              Have questions or suggestions? We'd love to hear from you! Reach out to our team at:
            </p>
            
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:contact@faithconnect.org" className="text-blue-600 hover:underline">contact@faithconnect.org</a>
            </div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-gray-700">(123) 456-7890</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 