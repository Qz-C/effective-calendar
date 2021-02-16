import './App.css';
import { useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';

const App = () => {

	const [month, setMonth] = useState(new Date().getMonth());
	const [year, setYear] = useState(new Date().getFullYear());
	const oneDayInMs = 1000 * 60 * 60 * 24;
	const daysPerPage = 42;

	const weekDays = [
		{ day: "Sunday", short: "Sun" },
		{ day: "Monday", short: "Mon" },
		{ day: "Tuesday", short: "Tue" },
		{ day: "Wednesday", short: "Wed" },
		{ day: "Thursday", short: "Thu" },
		{ day: "Friday", short: "Fri" },
		{ day: "Saturday", short: "Sat" },
	];
	const months = [
		{ month: "January", short: "Jan" },
		{ month: "February", short: "Feb" },
		{ month: "March", short: "Mar" },
		{ month: "April", short: "Apr" },
		{ month: "May", short: "May" },
		{ month: "June", short: "Jun" },
		{ month: "July", short: "Jul" },
		{ month: "August", short: "Aug" },
		{ month: "September", short: "Sep" },
		{ month: "October", short: "Oct" },
		{ month: "November", short: "Nov" },
		{ month: "December", short: "Dec" },
	];

	function genarteMonth(firstDay) {
		const month = firstDay.getMonth();
		const pastMonthLastDay = new Date(firstDay.getTime() - oneDayInMs);

		const pastMonthDays = [];
		for (let i = (pastMonthLastDay.getDate() - firstDay.getDay()) + 1; i <= pastMonthLastDay.getDate(); i++)
			pastMonthDays.push(i);

		const currentMonthDays = [];
		let newDay = firstDay;
		while (newDay.getMonth() === month) {
			currentMonthDays.push(newDay.getDate());
			newDay = new Date(newDay.getTime() + oneDayInMs);
		}

		const nextMonthDays = [];
		for (let i = 0; i < daysPerPage - (currentMonthDays.length + pastMonthDays.length); i++)
			nextMonthDays.push(i + 1);

		return pastMonthDays.concat(currentMonthDays, nextMonthDays);
	}

	const RenderCalendarPage = (props) => {

		//let month = props.month;
		//let year = props.year;
		const dates = genarteMonth(new Date(year, month, 1, 0, 0, 0));
		let local = month;
		return (
			<div className="calendar">
				<div className="month-year">
					<div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
						<a><FiChevronLeft /></a>
						<h1> {months[month].month} </h1>
						<a><FiChevronRight /></a>
					</div>

					<div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
						<FiChevronLeft />
						<h1> {year} </h1>
						<FiChevronRight />
					</div>
				</div>
				<div className="days">
					{weekDays.map((day, index) => (
						<div className="cell" key={index}> <p>{day.short}</p> </div>
					))}
					{dates.map((date, index) => {

						return (
							<div className="cell" key={index}> {date} </div>
						)
					})}
				</div>
			</div>
		)
	}

	return (
		<div className="App">
			<RenderCalendarPage/>
		</div>
	);
}

export default App;



