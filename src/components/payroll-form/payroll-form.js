import React, { useState} from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse -1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import logo from '../../assets/images/logo.png'
import './payroll-form.css';
import axios from 'axios'
import { Link } from 'react-router-dom';
import EmployeeService from '../../services/employee-service.js';
const AddUser = (props) => {
    
    const [user, setUser] = useState({
        name: '',
        profileArray: [
            { url: '../../assets/profile-images/Ellipse -3.png' },
            { url: '../../assets/profile-images/Ellipse -1.png' },
            { url: '../../assets/profile-images/Ellipse -8.png' },
            { url: '../../assets/profile-images/Ellipse -7.png' }

        ],
        allDepartment: [
            'HR', 'Sales', 'Finance', 'Engineer', 'Others'
        ],
        departMentValue: [],
        gender: '',
        salary: '',
        day: '',
        month: '',
        year: '',
        startDate: '',
        notes: '',
        id: '',
        profileURL: '',
        isUpdate: false,
        error: {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profileURL: '',
            startDate: ''
        }
    });


    const onInputChange = async event => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const params = useParams();

 const getEmployeeByID = (id) => {
     EmployeeService.getEmployee(id).then((response) => {
         let obj = response.data;
         console.log(obj);
         setData(obj);
     }).catch((error) => {
         alert(error);
     });
 }

 const setData = (obj) => {
    let array=obj.startDate;
    setUser({
         ...user,
         ...obj,
         id: obj.id,
         name: obj.name,
         profileURL: obj.profileURL,
         gender: obj.gender,
         departMentValue: obj.department,
         salary: obj.salary,
        //  startDate: obj.startDate,
         notes: obj.notes,
         isUpdate: true,
         
         day:array[0]+array[1],
                   month:array[3]+array[4]+array[5],
                   year:array[7]+array[8]+array[9]+array[10],
         
     });
 }
 useEffect(() => {
    if (params.id) {
        getEmployeeByID(params.id);
    }
}, []);
const validateData = async () => {
    let isError = false;
    let error = {
        department: '',
        name: '',
        gender: '',
        salary: '',
        profileURL: '',
        startDate: '',
        notes:''
    }
    if (!user.name.match('^[A-Z]{1}[a-z]{2,}([ ][A-Z]{1}[a-z]{2,})?$')) {
        error.name = 'Invalid NAME'
        isError = true;
    }
    if (user.gender.length < 1) {
        error.gender = 'Select GENDER'
        isError = true;
    }
    if (user.salary.length < 1) {
        error.salary = 'Required SALARY'
        isError = true;
    }
    if (user.profileURL.length < 1) {
        error.profileURL = 'Select PROFILE PIC'
        isError = true;
    }
    if (user.departMentValue.length < 1) {
        error.department = 'Select DEPARTMENT'
        isError = true;
    }
    if (user.notes.length < 1){
        error.notes = "Required NOTES"
        isError = true;
    }
    setUser({ ...user, error: error })
    return isError;
}
 const save = async (event) => {
    event.preventDefault();
    if (await validateData()) {
        return;
    }
    let object = {
        name: user.name,
        department: user.departMentValue,
        gender: user.gender,
        salary: user.salary,
        startDate: `${user.day} ${user.month} ${user.year}`,
        notes: user.notes,
        id: user.id,
        profileURL: user.profileURL,
    }
    if (user.isUpdate) {
        EmployeeService.updateEmployee(params.id, object).then((response) => {
            props.history.push('');
        }).catch((error) => {
            alert(error);
        })
    }
    else {
        EmployeeService.addEmployee(object).then(() => {
            console.log("data added successfully");
            props.history.push('');
        }).catch((error) => {
            alert(error);
        })
    }
 }
    const changeValue = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
        console.log(event.target.value)
    }

    const onCheckChange = (name) => {
        let index = user.departMentValue.indexOf(name);

        let checkArray = [...user.departMentValue]
        if (index > -1)
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
        setUser({ ...user, departMentValue: checkArray });
    }
    const getChecked = (name) => {
        return user.departMentValue && user.departMentValue.includes(name);
    }
    return (
        <div className="payroll-main">
            <header className='header-content header'>
                <div className="logo-content">
                    <img src={logo} alt="" />
                    <div>
                        <span className="emp-text">EMPLOYEE</span> <br />
                        <span className="emp-text emp-payroll">PAYROLL</span>
                    </div>
                </div>
            </header>
            <div className="form-content">
                <form className="form-head" action="#" onSubmit={save}>
                    <div className="form-head">Employee Payroll form</div>
                    <div className="row-content">
                        <label className="label text" htmlFor="name">Name</label>
                        <input className="input" type="text" id="name" name="name" value={user.name} onChange={changeValue} placeholder="Your name.." />
                        <div className="error">{user.error.name}</div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="profileURL">Profile image</label>
                        <div className="profile-radio-content">
                            <label >
                                <input type="radio" name="profileURL" checked={user.profileURL === '../../assets/profile-images/Ellipse -1.png'} value="../../assets/profile-images/Ellipse -1.png" onChange={changeValue} />
                                <img className="profile" src={profile2} alt="profile" />
                            </label>
                            <label >
                                <input type="radio" name="profileURL" checked={user.profileURL === '../../assets/profile-images/Ellipse -3.png'} value="../../assets/profile-images/Ellipse -3.png" onChange={changeValue} />
                                <img className="profile" src={profile1} alt="profile" />
                            </label>
                            <label >
                                <input type="radio" name="profileURL" checked={user.profileURL === '../../assets/profile-images/Ellipse -7.png'} value="../../assets/profile-images/Ellipse -7.png" onChange={changeValue} />
                                <img className="profile" src={profile4} alt="profile" />
                            </label>
                            <label >
                                <input type="radio" name="profileURL" checked={user.profileURL === '../../assets/profile-images/Ellipse -8.png'} value="../../Assets/profile-images/Ellipse -8.png" onChange={changeValue} />
                                <img className="profile" src={profile3} alt="profile" />
                            </label>

                        </div>
                        <error className="error">{user.error.profileURL}</error>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="gender">Gender</label>
                        <div>
                            <input type="radio" id="male" checked={user.gender === 'male'} onChange={changeValue} name="gender" value="male" />
                            <label className="text" htmlFor="male">Male</label>
                            <input type="radio" id="female" checked={user.gender === 'female'} onChange={changeValue} name="gender" value="female" />
                            <label className="text" htmlFor="female">Female</label>
                        </div>
                        <error className="error">{user.error.gender}</error>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="department">Department</label>
                        <div>
                            {user.allDepartment.map(item => (
                                <span key={item}>
                                    <input className="checkbox" type="checkbox" onChange={() => onCheckChange(item)} name={item}
                                        checked={getChecked(item)} value={item} />
                                    <label className="text" htmlFor={item}>{item}</label>
                                </span>
                            ))}

                        </div>
                        <error className="error">{user.error.department}</error>
                    </div>

                    <div className="row-content">
                        <label className="label text" htmlFor="salary">Salary</label>
                        <input className="input" type="text" id="salary" name="salary" value={user.salary} onChange={changeValue} />
                        <div className="error">{user.error.salary}</div>
                    </div>

                    <div className="row-content">
                        <label className="label text" htmlFor="startDate">Start Date</label>
                        <div>
                            <select value={user.day} onChange={changeValue} id="day" name="day">
                                <option value="" disabled selected>Day</option>
                                <option value="01">1</option>
                                <option value="02">2</option>
                                <option value="03">3</option>
                                <option value="04">4</option>
                                <option value="05">5</option>
                                <option value="06">6</option>
                                <option value="07">7</option>
                                <option value="08">8</option>
                                <option value="09">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <select value={user.month} onChange={changeValue} id="month" name="month">
                                <option value="" disabled selected>Month</option>
                                <option value="Jan">January</option>
                                <option value="Feb">Febuary</option>
                                <option value="Mar">March</option>
                                <option value="Apr">April</option>
                                <option value="May">May</option>
                                <option value="Jun">June</option>
                                <option value="Jul">July</option>
                                <option value="Aug">August</option>
                                <option value="Sep">September</option>
                                <option value="Oct">October</option>
                                <option value="Nov">November</option>
                                <option value="Dec">December</option>
                            </select>
                            <select value={user.year} onChange={changeValue} id="year" name="year">
                                <option value="" disabled selected>Year</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                            </select>
                        </div>
                        <error className="error">{user.error.startDate}</error>
                    </div>

                    <div className="row-content">
                        <label className="label text" htmlFor="notes">Notes</label>
                        <textarea onChange={changeValue} id="notes" value={user.notes} className="input" name="notes" placeholder=""
                            style={{ height: '120%' }}></textarea>
                        <error className="error">{user.error.notes}</error>
                    </div>

                    <div className="buttonParent">
                        <Link to="/" className="resetButton button cancelButton">Cancel</Link>
                        <Link to="/" className="resetButton button cancelButton">Employee List</Link>

                        <div className="submit-reset">

                            <button type="submit" className="button submitButton" id="submitButton">{user.isUpdate ? 'Update' : 'Submit'}</button>
                        </div>
                    </div >
                </form >
            </div >
        </div >
    );
};

export default AddUser;