import { expect, jest, describe, it } from "@jest/globals";
import { getFileContent, getContent } from "./index.js";
import { xml, js } from "../helper/index.js";
import fs from "node:fs/promises";

describe("files", () => {
  describe("getFileContent", () => {
    it("should throw error if the file is not a xml file", () =>
      expect(
        async () => await getFileContent("/lorem.txt")
      ).rejects.toThrowError(new Error("Filepath must be an xml file.")));

    it("should retrun correct xml", async () => {
      const spy = jest.spyOn(fs, "readFile").mockImplementation(() => xml);

      await expect(getFileContent("/lorem.xml")).resolves.toBe(xml);

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe("getContent", () => {
    it("should return an empty Array if there is an empty xml string", () =>
      expect(getContent("")).toEqual([]));

    it("should return an empty Array if the xml has an unexpected structure", () => {
      const wrongXml = `
        <?xml version="1.0"?>
        <customers>
          <customer id="55000">
              <name>Charter Group</name>
              <address>
                <street>100 Main</street>
                <city>Framingham</city>
                <state>MA</state>
                <zip>01701</zip>
              </address>
          </customer>
        </customers>
      `.trim();
      expect(getContent(wrongXml)).toEqual([]);
    });

    it("should return an Array of entries", () => {
      expect(getContent(xml)).toEqual(js);
    });
  });
});
