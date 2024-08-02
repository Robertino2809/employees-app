import { useState } from "react"

const NewEmployeesForm = () => {

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    dateBirth: '',
    jobTitle: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData, [name] : value
    })
  }

  const handleSubmit = (e) => {
    // ispis errora
    e.preventDefault()
    const validationErrors = {}
    if (!formData.fname.trim()) {
      validationErrors.fname = 'Ime je obavezno.'
    }

    if (!formData.lname.trim()) {
      validationErrors.lname = 'Prezime je obavezno.'
    }

    if (!formData.dateBirth.trim()) {
      validationErrors.dateBirth = 'Datum rođenja je obavezan.'
    }
    
    if (!formData.jobTitle.trim()) {
      validationErrors.jobTitle = 'Radno mjesto je obavezno.'
    }
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      alert("Uspješno ste dodali novog zaposlenika.")
    }

    //submit forme u konzolu
    const fname = e.target.fname.value;
    const lname = e.target.lname.value;
    const dateBirth = e.target.dateBirth.value;
    const jobTitle = e.target.jobTitle.value;

    console.log("Ime: " + fname,"\n", "Prezime: " + lname, "\n", "Datum rođenja: " + dateBirth, "\n", "Radno mjesto: " + jobTitle)
  }

  return (
    <div className="p-5 h-screen bg-gray-100">
      <div className="flex justify-center">
        <form id="form" className="flex flex-col bg-white p-5 rounded-xl shadow-md w-96" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold mb-2">Novi zaposlenik</h1>
          <p className="text-xlg mb-4">Ispunite formu i unesite novog zaposlenika</p>
          <label className="text-xl font-semibold mb-2">Ime</label>
          <input 
            type="text"
            name="fname"
            className="w-full h-10 rounded-lg border border-gray-300 p-2" 
            placeholder="Ime" 
            onChange={handleChange}
          />
            {errors.fname && <span className="text-red-500">{errors.fname}</span>}
          <label className="text-xl font-semibold mb-2 mt-2">Prezime</label>
          <input 
            type="text"
            name="lname"
            className="w-full h-10 rounded-lg border border-gray-300 p-2" 
            placeholder="Prezime" 
            onChange={handleChange}
          />
          {errors.lname && <span className="text-red-500">{errors.lname}</span>}
          <label className="text-xl font-semibold mb-2 mt-2">Datum rođenja</label>
          <input 
            type="text"
            name="dateBirth"
            className="w-full h-10 rounded-lg border border-gray-300 p-2" 
            placeholder="npr 28.09.2002" 
            onChange={handleChange}
          />
          {errors.dateBirth && <span className="text-red-500">{errors.dateBirth}</span>}
          <label className="text-xl font-semibold mb-2 mt-2">Radno mjesto</label>
          <input
            type="text"
            name="jobTitle" 
            className="w-full h-10 rounded-lg border border-gray-300 p-2" 
            placeholder="npr. Programer" 
            onChange={handleChange}
          />
          {errors.jobTitle && <span className="text-red-500">{errors.jobTitle}</span>}
          <div className="w-full h-[1px] bg-gray-200 mt-3"></div>
          <div className="mt-3">
            <button className="w-full h-12 rounded-lg bg-black text-gray-100 hover:bg-gray-300 hover:text-gray-800 font-bold">Dodaj novog zaposlenika</button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default NewEmployeesForm