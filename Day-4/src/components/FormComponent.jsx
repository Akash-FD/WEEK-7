
import React, { useState } from "react";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    country: "",
    colors: [],
    inputNumber: 3,
    switch: false,
    slider: "A",
    radioGroup: "",
    radioButton: "",
    checkboxGroup: [],
    rating: 3,
    uploadFiles: [],
  });




  const handleChange = (e) => {
    // console.log(e.target);

    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
 

      setFormData((prev) => ({
        ...prev,
        checkboxGroup: checked
          ? [...prev.checkboxGroup, value]
          : prev.checkboxGroup.filter((item) => item !== value),
      }));
    } else if (type === "file") {
     
      setFormData((prev) => ({
        ...prev,
        uploadFiles: [...prev.uploadFiles, ...files],
      }));
    } else {
    

      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      uploadFiles: [...e.target.files],
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      uploadFiles: [...prev.uploadFiles, ...e.dataTransfer.files],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {

      if (Array.isArray(value)) {
        value.forEach((item) => formDataToSubmit.append(key, item));
      } else {
        formDataToSubmit.append(key, value);
      }
    });

    console.log("Form Data Submitted:");
    // for (let [key, value] of formDataToSubmit.entries()) {
    //   // console.log(key, value);
    // }
    console.log(formData);

  };

  return (
    <div className="w-full">
      <div className="w-[45%] mx-auto border px-5 py-2">
        <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-8">
          <label>* Select Country:
            <select name="country" onChange={handleChange} required>
              <option value="">Please select a country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UAE">UAE</option>
            </select>
          </label>

          <label className="flex flex-col"> * Select Colors (Multiple) :
            <select name="colors" multiple className="bg-gray-100 border" onChange={(e) => setFormData({ ...formData, colors: [...e.target.selectedOptions].map(o => o.value) })}>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Green">Yellow</option>
              <option value="Green">purple</option>

            </select>
          </label>

          <label>Input Number :
            <input type="number" name="inputNumber" value={formData.inputNumber} onChange={handleChange} className="border" />
          </label>

          <label>Switch :
            <input type="checkbox" name="switch" checked={formData.switch} onChange={(e) => setFormData({ ...formData, switch: e.target.checked })} />
          </label>

          <label> Slider (A to F):
            <input type="range" name="slider" min="0" max="5" step="1" value={["A", "B", "C", "D", "E", "F"].indexOf(formData.slider)}
              onChange={(e) => setFormData({ ...formData, slider: ["A", "B", "C", "D", "E", "F"][e.target.value] })} />
            <span> {formData.slider} </span>
          </label>

          <label className="flex gap-3">Radio Group :
            <input type="radio" name="radioGroup" value="item1" onChange={handleChange} />Item 1
            <input type="radio" name="radioGroup" value="item2" onChange={handleChange} />Item 2
            <input type="radio" name="radioGroup" value="item3" onChange={handleChange} />Item 3
          </label>

          <label className="flex gap-3">* Radio Button Group :
            <button type="button" onClick={() => setFormData({ ...formData, radioButton: "item1" })}>Item 1</button>
            <button type="button" onClick={() => setFormData({ ...formData, radioButton: "item2" })}>Item 2</button>
            <button type="button" onClick={() => setFormData({ ...formData, radioButton: "item3" })}>Item 3</button>
          </label>

          <label className="flex gap-3">Checkbox Group :
            <input type="checkbox" name="checkboxGroup" value="A" onChange={handleChange} /> A
            <input type="checkbox" name="checkboxGroup" value="B" onChange={handleChange} /> B
            <input type="checkbox" name="checkboxGroup" value="C" onChange={handleChange} /> C
          </label>

          <label> Rate:
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} onClick={() => setFormData({ ...formData, rating: star })} className={`cursor-pointer text-2xl ${formData.rating >= star ? "text-yellow-500" : "text-gray-500"}`} >
                ★
              </span>
            ))}
          </label>

          <label> Upload File (Single):
            <input type="file" name="uploadFile" onChange={handleChange} />
          </label>

          <label>
            multi File (Drag & Drop or Select Multiple):
            <input type="file" multiple onChange={handleFileChange} />
            <div
              className="border-2 border-dashed border-gray-500 p-10   text-center cursor-pointer hover:bg-gray-200"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
        
            >
              Drag & Drop Files Here
            </div>
          </label>
          {formData.uploadFiles.map((item,index)=>{
            return <div key={index} className="">
              <button className="bg-gray-200 px-3">{item.name}<span className="ml-4">x</span></button>
            </div>
          })}

          <button type="submit" className="bg-blue-600 my-3 py-2 rounded-lg text-white">Submit</button>
        </form>

      </div>

    </div>


  );
};

export default FormComponent;
