import * as yup from "yup";

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
