import { FieldHelperProps, FieldHookConfig, FieldInputProps, FieldMetaProps } from "formik";

export type FormikUseFieldArgType = string | FieldHookConfig<unknown>;
export type FormikUseFieldReturnType = [FieldInputProps<unknown>, FieldMetaProps<unknown>, FieldHelperProps<unknown>];
