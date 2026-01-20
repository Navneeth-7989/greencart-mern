import React, { useState } from 'react'
import { assets, categories } from '../../assets/assets'

const AddProduct = () => {

  const [files, setFiles] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [offerPrice, setOfferPrice] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const productData = {
      name,
      description,
      category,
      price,
      offerPrice,
      images: files
    }
  }

  const handleImageChange = (e, index) => {
    const updatedFiles = [...files]
    updatedFiles[index] = e.target.files[0]
    setFiles(updatedFiles)
  }

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <form
        onSubmit={onSubmitHandler}
        className="md:p-10 p-4 space-y-5 max-w-lg"
      >

        {/* Product Images */}
        <div>
          <p className="text-base font-medium">Product Images</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4).fill('').map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  id={`image${index}`}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleImageChange(e, index)}
                />
                <img
                  src={
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : assets.upload_area
                  }
                  alt="upload"
                  className="max-w-24 cursor-pointer border rounded"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Product Name</label>
          <input
            type="text"
            placeholder="Type here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Product Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            rows={4}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            required
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => (
              <option key={index} value={item.path}>
                {item.text}
              </option>
            ))}
          </select>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-base font-medium">Product Price</label>
            <input
              type="number"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <label className="text-base font-medium">Offer Price</label>
            <input
              type="number"
              placeholder="0"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-8 py-2.5 bg-primary hover:bg-primary-dull transition text-white font-medium rounded"
        >
          ADD
        </button>

      </form>
    </div>
  )
}

export default AddProduct
