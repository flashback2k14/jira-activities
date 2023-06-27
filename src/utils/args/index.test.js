import { expect, jest, describe, it } from "@jest/globals";
import { extractValue, getArgs } from "./index.js";

const origLog = console.log;

describe("args", () => {
  beforeAll(() => (console.log = function () {}));

  afterAll(() => (console.log = origLog));

  describe("extractValue", () => {
    it("should return the right side from the equal sign", () =>
      expect(extractValue("lorem=ipsum")).toEqual("ipsum"));

    it("should return an Error if there is no equal sign", () =>
      expect(() => extractValue("ipsum")).toThrowError(
        new Error("arg doesn't has an equal sign.")
      ));

    it("should return undefined if there is no argument passed", () =>
      expect(extractValue()).toBeUndefined());
  });

  describe("getArgs", () => {
    beforeEach(() => {
      // Sun Jun 25 2023 20:03:43 GMT+0200
      jest.spyOn(Date, "now").mockImplementation(() => 1687716223333);
    });

    it("should throw error if --filepath arg is missing", () => {
      jest.replaceProperty(process, "argv", ["lorem", "ipsum"]);

      expect(() => getArgs()).toThrowError(
        new Error("--filepath argument is missing.")
      );
    });

    describe("with --filepath arg", () => {
      beforeEach(() => (process.argv = ["--filepath=lorem.xml"]));

      it("should return args, dates are calculated with Date.now()", () =>
        expect(getArgs()).toEqual({
          filepath: "lorem.xml",
          startDate: "2023-06-21",
          endDate: "2023-06-25",
          details: false,
          verbose: false,
        }));

      describe("with --details arg", () => {
        beforeEach(() => process.argv.push("--details"));

        it("should return args", () =>
          expect(getArgs()).toMatchObject({
            filepath: "lorem.xml",
            details: true,
          }));

        describe("with --verbose arg", () => {
          beforeEach(() => process.argv.push("--verbose"));

          it("should return args", () =>
            expect(getArgs()).toMatchObject({
              filepath: "lorem.xml",
              details: true,
              verbose: true,
            }));

          describe("with --start arg", () => {
            beforeEach(() => process.argv.push("--start=2023-07-31"));

            it("should return args", () =>
              expect(getArgs()).toMatchObject({
                filepath: "lorem.xml",
                details: true,
                verbose: true,
                startDate: "2023-07-31",
              }));

            describe("with --end arg", () => {
              beforeEach(() => process.argv.push("--end=2023-08-04"));

              it("should return args", () =>
                expect(getArgs()).toMatchObject({
                  filepath: "lorem.xml",
                  details: true,
                  verbose: true,
                  startDate: "2023-07-31",
                  endDate: "2023-08-04",
                }));
            });
          });
        });
      });
    });
  });
});
