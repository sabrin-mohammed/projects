# Final Project - Web Application

## Introduction
This is the final project for the CSE383 course. The goal of this project is to demonstrate the skills learned throughout the entire course, including HTML, CSS, JavaScript, jQuery, Bootstrap, and AJAX.

The project consists of a three-page website with the following pages:
1. Landing Page
2. Stocks Page
3. History Lookup Page

## Features
1. **Landing Page**: Displays your personal information (name, class, assignment, etc.) and includes a picture and explanation of your system.
2. **Stocks Page**:
   - Allows the user to select a stock exchange from a dropdown list.
   - Displays all stocks from the selected exchange in another dropdown list.
   - When a stock is selected, the user can:
     - View details about the stock, including the closing prices for the last 7 days.
     - View the latest news about the selected stock.
3. **History Lookup Page**:
   - Allows the user to enter a date and the maximum number of lines to display.
   - Retrieves a list of all Polygon API requests made on the specified date, up to the requested number of lines.
   - Displays the date/time of the request, the type (details/news), and the stock.
   - Provides a way for the user to click on a specific request to display the same information as in the Stocks Page.

## Technical Details
- The project uses HTML, CSS, JavaScript, jQuery, Bootstrap, and AJAX.
- All CSS, AJAX, and JavaScript code is in external files.
- The project is hosted on an OpenStack instance and the code is managed using GitLab.
- The Polygon API is used to retrieve stock information, and a PHP REST server is used to store the request and response data in a SQLite database.
