declare module "next/server" {
  export const NextResponse: any;
}

declare module "next/navigation" {
  export function useRouter(...args: any[]): any;
  export function usePathname(): string | null;
  export function useSearchParams(): URLSearchParams | null;
}
