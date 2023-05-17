import {
	format,
	startOfWeek,
	startOfMonth,
	endOfWeek,
	endOfMonth,
	eachDayOfInterval,
	startOfDay,
	isEqual
} from "date-fns"

// 1. On load: populate the date picker button with the current date.
const datePicker = document.querySelector(".date-picker") as HTMLDivElement
datePicker.dataset.selectedDate = new Date().toDateString()
const datePickerToggle = document.querySelector(
	".date-picker-button"
) as HTMLButtonElement
function setDatePickerToggleLabel(dateString: string) {
	datePickerToggle.textContent = format(new Date(dateString), "MMMM d, y")
}
setDatePickerToggleLabel(datePicker.dataset.selectedDate)

// 2. Date Picker Button: When clicked, toggle the visibility of the date picker
//		and populate it if it is visible.
datePickerToggle.addEventListener("click", () => {
	datePicker.classList.toggle("show")
	populateDatePicker()
})

// 2. a) If the date picker is visible:
//	- Set the month and year at the top of the date picker.
//	- Clear the calendar grid.
//	- Populate the calendar grid with the days of the current month.
//	- Add days from the previous and next months to fill out the first and last weeks.
function populateDatePicker(dateToShow: Date | null = null) {
	if (!datePicker.classList.contains("show")) return

	const selectedDate = startOfDay(new Date(datePicker.dataset.selectedDate!))
	if (dateToShow === null) {
		dateToShow = startOfMonth(selectedDate)
	} else if (!isEqual(startOfMonth(dateToShow), dateToShow)) {
		dateToShow = startOfMonth(dateToShow)
	}

	updateCurrentMonth(dateToShow)
	populateDateGrid(dateToShow, selectedDate)
}

const currentMonth = datePicker.querySelector(".current-month") as HTMLDivElement
function updateCurrentMonth(dateToShow: Date) {
	currentMonth.dataset.dateToShow = dateToShow.toDateString()
	currentMonth.textContent = `${format(dateToShow, "LLLL")} - ${format(
		dateToShow,
		"y"
	)}`
}
// 3. Previous Month Button: When clicked, repopulate the date picker with the previous month.
// 4. Next Month Button: When clicked, repopulate the date picker with the next month.
// 5. Date Buttons: When clicked, change the selected date to the date that was clicked and close the
//      date picker. If the date was not in the current month, repopulate the date picker with the month
//      of the selected date.
const dateGrid = datePicker.querySelector(".date-picker-grid-dates") as HTMLDivElement
function populateDateGrid(dateToShow: Date, selectedDate: Date) {
	dateGrid.innerHTML = ""
	const start = startOfWeek(dateToShow)
	const end = endOfWeek(endOfMonth(dateToShow))
	const interval = eachDayOfInterval({ start, end })
	interval.forEach(day => {
		const button = createDayButton(
			day,
			selectedDate,
			day.getMonth() === dateToShow!.getMonth()
		)
		dateGrid.appendChild(button)
	})
}

function createDayButton(buttonDate: Date, selectedDate: Date, inCurrentMonth: boolean) {
	const button: HTMLButtonElement = document.createElement("button")
	button.textContent = `${buttonDate.getDate()}`
	button.dataset.date = buttonDate.toDateString()

	button.classList.add("date")
	if (!inCurrentMonth) {
		button.classList.add("date-picker-other-month-date")
	}
	if (isEqual(buttonDate, selectedDate)) {
		button.classList.add("selected")
	}

	button.addEventListener("click", e => {
		if (e.target == null || (e.target as HTMLButtonElement) !== button) return
		e.preventDefault()

		setDatePickerToggleLabel(button.dataset.date!)
		datePicker.dataset.selectedDate = button.dataset.date

		datePicker.classList.remove("show")
	})

	return button
}
// 6. BONUS 1: If the month name is clicked, bring up a selector that allows the user to change the month.
//      Choosing a month via the month selector does not change the year.
// 7. BONUS 2: If the year is clicked, bring up a selector that allows the user to select a year, either by
//      clicking on it in the list of choices or by typing it into the search field. There will be some
//      limitations on this so that the user can't choose an invalid date, but those can be defined later.
