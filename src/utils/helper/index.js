import { createRequire } from "node:module";
export const packageJSON = createRequire(import.meta.url)(
  "../../../package.json"
);

export const date0 = "2023-06-18";
export const date1 = "2023-06-19";
export const date2 = "2023-06-23";

export const xml = `
  <feed xmlns="http://www.w3.org/2005/Atom" xmlns:atlassian="http://streams.atlassian.com/syndication/general/1.0">
    <entry xmlns:activity="http://activitystrea.ms/spec/1.0/">
      <updated>${date2}T11:19:57.890Z</updated>
      <category term="closed"/>
      <activity:object>
        <title type="text">LI-1234567890</title>
        <summary type="text">Example summary text</summary>
      </activity:object>
      <link href="https://lorem.ipsum/jira/browse/LI-1234567890" rel="alternate"/>
      <link href="https://lorem.ipsum/jira/secure/viewavatar?size=xsmall&amp;avatarId=1234567890&amp;avatarType=issuetype" rel="http://streams.atlassian.com/syndication/icon" title="Story"/>
    </entry>
  </feed>
  `.trim();

export const js = [
  {
    _attributes: {
      "xmlns:activity": "http://activitystrea.ms/spec/1.0/",
    },
    updated: { _text: `${date2}T11:19:57.890Z` },
    category: { _attributes: { term: "closed" } },
    "activity:object": {
      title: {
        _attributes: {
          type: "text",
        },
        _text: "LI-1234567890",
      },
      summary: {
        _attributes: {
          type: "text",
        },
        _text: "Example summary text",
      },
    },
    link: [
      {
        _attributes: {
          href: "https://lorem.ipsum/jira/browse/LI-1234567890",
          rel: "alternate",
        },
      },
      {
        _attributes: {
          href: "https://lorem.ipsum/jira/secure/viewavatar?size=xsmall&avatarId=1234567890&avatarType=issuetype",
          rel: "http://streams.atlassian.com/syndication/icon",
          title: "Story",
        },
      },
    ],
  },
];

export const xmlWithTwoEntries = `
  <feed xmlns="http://www.w3.org/2005/Atom" xmlns:atlassian="http://streams.atlassian.com/syndication/general/1.0">
    <entry xmlns:activity="http://activitystrea.ms/spec/1.0/">
      <updated>${date2}T11:19:57.890Z</updated>
      <category term="closed"/>
      <activity:object>
        <title type="text">LI-1234567890</title>
        <summary type="text">Example summary text #2</summary>
      </activity:object>
      <link href="https://lorem.ipsum/jira/browse/LI-1234567890" rel="alternate"/>
      <link href="https://lorem.ipsum/jira/secure/viewavatar?size=xsmall&amp;avatarId=1234567890&amp;avatarType=issuetype" rel="http://streams.atlassian.com/syndication/icon" title="Story"/>
    </entry>
    <entry xmlns:activity="http://activitystrea.ms/spec/1.0/">
      <updated>${date1}T10:19:57.890Z</updated>
      <category term="closed"/>
      <activity:object>
        <title type="text">LI-9876543210</title>
        <summary type="text">Example summary text #1</summary>
      </activity:object>
      <link href="https://lorem.ipsum/jira/browse/LI-9876543210" rel="alternate"/>
      <link href="https://lorem.ipsum/jira/secure/viewavatar?size=xsmall&amp;avatarId=1234567890&amp;avatarType=issuetype" rel="http://streams.atlassian.com/syndication/icon" title="Story"/>
    </entry>
  </feed>
  `.trim();

export const jsWithTwoEntries = [
  {
    _attributes: {
      "xmlns:activity": "http://activitystrea.ms/spec/1.0/",
    },
    updated: { _text: `${date2}T11:19:57.890Z` },
    category: { _attributes: { term: "closed" } },
    "activity:object": {
      title: {
        _attributes: {
          type: "text",
        },
        _text: "LI-1234567890",
      },
      summary: {
        _attributes: {
          type: "text",
        },
        _text: "Example summary text #2",
      },
    },
    link: [
      {
        _attributes: {
          href: "https://lorem.ipsum/jira/browse/LI-1234567890",
          rel: "alternate",
        },
      },
      {
        _attributes: {
          href: "https://lorem.ipsum/jira/secure/viewavatar?size=xsmall&avatarId=1234567890&avatarType=issuetype",
          rel: "http://streams.atlassian.com/syndication/icon",
          title: "Story",
        },
      },
    ],
  },
  {
    _attributes: {
      "xmlns:activity": "http://activitystrea.ms/spec/1.0/",
    },
    updated: { _text: `${date1}T11:19:57.890Z` },
    category: { _attributes: { term: "closed" } },
    "activity:object": {
      title: {
        _attributes: {
          type: "text",
        },
        _text: "LI-9876543210",
      },
      summary: {
        _attributes: {
          type: "text",
        },
        _text: "Example summary text #1",
      },
    },
    link: [
      {
        _attributes: {
          href: "https://lorem.ipsum/jira/browse/LI-9876543210",
          rel: "alternate",
        },
      },
      {
        _attributes: {
          href: "https://lorem.ipsum/jira/secure/viewavatar?size=xsmall&avatarId=1234567890&avatarType=issuetype",
          rel: "http://streams.atlassian.com/syndication/icon",
          title: "Story",
        },
      },
    ],
  },
];

export const jsWithThreeEntries = [
  {
    _attributes: {
      "xmlns:activity": "http://activitystrea.ms/spec/1.0/",
    },
    updated: { _text: `${date2}T11:19:57.890Z` },
    category: { _attributes: { term: "closed" } },
    "activity:object": {
      title: {
        _attributes: {
          type: "text",
        },
        _text: "LI-1234567890",
      },
      summary: {
        _attributes: {
          type: "text",
        },
        _text: "Example summary text #2",
      },
    },
    link: [
      {
        _attributes: {
          href: "https://lorem.ipsum/jira/browse/LI-1234567890",
          rel: "alternate",
        },
      },
      {
        _attributes: {
          href: "https://lorem.ipsum/jira/secure/viewavatar?size=xsmall&avatarId=1234567890&avatarType=issuetype",
          rel: "http://streams.atlassian.com/syndication/icon",
          title: "Story",
        },
      },
    ],
  },
  {
    _attributes: {
      "xmlns:activity": "http://activitystrea.ms/spec/1.0/",
    },
    updated: { _text: `${date2}T11:18:57.890Z` },
    category: { _attributes: { term: "in progress" } },
    "activity:object": {
      title: {
        _attributes: {
          type: "text",
        },
        _text: "LI-1234567890",
      },
      summary: {
        _attributes: {
          type: "text",
        },
        _text: "Example summary text #2.1",
      },
    },
    link: [
      {
        _attributes: {
          href: "https://lorem.ipsum/jira/browse/LI-1234567890",
          rel: "alternate",
        },
      },
      {
        _attributes: {
          href: "https://lorem.ipsum/jira/secure/viewavatar?size=xsmall&avatarId=1234567890&avatarType=issuetype",
          rel: "http://streams.atlassian.com/syndication/icon",
          title: "Story",
        },
      },
    ],
  },
  {
    _attributes: {
      "xmlns:activity": "http://activitystrea.ms/spec/1.0/",
    },
    updated: { _text: `${date1}T11:19:57.890Z` },
    category: { _attributes: { term: "closed" } },
    "activity:object": {
      title: {
        _attributes: {
          type: "text",
        },
        _text: "LI-9876543210",
      },
      summary: {
        _attributes: {
          type: "text",
        },
        _text: "Example summary text #1",
      },
    },
    link: [
      {
        _attributes: {
          href: "https://lorem.ipsum/jira/browse/LI-9876543210",
          rel: "alternate",
        },
      },
      {
        _attributes: {
          href: "https://lorem.ipsum/jira/secure/viewavatar?size=xsmall&avatarId=1234567890&avatarType=issuetype",
          rel: "http://streams.atlassian.com/syndication/icon",
          title: "Story",
        },
      },
    ],
  },
];

export const jsWithThreeEntriesAndEmptyFields = [
  {
    _attributes: {
      "xmlns:activity": "http://activitystrea.ms/spec/1.0/",
    },
    category: { _attributes: { term: "closed" } },
    "activity:object": {
      title: {
        _attributes: {
          type: "text",
        },
        _text: "LI-1234567890",
      },
      summary: {
        _attributes: {
          type: "text",
        },
        _text: "Example summary text #2",
      },
    },
    link: [
      {
        _attributes: {
          href: "https://lorem.ipsum/jira/browse/LI-1234567890",
          rel: "alternate",
        },
      },
      {
        _attributes: {
          href: "https://lorem.ipsum/jira/secure/viewavatar?size=xsmall&avatarId=1234567890&avatarType=issuetype",
          rel: "http://streams.atlassian.com/syndication/icon",
          title: "Story",
        },
      },
    ],
  },
  {
    _attributes: {
      "xmlns:activity": "http://activitystrea.ms/spec/1.0/",
    },
    updated: { _text: `${date2}T11:18:57.890Z` },
    "activity:object": {
      summary: {
        _attributes: {
          type: "text",
        },
        _text: "Example summary text #2.1",
      },
    },
    link: [
      {
        _attributes: {
          href: "https://lorem.ipsum/jira/browse/LI-1234567890",
          rel: "alternate",
        },
      },
      {
        _attributes: {
          href: "https://lorem.ipsum/jira/secure/viewavatar?size=xsmall&avatarId=1234567890&avatarType=issuetype",
          rel: "http://streams.atlassian.com/syndication/icon",
          title: "Story",
        },
      },
    ],
  },
  {
    _attributes: {
      "xmlns:activity": "http://activitystrea.ms/spec/1.0/",
    },
    updated: { _text: `${date1}T11:19:57.890Z` },
    category: { _attributes: { term: "closed" } },
    "activity:object": {
      title: {
        _attributes: {
          type: "text",
        },
        _text: "LI-9876543210",
      },
    },
  },
];
