import { Input, InputWrapper, createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  colors: {
    purple: [
      "#F2ECFA",
      "#E5D5FA",
      "#D1B4F8",
      "#BD93F7",
      "#9854F6",
      "#541F9D",
      "#9854F6",
      "",
      "",
      "",
    ],
    gray_scale: [
      "#FFFFFF",
      "#F5F5F6",
      "#EAEBED",
      "#D5D6DC",
      "#ACADB9",
      "#7B7C88",
      "#ACADB9",
      "",
      "",
      "",
    ],
  },
  fontFamily: "Inter, sans-serif",
  black: "#000000",
  headings: {
    sizes: {
      h1: {
        fontWeight: "700",
        fontSize: rem(32),
        lineHeight: "1.4",
      },
      h3: {
        fontWeight: "600",
        fontSize: rem(24),
        lineHeight: "1.5",
      },
    },
  },
  primaryColor: "purple",
  components: {
    Input: Input.extend({
      classNames: {
        wrapper: "input_wrapper",
        input: "input_input",
        section: "input_section",
      },
    }),
    InputWrapper: InputWrapper.extend({
      classNames: {
        root: "input_wrapper_root",
        label: "input_wrapper_label",
        error: "input_wrapper_error",
      },
    }),
  },
});
