import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="bg-neutral-100 text-lime-950 dark:text-lime-50 dark:bg-gray-700 min-h-screen">
        {children}
      </div>
    </div>
  );
}
