import React from 'react'
import { Link } from 'react-router'

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="text-center py-10 md:py-20 px-4 md:px-6 bg-white shadow-sm">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to ArticleHub ✍️
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-6">
          Discover, read, and share amazing articles on technology, programming,
          and more. Whether you're a reader or an author, this platform is built for you.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Get Started
          </Link>
         
        </div>
      </div>

      {/* Features Section */}
      <div className="py-10 md:py-16 px-4 md:px-6">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-bold mb-2">📚 Rich Content</h3>
            <p className="text-gray-600">
              Access high-quality articles across multiple categories like
              Java, Python, Web Development, and more.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-bold mb-2">✍️ Write & Share</h3>
            <p className="text-gray-600">
              Authors can easily create and publish articles to share knowledge
              with the community.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-bold mb-2">⚡ Fast & Simple</h3>
            <p className="text-gray-600">
              Clean UI and fast performance for a smooth reading and writing experience.
            </p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 bg-gray-100 text-gray-600">
        © {new Date().getFullYear()} ArticleHub. All rights reserved.
      </div>

    </div>
  )
}

export default Home