console.log("js loaded");
import { Calendar } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/styles/index.css';
// Themes
import 'vanilla-calendar-pro/styles/themes/light.css';
// Initialize the calendar
const calendar = new Calendar('#calendar');
calendar.init();
// or
// const calendarWithInput = new Calendar('#calendar-input', { inputMode: true });
// calendarWithInput.init();
