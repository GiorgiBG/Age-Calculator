import { useState } from "react"
const dateNow = new Date()

function App() {
  // Input data
  const [inputDay, setInputDay] = useState("")
  const [inputMonth, setInputMonth] = useState("")
  const [inputYear, setInputYear] = useState("")

  // text for message
  const [year,setYear] = useState("- -")
  const [month, setMonth] = useState("- -")
  const [day, setDay] = useState("- -")

  // Warning class
  const [warningDay, setWarningDay] = useState("")
  const [warningMonth, setWarningMonth] = useState("")
  const [warningYear, setWarningYear] = useState("")

  // Labels
  const[dayLabel, setDayLabel]=useState("")
  const[monthLabel, setMonthLabel] = useState("")
  const[yearLabel, setLabelYear] = useState("")

  const[warningInput, setWarningInput] = useState("")


  
  function handleChange(e){
    if(e.target.id === 'day'){
      setInputDay(e.target.value)
    } else if(e.target.id === 'month'){
      setInputMonth(e.target.value)
    }else if (e.target.id === "year"){
      setInputYear(e.target.value)
    }
  }

  function checkValidity(){
    let warning = true
    if(inputDay ===""){
      setWarningDay("This field is required")
      setDayLabel("red-label")
      setWarningInput("warning-input")
      warning = false
      
    }else if(inputDay >31){
      setWarningDay("Must be valid date")
      setDayLabel("red-label")
      setWarningInput("warning-input")
      warning = false
    }else if(inputDay<=0){
      setWarningDay("This field is required")
      setDayLabel("red-label")
      setWarningInput("warning-input")
      warning = false
      console.log("inputDay",warning)
    }else {
      setWarningDay("")
      setDayLabel("")
      setWarningInput("")
    }

    if (inputMonth==="" ){
      setWarningMonth("This field is required")
      setMonthLabel("red-label")
      setWarningInput("warning-input")
      warning = false
    }else if (inputMonth>12){
      setWarningMonth("Must be valid date")
      setMonthLabel("red-label")
      setWarningInput("warning-input")
      warning = false
    }else if(inputMonth<=0){
      setWarningMonth("This field is required")
      setMonthLabel("red-label")
      setWarningInput("warning-input")
      warning = false
    }else {
      setWarningMonth("")
      setMonthLabel("")
      setWarningInput("")
    }

    if(inputYear === ""){
      setWarningYear("This field is required")
      setLabelYear("red-label")
      setWarningInput("warning-input")
      warning = false
    }else if (inputYear > dateNow.getFullYear() ){
      setWarningYear("Must be valid date")
      setLabelYear("red-label")
      setWarningInput("warning-input")
      warning = false
    }else if(inputYear<=100){
      setWarningYear("The year should be above 100")
      setLabelYear("red-label")
      setWarningInput("warning-input")
      warning = false
    }else{  
      setWarningYear("")
      setLabelYear("")
      setWarningInput("")
    }
    console.log(warning)
    return warning
  }

  function getTimeDiffYearsMonthsDays(startDate, endDate) {
    
    var result = {days:0, months:0, years:0};

    if (startDate == endDate) return result;
	  if (startDate > endDate) {
        return;
    }  

    var year1 = startDate.getFullYear();
    var year2 = endDate.getFullYear();
	  var month1 = startDate.getMonth();
    var month2 = endDate.getMonth();
    var day1 = startDate.getDate();
    var day2 = endDate.getDate();

    //Setting initial values - may be negative
    result.years = year2 - year1;
    result.months = month2 - month1;
    result.days = day2 - day1;

    //Fixing possible negative day diff, eg start = 13 oct, end = 25 sept
    if (result.days < 0) {
        
      //Using temporary dates to get the number of days remaining in the month
      var dtmp1 = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1, 0, 0, -1);
      var numDays = dtmp1.getDate();

      result.months -= 1;
      result.days += numDays;

    }

    //Fixing possible negative month difference
    if (result.months < 0) {
        result.months += 12;
        result.years -= 1;
    }

    return result;
}

  function calculateAge(){
    if (checkValidity()){
      const inputDate = new Date(inputYear, inputMonth-1, inputDay)
      const calcAge = getTimeDiffYearsMonthsDays(inputDate,dateNow )
      setYear(calcAge.years)
      setMonth(calcAge.months)
      setDay(calcAge.days)
    }
    
  }

  return (
    <div className="container">
      <form>
        <div>
          <label htmlFor="day" className={dayLabel}>Day</label>
          <input type="number" id="day" name="day" value={inputDay} onChange={handleChange} placeholder="DD" className={warningInput}/>
          <p className="warning">{warningDay}</p>
        </div>
        <div>
          <label htmlFor="month"  className={monthLabel}>Month</label>
          <input type="number" id="month" name="month" value={inputMonth} onChange={handleChange} placeholder="MM" className={warningInput}/>
          <p className="warning">{warningMonth}</p>
        </div>
        <div>
          <label htmlFor="year" className={yearLabel}>Year</label>
          <input type="number" name="year" id="year" value={inputYear} onChange={handleChange} placeholder="YYYY" className={warningInput}/>
          <p className="warning">{warningYear}</p>
        </div>
        <hr/>
      <img src="./src/assets/icon-arrow.svg" alt="Arrow" className="arrow" onClick={calculateAge}/>
      </form>
      <div className="result">
        <p><span>{year}</span> years</p>
        <p><span>{month}</span> month</p>
        <p><span>{day}</span> days</p>
      </div>
    </div>
  )
}

export default App
