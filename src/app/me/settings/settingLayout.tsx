// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";

// export function SettingsLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();

//   const settingsLinks = [
//     {
//       name: "General",
//       href: "/settings",
//       current: pathname === "/settings",
//     },
//     {
//       name: "Security",
//       href: "/settings/security",
//       current: pathname === "/settings/security",
//     },
//     {
//       name: "Notifications",
//       href: "/settings/notifications",
//       current: pathname === "/settings/notifications",
//     },
//     {
//       name: "Account",
//       href: "/settings/account",
//       current: pathname === "/settings/account",
//     },
//   ];

//   return (
//     <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
//       <div className="md:col-span-1">
//         <nav className="space-y-1">
//           {settingsLinks.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={cn(
//                 item.current
//                   ? "bg-gray-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400"
//                   : "text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
//                 "block px-4 py-2 rounded-md text-sm font-medium"
//               )}
//             >
//               {item.name}
//             </Link>
//           ))}
//         </nav>
//       </div>

//       <div className="md:col-span-3">
//         <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }