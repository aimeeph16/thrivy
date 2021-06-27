const menuIcon = document.querySelector(".hamburger-menu");

/* Declaring the variable */
const navbar = document.querySelector(".navbar");

/* Creating a function to change the hamburger icon to x button */
/* Without the function, default state of the lines will be x button instead of hamburger menu icon */
menuIcon.addEventListener("click", ()=> {
	/* Toggles between x button and hamburger icon */
	navbar.classList.toggle("change");
	
});