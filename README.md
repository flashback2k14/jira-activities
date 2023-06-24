# Jira activities

This is a little helper program to get your Jira tickets you worked on from the Jira activity feed.

## Install

Checkout the code and perform `npm install` to install the dependencies. After this run
`npm link` to make the program global available. Or install it directly without checking out the code with `npm install -g https://github.com/flashback2k14/jira-activities`

## Parameters

---

This program has three required parameter and one optional parameter. **_The order is important._**

The first parameter is the `--filepath` to the xml file that contains the result from the Jira activity feed. Because of permission issue we can not fetch directly the Jira activity feed.

The second parameter is the `--start`. Mostly the start day of the working week.

The third parameter is the `--end`. Mostly the end day of the working week.

The fourth parameter is `--details`. To print out more details for each Jira ticket you worked on.

## Execution

---

An example is:

```shell
jira-activities --filepath=drop-xml-here/feed.xml --start=2023-06-19 --end=2023-06-23
```

or

```shell
jira-activities --filepath=drop-xml-here/feed.xml --start=2023-06-19 --end=2023-06-23 --details
```
