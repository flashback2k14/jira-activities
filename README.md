# Jira activities

![CI pipeline status](https://github.com/flashback2k14/jira-activities/actions/workflows/ci.yml/badge.svg)

This is a little helper program to get your Jira tickets you worked on from the Jira activity feed.

## Install

Checkout the code and perform `npm install` to install the dependencies. After this run
`npm link` to make the program global available. Or install it directly without checking out the code with `npm install -g https://github.com/flashback2k14/jira-activities`

## Parameters

This program has one required parameter and six optional parameter.

The first parameter is one of the following parameter. Because of permission issue we can not fetch directly the Jira activity feed.

- The parameter `--filepath` to the xml file that contains the result from the Jira activity feed.

- The parameter `--clipboard` to the copied xml content from the Jira activity feed.

The second parameter is the `--start`. Mostly the start day of the working week. If it's not set then it's calculated from the `end` or from `Date.now()` if `end` is not present.

The third parameter is the `--end`. Mostly the end day of the working week. If it's not set then it's calculated from the `Date.now()`.

The fourth parameter is `--details`. To print out more details for each Jira ticket you worked on.

The fifth parameter is `--verbose`. To print out the program arguments.

The sixed parameter is `--help`. To print out the help text.

The seventh parameter is `--extend`. To print out the summary and the type of the ticket.

## Execution

An example is:

```shell
jira-activities --filepath=drop-xml-here/feed.xml --start=2023-06-19 --end=2023-06-23
```

or

```shell
jira-activities --filepath=drop-xml-here/feed.xml --start=2023-06-19 --end=2023-06-23 --details
```
