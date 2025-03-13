export default function Filter({ filters, setFilters }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 animate-fadeIn">
      <h2 className="text-lg font-semibold mb-4">Filter Events</h2>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
          >
            <option value="All">All Categories</option>
            <option value="Religious">Religious</option>
            <option value="Social">Social</option>
            <option value="Charity">Charity</option>
            <option value="Educational">Educational</option>
            <option value="Cultural">Cultural</option>
            <option value="Community">Community</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={filters.dateRange}
            onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input 
            type="text" 
            placeholder="Search events..." 
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={filters.searchTerm}
            onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
          />
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button 
          onClick={() => setFilters({ category: "All", searchTerm: "", dateRange: "all" })}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
  