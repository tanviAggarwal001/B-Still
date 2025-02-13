import React from 'react'

function Contact() {
  return (
    <div className="w-4/5 mx-auto py-10">
      <h1 className="text-4xl text-center text-gray-800 mb-6">Contact Us</h1>
      <p className="text-gray-600 text-lg text-center mb-8">
        Have any questions or need help with your resume? Feel free to reach out!
      </p>
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h2 className="text-2xl text-gray-700 mb-4">Our Contact Information</h2>
        <p>Email: bstill@gmail.com</p>
        <p>Phone: +91 7976251869</p>
        <p>Address: MNIT Jaipur , JLN marg , Jaipur</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl text-gray-700 mb-4">Send Us a Message</h2>
        <form>
          <input type="text" placeholder="Your Name" className="w-full p-1 mb-4 border rounded" />
          <input type="email" placeholder="Your Email" className="w-full p-1 mb-4 border rounded" />
          <textarea placeholder="Your Message" className="w-full p-1 mb-4 border rounded"></textarea>
          <button className="w-full p-3 bg-teal-500 text-white rounded">Send Message</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
