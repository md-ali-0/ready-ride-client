import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

    const toggleTheme = () => {
        const newTheme = isDarkMode ? "light" : "dark";
        setTheme(newTheme);
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div>
            <Button variant={"outline"} size={"icon"} onClick={toggleTheme}>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
        </div>
    );
}
