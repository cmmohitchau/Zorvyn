### Setup Instruction

1. Clone the repo(or fork https://github.com/cmmohitchau/Zorvyn)

    ```sh
    git clone https://github.com/cmmohitchau/Zorvyn
    ```

2. Go to the project folder

   ```sh
   cd zorvyn-assignment
   ```

3. Install packages with npm

   ```sh
   npm install
   ```

4. Run the project in development mode

   ```sh
   npm run dev
   ```

### Overview Approach
The application is built using a component-based architecture in React + TypeScript + Vite  for fast development.

- State management is handled using Redux for - predictable data flow.
- Charts are implemented using Recharts for responsive data visualization.
- UI styling is done using Tailwind CSS with support for dark mode.
- The layout is divided into reusable components such as Sidebar, Cards, and Charts.

The focus was on:

- Clean separation of concerns
- Reusability of components
- Performance and responsiveness


### Features
- Summary for Income , Expense and Balance according to the months and Year.
- Balance Trend for the visualization of the balance across months.
- Spending Breaksown for visualization of the spending through categories and also sorted in descending order based on the spending.
- Bar Chart to visualize the comparison between income and expense.
- Transaction table to see, update and delete the transactions.
- RBAC implemented. Only admin can add , edit or delete the transactions.
- Sorting and filtering are implemented on the transaction table.
- Can switch between admin and viewer.
- Sidebar navigation for easy access(via react-router-dom).
- Dark mode is implemented for the eye protection.
- Responsive design for different screen sizes.
- Tooltip insights on hover.
