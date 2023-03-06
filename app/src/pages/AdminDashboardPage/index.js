import React, {useState, useEffect} from 'react';
import './style.css';
import { Chart } from "react-google-charts";


function AdminDashboardPage() {
  const [weakCounter, setWeakCounter] = useState(0);
  const [fairCounter, setFairCounter] = useState(0);
  const [goodCounter, setGoodCounter] = useState(0);
  const [strongCounter, setStrongCounter] = useState(0);
  const [strongestMajor, setStrongestMajor] = useState([]);
  const [weakestMajor, setWeakestMajor] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [pieChartOptions, setPieChartOptions] = useState([]);
  const [passwordsBasedOnStudent, setPasswordsBasedOnStudent] = useState([]);

  useEffect(() => {
    async function passwordStrength() {
      const response_passwordStrength = await fetch("http://localhost:3001/select_groupBy_password_strength", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data_passwordStrength = await response_passwordStrength.json();


      setWeakCounter(data_passwordStrength[0].count)
      setFairCounter(data_passwordStrength[1].count)
      setGoodCounter(data_passwordStrength[2].count)
      setStrongCounter(data_passwordStrength[3].count)

      setPieChartData([
        ["Strength", "Popularity"],
        ["Strong", data_passwordStrength[3].count],
        ["Good", data_passwordStrength[2].count],
        ["Fair", data_passwordStrength[1].count],
        ["Weak", data_passwordStrength[0].count], // Below limit.
      ]);
  
      setPieChartOptions({
        title: "Strength of Passwords",
        // sliceVisibilityThreshold: 0.2, // 20%
      });
      console.log("response_passwordStrength")
    }
    passwordStrength()
  }, []);

  useEffect(() => {
    async function passwordsBasedOnStudent() {
      const response_passwordsBasedOnStudent = await fetch("http://localhost:3001/select_passwords_based_on_student", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data_passwordsBasedOnStudent = await response_passwordsBasedOnStudent.json();

      setPasswordsBasedOnStudent(data_passwordsBasedOnStudent);
      console.log("response_passwordsBasedOnStudent")

    }
    passwordsBasedOnStudent()
  }, []);

  useEffect(() => {
    async function strongestMajor() {
      const response_strongestMajor = await fetch("http://localhost:3001/select_major_strongest_passwords", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data_strongestMajor = await response_strongestMajor.json();

      setStrongestMajor(data_strongestMajor[0])
      console.log("Strongest")

    }
    strongestMajor()
  }, []);

  useEffect(() => {
    async function weakestMajor() {
      const response_weakestMajor = await fetch("http://localhost:3001/select_major_weakest_passwords", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data_weakestMajor = await response_weakestMajor.json();

      setWeakestMajor(data_weakestMajor[0])
      console.log("Weakest")
    }
    weakestMajor()
  }, []);

  return (
    <div className='w-100'>
      <div className="row">
        <div className='col-4'>
          <div className="card">
            <div className="card-body">
              <div className="card-title text-center">Number of Passwords</div>
                <p className='card-text text-center'>{weakCounter + fairCounter + goodCounter + strongCounter}</p>
            </div>
          </div>
        </div>
        <div className='col-4'>
          <div className="card">
            <div className="card-body">
              <div className="card-title text-center">Strongest Major</div>
                <p className='card-text text-center'>{strongestMajor.student_major}</p>
            </div>
          </div>
        </div>
        <div className='col-4'>
          <div className="card">
            <div className="card-body">
              <div className="card-title text-center">Weakest Major</div>
                <p className='card-text text-center'>{weakestMajor.student_major}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-4'>
          <div className="card">
            <div className="card-body">
              <Chart
                chartType="PieChart"
                data={pieChartData}
                options={pieChartOptions}
                width={"100%"}
                height={"300px"}
              />
            </div>
          </div>
        </div>
        <div className='col-8'>
          <div className="card">
            <div className="card-body">
              <table className='table-striped'>
                <thead>
                  <tr>
                    <th scope="col">Student ID</th>
                    <th scope="col">Student Name</th>
                    <th scope="col">Student Major</th>
                    <th scope="col">Attempts</th>
                    <th scope="col">First Attempt</th>
                    <th scope="col">Last Attempt</th>
                    <th scope="col">Average Strength</th>
                  </tr>
                </thead>
                <tbody>
                {
                  passwordsBasedOnStudent.map((student, i) => {
                    console.log(student)
                    return(
                    <tr>
                      <td>{student.student_id}</td>
                      <td>{student.student_name}</td>
                      <td>{student.student_major}</td>
                      <td>{student.attempts}</td>
                      <td>{student.first_test_timestamp}</td>
                      <td>{student.last_test_timestamp}</td>
                      <td>{student.avg_strength}</td>
                    </tr>)
                  })
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage;