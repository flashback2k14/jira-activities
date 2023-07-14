import { expect, jest, describe, it } from "@jest/globals";
import {
  getCurrentEndDate,
  getCurrentStartDate,
  getDatesBetween,
} from "./index.js";

describe("dates", () => {
  describe("getCurrentEndDate", () => {
    it("should return correct date and format", () =>
      expect(getCurrentEndDate(0)).toEqual("1970-01-01"));

    it("should throw an error if the parameter is invalid", () => {
      expect(() => getCurrentEndDate()).toThrowError(
        new Error("Now is not a number.")
      );

      [null, undefined, "", false].forEach((invalidParameter) => {
        expect(() => getCurrentEndDate(invalidParameter)).toThrowError(
          new Error("Now is not a number.")
        );
      });
    });
  });

  describe("getCurrentStartDate", () => {
    it("should throw an error if the parameter is invalid", () => {
      expect(() => getCurrentStartDate()).toThrowError(
        new Error("Now has an undefined type.")
      );

      [null, undefined, false].forEach((invalidParameter) => {
        expect(() => getCurrentStartDate(invalidParameter)).toThrowError(
          new Error("Now has an undefined type.")
        );
      });
    });

    it("should return correct start date for given end date as string", () =>
      expect(getCurrentStartDate("2023-07-14")).toEqual("2023-07-10"));

    it("should return correct start date for given end date as number", () =>
      expect(getCurrentStartDate(1689336586331)).toEqual("2023-07-10"));
  });

  describe("getDatesBetween", () => {
    it("should return the correct dates between start and end date", () =>
      expect(getDatesBetween("2023-07-10", "2023-07-14")).toEqual([
        "2023-07-10",
        "2023-07-11",
        "2023-07-12",
        "2023-07-13",
        "2023-07-14",
      ]));
  });
});
