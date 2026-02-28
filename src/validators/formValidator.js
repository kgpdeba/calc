import * as yup from "yup";

const formSchema = yup.object({

    firstName: yup
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(15, "Name must be at most 15 characters"),
    lastName: yup
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(15, "Name must be at most 15 characters"),
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    phone: yup
        .string()
        .trim()
        .length(10, "Phone number must be exactly 10 digits long.")
        .matches(/^[6-9]\d{9}$/, {
            message: "Phone number must start with only 6, 7, 8, or 9.",
        }),
});

export default formSchema;