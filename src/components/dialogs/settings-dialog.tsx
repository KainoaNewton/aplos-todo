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
import { Plus, X } from "lucide-react";

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

  const handleModeChange = (mode: ThemeMode) => {
    updateSettings({
      ...settings,
      theme: {
        ...settings.theme,
        mode,
      },
    });
  };

  const handleColorChange = (color: string) => {
    updateSettings({
      ...settings,
      theme: {
        ...settings.theme,
        color,
      },
    });

    // Update CSS variables
    const root = document.documentElement;
    const hsl = hexToHSL(color);
    root.style.setProperty("--primary", `${hsl.h} ${hsl.s}% ${hsl.l}%`);
    root.style.setProperty("--sidebar-primary", `${hsl.h} ${hsl.s}% ${hsl.l}%`);
    root.style.setProperty("--ring", `${hsl.h} ${hsl.s}% ${hsl.l}%`);
    root.style.setProperty("--sidebar-ring", `${hsl.h} ${hsl.s}% ${hsl.l}%`);
  };

  const addCustomPreset = () => {
    if (!customPresets.includes(settings.theme.color)) {
      setCustomPresets([...customPresets, settings.theme.color]);
    }
  };

  const deleteCustomPreset = (preset: string) => {
    setCustomPresets(customPresets.filter((p) => p !== preset));
  };

  // Apply theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(settings.theme.mode);
    handleColorChange(settings.theme.color);
  }, [settings.theme.mode]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Theme Mode</Label>
            <Select
              value={settings.theme.mode}
              onValueChange={(value) => handleModeChange(value as ThemeMode)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Accent Color</Label>
            <div className="grid grid-cols-5 gap-2">
              {DEFAULT_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className="h-6 w-6 rounded-md border cursor-pointer hover:ring-2 hover:ring-primary/50"
                  style={{ backgroundColor: preset }}
                  onClick={() => handleColorChange(preset)}
                />
              ))}
            </div>
            {customPresets.length > 0 && (
              <div className="mt-2 grid grid-cols-5 gap-2">
                {customPresets.map((preset) => (
                  <div key={preset} className="relative group">
                    <button
                      className="h-6 w-6 rounded-md border cursor-pointer hover:ring-2 hover:ring-primary/50"
                      style={{ backgroundColor: preset }}
                      onClick={() => handleColorChange(preset)}
                    />
                    <div 
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCustomPreset(preset);
                      }}
                    >
                      <div className="absolute inset-0 bg-black/50 rounded-md" />
                      <X className="h-4 w-4 text-white relative z-10 cursor-pointer" />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <HexColorPicker
              color={settings.theme.color}
              onChange={handleColorChange}
              className="w-full"
            />
            <Button
              variant="outline"
              size="sm"
              className="mt-2 w-full"
              onClick={addCustomPreset}
            >
              <Plus className="mr-2 h-4 w-4" />
              Save as Preset
            </Button>
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
