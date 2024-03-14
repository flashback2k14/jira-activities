import { expect, jest, describe, it } from "@jest/globals";
import { extractValue, getArgs } from "./index.js";

const origLog = console.log;
const spyLog = jest.fn();

describe("args", () => {
  beforeAll(() => (console.log = spyLog));

  afterAll(() => (console.log = origLog));

  describe("extractValue", () => {
    it("should return the right side from the equal sign", () =>
      expect(extractValue("lorem=ipsum")).toEqual("ipsum"));

    it("should return an Error if there is no equal sign", () =>
      expect(() => extractValue("ipsum")).toThrowError(
        new Error("arg doesn't has an equal sign."),
      ));

    it("should return undefined if there is no argument passed", () =>
      expect(extractValue()).toBeUndefined());
  });

  describe("getArgs", () => {
    beforeEach(() => {
      // Sun Jun 25 2023 20:03:43 GMT+0200
      jest.spyOn(Date, "now").mockImplementation(() => 1687716223333);
    });

    it("should throw error if --filepath or --clipboard arg is missing", () => {
      jest.replaceProperty(process, "argv", ["lorem", "ipsum"]);

      expect(() => getArgs()).toThrowError(
        new Error("--filepath or --clipboard argument is missing."),
      );
    });

    it("should return filepath with --filepath arg", () => {
      jest.replaceProperty(process, "argv", ["--filepath=ipsum.xml"]);

      expect(getArgs()).toMatchObject({
        filepath: "ipsum.xml",
        clipboard: false,
      });
    });

    it("should return clipboard with --clipboard arg", () => {
      jest.replaceProperty(process, "argv", ["--clipboard"]);

      expect(getArgs()).toMatchObject({
        filepath: undefined,
        clipboard: true,
      });
    });

    describe("with --help arg", () => {
      beforeEach(() => (process.argv = ["--help"]));

      afterEach(() => (process.argv = []));

      it("should return args", () =>
        expect(getArgs()).toMatchObject({
          help: true,
        }));
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
          help: false,
          clipboard: false,
          extend: false,
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

          afterEach(() => jest.resetAllMocks());

          it("should return args", () =>
            expect(getArgs()).toMatchObject({
              filepath: "lorem.xml",
              details: true,
              verbose: true,
            }));

          it("should print args to console", () => {
            getArgs();

            expect(spyLog).toBeCalledTimes(4);
            expect(spyLog).toHaveBeenNthCalledWith(1, "------------------");
            expect(spyLog).toHaveBeenNthCalledWith(2, "Arguments:");
            expect(spyLog).toHaveBeenNthCalledWith(3, "------------------");
            expect(spyLog).toHaveBeenNthCalledWith(4, {
              clipboard: false,
              details: true,
              endDate: "2023-06-25",
              filepath: "lorem.xml",
              help: false,
              startDate: "2023-06-21",
              verbose: true,
              extend: false,
            });
          });

          describe("with --start arg", () => {
            beforeEach(() => process.argv.push("--start=2023-07-31"));

            it("should return args", () =>
              expect(getArgs()).toMatchObject({
                filepath: "lorem.xml",
                details: true,
                verbose: true,
                help: false,
                startDate: "2023-07-31",
              }));

            describe("with --end arg", () => {
              beforeEach(() => process.argv.push("--end=2023-08-04"));

              it("should return args", () =>
                expect(getArgs()).toMatchObject({
                  filepath: "lorem.xml",
                  details: true,
                  verbose: true,
                  help: false,
                  startDate: "2023-07-31",
                  endDate: "2023-08-04",
                }));

              describe("with --extend arg", () => {
                beforeEach(() => process.argv.push("--extend"));

                it("should return args", () =>
                  expect(getArgs()).toMatchObject({
                    filepath: "lorem.xml",
                    details: true,
                    verbose: true,
                    help: false,
                    startDate: "2023-07-31",
                    endDate: "2023-08-04",
                    extend: true,
                  }));
              });
            });
          });
        });
      });
    });
  });
});
