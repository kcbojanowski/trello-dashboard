## Overview

Frontend stack:

- Framework - [Next.js 14](https://nextjs.org/13)
- Language - [TypeScript](https://www.typescriptlang.org)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn-ui](https://ui.shadcn.com)
- Schema Validations - [Zod](https://zod.dev)
- State Management - [Zustand](https://zustand-demo.pmnd.rs)
- Search params state manager - [Nuqs](https://nuqs.47ng.com/)
- Auth - [Auth.js](https://authjs.dev/)
- Tables - [Tanstack Tables](https://ui.shadcn.com/docs/components/data-table)
- Forms - [React Hook Form](https://ui.shadcn.com/docs/components/form)
- Linting - [ESLint](https://eslint.org)
- Pre-commit Hooks - [Husky](https://typicode.github.io/husky/)
- Formatting - [Prettier](https://prettier.io)


## Pages

| Pages        | Specifications                                                                                                                      |
|:-------------|:------------------------------------------------------------------------------------------------------------------------------------|
| Signup       | Authentication with **NextAuth** supports Social logins and email logins (Enter dummy email for demo).                              |
| Boards       | Table with user trello boards ( TODO)                                                                                               |
| Dashboard    | Cards with recharts graphs for analytics.                                                                                           |
| Employee     | Tanstack tables with server side searching, filter, pagination by Nuqs which is a Type-safe search params state manager in nextjs). |
| Employee/new | A Employee Form with shadcn form (react-hook-form + zod).                                                                           |
| Profile      | Mutistep dynamic forms using react-hook-form and zod for form validation.                                                           |
| Kanban Board | A Drag n Drop task management board with dnd-kit and zustand to persist state locally.                                              |
| Not Found    | Not Found Page Added in the root level                                                                                              |

## Getting Started

Follow these steps:

- Go to frontend directory `cd frontend`
- `npm install`
- Create a `.env.local` file by copying the example environment file:
  `cp env.example.txt .env.local`
- Add the required environment variables to the `.env.local` file.
- `npm run dev`

You should now be able to access the application at http://localhost:3000

## Shadcn UI
Shadcn UI provides customizable components built with Tailwind CSS for modern UIs. This guide covers the basics of adding, styling, and using Shadcn components in the project.

* Shadcn UI is configured, Confirm it in `components.json`
* Many of the components were already imported, you can find them in `components/ui` directory
* If component in not imported, you cna import it using `npx shadcn@latest add button` where button is component found in [shadcn components list](https://ui.shadcn.com/docs/components/accordion).

##  
