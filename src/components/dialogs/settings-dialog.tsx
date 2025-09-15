import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTodoStore } from "@/store/todo-store";
import { ThemeMode } from "@/types/todo";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Plus, X, Monitor, Sun, Moon } from "lucide-react";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DEFAULT_PRESETS = [
  "#8B5CF6",
  "#F97316",
  "#0EA5E9",
  "#9b87f5",
  "#7E69AB",
];

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const { settings, updateSettings } = useTodoStore();
  const [customPresets, setCustomPresets] = useState<string[]>([]);

  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const applyTheme = (mode: ThemeMode, color: string) => {
    const root = document.documentElement;
    const effectiveMode = mode === "system" ? getSystemTheme() : mode;
    
    root.classList.remove("light", "dark");
    root.classList.add(effectiveMode);
    
    const hsl = hexToHSL(color);
    root.style.setProperty("--primary", `${hsl.h} ${hsl.s}% ${hsl.l}%`);
    root.style.setProperty("--sidebar-primary", `${hsl.h} ${hsl.s}% ${hsl.l}%`);
    root.style.setProperty("--ring", `${hsl.h} ${hsl.s}% ${hsl.l}%`);
    root.style.setProperty("--sidebar-ring", `${hsl.h} ${hsl.s}% ${hsl.l}%`);
  };

  const handleModeChange = (mode: ThemeMode) => {
    updateSettings({
      ...settings,
      theme: {
        ...settings.theme,
        mode,
      },
    });
    applyTheme(mode, settings.theme.color);
  };

  const handleColorChange = (color: string) => {
    updateSettings({
      ...settings,
      theme: {
        ...settings.theme,
        color,
      },
    });
    applyTheme(settings.theme.mode, color);
  };

  const addCustomPreset = () => {
    if (!customPresets.includes(settings.theme.color)) {
      setCustomPresets([...customPresets, settings.theme.color]);
    }
  };

  const deleteCustomPreset = (preset: string) => {
    setCustomPresets(customPresets.filter((p) => p !== preset));
  };

  // Apply theme changes and listen for system theme changes
  useEffect(() => {
    applyTheme(settings.theme.mode, settings.theme.color);
    
    if (settings.theme.mode === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        applyTheme("system", settings.theme.color);
      };
      
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [settings.theme.mode, settings.theme.color]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Theme</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={settings.theme.mode === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => handleModeChange("light")}
                className="flex flex-col items-center gap-1 h-auto py-3"
              >
                <Sun className="h-4 w-4" />
                <span className="text-xs">Light</span>
              </Button>
              <Button
                variant={settings.theme.mode === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => handleModeChange("dark")}
                className="flex flex-col items-center gap-1 h-auto py-3"
              >
                <Moon className="h-4 w-4" />
                <span className="text-xs">Dark</span>
              </Button>
              <Button
                variant={settings.theme.mode === "system" ? "default" : "outline"}
                size="sm"
                onClick={() => handleModeChange("system")}
                className="flex flex-col items-center gap-1 h-auto py-3"
              >
                <Monitor className="h-4 w-4" />
                <span className="text-xs">System</span>
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="text-sm font-medium">Accent Color</Label>
            <div className="space-y-3">
              <div className="grid grid-cols-8 gap-2">
                {DEFAULT_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    className={`h-8 w-8 rounded-lg border-2 cursor-pointer transition-all hover:scale-110 ${
                      settings.theme.color === preset 
                        ? "border-foreground scale-110" 
                        : "border-border hover:border-foreground/50"
                    }`}
                    style={{ backgroundColor: preset }}
                    onClick={() => handleColorChange(preset)}
                  />
                ))}
              </div>
              
              {customPresets.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Custom Colors</Label>
                  <div className="grid grid-cols-8 gap-2">
                    {customPresets.map((preset) => (
                      <div key={preset} className="relative group">
                        <button
                          className={`h-8 w-8 rounded-lg border-2 cursor-pointer transition-all hover:scale-110 ${
                            settings.theme.color === preset 
                              ? "border-foreground scale-110" 
                              : "border-border hover:border-foreground/50"
                          }`}
                          style={{ backgroundColor: preset }}
                          onClick={() => handleColorChange(preset)}
                        />
                        <button
                          className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-background border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:border-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteCustomPreset(preset);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <HexColorPicker
                  color={settings.theme.color}
                  onChange={handleColorChange}
                  className="w-full !h-32"
                />
                <div className="flex items-center gap-2">
                  <div 
                    className="h-8 w-8 rounded-lg border"
                    style={{ backgroundColor: settings.theme.color }}
                  />
                  <span className="text-sm font-mono">{settings.theme.color}</span>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={addCustomPreset}
              >
                <Plus className="mr-2 h-4 w-4" />
                Save Current Color
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helper function to convert hex to HSL
function hexToHSL(hex: string) {
  // Remove the hash if it exists
  hex = hex.replace(/^#/, '');

  // Parse the hex values
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}
