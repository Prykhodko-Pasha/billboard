import * as yup from "yup";
import categories from "./categories";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required field"),
  password: yup
    .string()
    .min(6, "Must be at least 6 symbols")
    .required("Required field"),
});

export const signupSchema = yup.object().shape({
  name: yup.string().required("Required field"),
  email: yup.string().email("Invalid email").required("Required field"),
  password: yup
    .string()
    .min(6, "Must be at least 6 symbols")
    .required("Required field"),
});

export const billSchema = yup.object().shape({
  title: yup.string().required("Required field"),
  text: yup.string().typeError("Required field").required("Required field"),
  category: yup.string().required("Required field"),
});
