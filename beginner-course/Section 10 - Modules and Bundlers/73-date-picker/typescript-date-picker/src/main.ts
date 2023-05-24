import {
	format,
	startOfWeek,
	startOfMonth,
	endOfWeek,
	endOfMonth,
	eachDayOfInterval,
	startOfDay,
	isEqual,
	addMonths,
	setMonth
} from "date-fns"

// 1. On load: populate the date picker button with the current date.
const datePickerToggle = document.querySelector(
	"[data-date-picker-toggle]"
) as HTMLButtonElement
function updateDatePickerToggle(dateString: string) {
	datePickerToggle.dataset.selectedDate = dateString
	datePickerToggle.textContent = format(new Date(dateString), "MMMM d, y")
}
updateDatePickerToggle(new Date().toDateString())

// 2. Date Picker Button: When clicked, toggle the visibility of the date picker
//		and populate it if it is visible.
const datePicker = document.querySelector("[data-date-picker]") as HTMLDivElement
function setDateToShow(dateString: string) {
	datePicker.dataset.dateToShow = startOfMonth(new Date(dateString)).toDateString()
}
setDateToShow(datePickerToggle.dataset.selectedDate!)
datePickerToggle.addEventListener("click", () => {
	datePicker.classList.toggle("hide")
	if (datePicker.classList.contains("hide")) {
		setDateToShow(datePickerToggle.dataset.selectedDate!)
	} else {
		populateDatePicker()
	}
})

// 2. a) If the date picker is visible:
//	- Set the month and year at the top of the date picker.
//	- Clear the calendar grid.
//	- Populate the calendar grid with the days of the current month.
//	- Add days from the previous and next months to fill out the first and last weeks.
function populateDatePicker() {
	const selectedDate = startOfDay(new Date(datePickerToggle.dataset.selectedDate!))
	const dateToShow = startOfDay(new Date(datePicker.dataset.dateToShow!))

	updateCurrentMonth(dateToShow)
	populateDateGrid(dateToShow, selectedDate)
}

const displayMonth = datePicker.querySelector("[data-display-month]") as HTMLButtonElement
const displayYear = datePicker.querySelector("[data-display-year]") as HTMLButtonElement
function updateCurrentMonth(dateToShow: Date) {
	displayMonth.textContent = format(dateToShow, "LLLL")
	displayYear.textContent = format(dateToShow, "y")
}
// 3. Previous Month Button: When clicked, repopulate the date picker with the previous month.
function changeMonth(modifier: number) {
	setDateToShow(
		addMonths(new Date(datePicker.dataset.dateToShow!), modifier).toDateString()
	)
}
const previousMonthButton = datePicker.querySelector(
	"[data-prev-month-button]"
) as HTMLButtonElement
previousMonthButton.addEventListener("click", () => {
	changeMonth(-1)
	populateDatePicker()
})
// 4. Next Month Button: When clicked, repopulate the date picker with the next month.
const nextMonthButton = datePicker.querySelector(
	"[data-next-month-button]"
) as HTMLButtonElement
nextMonthButton.addEventListener("click", () => {
	changeMonth(1)
	populateDatePicker()
})
// 5. Date Buttons: When clicked, change the selected date to the date that was clicked and close the
//      date picker.
const dateGrid = datePicker.querySelector(
	"[data-date-picker-date-grid]"
) as HTMLDivElement
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
	if (isEqual(buttonDate, startOfDay(new Date()))) {
		button.classList.add("today")
	}
	if (isEqual(buttonDate, selectedDate)) {
		button.classList.add("selected")
	}

	button.addEventListener("click", () => {
		updateDatePickerToggle(button.dataset.date!)
		setDateToShow(button.dataset.date!)

		datePicker.classList.add("hide")
	})

	return button
}
// 6. BONUS 1: If the month name is clicked, bring up a selector that allows the user to change the month.
//      Choosing a month via the month selector does not change the year.
const monthSelectionGrid = datePicker.querySelector(
	"[data-month-selection-grid]"
) as HTMLDivElement
const datePickerCalendarHeader = datePicker.querySelector(
	"[data-date-picker-grid-header]"
) as HTMLDivElement
function toggleMonthSelector() {
	monthSelectionGrid.classList.toggle("hide")
	const monthSelectionIsHidden = monthSelectionGrid.classList.contains("hide")
	datePickerCalendarHeader.classList.toggle("hide", !monthSelectionIsHidden)
	dateGrid.classList.toggle("hide", !monthSelectionIsHidden)
	previousMonthButton.disabled = !monthSelectionIsHidden
	nextMonthButton.disabled = !monthSelectionIsHidden
}
displayMonth.addEventListener("click", () => toggleMonthSelector())

const monthSelectorButtons = Array.from(
	datePicker.querySelectorAll("[data-month-selector-button]")
) as Array<HTMLButtonElement>
console.log(monthSelectorButtons)
monthSelectorButtons.forEach(button => {
	button.addEventListener("click", () => {
		const month = Number(button.dataset.month)
		const dateToShow = new Date(datePicker.dataset.dateToShow!)
		const newDateToShow = setMonth(dateToShow, month)
		setDateToShow(newDateToShow.toDateString())
		updateCurrentMonth(newDateToShow)
		populateDatePicker()
		toggleMonthSelector()
	})
})
// 7. BONUS 2: If the year is clicked, bring up a selector that allows the user to select a year, either by
//      clicking on it in the list of choices or by typing it into the search field. There will be some
//      limitations on this so that the user can't choose an invalid date, but those can be defined later.
// 8. BONUS 3: Add styling to show today's date when it is visible, but not selected. When the date picker
//		is first opened, use this styling to show today's date without selecting it.
// 9. BONUS 4: Add a button that takes the user to today's date.
