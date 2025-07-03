export const IMAGES = {
  previewPic1: '/previewPic1.webp',
  previewPic2: '/previewPic2.webp',
  previewPic3: '/previewPic3.webp',
  previewPic4: '/previewPic4.webp',
  previewPic5: '/previewPic5.webp',
  previewPic6: '/previewPic6.webp',
  previewPic7: '/previewPic6.webp',
  previewPic8: '/previewPic5.webp',
} as const;

export type ImageKey = keyof typeof IMAGES;
export type ImagePath = (typeof IMAGES)[ImageKey]; 