import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    // custom tailwind themes
    theme: {
        extend: {
            container: {
                padding: "2rem",
                screens: {
                    "2xl": "1400px",
                },
                center: true,
            },
            colors: {
                "background": "var(--background)",
                "foreground": "var(--foreground)",
                
                "primary": "hsl(var(--primary))",
                "primary-foreground": "hsl(var(--primary-foreground)",
    
                "secondary": "hsl(var(--secondary))",
                "secondary-foreground": "hsl(var(--secondary-foreground)",
                
                "accent": "hsl(var(--accent))",
                "accent-foreground": "hsl(var(--accent-foreground)",
    
                "muted": "hsl(var(--muted))",
                "muted-foreground": "hsl(var(--muted-foreground)",
                
                "card": "hsl(var(--card))",
                "card-foreground": "hsl(var(--card-foreground)",
                
                "popover": "hsl(var(--popover))",
                "popover-foreground": "hsl(var(--popover-foreground)",
                
                "destructive": "hsl(var(--destructive))",
                "destructive-foreground": "hsl(var(--destructive-foreground)",
                
                "border": "hsl(var(--border))",
                "input":  "hsl(var(--input))",
            },
            borderRadius: {
                lg: `var(--radius)`,
                md: `calc(var(--radius) - 2px)`,
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans"],
            },
        },
    },
    // tailwind plugins
    plugins: [require("tailwindcss-animate")],
} satisfies Config;