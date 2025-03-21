import React, { useEffect, useState } from "react";
import { LoaderCircle, CheckCircle, XCircle, Trash2, Image ,MapPin } from "lucide-react";

const AdminPage = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/businesses/admin");
      const data = await response.json();
      setBusinesses(data);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    } finally {
      setLoading(false);
    }
  };

  const approveBusiness = async (id) => {
    await fetch(`http://localhost:8000/api/businesses/approve/${id}`, {
      method: "PUT",
    });
    fetchBusinesses();
  };

  const deleteBusiness = async (id) => {
    await fetch(`http://localhost:8000/api/businesses/${id}`, {
      method: "DELETE",
    });
    fetchBusinesses();
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <LoaderCircle className="animate-spin w-12 h-12 text-indigo-600" />
          <p className="text-gray-600 text-lg">Loading business listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-6xl font-bold text-gray-900 mb-2 text-center localconnect-font">
          Business Directory
        </h1>
        <p className="text-center text-gray-600 mt-5 ">
          Manage and approve local business submissions
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <div
            key={business._id}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-indigo-100"
          >
            <div className="relative h-48 overflow-hidden">
              {business.photos.length > 0 ? (
                <img
                  src={business.photos[0]}
                  alt={business.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <Image className="w-14 h-14 text-gray-400" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/90 via-white/40" />
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {business.name}
                </h2>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700">
                  {business.category}
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-indigo-600" />
                  <span className="text-sm">{business.location}</span>
                </div>
                
                <div className="flex items-center">
                  <span className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${
                    business.isApproved ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <span className={`text-sm font-medium ${
                    business.isApproved ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {business.isApproved ? 'Verified' : 'Pending Review'}
                  </span>
                </div>
              </div>

              {business.photos.length > 0 && (
                <div className="flex space-x-2 pb-2 overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
                  {business.photos.map((photo, index) => (
                    <a
                      key={index}
                      href={photo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-indigo-300 transition-all"
                    >
                      <img
                        src={photo}
                        alt={`photo-${index}`}
                        className="w-full h-full object-cover"
                      />
                    </a>
                  ))}
                </div>
              )}

              <div className="flex space-x-3 pt-4 border-t border-gray-100">
                {!business.isApproved && (
                  <button
                    onClick={() => approveBusiness(business._id)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2.5 rounded-lg transition-all"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Approve</span>
                  </button>
                )}
                <button
                  onClick={() => deleteBusiness(business._id)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2.5 rounded-lg transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Remove</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {businesses.length === 0 && (
        <div className="max-w-7xl mx-auto mt-16 text-center">
          <div className="inline-flex flex-col items-center p-8 rounded-2xl bg-white border border-dashed border-gray-300">
            <XCircle className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700">
              No pending submissions
            </h3>
            <p className="text-gray-500 mt-1 text-sm">
              All businesses have been processed
            </p>
          </div>
        </div>
      )}
    </div>
  );
};


export default AdminPage;
