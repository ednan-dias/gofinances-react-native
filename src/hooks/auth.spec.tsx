import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

import { renderHook, act } from "@testing-library/react-hooks";
import { startAsync } from "expo-auth-session";
import * as AuthSession from "expo-auth-session";

import { AuthProvider, useAuth } from "./auth";

const userTest = {
  id: "any_id",
  email: "john.doe@email.com",
  name: "John Doe",
  photo: "any_photo.png",
};

jest.mock("expo-auth-session");

describe("Auth Hook", () => {
  it("should be able to sign in with Google account existing", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const googleMocked = jest.mocked(startAsync as any);
    googleMocked.mockReturnValue({
      type: "success",
      params: {
        access_token: "any_token",
      },
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe(userTest.email);
  });

  it("user should not connect if cancel authentication with Google", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const googleMocked = jest.mocked(startAsync);

    googleMocked.mockReturnValue({
      type: "cancel",
      params: {
        access_token: "",
      },
    } as any);

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    console.log("Tem usuário?", result.current.user);

    expect(result.current.user).not.toHaveProperty("id");
  });
});
