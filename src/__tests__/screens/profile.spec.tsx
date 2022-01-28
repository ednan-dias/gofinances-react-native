import React from "react";
import { render } from "@testing-library/react-native";

import { Profile } from "../../screens/Profile";

describe("Profile Screen", () => {
  it("should be correctly placeholder input user name ", () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText("Nome");

    expect(inputName).toBeTruthy();
  });

  it("should be load user data", () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId("input-name");
    const inputSurname = getByTestId("input-surname");

    expect(inputName.props.value).toEqual("Ednan");
    expect(inputSurname.props.value).toEqual("Dias");
  });

  it("should exist title correctly", () => {
    const { getByTestId } = render(<Profile />);
    const textTitle = getByTestId("text-title");
    expect(textTitle.children).toContain("Perfil");
  });
});
