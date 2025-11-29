import BackLight from "../images/common/back-light.svg";
import BackDark from "../images/common/back-dark.svg";

export default function PrivacyPolicy() {
  const label = "سیاست حفظ حریم خصوصی";

  const goBack = () => window.history.back();

  return (
    <div className="w-full h-[100dvh] flex flex-col px-[4dvw] pt-[4dvw] pb-[10dvw] gap-[4dvw]">
      <div className="w-full flex justify-between items-center">
        <div>
          <span className="text-[7dvw]">{label}</span>
          <p className="text-gray_002 -mt-1 text-[5dvw]">
            آخرین بروزرسانی: 8 آذر 1404، 15:22
          </p>
        </div>
        <button onClick={goBack}>
          <img
            alt="برشگت"
            className="w-[7dvw] h-[7dvw] hidden dark:block"
            src={BackLight}
          />
          <img
            alt="برشگت"
            className="w-[7dvw] h-[7dvw] block dark:hidden"
            src={BackDark}
          />
        </button>
      </div>
      <div className="w-full">
        <p className="mb-[6dvw] leading-7">
          دات‌بست یک پلتفرم رزرو خدمات زیبایی است که برای ارائه تجربه‌ای ایمن،
          قابل‌اعتماد و حرفه‌ای، لازم است برخی اطلاعات کاربران را جمع‌آوری و
          پردازش کند. این سند توضیح می‌دهد چه داده‌هایی دریافت می‌شود، چرا
          دریافت می‌شود و چگونه از آن محافظت می‌کنیم.
        </p>

        <h2 className="text-xl font-semibold text-primary mb-[4dvw]">
          ۱. داده‌هایی که جمع‌آوری می‌کنیم
        </h2>

        <h3 className="text-lg font-semibold mb-[2dvw]">
          ۱.۱ کاربران (مشتریان)
        </h3>
        <ul className="list-disc pr-[6dvw] mb-[6dvw] dark:text-gray_001 text-gray_005 leading-7">
          <li>نام و نام خانوادگی</li>
          <li>شماره موبایل</li>
          <li>کد ملی</li>
          <li>تاریخ تولد</li>
          <li>شماره شبا (در صورت نیاز به بیعانه)</li>
        </ul>

        <h3 className="text-lg font-semibold  mb-[2dvw]">
          ۱.۲ آرایشگران و سالن‌ها
        </h3>
        <ul className="list-disc pr-[6dvw] mb-[8dvw] dark:text-gray_001 text-gray_005 leading-7">
          <li>اطلاعات هویتی و تماس</li>
          <li>لیست خدمات و قیمت پایه</li>
          <li>شماره شبا برای تسویه حساب</li>
        </ul>

        <h2 className="text-xl font-semibold text-primary mb-[4dvw]">
          ۲. هدف استفاده از داده‌ها
        </h2>
        <ul className="list-disc pr-[6dvw] mb-[8dvw] dark:text-gray_001 text-gray_005 leading-7">
          <li>احراز هویت و تأیید جنسیت کاربران</li>
          <li>ایجاد حساب کاربری</li>
          <li>نمایش خدمات سالن‌ها و امکان رزرو</li>
          <li>پرداخت و تسویه تراکنش‌های مالی مربوط به بیعانه</li>
          <li>افزایش امنیت و جلوگیری از دسترسی غیرمجاز</li>
        </ul>

        <h2 className="text-xl font-semibold text-primary mb-[4dvw]">
          ۳. اشتراک‌گذاری داده‌ها
        </h2>
        <p className=" mb-[6dvw] leading-7">
          دات‌بست اطلاعات کاربران را با هیچ مجموعه‌ای به اشتراک نمی‌گذارد، مگر
          برای ارسال داده‌های لازم به سرویس تأیید جنسیت بر اساس کد ملی.
        </p>

        <h2 className="text-xl font-semibold text-primary mb-[4dvw]">
          ۴. حقوق کاربران
        </h2>
        <p className="mb-[4dvw] leading-7">
          کاربران می‌توانند درخواست حذف کامل حساب و داده‌های خود را ارسال کنند.
          برای این کار، از طریق ایمیل زیر اقدام کنند:
        </p>
        <p className="mb-[8dvw] text-[4.5dvw] font-semibold !font-sans">
          dotbest.ir@gmail.com
        </p>

        <h2 className="text-xl font-semibold text-primary mb-[4dvw]">
          ۵. امنیت داده‌ها
        </h2>
        <ul className="list-disc pr-[6dvw] mb-[8dvw] dark:text-gray_001 text-gray_005 leading-7">
          <li>ذخیره داده‌ها در پایگاه‌داده ایمن</li>
          <li>محدودیت دسترسی برای افراد مجاز</li>
          <li>احراز هویت پیامکی مرتبط با کد ملی</li>
          <li>اجرای استانداردهای امنیتی جهت جلوگیری از دسترسی غیرمجاز</li>
        </ul>

        <h2 className="text-xl font-semibold text-primary mb-[4dvw]">
          ۶. کوکی‌ها و ابزارهای ردیابی
        </h2>
        <p className=" mb-[8dvw] leading-7">
          دات‌بست هیچ نوع کوکی تحلیلی یا ابزار ردیابی رفتار کاربر استفاده
          نمی‌کند.
        </p>

        <h2 className="text-xl font-semibold text-primary mb-[4dvw]">
          ۷. داده‌های موقعیت مکانی
        </h2>
        <p className=" mb-[8dvw] leading-7">
          نسخه فعلی برنامه هیچ داده مکانی (لوکیشن دقیق یا تقریبی) از کاربران
          دریافت نمی‌کند.
        </p>
      </div>
    </div>
  );
}
