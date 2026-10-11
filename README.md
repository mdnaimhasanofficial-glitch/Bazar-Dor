# 🛒 বাজার দর (Bazar Dor)

**বাজার দর** হলো একটি ওয়েবাসইট যা দেশের বাজারে নিত্যপ্রয়োজনীয় জিনিসপত্রের বর্তমান দাম, দামের ওঠানামা এবং ক্যাটাগরি ভিত্তিক পণ্যের সঠিক তথ্য ট্র্যাক করতে সাহায্য করে। এই প্ল্যাটফর্মে ব্যবহারকারীরা প্রতিদিনের বাজারদর লাইভ ট্র্যাক করতে এবং অ্যানালাইসিস দেখতে পারবেন।

---

## 🚀 মূল বৈশিষ্ঠ্যসমূহ (Key Features)

1. **📊 লাইভ প্রাইস ট্র্যাকিং ও মার্কি নোটিফিকেশন (Price Ticker):** হোম পেজে নিত্যপ্রয়োজনীয় পণ্যের সঠিক দাম এবং একটি ইনফিনিট স্ক্রলিং মার্কি স্ট্রিপের মাধ্যমে রিয়েল-টাইম দামের পরিবর্তন প্রদর্শন।
2. **📈 দাম বাড়া ও কমার নোটিশ (Top Risers & Fallers):** “আজ দাম বেড়েছে ▲” এবং “আজ দাম কমেছে ▼” সেকশনে সর্বোচ্চ মূল্যের পরিবর্তন হওয়া শীর্ষ ৬টি পণ্য আলাদাভাবে দেখার সুবিধা।
3. **🔀 বাংলা সংখ্যা সহ সর্টিং (Bengali Numeral Sorting):** ক্যাটাগরি পেজে পণ্যের দাম 'কম থেকে বেশি' এবং 'বেশি থেকে কম' ফিল্টার করার আধুনিক ড্রপডাউন সুবিধা (যা বাংলা সংখ্যা সঠিকভাবে ক্যালকুলেট করে)।
4. **🔐 বেটার-অথ দিয়ে অথেন্টিকেশন (BetterAuth & Protected Routes):** Email/Password, Google এবং GitHub দিয়ে নিরাপদ সাইন-ইন/সাইন-আপ এবং প্রোডাক্ট ডিটেইলস পেজের জন্য প্রটেক্টেড রুট কন্ট্রোল।
5. **👤 প্রোফাইল তথ্য আপডেট (Update User Profile):** সাইন-ইন করা ব্যবহারকারী মাই প্রোফাইল রুট থেকে নিজের নাম আপডেট করার সুবিধা।
6. **📱 সম্পূর্ণ রেসপন্সিভ ও লোডিং স্কেলেটন:** মোবাইল, ট্যাবলেট এবং ডেস্কটপে স্বাচ্ছন্দ্যে ব্যবহারের জন্য রেসপন্সিভ ডিজাইন এবং ডেটা ফেচিংয়ের সময় দৃষ্টিনন্দন স্কেলেটন লোডার।

---

## 🛠️ ব্যবহৃত টেকনোলজি (Technologies Used)

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** JavaScript / TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & Component Library (DaisyUI / Hero UI)
- **Authentication:** [BetterAuth](https://better-auth.com/) (Email/Password, Google, GitHub OAuth)
- **Database:** MongoDB
- **API:** Cloudflare Workers API / Programming Hero Open API
- **Notifications:** React Hot Toast
- **Deployment:** Vercel

---

## 🔗 প্রয়োজনীয় এপিআই ও এন্ডপয়েন্ট (API Endpoints)

- **Base URL:** `https://openapi.programming-hero.com/api/bazardor`
- **All Products:** `/products`
- **Single Product:** `/products/:id`
- **Categories:** `/categories`
- **Category Wise Filter:** `/products?category=:slug`

---

## 💻 লোকাল এনভায়রনমেন্টে প্রজেক্ট রান করার নিয়ম (Getting Started)

আপনার কম্পিউটারে প্রজেক্টটি লোকালি রান করতে নিচের ধাপগুলো অনুসরণ করুন:

### ১. রিপোজিটরি ক্লোন করুন
```bash
git clone [https://github.com/your-username/bazar-dor.git](https://github.com/your-username/bazar-dor.git)
cd bazar-dor