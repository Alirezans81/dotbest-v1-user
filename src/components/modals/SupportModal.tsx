import { Formik } from "formik";
import Dropdown from "../Dropdown";
import Button from "../Button";

const supportSubjects = ["محتوای نا‌مناسب", "مشکل در رزرو", "دیگر"];

export default function SupportModal() {
  return (
    <div className="w-full flex flex-col gap-[4dvw]">
      <Formik initialValues={{ subject: "", message: "" }} onSubmit={() => {}}>
        {({
          handleBlur,
          handleChange,
          values,
          handleSubmit,
          setFieldValue,
        }) => (
          <>
            <div className="flex flex-col gap-[2dvw]">
              <span className="text-[5.5dvw]">مشکل خود را در زیر بنویسید</span>
              <div className="w-full flex flex-col gap-[3.5dvw]">
                <Dropdown
                  options={supportSubjects}
                  onChange={(e) => setFieldValue("subject", e.value)}
                  placeholder="موضوع"
                />
                <textarea
                  className="w-full bg-transparent min-h-[40dvh] transition-all duration-100 border rounded-[5dvw] border-gray_001 px-[5dvw] dark:border-gray_004 py-[2.5dvw] focus:outline-black"
                  placeholder="بنویسید..."
                />
              </div>
            </div>
            <Button type="button" label="تایید" onClick={handleSubmit} />
          </>
        )}
      </Formik>
    </div>
  );
}
