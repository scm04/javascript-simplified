import {
	addDays,
	addMonths,
	differenceInCalendarMonths,
	format,
	getDate,
	getMonth,
	getYear,
	isEqual,
	lastDayOfMonth,
	lastDayOfWeek,
	parse,
	startOfWeek,
	subMonths
} from "date-fns/esm"

// DOM elements
const datePicker = document.querySelector("[data-date-picker]")
const datePickerBtn = document.querySelector("[data-date-picker-btn]")
const datePickerDates = document.querySelector("[data-date-picker-dates]")
const datePickerLabel = document.querySelector("[data-date-picker-label]")
const nextMonthBtn = document.querySelector("[data-next-month-btn]")
const prevMonthBtn = document.querySelector("[data-prev-month-btn]")

// Constant variables
const SELECTED_DATE_FORMAT = "MMMM do, yyyy"
const CURRENT_MONTH_FORMAT = "MMMM - yyyy"

/*
 * When the user clicks the date-picker button, do one of two things:
 * --- If the date-picker is currently visible, hide it.
 * --- If the date-picker is currently hidden, set the date-picker's month
 * 		to the current month, fill out the date-picker's calendar, and
 * 		make the date picker visible.
 */
datePickerBtn.addEventListener("click", () => {
	if (!datePicker.classList.contains("show")) initializeDatePicker()
	datePicker.classList.toggle("show")
})

/**
 * Initialize the date picker based on the currently selected date.
 */
function initializeDatePicker() {
	const selectedDate = getSelectedDate()
	setCurrentMonth(selectedDate)
	const datePickerDatesArray = Array.from(datePickerDates.querySelectorAll(".date"))
	datePickerDatesArray.forEach(date => {
		const selected =
			!date.classList.contains("date-picker-other-month-date") &&
			parseInt(date.innerText) === getDate(selectedDate)
		date.classList.toggle("selected", selected)
	})
}

/*
 * If the user clicks outside of the date picker while it is visible, hide it.
 * If the user clicked the date-picker button, which is outside of the date-picker,
 * the event can be ignored since the button's click listener should be run instead
 * of this one in that case.
 */
document.addEventListener("click", e => {
	if (!datePicker.classList.contains("show")) return
	if (e.target.matches("[data-date-picker-btn]")) return
	if (e.target.closest("[data-date-picker]") != null) return

	datePicker.classList.remove("show")
})

/*
 * When a date is selected, update the text on the date picker's button to the
 * selected date and close the picker.
 * When a date is selected, the current date needs to be updated and the picker
 * needs to be closed.
 */
datePickerDates.addEventListener("click", e => {
	if (!e.target.matches(".date")) return

	const newMonthAndYear = getCurrentDate()
	const newDate = parseInt(e.target.innerText)
	datePickerBtn.innerText = format(
		new Date(getYear(newMonthAndYear), getMonth(newMonthAndYear), newDate),
		SELECTED_DATE_FORMAT
	)

	datePicker.classList.remove("show")
})

/*
 * When the right arrow is selected, update the date picker's current month
 * to the next month (updating the year if necessary) and update the calendar
 * portion of the picker to show the dates for the new month.
 */
nextMonthBtn.addEventListener("click", () => {
	const currentDate = addMonths(getCurrentDate(), 1)
	setCurrentMonth(currentDate)
	addDatesToPicker(currentDate, getSelectedDate())
})

/*
 * When the left arrow is selected, update the date picker's current month
 * to the previous month (updating the year if necessary) and update the calendar
 * portion of the picker to show the dates for the new month.
 */
prevMonthBtn.addEventListener("click", () => {
	const currentDate = subMonths(getCurrentDate(), 1)
	setCurrentMonth(currentDate)
	addDatesToPicker(currentDate, getSelectedDate())
})

// Helpers
/**
 * Set the text of the date-picker's current month using the provided date.
 * @param {Date} date The reference date to use.
 */
function setCurrentMonth(date) {
	datePickerLabel.innerText = format(date, CURRENT_MONTH_FORMAT)
}

/**
 * Parse the date-picker button's label into a Date object.
 * @returns The currently selected date as a Date object.
 */
function getSelectedDate() {
	return parse(datePickerBtn.innerText, SELECTED_DATE_FORMAT, new Date())
}

/**
 * Parse the date-picker's current date string into a Date object.
 * @returns The date picker's current date as a Date object.
 */
function getCurrentDate() {
	return parse(datePickerLabel.innerText, CURRENT_MONTH_FORMAT, new Date())
}

/**
 * Fill out the picker with the dates of the current month, including dates from
 * the previous and next months where needed to fill out the first and last weeks
 * of the date picker.
 * @param {Date} currentDate The first of the month for the month to be displayed.
 * @param {Date} selectedDate The currently selected date.
 */
function addDatesToPicker(currentDate, selectedDate) {
	datePickerDates.innerHTML = ""

	let startDate = startOfWeek(currentDate)
	const endDate = addDays(lastDayOfWeek(lastDayOfMonth(currentDate)), 1)
	while (!isEqual(startDate, endDate)) {
		const calendarMonthDiff = differenceInCalendarMonths(endDate, startDate)
		const otherMonthDate = calendarMonthDiff === 0 || calendarMonthDiff === 2
		createDateElement(
			getDate(startDate),
			otherMonthDate,
			isEqual(startDate, selectedDate)
		)
		startDate = addDays(startDate, 1)
	}
}

/**
 * Create the date element for the given date and add it to the date picker.
 * @param {Date} date The date to add to the date picker.
 * @param {boolean} inOtherMonth Whether or not the date is outside the current month.
 * @param {boolean} isSelected Whether or not the date is the currently selected date.
 */
function createDateElement(date, inOtherMonth, isSelected) {
	const button = document.createElement("button")
	button.classList.add("date")
	button.classList.toggle("date-picker-other-month-date", inOtherMonth)
	button.classList.toggle("selected", isSelected)
	button.innerText = date
	datePickerDates.appendChild(button)
}
