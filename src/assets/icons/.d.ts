// src/types/assets.d.ts
declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "../../assets/icons" {
  export const chatIcon: any;
  export const homeIcon: any;
  export const mapIcon: any;
  export const profileIcon: any;
  export const kakaoButton: any;
  export const kakaoIcon: any;
}
