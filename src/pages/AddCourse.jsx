import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";
import CourseCard from "../components/CourseCard";
import { CATEGORIES, LEVELS } from "../utils/format";

// Yup ვალიდაციის სქემა
const schema = Yup.object({
  title: Yup.string()
    .trim()
    .min(5, "მინიმუმ 5 სიმბოლო")
    .max(80, "მაქსიმუმ 80 სიმბოლო")
    .required("სახელწოდება სავალდებულოა"),
  instructor: Yup.string()
    .trim()
    .min(3, "მინიმუმ 3 სიმბოლო")
    .required("ლექტორის სახელი სავალდებულოა"),
  category: Yup.string()
    .oneOf(CATEGORIES, "აირჩიეთ კატეგორია")
    .required("კატეგორია სავალდებულოა"),
  level: Yup.string()
    .oneOf(LEVELS, "აირჩიეთ დონე")
    .required("დონე სავალდებულოა"),
  price: Yup.number()
    .typeError("შეიყვანეთ რიცხვი")
    .min(0, "ფასი ვერ იქნება უარყოფითი")
    .max(2000, "მაქსიმუმ 2000 ₾")
    .required("ფასი სავალდებულოა"),
  duration: Yup.number()
    .typeError("შეიყვანეთ რიცხვი")
    .integer("მთელი რიცხვი")
    .min(1, "მინიმუმ 1 საათი")
    .max(500, "მაქსიმუმ 500 საათი")
    .required("ხანგრძლივობა სავალდებულოა"),
  description: Yup.string()
    .trim()
    .min(30, "მინიმუმ 30 სიმბოლო")
    .max(500, "მაქსიმუმ 500 სიმბოლო")
    .required("აღწერა სავალდებულოა"),
});

const initialValues = {
  title: "",
  instructor: "",
  category: "",
  level: "",
  price: "",
  duration: "",
  description: "",
};

function FieldRow({ name, label, children }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {children}
      <ErrorMessage name={name} component="p" className="field-error" />
    </div>
  );
}

function AddCourse() {
  const titleRef = useRef(null);
  const navigate = useNavigate();
  const { addCourse } = useData();
  const { showToast } = useToast();

  // გვერდის ჩატვირთვისას ფოკუსი პირველ ველზე
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    addCourse({
      ...values,
      title: values.title.trim(),
      price: Number(values.price),
      duration: Number(values.duration),
    });
    showToast("კურსი წარმატებით დაემატა");
    resetForm();
    navigate("/"); // გადამისამართება მთავარ გვერდზე
  };

  return (
    <>
      <div className="page-head">
        <h1>ახალი კურსის დამატება</h1>
        <p className="muted">შეავსეთ ფორმა და კურსი გამოჩნდება კატალოგში.</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <div className="form-layout">
            <Form className="card form" noValidate>
              <FieldRow name="title" label="კურსის სახელწოდება">
                <Field
                  id="title"
                  name="title"
                  innerRef={titleRef}
                  placeholder="მაგალითად: Next.js პრაქტიკაში"
                />
              </FieldRow>
              <FieldRow name="instructor" label="ლექტორი">
                <Field
                  id="instructor"
                  name="instructor"
                  placeholder="სახელი და გვარი"
                />
              </FieldRow>
              <div className="row">
                <FieldRow name="category" label="კატეგორია">
                  <Field as="select" id="category" name="category">
                    <option value="">აირჩიეთ</option>
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </Field>
                </FieldRow>
                <FieldRow name="level" label="დონე">
                  <Field as="select" id="level" name="level">
                    <option value="">აირჩიეთ</option>
                    {LEVELS.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </Field>
                </FieldRow>
              </div>
              <div className="row">
                <FieldRow name="price" label="ფასი (₾)">
                  <Field id="price" name="price" type="number" min="0" />
                </FieldRow>
                <FieldRow name="duration" label="ხანგრძლივობა (საათი)">
                  <Field id="duration" name="duration" type="number" min="1" />
                </FieldRow>
              </div>
              <FieldRow name="description" label="აღწერა">
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows="4"
                  placeholder="რას ისწავლიან სტუდენტები?"
                />
                <span className="small muted">
                  {values.description.length} / 500
                </span>
              </FieldRow>
              <button className="btn" type="submit" disabled={isSubmitting}>
                კურსის დამატება
              </button>
            </Form>

            <aside>
              <p className="small muted">ასე გამოჩნდება კატალოგში</p>
              <CourseCard course={{ ...values, id: "preview" }} preview />
            </aside>
          </div>
        )}
      </Formik>
    </>
  );
}

export default AddCourse;
