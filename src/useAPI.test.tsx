import { renderHook, act } from "@testing-library/react-hooks";
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import useAPI from "./useAPI";

//mock server
const server = setupServer(
  rest.get("/api", (req, res, ctx) => {
    return res(ctx.json({ name: "John" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("async custom hooks", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useAPI());
  await waitForNextUpdate();
  //toBe: compare primitive values (===) or to check referential identity of object
  //toEqual: compare recursively "all properties of object"
  expect(result.current).toEqual({ name: "John" });
});
