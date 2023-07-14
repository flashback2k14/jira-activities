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

  describe("addSummarizedTickets", () => {
    it("empty content should return an empty map", () =>
      expect(addSummarizedTickets(new Map())).toEqual(new Map()));

    it("add summarized tickets correctly", () =>
      expect(
        addSummarizedTickets(
          new Map([
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
          ])
        )
      ).toEqual(
        new Map(
          Object.entries({
            "2023-06-23": {
              0: {
                category: "closed",
                date: "2023-06-23",
                link: "https://lorem.ipsum/jira/browse/LI-1234567890",
                summary: "Example summary text #2",
                title: "LI-1234567890",
              },
              tickets: "LI-1234567890",
            },
            "2023-06-19": {
              0: {
                category: "closed",
                date: "2023-06-19",
                link: "https://lorem.ipsum/jira/browse/LI-9876543210",
                summary: "Example summary text #1",
                title: "LI-9876543210",
              },
              tickets: "LI-9876543210",
            },
          })
        )
      ));

    it("filter out images from title for summarized tickets", () =>
      expect(
        addSummarizedTickets(
          new Map([["2023-07-01", [{ title: "image.lorem" }]]])
        )
      ).toEqual(
        new Map(
          Object.entries({
            "2023-07-01": { 0: { title: "image.lorem" }, tickets: "" },
          })
        )
      ));

    it("filter empty from title for summarized tickets", () =>
      expect(
        addSummarizedTickets(
          new Map([
            ["2023-07-01", [{ title: null }]],
            ["2023-07-02", [{ title: undefined }]],
            ["2023-07-03", [{ title: "" }]],
            ["2023-07-04", [{ title: false }]],
          ])
        )
      ).toEqual(
        new Map(
          Object.entries({
            "2023-07-01": { 0: { title: null }, tickets: "" },
            "2023-07-02": { 0: { title: undefined }, tickets: "" },
            "2023-07-03": { 0: { title: "" }, tickets: "" },
            "2023-07-04": { 0: { title: false }, tickets: "" },
          })
        )
      ));
  });

  describe("print", () => {
    const orgLog = console.log;
    const spyLog = jest.fn();

    beforeEach(() => (console.log = spyLog));

    afterEach(() => (console.log = orgLog));

    it("display excluded entries", () => {
      print(new Map(), 100);
      expect(spyLog).toBeCalledTimes(6);
      expect(spyLog).toHaveBeenNthCalledWith(1, "------------------");
      expect(spyLog).toHaveBeenNthCalledWith(2, "Tickets per day:");
      expect(spyLog).toHaveBeenNthCalledWith(3, "------------------");
      expect(spyLog).toHaveBeenNthCalledWith(4, "------------------");
      expect(spyLog).toHaveBeenNthCalledWith(5, "excluded entries: 100.");
      expect(spyLog).toHaveBeenNthCalledWith(6, "------------------");
    });

    it("display ticket entries", () => {
      print(
        new Map([
          ["2023-07-01", { tickets: "L-1234567890" }],
          ["2023-07-02", { tickets: "L-0987654321" }],
        ]),
        0
      );
      expect(spyLog).toBeCalledTimes(8);
      expect(spyLog).toHaveBeenNthCalledWith(1, "------------------");
      expect(spyLog).toHaveBeenNthCalledWith(2, "Tickets per day:");
      expect(spyLog).toHaveBeenNthCalledWith(3, "------------------");
      expect(spyLog).toHaveBeenNthCalledWith(4, "2023-07-01: L-1234567890");
      expect(spyLog).toHaveBeenNthCalledWith(5, "2023-07-02: L-0987654321");
      expect(spyLog).toHaveBeenNthCalledWith(6, "------------------");
      expect(spyLog).toHaveBeenNthCalledWith(7, "excluded entries: 0.");
      expect(spyLog).toHaveBeenNthCalledWith(8, "------------------");
    });

    it("display ticket entries with details", () => {
      print(
        new Map([
          [
            "2023-07-01",
            { 0: { category: "closed" }, tickets: "L-1234567890" },
          ],
          [
            "2023-07-02",
            { 0: { category: "started" }, tickets: "L-0987654321" },
          ],
        ]),
        0,
        true
      );
      expect(spyLog).toBeCalledTimes(16);
      expect(spyLog).toHaveBeenNthCalledWith(1, "------------------");
      expect(spyLog).toHaveBeenNthCalledWith(2, "Tickets per day:");
      expect(spyLog).toHaveBeenNthCalledWith(3, "------------------");
      expect(spyLog).toHaveBeenNthCalledWith(4, "2023-07-01: L-1234567890");
      expect(spyLog).toHaveBeenNthCalledWith(5, "------------------");
      expect(spyLog).toHaveBeenNthCalledWith(6, "Details:");
      expect(spyLog).toHaveBeenNthCalledWith(7, "------------------");
      expect(spyLog).toHaveBeenNthCalledWith(8, {
        0: { category: "closed" },
      });
      expect(spyLog).toHaveBeenNthCalledWith(9, "2023-07-02: L-0987654321");
      expect(spyLog).toHaveBeenNthCalledWith(10, "------------------");
      expect(spyLog).toHaveBeenNthCalledWith(11, "Details:");
      expect(spyLog).toHaveBeenNthCalledWith(12, "------------------");
      expect(spyLog).toHaveBeenNthCalledWith(13, {
        0: { category: "started" },
      });
      expect(spyLog).toHaveBeenNthCalledWith(14, "------------------");
      expect(spyLog).toHaveBeenNthCalledWith(15, "excluded entries: 0.");
      expect(spyLog).toHaveBeenNthCalledWith(16, "------------------");
    });
  });
});
