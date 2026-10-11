"use client"; // client boundary

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "default";

  const handleSortChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    
    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span>সাজান</span>
      <select
        value={currentSort}
        onChange={handleSortChange}
        className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-800 outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
      >
        <option value="default">ডিফল্ট</option>
        <option value="low-to-high">দাম: কম থেকে বেশি</option>
        <option value="high-to-low">দাম: বেশি থেকে কম</option>
      </select>
    </div>
  );
}