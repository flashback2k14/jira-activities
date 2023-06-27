import { expect, jest, describe, it } from "@jest/globals";
import { transformContent, addSummarizedTickets, print } from "./index.js";
import {
  date0,
  date1,
  date2,
  js,
  jsWithThreeEntries,
  jsWithThreeEntriesAndEmptyFields,
  jsWithTwoEntries,
} from "../test-helper/index.js";

describe("content", () => {
  it("should exists", () => expect(true).toBeTruthy());

  describe("transformContent", () => {
    it("should return empty object for undefined parameter", () =>
      expect(transformContent(undefined, undefined)).toEqual({
        transformed: new Map(),
        excluded: 0,
      }));

    it("should return an object with excluded equals one", () =>
      expect(transformContent(js, [])).toEqual({
        transformed: new Map(),
        excluded: 1,
      }));

    it("should transform correctly the content", () =>
      expect(transformContent(js, [date2])).toEqual({
        transformed: new Map([
          [
            date2,
            [
              {
                category: "closed",
                date: "2023-06-23",
                link: "https://lorem.ipsum/jira/browse/LI-1234567890",
                summary: "Example summary text",
                title: "LI-1234567890",
              },
            ],
          ],
        ]),
        excluded: 0,
      }));

    it("should transform correctly the content and one excluded entry", () =>
      expect(transformContent(jsWithTwoEntries, [date0, date2])).toEqual({
        transformed: new Map([
          [
            date2,
            [
              {
                category: "closed",
                date: "2023-06-23",
                link: "https://lorem.ipsum/jira/browse/LI-1234567890",
                summary: "Example summary text #2",
                title: "LI-1234567890",
              },
            ],
          ],
        ]),
        excluded: 1,
      }));

    it("should transform correctly the content and zero excluded entry", () =>
      expect(transformContent(jsWithTwoEntries, [date1, date2])).toEqual({
        transformed: new Map([
          [
            date2,
            [
              {
                category: "closed",
                date: "2023-06-23",
                link: "https://lorem.ipsum/jira/browse/LI-1234567890",
                summary: "Example summary text #2",
                title: "LI-1234567890",
              },
            ],
          ],
          [
            date1,
            [
              {
                category: "closed",
                date: "2023-06-19",
                link: "https://lorem.ipsum/jira/browse/LI-9876543210",
                summary: "Example summary text #1",
                title: "LI-9876543210",
              },
            ],
          ],
        ]),
        excluded: 0,
      }));

    it("should transform correctly the content and zero excluded entry", () =>
      expect(transformContent(jsWithThreeEntries, [date1, date2])).toEqual({
        transformed: new Map([
          [
            date2,
            [
              {
                category: "closed",
                date: "2023-06-23",
                link: "https://lorem.ipsum/jira/browse/LI-1234567890",
                summary: "Example summary text #2",
                title: "LI-1234567890",
              },
              {
                category: "in progress",
                date: "2023-06-23",
                link: "https://lorem.ipsum/jira/browse/LI-1234567890",
                summary: "Example summary text #2.1",
                title: "LI-1234567890",
              },
            ],
          ],
          [
            date1,
            [
              {
                category: "closed",
                date: "2023-06-19",
                link: "https://lorem.ipsum/jira/browse/LI-9876543210",
                summary: "Example summary text #1",
                title: "LI-9876543210",
              },
            ],
          ],
        ]),
        excluded: 0,
      }));

    it("should tranform correctly the empty fields", () =>
      expect(
        transformContent(jsWithThreeEntriesAndEmptyFields, [date1, date2])
      ).toEqual({
        transformed: new Map([
          [
            "2023-06-23",
            [
              {
                category: "",
                date: "2023-06-23",
                link: "https://lorem.ipsum/jira/browse/LI-1234567890",
                summary: "Example summary text #2.1",
                title: "",
              },
            ],
          ],
          [
            "2023-06-19",
            [
              {
                category: "closed",
                date: "2023-06-19",
                link: "",
                summary: "",
                title: "LI-9876543210",
              },
            ],
          ],
        ]),
        excluded: 1,
      }));
  });
});
