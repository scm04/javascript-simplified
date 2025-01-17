import {
	format,
	startOfWeek,
	startOfMonth,
	endOfWeek,
	endOfMonth,
	eachDayOfInterval,
	startOfDay,
	addMonths,
	setMonth,
	setYear,
	getYear,
	isSameMonth,
	isSameDay
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

	updateDisplayMonthAndYear(dateToShow)
	populateDateGrid(dateToShow, selectedDate)
	updateShortcutButtons()
}

const displayMonth = datePicker.querySelector("[data-display-month]") as HTMLButtonElement
const displayYear = datePicker.querySelector("[data-display-year]") as HTMLButtonElement
function updateDisplayMonthAndYear(dateToShow: Date) {
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
		const button = createDayButton(day, selectedDate, isSameMonth(day, dateToShow!))
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
	if (isSameDay(buttonDate, new Date())) {
		button.classList.add("today")
	}
	if (isSameDay(buttonDate, selectedDate)) {
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
	"[data-month-selector-grid]"
) as HTMLDivElement
const datePickerCalendarHeader = datePicker.querySelector(
	"[data-date-picker-grid-header]"
) as HTMLDivElement
function toggleDatePickerGrid(datePickerShouldBeHidden: boolean) {
	datePickerCalendarHeader.classList.toggle("hide", datePickerShouldBeHidden)
	dateGrid.classList.toggle("hide", datePickerShouldBeHidden)
	previousMonthButton.disabled = datePickerShouldBeHidden
	nextMonthButton.disabled = datePickerShouldBeHidden
}
function toggleMonthSelector() {
	monthSelectionGrid.classList.toggle("hide")
}
function monthSelectorIsHidden(): boolean {
	return monthSelectionGrid.classList.contains("hide")
}
function updateDatePicker() {
	populateDatePicker()
	const monthOrYearSelectorIsVisible =
		!monthSelectorIsHidden() || !yearSelectorIsHidden()
	toggleDatePickerGrid(monthOrYearSelectorIsVisible)
	toggleShortcutButtons(monthOrYearSelectorIsVisible)
}
function toggleSelector(type: string) {
	switch (type) {
		case "month":
			toggleMonthSelector()
			if (!yearSelectorIsHidden()) toggleYearSelector()
			break
		case "year":
			toggleYearSelector()
			if (!monthSelectorIsHidden()) toggleMonthSelector()
			break
	}
	updateDatePicker()
}
displayMonth.addEventListener("click", () => toggleSelector("month"))

const monthSelectorButtons = Array.from(
	datePicker.querySelectorAll("[data-month-selector-button]")
) as Array<HTMLButtonElement>
monthSelectorButtons.forEach(button => {
	button.addEventListener("click", () => {
		const month = parseInt(button.dataset.month!)
		const dateToShow = new Date(datePicker.dataset.dateToShow!)
		const newDateToShow = setMonth(dateToShow, month)
		setDateToShow(newDateToShow.toDateString())
		updateDisplayMonthAndYear(newDateToShow)
		toggleSelector("month")
	})
})
// 7. BONUS 2: If the year is clicked, bring up a selector that allows the user to select a year, either by
//      clicking on it in the list of choices or by typing it into the search field. There will be some
//      limitations on this so that the user can't choose an invalid date, but those can be defined later.
//		NOTE: I've decided to limit the time window to a 200-year span from 1900 to 2100 for now, but the
//		start and end years are definable as data properties on the year selector element. If I decide to
//		make this a completely enclosed reusable component, I should move the properties to the top-level
//		element of the component, but that's the only change I would need to make from my current setup.
const yearSelector = datePicker.querySelector("[data-year-selector]") as HTMLDivElement
const yearSelectorGrid = yearSelector.querySelector(
	"[data-year-selector-grid]"
) as HTMLDivElement
function toggleYearSelector() {
	yearSelector.classList.toggle("hide")
	if (yearSelectorIsHidden()) return
	setSelectedAndCurrentYears()
	yearSelectorSearch.focus()
}
function yearSelectorIsHidden(): boolean {
	return yearSelector.classList.contains("hide")
}
// The term "current year" here refers to the year the user has chosen to display in the date picker,
// not the current calendar year. For example, if it is currently November 2024, but the user has chosen
// to look at October 1975, "current year" refers to 1975, not 2024. I couldn't think of a better name
// to adequately convey the meaning, hence this explanation.
// The term "selected year" refers to the year of the date that has been selected in the date picker
// if the user has already selected a date. It defaults to the current calendar year because the date
// picker defaults to the current date.
function getYearButtons() {
	return Array.from(
		yearSelectorGrid.querySelectorAll(".year-selector-button")
	) as HTMLButtonElement[]
}
function setSelectedAndCurrentYears() {
	const currentYear = getYear(new Date(datePicker.dataset.dateToShow!))
	const selectedYear = getYear(new Date(datePickerToggle.dataset.selectedDate!))
	const yearButtons = getYearButtons()
	for (const yearButton of yearButtons) {
		const year = parseInt(yearButton.dataset.year!)
		yearButton.classList.toggle("current-year", year === currentYear)
		yearButton.classList.toggle("selected-year", year === selectedYear)
	}
	const currentYearButton = yearButtons.find(button =>
		button.classList.contains("current-year")
	)
	currentYearButton?.scrollIntoView({ behavior: "instant", block: "center" })
}
displayYear.addEventListener("click", () => toggleSelector("year"))
const defaultYears = {
	start: "1900",
	end: "2100"
}
const startYear = parseInt(yearSelector.dataset.startYear ?? defaultYears.start)
const endYear = parseInt(yearSelector.dataset.endYear ?? defaultYears.end)
for (let year = startYear; year <= endYear; year++) {
	const button = createYearButton(year)
	yearSelectorGrid.appendChild(button)
}
function createYearButton(year: number) {
	const button: HTMLButtonElement = document.createElement("button")
	button.classList.add("year-selector-button", "selector-button")
	button.dataset.year = year.toString()
	button.textContent = year.toString()

	button.addEventListener("click", () => {
		const year = parseInt(button.dataset.year!)
		updateYear(year)
	})

	return button
}
function resetYearSelector() {
	yearSelectorSearch.value = ""
	const yearButtons = getYearButtons()
	for (let year of yearButtons) {
		year.classList.toggle("hide", false)
	}
}
function updateYear(year: number) {
	resetYearSelector()
	const dateToShow = new Date(datePicker.dataset.dateToShow!)
	const newDateToShow = setYear(dateToShow, year)
	setDateToShow(newDateToShow.toDateString())
	updateDisplayMonthAndYear(newDateToShow)
	toggleSelector("year")
}
const yearSelectorSearch = yearSelector.querySelector(
	"#year-selector-search"
) as HTMLInputElement
const yearSelectorNoMatchesMessage = yearSelector.querySelector(
	"[data-year-selector-no-matches-message]"
) as HTMLDivElement
yearSelectorSearch.addEventListener("input", () => {
	const value = yearSelectorSearch.value
	const yearButtons = getYearButtons()
	let numberOfButtonsHidden = 0
	for (let year of yearButtons) {
		const shouldHide = !String(year.dataset.year!).startsWith(value)
		year.classList.toggle("hide", shouldHide)
		if (shouldHide) numberOfButtonsHidden++
	}
	yearSelectorNoMatchesMessage.classList.toggle(
		"hide",
		numberOfButtonsHidden !== yearButtons.length
	)
})
yearSelectorSearch.addEventListener("keyup", e => {
	if (e.key !== "Enter") return
	const value = yearSelectorSearch.value
	const validLength =
		String(startYear).length <= value.length && value.length <= String(endYear).length
	if (!validLength) return
	const year = parseInt(value)
	const validYear = startYear <= year && year <= endYear
	if (!validYear) return
	updateYear(parseInt(value))
})

// 8. BONUS 3: Add styling to show today's date when it is visible, but not selected. UPDATE: this is done.
// 9. BONUS 4: Add a button that takes the user to today's date. It should be disabled when today's date is not visible.
const shortcutButtons = datePicker.querySelector(
	"[data-shortcut-buttons]"
) as HTMLDivElement
function toggleShortcutButtons(shouldBeHidden: boolean) {
	shortcutButtons.classList.toggle("hide", shouldBeHidden)
}
function updateShortcutButtons() {
	const dateShown = new Date(datePicker.dataset.dateToShow!)

	const todayIsVisible = isSameMonth(new Date(), dateShown)
	goToTodayButton.disabled = todayIsVisible

	const selectedDateIsVisible = isSameMonth(
		new Date(datePickerToggle.dataset.selectedDate!),
		dateShown
	)
	goToSelectedDateButton.disabled = selectedDateIsVisible
}
const goToTodayButton = shortcutButtons.querySelector(
	"[data-go-to-today-button]"
) as HTMLButtonElement
goToTodayButton.addEventListener("click", () => {
	setDateToShow(new Date().toDateString())
	updateDatePicker()
})
// 10. BONUS 5: Add a button that takes the user to the selected date. It should be disabled when the selected date is not visible.
const goToSelectedDateButton = shortcutButtons.querySelector(
	"[data-go-to-selected-date-button]"
) as HTMLButtonElement
goToSelectedDateButton.addEventListener("click", () => {
	setDateToShow(datePickerToggle.dataset.selectedDate!)
	updateDatePicker()
})
