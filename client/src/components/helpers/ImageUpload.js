import axios from 'axios'
import Form from 'react-bootstrap/Form'

const ImageUpload = ({ formData, setFormData }) => {

  const uploadURL = process.env.REACT_APP_CLOUDINARY_URL
  const preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

  // console.log(uploadURL, preset)

  const handleImageUpload1 = async e => {
    // Create form data to send in the API request to cloudinary
    // To do it we're going to use the FormData constructor from javascript
    const data = new FormData()

    // Once created we're going to append the files that were uploaded to the FormData
    data.append('file', e.target.files[0])
    data.append('upload_preset', preset)
    // Once we've done this, the data is ready to send, and we'll use the upload url to do it
    const res = await axios.post(uploadURL, data)

    console.log('data', res.data)
    // Set the profileImage url to state
    setFormData({ ...formData, img_1: res.data.url })
  }

  const handleImageUpload2 = async e => {
    // Create form data to send in the API request to cloudinary
    // To do it we're going to use the FormData constructor from javascript
    const data = new FormData()

    // Once created we're going to append the files that were uploaded to the FormData
    data.append('file', e.target.files[0])
    data.append('upload_preset', preset)
    // Once we've done this, the data is ready to send, and we'll use the upload url to do it
    const res = await axios.post(uploadURL, data)

    console.log('data', res.data)
    // Set the profileImage url to state
    setFormData({ ...formData, img_2: res.data.url })
  }


  

  return (
    <>
      <Form.Group>
        <div className='upload'>
          <label htmlFor="img_1" className="label">* Image 1</label>
          <input
            name="img_1"
            className="input"
            type="file"
            onChange={handleImageUpload1}
          />
        </div>
      </Form.Group>
      <Form.Group>
        <div className='upload'>
          <label htmlFor="img_2" className="label">Image 2</label>
          <input
            name="img_2"
            className="input"
            type="file"
            onChange={handleImageUpload2}
          />
        </div>
      </Form.Group>
    </>
  )
}

export default ImageUpload