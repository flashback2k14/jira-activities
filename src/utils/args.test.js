import { expect, jest, describe, it } from "@jest/globals";
import { extractValue, getArgs } from "./args.js";

describe("args.js", () => {
  describe("extractValue", () => {
    it("should return the right side from the equal sign", () =>
      expect(extractValue("lorem=ipsum")).toEqual("ipsum"));

    it("should return an Error if there is no equal sign", () =>
      expect(() => extractValue("ipsum")).toThrowError(
        new Error("arg doesn't has an equal sign.")
      ));
  });

  describe("getArgs", () => {
    beforeEach(() => {
      // Sun Jun 25 2023 20:03:43 GMT+0200
      jest.spyOn(Date, "now").mockImplementation(() => 1687716223333);
    });

    afterEach(() => jest.restoreAllMocks());

    it("should throw error if --filepath arg is missing", () => {
      jest.replaceProperty(process, "argv", ["lorem", "ipsum"]);

      expect(() => getArgs()).toThrowError(
        new Error("--filepath argument is missing.")
      );
    });

    it("should return args if --filepath arg is present, start and end date are generated from Date.now()", () => {
      jest.replaceProperty(process, "argv", ["--filepath=lorem.xml"]);

      expect(getArgs()).toEqual({
        filepath: "lorem.xml",
        startDate: "2023-06-21",
        endDate: "2023-06-25",
        details: false,
        verbose: false,
      });
    });
  });
});
