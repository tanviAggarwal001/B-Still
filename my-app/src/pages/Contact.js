import React from 'react'

function Create() {
  return (
    <div className="w-4/5 mx-auto py-10">
      <h1 className="text-4xl text-center text-gray-800 mb-6">Contact Us</h1>
      <p className="text-gray-600 text-lg text-center mb-8">
        Have any questions or need help with your resume? Feel free to reach out!
      </p>
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h2 className="text-2xl text-gray-700 mb-4">Our Contact Information</h2>
        <p>Email: support@atsresumes.com</p>
        <p>Phone: +1 (800) 123-4567</p>
        <p>Address: 123 Resume Street, Suite 101, New York, NY 10001</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl text-gray-700 mb-4">Send Us a Message</h2>
        <form>
          <input type="text" placeholder="Your Name" className="w-full p-3 mb-4 border rounded" />
          <input type="email" placeholder="Your Email" className="w-full p-3 mb-4 border rounded" />
          <textarea placeholder="Your Message" className="w-full p-3 mb-4 border rounded"></textarea>
          <button className="w-full p-3 bg-teal-500 text-white rounded">Send Message</button>
        </form>
      </div>
    </div>
  )
}

export default Create
