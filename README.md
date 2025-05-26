# Portfolio Website

A modern portfolio website built with Next.js, Tailwind CSS, and Framer Motion. This project showcases a responsive and animated portfolio website with dark mode support and a grid overlay feature.

## Features

-   Responsive design that works on all devices
-   Dark mode support
-   Smooth scrolling navigation
-   Animated components using Framer Motion
-   Project showcase with detailed project pages
-   Contact form
-   Grid overlay feature
-   Modern and clean UI

## Technologies Used

-   Next.js 14
-   TypeScript
-   Tailwind CSS
-   Framer Motion
-   Heroicons

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── projects/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── GridOverlay.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   └── Projects.tsx
└── types/
    └── framer-motion.d.ts
```

## Customization

1. Update the content in each component to match your personal information
2. Replace the placeholder images with your own
3. Modify the color scheme in `tailwind.config.ts`
4. Add your own projects to the projects array in `Projects.tsx` and `[id]/page.tsx`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
