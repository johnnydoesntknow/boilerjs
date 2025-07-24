/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // IOPn Brand Colors with enhanced variations
        "bright-aqua": {
          DEFAULT: "#15BFC2",
          50: "#E6F9FA",
          100: "#CCF3F4",
          200: "#99E7EA",
          300: "#66DBDF",
          400: "#33CFD5",
          500: "#15BFC2",
          600: "#119CA0",
          700: "#0D757A",
          800: "#094E53",
          900: "#05272B",
        },
        "violet-indigo": {
          DEFAULT: "#7D40B6",
          50: "#F3E8FF",
          100: "#E7D1FF",
          200: "#CFA3FF",
          300: "#B775FF",
          400: "#9F47FF",
          500: "#7D40B6",
          600: "#6433A3",
          700: "#4B2690",
          800: "#32197D",
          900: "#190C6A",
        },
        "amber-rust": {
          DEFAULT: "#CA6B0D",
          50: "#FEF3E2",
          100: "#FDE7C5",
          200: "#FBCF8B",
          300: "#F9B751",
          400: "#F79F17",
          500: "#CA6B0D",
          600: "#A1560A",
          700: "#784108",
          800: "#4F2C05",
          900: "#261603",
        },
        "crimson-red": {
          DEFAULT: "#CB121C",
          50: "#FEE7E8",
          100: "#FDCFD1",
          200: "#FB9FA3",
          300: "#F96F75",
          400: "#F73F47",
          500: "#CB121C",
          600: "#A20E16",
          700: "#7A0B11",
          800: "#51070B",
          900: "#290406",
        },
        "deep-taupe": {
          DEFAULT: "#59443C",
          50: "#F0EDEB",
          100: "#E1DBD7",
          200: "#C3B7AF",
          300: "#A59387",
          400: "#876F5F",
          500: "#59443C",
          600: "#473630",
          700: "#352924",
          800: "#241B18",
          900: "#120E0C",
        },
        "midnight-indigo": {
          DEFAULT: "#1F2750",
          50: "#E8E9F0",
          100: "#D1D3E1",
          200: "#A3A7C3",
          300: "#757BA5",
          400: "#474F87",
          500: "#1F2750",
          600: "#191F40",
          700: "#131730",
          800: "#0C1020",
          900: "#060810",
        },
        "davy-gray": {
          DEFAULT: "#646466",
          50: "#F2F2F2",
          100: "#E5E5E5",
          200: "#CBCBCB",
          300: "#B1B1B1",
          400: "#979797",
          500: "#646466",
          600: "#505052",
          700: "#3C3C3E",
          800: "#282829",
          900: "#141415",
        },
        "warm-beige": {
          DEFAULT: "#D1BAA6",
          50: "#FAF8F5",
          100: "#F5F1EB",
          200: "#EBE3D7",
          300: "#E1D5C3",
          400: "#D7C7AF",
          500: "#D1BAA6",
          600: "#A79585",
          700: "#7D7064",
          800: "#534A43",
          900: "#2A2522",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-iopn": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(21, 191, 194, 0.7)" },
          "70%": { boxShadow: "0 0 0 10px rgba(21, 191, 194, 0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        rotate: {
          "100%": { transform: "rotate(360deg)" },
        },
        "neon-pulse": {
          "0%, 100%": {
            boxShadow:
              "0 0 5px rgba(21, 191, 194, 0.5), 0 0 10px rgba(21, 191, 194, 0.5), 0 0 15px rgba(21, 191, 194, 0.5)",
          },
          "50%": {
            boxShadow:
              "0 0 10px rgba(21, 191, 194, 0.8), 0 0 20px rgba(21, 191, 194, 0.8), 0 0 30px rgba(21, 191, 194, 0.8)",
          },
        },
        "cyber-glow": {
          "0%": {
            boxShadow: "0 0 5px rgba(125, 64, 182, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 20px rgba(125, 64, 182, 0.6), 0 0 30px rgba(21, 191, 194, 0.4)",
          },
          "100%": {
            boxShadow: "0 0 5px rgba(125, 64, 182, 0.3)",
          },
        },
        "holo-sweep": {
          "0%": {
            backgroundPosition: "0 0",
          },
          "100%": {
            backgroundPosition: "100% 0",
          },
        },
        "data-flow": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
        glitch: {
          "0%": {
            transform: "translate(0)",
          },
          "33%": {
            transform: "translate(5px, -3px) skew(-5deg)",
          },
          "66%": {
            transform: "translate(-5px, 3px) skew(5deg)",
          },
          "100%": {
            transform: "translate(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient-shift": "gradient-shift 15s ease infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-iopn": "pulse-iopn 2s infinite",
        shimmer: "shimmer 2s infinite",
        rotate: "rotate 4s linear infinite",
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "cyber-glow": "cyber-glow 3s ease-in-out infinite",
        "holo-sweep": "holo-sweep 5s linear infinite",
        "data-flow": "data-flow 8s linear infinite",
        glitch: "glitch 0.5s steps(2, end) infinite",
      },
      backgroundImage: {
        "gradient-iopn-primary": "linear-gradient(135deg, #15BFC2 0%, #7D40B6 100%)",
        "gradient-iopn-secondary": "linear-gradient(135deg, #7D40B6 0%, #CA6B0D 100%)",
        "gradient-iopn-accent": "linear-gradient(135deg, #CA6B0D 0%, #CB121C 100%)",
        "gradient-cyber": "linear-gradient(135deg, #15BFC2 0%, #7D40B6 50%, #CA6B0D 100%)",
        "gradient-neon": "linear-gradient(45deg, #15BFC2, #7D40B6, #CB121C, #CA6B0D)",
        "gradient-iopn-primary-dark": "linear-gradient(135deg, #0D757A 0%, #4B2690 100%)",
        "gradient-iopn-secondary-dark": "linear-gradient(135deg, #4B2690 0%, #784108 100%)",
        "gradient-iopn-accent-dark": "linear-gradient(135deg, #784108 0%, #7A0B11 100%)",
      },
      boxShadow: {
        "neon-aqua": "0 0 5px #15BFC2, 0 0 10px #15BFC2, 0 0 15px #15BFC2, 0 0 20px #15BFC2",
        "neon-violet": "0 0 5px #7D40B6, 0 0 10px #7D40B6, 0 0 15px #7D40B6, 0 0 20px #7D40B6",
        cyber: "0 4px 20px rgba(21, 191, 194, 0.3), 0 0 40px rgba(125, 64, 182, 0.2)",
        "cyber-hover": "0 8px 30px rgba(21, 191, 194, 0.4), 0 0 60px rgba(125, 64, 182, 0.3)",
        neumorphism: "8px 8px 16px rgba(163, 177, 198, 0.6), -8px -8px 16px rgba(255, 255, 255, 0.5)",
        "neumorphism-inset":
          "inset 8px 8px 16px rgba(163, 177, 198, 0.6), inset -8px -8px 16px rgba(255, 255, 255, 0.5)",
        // Light mode shadows
        "light-card": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "light-card-hover": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "light-button": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "light-button-hover": "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}