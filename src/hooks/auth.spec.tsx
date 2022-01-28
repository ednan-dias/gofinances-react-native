import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

import { renderHook, act } from "@testing-library/react-hooks";
import * as AuthSession from "expo-auth-session";

import { AuthProvider, useAuth } from "./auth";
import { not } from "react-native-reanimated";

const userTest = {
  id: "any_id",
  email: "john.doe@email.com",
  name: "John Doe",
  photo: "any_photo.png",
};

jest.mock("expo-auth-session");

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("Auth Hook", () => {
  it("should be able to sign in with Google account existing", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(userTest));
    const googleMocked = jest.mocked(AuthSession.startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: "success",
      params: {
        access_token: "any_token",
      },
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe("john.doe@email.com");
  });

  it("user should not connect if cancel authentication with Google", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(userTest));
    const googleMocked = jest.mocked(AuthSession.startAsync);

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

    expect(result.current.user).not.toHaveProperty("id");
  });

  it("should be error with incorrectly Google parameters", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    try {
      await act(() => result.current.signInWithGoogle());
    } catch {
      expect(result.current.user).toEqual({});
    }
  });
});
