import React from 'react'

function Create() {
  return (
    <div className="w-4/5 mx-auto py-10">
      <h1 className="text-4xl text-center text-gray-800 mb-6">Create Your Resume</h1>
      <div className="flex justify-center gap-6">
        {["Modern", "Classic", "Creative"].map((template) => (
          <div key={template} className="bg-white p-4 shadow rounded-lg cursor-pointer">
            <p className="text-center">{template}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg mr-4">Design Manually</button>
        <button className="px-6 py-3 bg-red-500 text-white rounded-lg">Generate with AI</button>
      </div>
    </div>
  )
}

export default Create
