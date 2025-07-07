import React, { useMemo } from "react";
import { TextProps } from "../schema"

export default function VideoPreview({ textProps }: { textProps: TextProps }) {
  const styles: React.CSSProperties = useMemo(() => {
    const baseStyle: React.CSSProperties = {}
    baseStyle.fontFamily = textProps.fontFamily;
    baseStyle.fontWeight = textProps.fontWeight;
    baseStyle.fontSize = `${textProps.fontSize}px`;
    baseStyle.color = textProps.color;
    baseStyle.backgroundColor = textProps.backgroundColor;
    baseStyle.letterSpacing = textProps.letterSpacing;
    baseStyle.opacity = textProps.opacity;
    baseStyle.textAlign = textProps.textAlign;

    return baseStyle;
  }, [textProps]);

  console.log("VideoPreview textProps:", textProps);
  console.log("VideoPreview styles:", styles);

  return (
    <>
      <video
        className="w-full h-full object-cover"
        src="/placeholder-video.mp4"
        controls={false}
        autoPlay={false}
        muted
      />
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 border-2 border-[#8B43F7] rounded-full" />
      <div className="absolute top-2" style={styles}> {textProps.body}</div>
    </>
  )
}
