import { Box, Typography } from "@mui/material";

export default function StudyGuidesSection() {
  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#e8f5e9",
        borderRadius: 2,
        maxHeight: "400px", // Giới hạn chiều cao
        overflowY: "auto", // Thêm thanh cuộn nếu nội dung quá dài
      }}
    >
      <Typography variant="h6" gutterBottom>
        Study Guides
      </Typography>

      <Typography variant="h6">1. React Overview</Typography>
      <Typography paragraph>
        React is a JavaScript library for building dynamic and interactive user
        interfaces. It was developed by Facebook and is widely used for
        single-page applications (SPA) and complex web applications.
      </Typography>
      <Typography paragraph>
        React uses a declarative approach, making UI development more
        predictable and easier to debug. With React, developers can build
        reusable components that manage their own state.
      </Typography>

      <Typography variant="h6">2. Key Features of React</Typography>
      <Typography paragraph>
        - **Components**: React applications are built using components, which
        are independent and reusable pieces of UI. - **Virtual DOM**: React uses
        a virtual representation of the DOM to efficiently update the UI and
        improve performance. - **JSX (JavaScript XML)**: A syntax extension that
        allows writing HTML-like code inside JavaScript. - **State and Props**:
        `State` manages internal component data, while `Props` allow data to be
        passed between components.
      </Typography>

      <Typography variant="h6">3. JavaScript Basics</Typography>
      <Typography paragraph>
        JavaScript is a high-level programming language that enables interactive
        and dynamic web pages. It is widely used for front-end and back-end
        development.
      </Typography>
      <Typography paragraph>
        Key concepts include variables (`let`, `const`, `var`), functions (arrow
        functions, callbacks, async/await), and event handling (click events,
        form submission).
      </Typography>

      <Typography variant="h6">
        4. ES6 and Modern JavaScript Features
      </Typography>

      <Typography variant="h6">5. React Hooks</Typography>
      <Typography paragraph>
        React hooks allow functional components to use state and lifecycle
        features. Common hooks include: - `useState`: Manages state within a
        component. - `useEffect`: Handles side effects like API calls and
        subscriptions. - `useContext`: Allows access to global state without
        prop drilling.
      </Typography>

      <Typography variant="h6">6. Additional Topics</Typography>
      <Typography paragraph>
        - **React Router**: A library for handling navigation in React apps. -
        **Redux**: A state management library for large-scale applications. -
        **API Calls**: Fetching data using `fetch` or `axios`. - **Testing**:
        Writing unit and integration tests using Jest and React Testing Library.
      </Typography>
    </Box>
  );
}
