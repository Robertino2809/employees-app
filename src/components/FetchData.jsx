import { useState, useEffect } from "react"

const FetchData = () => {

  const [employees, setEmployees] = useState([])

  useEffect(() => {
    fetch('https://api.test.ulaznice.hr/paganini/api/job-interview/employees')
    .then(response => response.json())
    .then(data => setEmployees(data))
    .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <ul>
        {employees.map((list, index) => (
          <li key={index}>{list.id} | {list.firstName} | {list.lastName} | {list.dateOfBirth} | {list.jobTitle}</li>
        ))}
      </ul>
    </div>
  )
}
export default FetchData