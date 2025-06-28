"use client";

import { HexColorPicker } from "react-colorful";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface Props {
    value: string;
    onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" style={{ backgroundColor: value }} />
            </PopoverTrigger>
            <PopoverContent className="p-2">
                <HexColorPicker color={value} onChange={onChange} />
            </PopoverContent>
        </Popover>
    );
}
