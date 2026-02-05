declare module "next/app" {
  export type AppProps = any;
}
declare module "next/head" {
  const Head: any;
  export default Head;
}
declare module "next/document" {
  const Document: any;
  export default Document;
}
declare module "next/link" {
  const Link: any;
  export default Link;
}

declare module "next/router" {
  export function useRouter(...a: any[]): any;
}
