# Contributing To Dev Cheats

:octocat: Thanks for taking the time to contribute! 

The following is a set of guidelines for contributing to this repository.
- [Contributing To Dev Cheats](#contributing-to-dev-cheats)
  - [Code of Conduct](#code-of-conduct)
  - [Issues](#issues)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Enhancements](#suggesting-enhancements)
  - [Contributing To Source Code](#contributing-to-source-code)
    - [New Documents](#new-documents)
    - [New Features / Enhancements](#new-features--enhancements)
    - [Commit and PR Guidelines](#commit-and-pr-guidelines)
      - [Commit Messages](#commit-messages)
      - [Pull Requests](#pull-requests)


## Code of Conduct
This project and everyone participating in it is governed by the [Dev Cheats Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Issues
### Reporting Bugs
Before creating bug reports, please perform a [cursory search](https://github.com/excalith/dev-cheats/issues) to see if the problem has already been reported. If it has **and the issue is still open**, add a comment to the existing issue instead of opening a new one. When you are creating a bug report, please include as many details as possible. Fill out the required template, the information it asks for will help maintainers resolve it faster.

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.


### Suggesting Enhancements
Before suggesting an enhancement, please perform a [cursory search](https://github.com/excalith/dev-cheats/issues) to see if the suggestion has already been submitted.

* **User a clear descriptive title** for the suggestion
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why
* **Do not request complicated commands** since this project is to help people get the basic commands

Unsure where to begin contributing? You can start by looking through these `beginner` and `help-wanted` issues:

* [Beginner issues](https://github.com/excalith/dev-cheats/labels/beginner) - issues which should only require a few lines of code, and a test or two.
* [Help wanted issues](https://github.com/excalith/dev-cheats/labels/help%20wanted) - issues which should be a bit more involved than `beginner` issues.

## Contributing To Source Code

In order to contribute to the source of the project
1. Fork the repository and create a new branch for your feature or enhancement.
2. Use [commit messages](#commit-messages) guideline for your commits.
3. Send a pull request to the `main` branch using the [pull request](#pull-requests) guideline.

### New Documents
I really appreciate contributions in the form of new documents to the project. If you'd like to add a new document, please follow these steps:

1. Create a new `json` file in the `public/data/docs` folder using the app's name as the file name. Please use `kebab-case` for the file name. You can use the [template.json](template.json) file as a starting point.
2. Add the name of the new command to the `public/data/list.json` file to enable autosuggest functionality.

I am working on a dedicated Wiki page with more detailed instructions, which will be added soon.

### New Features / Enhancements
Any new features or enhancements should be discussed in an issue first. If you'd like to work on a new feature or enhancement, please follow these steps:

1. Create a new issue and describe the feature or enhancement you'd like to work on.
2. Wait for the issue to be approved by a maintainer.
3. Fork the repository and create a new branch for your feature or enhancement.
4. Use [commit messages](#commit-messages) guideline for your commits.
5. Send a pull request to the `main` branch using the [pull request](#pull-requests) guideline.

### Commit and PR Guidelines
#### Commit Messages
When writing commit messages, please follow these guidelines:

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
  

#### Pull Requests
While creating a Pull Request, please use the provided [the required template](PULL_REQUEST_TEMPLATE.md) and keep the following guidelines in mind:

* **Do not** change design into a complicated and / or overwhelming experience
* **Do not** include issue numbers in the PR title if any
* **If applicable**, include screenshots or animated GIFs to showcase new features


