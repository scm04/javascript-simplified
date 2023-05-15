import { format } from "date-fns"

// 1. On load: populate the date picker with the current date.
const datePicker = document.querySelector(".date-picker") as HTMLDivElement
const datePickerButton = document.querySelector(
	".date-picker-button"
) as HTMLButtonElement
datePickerButton.textContent = format(new Date(), "MMMM dd, yyyy")
// 2. Date Picker Button: When clicked, toggle the visibility of the date picker.
datePickerButton.addEventListener("click", (): void => {
	datePicker.classList.toggle("show")
})
// 3. Previous Month Button: When clicked, repopulate the date picker with the previous month.
// 4. Next Month Button: When clicked, repopulate the date picker with the next month.
// 5. Date Buttons: When clicked, change the selected date to the date that was clicked and close the
//      date picker. If the date was not in the current month, repopulate the date picker with the month
//      of the selected date.
// 6. BONUS 1: If the month name is clicked, bring up a selector that allows the user to change the month.
//      Choosing a month via the month selector does not change the year.
// 7. BONUS 2: If the year is clicked, bring up a selector that allows the user to select a year, either by
//      clicking on it in the list of choices or by typing it into the search field. There will be some
//      limitations on this so that the user can't choose an invalid date, but those can be defined later.
