# Angular Ag-Grid Implementation

This repository contains an Angular application that demonstrates how to implement Ag-Grid, a feature-rich data grid, in an Angular project. Ag-Grid is used to display data retrieved from a public API in a tabular format. The project includes components for displaying the data table and fetching data from an API.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
  - [DemoTableComponent](#demotablecomponent)
  - [ApiDataService](#apidataservice)
  - [AppComponent](#appcomponent)
- [Example](#example)
- [License](#license)

## Prerequisites

Before running this Angular application, make sure you have the following prerequisites installed:

- [Node.js and npm](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- [Angular Material](https://material.angular.io/)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd angular-ag-grid-demo
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

## Usage

To run the Angular application, use the following command:

```bash
ng serve
```

The application will be available at `http://localhost:4200/` in your web browser.

## Components

### DemoTableComponent

The `DemoTableComponent` is responsible for rendering the Ag-Grid table. It accepts two inputs: `tableRows` (data to be displayed in the table) and `tableHeaders` (column definitions). It also uses the `AgGridAngular` component from Ag-Grid.

### ApiDataService

The `ApiDataService` service is used to fetch data from a public API. It makes an HTTP GET request to the [Public APIs](https://api.publicapis.org/entries) endpoint and provides the data to the application.

### AppComponent

The `AppComponent` is the root component of the application. It initializes the data fetching process in its `ngOnInit` method and handles the data received from the `ApiDataService`. It defines `tableRows` and `tableHeaders` for displaying the data and manages the loading state.

## Example

This application fetches data from a public API and displays it in an Ag-Grid table. The data includes information about various public APIs, such as their name, description, and URL. The "Link" column in the table provides clickable links to the API documentation.


![AgGrid Example.png](AgGrid%20Example.png)
